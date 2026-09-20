# Gated integration, release and rollback

## Preparation restrictions

No remote branch push, PR merge, migration, deployment, production fault injection or funds movement occurred in this preparation. The generated prompt authorizes the implementation phase only after its gates.

## Integration sequence

Open the exact prepared worktrees and revisions in PREPARED-STATE.json. Compare only targeted drift against evidence/baseline.json, late-origin-drift.json and related PR metadata. Preserve the original ownership-UX commit and concurrent dirty files. Core is a pinned read-only reference. PR278 changes private-content encryption custody documentation; it is not a marketplace deployment relocation. Read its actual status/diff before retaining or integrating it.

Implement all work packages with one integration owner and non-overlapping workstreams. Keep old API response contracts during rollout. Run locked builds/tests on the approved runner and real Zcash Testnet journeys. Prevent automatic production deployment before acceptance.

## Release after functional GO

1. Record every accepted repository commit and immutable build artifact, dependency versions, checksums, schema version and evidence ledger. Any meaningful code/config change requires targeted retest.
2. Validate Mainnet network/genesis, consensus branch/transaction parameters, endpoints, indexer history, signer/registry authorities, anchor chain/code, credential availability and permission policies offline or with controlled non-spending checks. Testnet state, wallets, faucets and mocks must not enter production.
3. Use the established authorized process in app ops/DEPLOYMENT.md and the current owned infrastructure runbooks. Capture current service revisions and backups before changes; do not infer backend/indexer identity from /.release. No guessed host, deployment command or credential is provided by this audit.
4. Deploy additive indexer read/schema and native authority prerequisites before compatible backend migration/catalog/worker/API changes, then frontend and documentation. Keep accepted-order processing/recovery alive throughout.
5. Once all functional gates pass, merge/push all reviewed legitimate release work across affected repositories and deploy the accepted artifacts through that process. Expose the complete required public navigation/routes/APIs without launch-blocking flags; retain legitimate authorization.
6. Record actual deployment receipts, service/artifact revisions, correct Mainnet configuration, service health and public feature exposure. A build, merged PR, private preview or plan is not release. No mainnet functional transaction or mainnet test funds are required.

## Rollback

Stop new unsafe admissions first. Restore prior frontend/API consumers and compatible service artifacts/configuration in reverse dependency order. Retain accepted transaction workers, operation IDs, journals, reservations, name credit recovery and authoritative chain data. Do not drop additive tables containing accepted operations, reset a database, delete an encryption transit key or substitute Testnet configuration. Diagnose actual failure and retest affected flows before a renewed rollout.

## Final report

Only report RELEASED: PUBLIC MAINNET after both functional GO and completed public release. Include accepted test network, deployed revisions, actual public URLs and receipts. State Mainnet functional tests: Not performed, as instructed. Genuine missing access/authority or public failures remain blockers; omission of Mainnet functional testing does not.
