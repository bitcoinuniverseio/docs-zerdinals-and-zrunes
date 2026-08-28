#!/usr/bin/env node
// Fails the build when src/data/status.json is missing a field the status
// page publishes, holds an undefined value, or has gone stale. A docs deploy
// must never publish an undefined product status.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const status = JSON.parse(readFileSync(join(root, 'src', 'data', 'status.json'), 'utf8'));

const failures = [];
function require_(condition, message) {
  if (!condition) failures.push(message);
}

require_(typeof status.verifiedAt === 'string' && !Number.isNaN(Date.parse(status.verifiedAt)), 'verifiedAt must be a valid timestamp');
require_(/^[0-9a-f]{40}$/.test(status.product?.deployedCommit ?? ''), 'product.deployedCommit must be a full commit sha');
require_(/^index-[A-Za-z0-9_-]+\.js$/.test(status.product?.bundleFingerprint ?? ''), 'product.bundleFingerprint must be a bundle file name');
require_(status.product?.url === 'https://zrunes.io', 'product.url must be the live product');
require_(typeof status.reads?.available === 'boolean', 'reads.available must be boolean');
require_(typeof status.writes?.enabled === 'boolean', 'writes.enabled must be boolean');
require_(typeof status.walletSigning?.available === 'boolean', 'walletSigning.available must be boolean');
require_(Number.isInteger(status.coverage?.scannedHeight), 'coverage.scannedHeight must be an integer');
require_(Number.isInteger(status.coverage?.networkHeight), 'coverage.networkHeight must be an integer');
require_(typeof status.coverage?.chainComplete === 'boolean', 'coverage.chainComplete must be boolean');
require_(Number.isInteger(status.zrunes?.activationHeight), 'zrunes.activationHeight must be an integer');
require_(typeof status.zrunes?.active === 'boolean', 'zrunes.active must be boolean');
for (const key of ['zerdinals', 'zrunes', 'collections']) {
  require_(typeof status.protocolVersions?.[key] === 'string' && status.protocolVersions[key].length > 0, `protocolVersions.${key} must be set`);
}

const ageDays = (Date.now() - Date.parse(status.verifiedAt)) / 86_400_000;
require_(ageDays < 45, `status was verified ${Math.floor(ageDays)} days ago; refresh it (npm run status:refresh)`);

// Screenshots show the product's navigation, so one taken from a different
// commit than the deployed one is wrong rather than merely dated. Every row
// of the manifest must name the deployed commit and an image that exists.
const manifestPath = join(root, 'public', 'screenshots', 'MANIFEST.md');
const manifest = readFileSync(manifestPath, 'utf8');
const rows = manifest
  .split('\n')
  .filter((line) => line.startsWith('| ') && line.includes('.png'))
  .map((line) => line.split('|').map((cell) => cell.trim()));

require_(rows.length > 0, 'the screenshot manifest lists no captures');
for (const row of rows) {
  const [, file, commit] = row;
  require_(
    existsSync(join(root, 'public', 'screenshots', file)),
    `the manifest lists ${file}, which does not exist`
  );
  require_(
    commit === status.product.deployedCommit,
    `${file} was captured at ${commit.slice(0, 12)} but the deployed product is ` +
      `${status.product.deployedCommit.slice(0, 12)}; recapture it and update the manifest`
  );
}

if (failures.length > 0) {
  console.error('status.json is not publishable:');
  for (const failure of failures) console.error('  - ' + failure);
  process.exit(1);
}
console.log('status.json is complete and fresh (verified ' + status.verifiedAt + ')');
