# Commands and execution prerequisites

## Verified during preparation

From D:\universe\index-zkmap\index-zkmap:

```powershell
node --version
npm --version
npm ci --ignore-scripts --no-audit --no-fund
node --test --test-concurrency=1 test/zkmap-projection.test.mjs test/zkmap-routes.test.mjs test/zkmap-geometry.test.mjs test/zkmap-market-consistency.test.mjs test/mempool-candidates.test.mjs test/protocol-qualification.test.mjs test/coverage-freshness.test.mjs
node --test --test-concurrency=1
node handoff/evidence/reproduce-source-defects.mjs .
```

The reproduction command asserts the current D01/D02 failures; it is evidence, not a regression expected to stay green after fixes. New regression tests must assert repaired behavior. npm ci was run with inherited database-related environment variables removed. The full Node suite explicitly skips 30 cases; inspect the preserved log for exact prerequisites.

## Source-verified scripts, not executed in preparation

Indexer package scripts: npm run verify; npm run migrate; npm start. Do not run migrate/start against existing production or with inherited defaults. The seeded npm start still starts the shared scanner by default, not the future dedicated read-only entry point. Set a protected, isolated test configuration and explicit SCAN_ENABLED=false for a read instance. MySQL tests use ZMETA_TEST_MYSQL_* variables in existing test sources; confirm their disposable database naming before execution and use no production credentials.

Backend package: npm run lint; npm test -- --runInBand; npm run build. Frontend: npm test; npm run build:check; npm run test:visual. Existing dependency packages must be built according to the product workspace instructions before these commands. These builds and browser tests were not run in this preparation.

Native Testnet campaigns: node scripts/e2e-zkmap-testnet.mjs and node scripts/e2e-service-invoice-testnet.mjs from the product root. Inspect the actual source for argument/environment requirements and release-authorization inputs before execution; no successful invocation is claimed. Existing scripts/new-testnet-key.mjs and scripts/testnet-fund.mjs are candidate setup tools, whose argument contract must be read before use. Store wallet secrets outside Git and the handoff.

Deployment preflight: node scripts/preflight-candidate.mjs with the exact currently documented arguments from ops/DEPLOYMENT.md. Do not execute guessed flags. It does not replace explicit ZkMap route and user-flow acceptance. Read-only SSH invocation used the existing configured universe-indexers alias and was denied publickey. Obtain authorized credentials or deployment receipts, then inspect the actual serving artifact/forwarding.

Documentation repositories without package.json are content repositories; do not invent npm build commands for them. Use their documented publishing owner/CI and check changed Markdown. Product public docs have their own build instructions.
