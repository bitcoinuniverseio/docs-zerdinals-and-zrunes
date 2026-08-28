#!/usr/bin/env node
// Refreshes src/data/status.json from the live product's public endpoints.
//
// Automatic fields come from https://zrunes.io/api/ready and
// /idx/zcash-metaprotocols/status. The deployed product commit cannot be read
// from a public endpoint, so it is kept as a manually verified field: pass
// --commit <sha> only after confirming the live bundle fingerprint matches a
// build of that commit. Without --commit the previous value is kept, and the
// script fails if the live bundle fingerprint has changed, because a changed
// fingerprint means the recorded commit is no longer verified.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const statusPath = join(here, '..', 'src', 'data', 'status.json');
const previous = JSON.parse(readFileSync(statusPath, 'utf8'));

const commitArgIndex = process.argv.indexOf('--commit');
const commitArg = commitArgIndex === -1 ? null : process.argv[commitArgIndex + 1];

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return response.json();
}

async function getText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return response.text();
}

const ready = await getJson('https://zrunes.io/api/ready');
const idx = await getJson('https://zrunes.io/idx/zcash-metaprotocols/status');
const home = await getText('https://zrunes.io/');

const bundle = home.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/)?.[1];
if (!bundle) throw new Error('could not find the bundle fingerprint on the live page');

if (!commitArg && bundle !== previous.product.bundleFingerprint) {
  throw new Error(
    `live bundle is ${bundle} but the recorded commit was verified against ` +
      `${previous.product.bundleFingerprint}; verify the new deployment and rerun with --commit <sha>`
  );
}

const network = ready.networks?.['zcash:mainnet'];
if (!network) throw new Error('/api/ready did not report zcash:mainnet');

const next = {
  verifiedAt: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  product: {
    url: 'https://zrunes.io',
    deployedCommit: commitArg ?? previous.product.deployedCommit,
    bundleFingerprint: bundle,
  },
  reads: { available: ready.ok === true && network.ready === true },
  coverage: {
    scannedHeight: Number(idx.coverage.scannedHeight),
    networkHeight: Number(idx.coverage.networkHeight),
    chainComplete: idx.coverage.chainComplete === true,
  },
  writes: { enabled: ready.features?.writesEnabled === true },
  walletSigning: { available: false },
  zrunes: {
    activationHeight: Number(idx.zrunes.activationHeight),
    active: idx.zrunes.active === true,
  },
  protocolVersions: previous.protocolVersions,
};

writeFileSync(statusPath, JSON.stringify(next, null, 2) + '\n');
console.log('status.json refreshed:', JSON.stringify(next.coverage), 'writes:', next.writes.enabled);
