#!/usr/bin/env node
// External-link check over the built site. Internal links and anchors are
// validated at build time by starlight-links-validator; this script covers
// the outbound ones. Each unique external URL is requested with a bounded
// retry; a hard 404 or 410 fails, while network flakiness (timeouts, 5xx,
// rate limits) is reported but does not fail the run, so an unrelated
// provider outage cannot block a docs deploy.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
// The site's own absolute URLs (canonical links, social metadata) point at
// the deployed location and 404 until a build is deployed; the build-time
// internal validator already covers every one of those pages.
const OWN_SITE = 'https://bitcoinuniverseio.github.io/docs-zerdinals-and-zrunes';
const SKIP_HOSTS = new Set([
  // Rejects generic clients; the links are stable product-family domains.
]);

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const urls = new Map();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const url = match[1].replace(/&amp;/g, '&');
    if (url.startsWith(OWN_SITE)) continue;
    if (!urls.has(url)) urls.set(url, file);
  }
}

let hardFailures = 0;
let softFailures = 0;
for (const [url, file] of urls) {
  const host = new URL(url).host;
  if (SKIP_HOSTS.has(host)) continue;
  let status = 0;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(20000),
        headers: { 'user-agent': 'docs-zerdinals-and-zrunes-link-check' },
      });
      status = response.status;
      if (response.ok || (status >= 300 && status < 400)) break;
    } catch {
      status = 0;
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 1500 * (attempt + 1)));
  }
  if (status === 404 || status === 410) {
    console.error(`BROKEN ${status} ${url} (first seen in ${file})`);
    hardFailures += 1;
  } else if (status === 0 || status >= 400) {
    console.warn(`unreachable (${status || 'network'}) ${url} (first seen in ${file})`);
    softFailures += 1;
  }
}

console.log(`checked ${urls.size} external URLs: ${hardFailures} broken, ${softFailures} unreachable`);
if (hardFailures > 0) process.exit(1);
