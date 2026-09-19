# Research and specification register

Accessed 2026-09-19T22:44:46.072Z. These source pins are research/source identities, not deployed runtime versions.

## S01 | First-party protocol specification

https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/tree/48cacb7b752a3482f3722dacebd25c27e9e4638f

Files: src/content/docs/protocols/zkmap.md



Requirements: Exact name grammar; eligibility/order; ownership and terminal states; occupancy, geometry/art separation; product operation contracts.

Implementation: Preserve zkmap-v1. The documented claim projection is authoritative where this page differs.

## S02 | First-party reference implementation

https://github.com/bitcoinuniverseio/index-zcash-metaprotocols/tree/4d719f4da98c92a8a04785a309f28a14451df958

Files: src/projections/zkmap.mjs, src/projections/zerdinals.mjs, src/api/zkmap.mjs, src/mempool/zkmap.mjs, src/mempool/candidates.mjs, src/chain/protocol-qualification.mjs, migrations/0018-zkmap.sql, migrations/0019-zkmap-mempool-state.sql



Requirements: Actual parser, SQL state, qualification, read and rollback behavior.

Implementation: Reuse implementation; D01/D02 are verified source defects, not changes to claim semantics.

## S03 | First-party normative Zerdinals specification

https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/tree/bd3bede4a2384f5b0780c41420e23eb07d09a61b

Files: docs/protocol/ZERDINALS-V1.md



Requirements: Commit/reveal commitment, complete content, carrying outputs, transfer, terminal states, network isolation and acceptance gates.

Implementation: Verified historical specification retrieved through GitHub. Current product builders must follow actual active network rules, not treat broad V6 language as activation proof.

## S04 | External normative consensus and node reference

https://github.com/zcash/zips/tree/0fae783d424039a09759a69ff993317ded72b97d

Files: 

https://zips.z.cash/zip-0225
https://zips.z.cash/zip-0244
https://zips.z.cash/zip-0317
https://zips.z.cash/zip-0257
https://zebra.zfnd.org/

Requirements: V5 transaction format/identity, conventional fee, deployment/network upgrade and native node behavior.

Implementation: Node-validated chain is authority; ZIP244 transaction identifiers are not SHA256d of raw V5 bytes. No new transaction/signing implementation is required in this read-only indexer boundary.

## S05 | External reference test vectors, metadata pin

https://github.com/zcash/zcash-test-vectors/tree/78321beacb0e0477e33cd002b56585a107c2708c

Files: zcash_test_vectors/zip_0244.py



Requirements: Independent transaction-identity reference vectors if transaction code changes.

Implementation: Repository metadata pinned; vector body was not reviewed in this preparation. Verify exact path/vector generation before changing transaction code; no claim of differential test execution.

## S06 | Official database documentation, version 8.4



Files: 

https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html
https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html

Requirements: REPEATABLE READ consistent snapshots; MySQL DDL implicit commits.

Implementation: Read checkpoints and rows in one owned snapshot; migration rollback is not transactional DDL undo.

## S07 | Official driver reference plus installed lockfile

https://github.com/sidorares/node-mysql2/tree/5220199ab9e51a5d72985f57f7d74ece87fb787c

Files: 

https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool

Requirements: Connection pool ownership and release lifecycle.

Implementation: Handle late pool acquisition after deadline; preserve installed mysql2 3.24.2 and lockfile integrity unless separately reviewed.

## S08 | First-party operator documentation and code

https://github.com/bitcoinuniverseio/index-zcash-metaprotocols/tree/4d719f4da98c92a8a04785a309f28a14451df958

Files: ops/DEPLOYMENT.md, ops/testnet/README.md, src/main.mjs, src/config.mjs, src/chain/protocol-qualification.mjs



Requirements: Single writer, read-only candidate, digest-qualified replay, network configuration and safe rollout.

Implementation: Existing production identity remains unresolved due denied SSH. Operational instructions are not deployment receipts.

## S09 | Current application contracts and existing integrations

https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/tree/3be4a2ffd2a41ee93f393af003487e49a1682622

Files: backend/src/zcash/indexer.client.ts, backend/src/zkmap/zkmap-claims.service.ts, backend/src/zkmap/zkmap.controller.ts, backend/src/zkmap/zkmap.service.ts, backend/src/readiness/operation-readiness.ts, frontend/src/api/zkmap.ts, docs/api/openapi.yaml, scripts/e2e-zkmap-testnet.mjs



Requirements: Product reads, four mint rails, reconciliation, market evidence, readiness, consumer schemas and Testnet acceptance.

Implementation: New service must wire into the actual client/readiness path while generic indexer calls and existing wallet/payment/market safeguards remain intact.

## Conflicts and limits

The developer runbook incorrectly requires equal Testnet/Mainnet parameters digests and permits two-block indexer lag. Actual parameters include network and safe coverage requires reaching verified tip; ZKIDX-09 addresses both. Product V6/Ironwood language does not establish activation. Confirm active node branch and official deployment specification before changing carriers. ZkMap is not a shielded protocol and is not a committed state-root domain. No independent vector, wallet, database or public Testnet acceptance is claimed. No competitor research was used.
