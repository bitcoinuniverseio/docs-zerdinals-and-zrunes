---
title: Repair candidate status
description: What the local reliability repairs establish, and what still needs verification.
---

The repair candidate assessed on September 5, 2026 remains **NO-GO: not ready for release**. These notes preserve earlier local checkpoints and add the exhaustive handoff checkpoint below. They do not report a deployment or certify current production behavior. Every required outcome remains open until its complete acceptance gate is met.

## What changed in the candidate

Database registration now shares one schema definition across runtime and migration replay. The earlier checkpoint registered 68 entities, retaining all 65 pre-existing entities and adding persisted identity challenges and two analytics projections. Later authority repairs extend this registry through forward migrations. Original migration identities remain unchanged. Local replay, rollback and application restart checks cover the recorded revisions. Readiness preserves false or unknown historical coverage; current tips cannot establish complete scanning. Network-specific connection defaults do not qualify signing or activate a protocol.

Payment attempts bind repeat requests to the authorized order and terms, with transactional state and recovery records. Creator reservations now use locked supply accounting, sealed revision binding and persistent order references. Caller-derived transaction hashes and premature mint success were removed. Actual paid delivery remains unqualified.

Shielded payment and creation no longer generate simulated receivers, scanner results, transactions, fees or successful mint blueprints. Existing records remain stored and form inputs remain editable. Missing receiver, scanner, spending and protocol authority is explicit. This refusal is a safety correction, not a completed payment or creation feature.

Marketplace quotes now read supported persisted item asks and bind their actual revisions, signatures, fees and expiry. They report insufficient liquidity or unavailable authority honestly. Quotes neither reserve liquidity nor establish settlement. Relay transport now verifies bound peer signatures and durably imports unchanged market envelopes through local admission. Imported transport is not proof that an order is executable.

Creator attestation signatures bind the target, media commitment and authorship purpose, with persisted single-use challenges and revalidation on reads. A verified signature proves who made the claim, not legal title, asset ownership or endorsement. Historical unsupported verification flags are demoted without deleting their records.

Market analytics now derive confirmed-trade projections from checked persistent events, with deduplication, compensation handling and resumable stream identifiers. Complete depth and authenticated trait floors remain unqualified. Names preserve separate registries, decode receiver bytes and identify historical records as unverified; local absence cannot establish availability. Reference registration prices are not payable quotes, and no replacement command signature or transaction is invented.

The experimental asset lab no longer simulates issuance, burn, finalization or signed snapshots. Operations refuse unavailable consensus, issuer and proof authority while retaining historical database rows. A feature flag cannot supply those capabilities.

## Local evidence and its limits

The numbers in this section and the post-verifier checkpoint are historical results for those revisions. They are not final totals for the exhaustive handoff checkpoint.

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

## Shielded UI follow-up

Local browser verification exposed and corrected a protocol manifest wire mismatch: the frontend now reads the backend record keyed by protocol ID and displays its existing wire fields. Protocol bytes and the manifest hash remain unchanged. Navigation controls use single links.

Private Portfolio also displayed a fixed balance and invented assets after arbitrary nonempty input. Those simulated results and the hub's false active-session claim have been removed. Both pages report private balance and holdings as unknown because qualified local viewing-key decoding, authenticated note retrieval and trial decryption are absent. Local reload checks and nine focused frontend tests passed. Real private viewing and shielded execution remain BLOCKED; no deployment or GO claim follows from these corrections.

## Content verifier follow-up

The content verifier now consumes the actual API digest fields and compares exact bytes with a known SHA-256 hash. Real local HTTP and UI checks verified the public test text `hello`, its SHA-256 digest and five-byte length. Malformed Base64 and memo hex are rejected; invalid memo structures produce typed errors. CID-shaped input no longer receives a false verification success: CID multihash and content-codec verification remain unavailable.

The broken memo sample was replaced with a 512-byte public example generated by the existing codec and decoded through the real local UI/API. This demonstrates the local example only, not authoritative protocol compatibility or an on-chain asset. Edited input clears previous results. The release remains NO-GO.

