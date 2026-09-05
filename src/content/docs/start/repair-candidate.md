---
title: Repair candidate status
description: What the local reliability repairs establish, and what still needs verification.
---

The repair candidate assessed on September 5, 2026 remains **NO-GO: not ready for release**. These notes cover two phases of local development corrections. They do not report a deployment or certify current production behavior. Every finding F01-F17 remains BLOCKED until its complete acceptance gate is met.

## What changed in the candidate

Database registration now shares one schema definition across runtime and migration replay. The registry includes 68 entities, retaining all 65 pre-existing entities and adding persisted identity challenges and two analytics projections. Original migration identities remain unchanged; forward corrections supply missing schema. Local replay, rollback and application restart checks pass. Readiness preserves false or unknown historical coverage; current tips cannot establish complete scanning. Network-specific connection defaults do not qualify signing or activate a protocol.

Payment attempts bind repeat requests to the authorized order and terms, with transactional state and recovery records. Creator reservations now use locked supply accounting, sealed revision binding and persistent order references. Caller-derived transaction hashes and premature mint success were removed. Actual paid delivery remains unqualified.

Shielded payment and creation no longer generate simulated receivers, scanner results, transactions, fees or successful mint blueprints. Existing records remain stored and form inputs remain editable. Missing receiver, scanner, spending and protocol authority is explicit. This refusal is a safety correction, not a completed payment or creation feature.

Marketplace quotes now read supported persisted item asks and bind their actual revisions, signatures, fees and expiry. They report insufficient liquidity or unavailable authority honestly. Quotes neither reserve liquidity nor establish settlement. Relay transport now verifies bound peer signatures and durably imports unchanged market envelopes through local admission. Imported transport is not proof that an order is executable.

Creator attestation signatures bind the target, media commitment and authorship purpose, with persisted single-use challenges and revalidation on reads. A verified signature proves who made the claim, not legal title, asset ownership or endorsement. Historical unsupported verification flags are demoted without deleting their records.

Market analytics now derive confirmed-trade projections from checked persistent events, with deduplication, compensation handling and resumable stream identifiers. Complete depth and authenticated trait floors remain unqualified. Names preserve separate registries, decode receiver bytes and identify historical records as unverified; local absence cannot establish availability. Reference registration prices are not payable quotes, and no replacement command signature or transaction is invented.

The experimental asset lab no longer simulates issuance, burn, finalization or signed snapshots. Operations refuse unavailable consensus, issuer and proof authority while retaining historical database rows. A feature flag cannot supply those capabilities.

## Local evidence and its limits

The reported groups below overlap and must not be summed. Test signatures, database persistence and HTTP contracts are useful evidence for these corrections; they do not establish funded chain execution.

| Area | Reported local evidence |
| --- | --- |
| Creator contracts and reservations | 21 real HTTP/frontend-schema checks and ten real-database tests; chain height and readiness are explicit test doubles. |
| Shielded payment boundary | 36 backend and five frontend tests. |
| Marketplace quotes | 13 real-database/signature tests and four frontend tests; chain and revalidation inputs are mocked. |
| Authorship attestations | 23 real-database checks with test-key signatures. |
| Relay import | Seven tests including real database persistence, signatures and restart; chain/indexer inputs are test doubles. |
| Market analytics | 44 focused tests, including six real-database/application HTTP and restart tests using recorded receipts and node mocks. |
| Names | 30 backend and nine frontend tests; decoding fixtures are not registry authority. |
| Experimental asset lab | Six backend and three frontend tests. |

The latest local frontend build no longer reports the stale route chunk/title warnings. Final local validation passed: 918 backend tests across 118 suites and 623 frontend tests across 73 files; both application builds passed. Frontend bundle budgets passed at 141.5/150 initial JavaScript, 395.8/420 total JavaScript and 39.3/40 CSS (reported size/limit). The 21 HTTP/frontend Valibot checks and 23 MySQL attestation checks were rechecked against fresh compiled sources. SDK checks passed 24 tests; OpenAPI checks passed eight tests and validated 728 references.

Additional local browser checks covered the ZSA unavailable state and draft reload at 390px, plus names unknown availability, non-payable reference pricing, draft reload and dark theme at 768px. Defaults were restored afterward. These are bounded UI states, not actual payment, signing, delivery or full responsive and recovery acceptance.

## What remains unverified

Complete creator minting, shielded payments and creation, marketplace execution and history, registry proofs, and the experimental asset lab still require their actual authorization, transaction and persistence evidence. Complete user journeys, responsive layouts, supported themes, wallet rejection and reload/recovery states have not been established. No real transaction, authoritative spend checkpoint or delivered-asset evidence is claimed by this candidate.

No release-ready or end-to-end completion claim is made. Dated information on [Current status](../status) remains historical evidence until independently refreshed; it is not qualification for this candidate.
