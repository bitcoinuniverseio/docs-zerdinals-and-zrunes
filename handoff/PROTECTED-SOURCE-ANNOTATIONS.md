# Protected source annotation exception

The runtime implementationDigest hashes every file, not only executable statements, in src/parsers, src/projections, src/zrc20, src/zrc721, src/zrunes, src/chain, src/state-root and rust/zrunes-codec/src, plus package.json and protocol-compatibility.json. Even an adjacent Markdown file in those directories would change qualification.

No protected file was edited during preparation. The owning integration points src/main.mjs and src/migrations.mjs contain actual ZKIDX-01/ZKIDX-04 instructions; the API and mempool sources contain the other local changes. The baseline and prepared implementation digests are equal: d53029728b8eb2746fbb08b16a9dc45df935414038799dff880b35c5231d94db.

## Exact protected targets and implementation instructions

Coverage: P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, R01, R02, R03, R04, R05, I06. Functional status: NOT TESTED.
Sources: S01, S02, S03, S08 in handoff/RESEARCH-REGISTER.md.
Prerequisites: ZKIDX-01.
Verified baseline: Claims, ownership joins, migrations 0018/0019 and rewind wiring exist. Projection and chain file bytes are included in implementationDigest; even comments or adjacent files inside those directories would change runtime identity.
1. Use src/projections/zkmap.mjs parseZkMapName and decideZkMapClaim unchanged as the zkmap-v1 authority: exact ASCII/MIME/family, height 0..2147483647, target below completion and first eligible completion in chain order. Do not reinterpret future claims later.
2. Keep recordZkMapClaim called only after verified Zerdinals content completion, on the scanner transaction connection. Advance claim/projection/chain checkpoints atomically. Ownership remains a join to the winning inscription output, including permanent burned/shielded occupancy.
3. Retain completion-height rollback in src/chain/revert.mjs and revertZkMapToHeight. Rewind ownership, journal, projection and replay segments together; replay the replacement chain rather than promote a surviving loser or copy owners. Deep reorg must latch unsafe writes.
4. Keep migrations 0018/0019 additive and idempotent through runMigrations. DDL is not transactionally rolled back by MySQL; rehearse against an isolated staging database and retain pre-migration backups and migration checksums. Never mix network data in singleton checkpoint tables.
5. For a changed package/projection digest perform a complete floor-1 replay under the final artifact and network-specific parameters. Read-only candidate and writer must agree on source identity and checkpoint. Never edit replay qualification rows, raise the floor or substitute a mainnet parameters digest for Testnet.
6. Preparation exception: protected targets are documented in handoff/PROTECTED-SOURCE-ANNOTATIONS.md and at startService/runMigrations, not edited. During implementation, change protected files only when required, then regenerate targeted regression and replay evidence.
Tests: node --test --test-concurrency=1 test/zkmap-projection.test.mjs test/zkmap-reorg-mysql.test.mjs test/protocol-qualification-mysql.test.mjs test/migrations.test.mjs ; Real MySQL fixtures must execute, not skip; test duplicate replay, restart, ancestor rollback/replacement and burned/shielded winner ownership.
Acceptance: One winner per network/height, deterministic clean-replay equivalence after reorg, exact checkpoint/hash agreement, genesis support, and no cross-network or forged qualification. MySQL and public Testnet evidence are separately recorded.
Rollback: Retain the old qualified database and artifact. Roll back routing/artifact together; do not drop claim tables, lower provenance requirements or reuse qualification from a different implementation.

Targets: src/projections/zkmap.mjs::parseZkMapName, decideZkMapClaim, recordZkMapClaim, advanceZkMapCheckpoint, revertZkMapToHeight; src/projections/zerdinals.mjs::completion/ownership integration; src/chain/scanner.mjs::apply batch and checkpoint; src/chain/revert.mjs::rewind; src/chain/protocol-qualification.mjs::implementationDigest, parametersDigest, recordReplaySegment, protocolQualificationComplete.

If implementation requires protected edits, they are allowed in that later phase, with new final-source qualification and regression evidence. This exception is not permission to weaken, exclude files from, or forge the digest. Keep SQL migrations unchanged in preparation; annotate the owning runMigrations integration instead.