## Post-verifier regression checkpoint

The accumulated local candidate passed the full backend suite: 922 tests across 118 suites with the isolated MySQL databases enabled (166.385 seconds). The full frontend suite passed 623 tests across 73 files (32.15 seconds). Verifier OpenAPI contracts now describe actual 201 responses, request limits and exact digest fields; conformance passed eight tests and all 729 local references resolved. Latest frontend bundle sizes are 141.5/150 kB initial JavaScript, 395.2/420 kB total JavaScript and 39.3/40 kB CSS. Public documentation checks and focused private Markdown validation passed.

These results supersede the earlier 918-test backend checkpoint. They establish local regressions and the described bounded browser/HTTP checks only. Paid delivery, qualified private viewing and protocol authority, full UI acceptance and integration without prohibited CI remain unresolved. Release decision remains NO-GO.

## Exhaustive handoff checkpoint

The current handoff uses **F11 for relay authentication, F12 for creator attestations, F16 for experimental ZSA operations, and F17 for private minting**. Older notes reversed these pairs. Earlier B labels describe historical blocker categories and are distinct from the current handoff's dependency identifiers; matching numbers do not make them the same requirement.

The full supplied acceptance register is retained, including unresolved inventory gaps. Route and source inventories help locate work; they do not establish that every control, wallet, protocol, theme or recovery path has passed. New child cases remain required where the browser or source reveals another meaningful operation.

| Area | Current candidate correction | Acceptance still required |
| --- | --- | --- |
| Storefront authority | Signed owner reads and changes, explicit draft/publish/archive controls, expiring DNS control evidence and exact embed origins. Catalogs use real listings; purchase attribution binds the authorized invoice and counts confirmed settlement evidence separately from page telemetry. | Supported-wallet approval, real purchase and delivery, external domain operation and complete recovery. A domain proof does not provision hosting, and fee settings do not prove a payout. |
| Notifications | Signed recipient access and mutations, separate fanout identities, persistent source checkpoints and push retries. Wake-ups contain no private content; content requires authorized inbox access. | Live provider/browser delivery and native source-event readback. Provider acceptance is not displayed-notification evidence. |
| Agent operations | Persistent signed proposals bind principal, network, origin, intent and expiry. Qualified reads dispatch their actual operation and replay the saved receipt. No transaction ID is invented. | Actual authority for each offered operation. Fee calculations and historical name records do not establish payment, ownership or transaction execution. |
| Payment scope and privacy | Nested attempt routes enforce their parent order as well as its capability. Public portfolio, NFPT and zone reads enforce public visibility. | Real payment recovery and authorized private viewing through the intended wallet and scanner. Recorded private fixtures establish isolation checks only. |
| Simulation and portfolio tools | Byte inspection reports execution as unknown; it does not infer input values, paid fees or consensus validity. Invented portfolio outputs, spend plans and accounting exports have been removed. | Authoritative transaction simulation, wallet-controlled output management and actual ledger-backed accounting. Editable controls and visible unavailable states preserve the intended work. |
| Collective voting and signing | Voting and PCZT signature submission refuse unavailable authority before state changes. Their API contracts report the refusal without an unreachable success response. | Verified member approval, proposal/session binding and real dispatch. Other collective mutations and the complete governance journey remain unresolved. |

Local browser checks also exposed narrow-layout issues in creator, developer and portfolio pages; the candidate includes focused layout corrections. Those checks do not close all controls, connected-wallet states or the complete responsive and theme matrix. Network identity now checks actual chain identity and checkpoint evidence; a port, chain label or synchronized tip cannot qualify an unsupported environment.

The application acceptance report is the source of final test totals and the source/runtime matrix. That final run is not yet closed in this documentation checkpoint; earlier totals must not be presented as current final results. Full native acceptance remains **NO-GO**, including actual payment, signing, confirmation, delivered assets and persisted consumer readback on supported networks. Protected-branch integration remains blocked while required visual CI would conflict with the current local-only validation restriction. No push, PR, merge, CI run or deployment is claimed.
