# Names market implementation work packages

Order: NM-01 -> NM-02 -> NM-03 -> NM-04/NM-05 -> NM-06 -> NM-07 -> NM-08. Diagnostic changes alone do not repair source readiness.

## NM-02 / NM-A01: indexer / src/main.mjs

Symbol: `const scanner = createScanner({ pool, rpc, config, log: createLogger('scanner') })`. Coverage: N-INGEST,N-READ,N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY. Findings: D01,D03. Preparation: ANNOTATED. Functional status: FAIL.

Current: The production 90d7238 release and this baseline construct createScanner without orchardNoteReader. Candidate cfa1ec8 supplies an HTTP client, not a decryption service; its first read receives no genesisHash.

Sources: S-APP,S-IDX,S-SCANNER. Prerequisites: NM-01.

1. Reuse only reviewed reader/config/wiring hunks from indexer commit cfa1ec85099d61f8c9ec39aef1bbf95bddb85793; do not merge the unrelated collection changes wholesale. Create PROPOSED NEW src/chain/orchard-note-reader.mjs and rust/name-registry-reader/{Cargo.toml,src/main.rs}, with pinned lockfiles and a maintained real decryption worker using the NM-01-qualified pool/version.
2. Construct the adapter from protected per-network endpoint configuration. Qualify network, owned-node genesis, registry identity, viewing-key fingerprint, source birthday and implementation digest before allowing registry progress. The worker must trial-decrypt actual chain bytes and recompute the commitment, not bless a supplied memo by matching a public cmx.
3. Pass the qualified adapter into this existing scanner; pass ctx.genesisHash/blockHash/network onward in applyNameRegistries. Keep one chain writer. Reader failures must halt affected registry completeness, not turn into an empty successful read; NM-03 specifies isolated catch-up before enabling reads.

Tests: Existing: node --test test/name-registries-decoders.test.mjs test/name-registries-routes.test.mjs. PROPOSED NEW test/name-registry-reader.test.mjs and test/name-registry-startup.test.mjs must exercise the real factory-to-scanner call, not pre-qualify a mock manually; public Zcash Testnet decryption gate in ACCEPTANCE.md.

Acceptance: Correct source yields authenticated notes; absent/wrong-network/wrong-genesis reader stays unavailable; first real read succeeds with qualified genesis; no other projection loses progress; no keys in logs.

Rollback/security: Deploy worker and additive provenance storage first; leave capabilities closed until real Testnet replay passes. Do not restart or migrate production during this preparation.

## NM-02 / NM-A02: indexer / src/config.mjs

Symbol: `export function loadConfig(env = process.env) {`. Coverage: N-CONFIG,N-INGEST. Findings: D01,D03. Preparation: ANNOTATED. Functional status: FAIL.

Current: The baseline has no configured note-reader construction. Candidate cfa1ec8 adds an unchecked URL and optional token without registry-specific qualification.

Sources: S-SCANNER,S-IDX. Prerequisites: NM-01.

1. Add validated reader endpoint configuration, timeout/response bounds, registry identity and implementation pins. Accept HTTPS with authenticated service identity or a protected same-host Unix/loopback boundary; reject public cleartext/token forwarding and unexpected redirects.
2. Resolve genesis/network from the owned node, not solely an environment label. Bind each registry to its separately approved viewing capability, pool, birthday and parameter set from NM-01. Keep Mainnet and Testnet DBs, caches, endpoint credentials and capabilities disjoint.
3. Do not log bearer tokens, UFVK/UIVK values or spending material; emit only nonsecret fingerprints and reason codes. An optional missing reader is explicit unavailable, never an empty authoritative registry.

Tests: PROPOSED NEW test/name-registry-reader-config.test.mjs; assert missing config, wrong chain, malformed URL, redirects, timeout and credential redaction. Existing node --test test/name-registries-routes.test.mjs remains a regression gate.

Acceptance: No default points Testnet at Mainnet or silently enables a reader. Readiness reports qualified per-registry provenance.

Rollback/security: Configuration remains unchanged in prep; future deployment stores secrets only through the existing protected process, and can disable new Names admission without stopping recovery.

## NM-03 / NM-A03: indexer / src/chain/scanner.mjs

Symbol: `async function processBatch(blocks, startHeight) {`. Coverage: N-INGEST,N-REPLAY,N-REORG,N-RECOVER. Findings: D01,D04. Preparation: ANNOTATED. Functional status: FAIL.

Current: processBatch already creates ctx.genesisHash, but registry reader calls drop it. A single readerPresent boolean advances both registries regardless of independently authenticated coverage.

Sources: S-IDX,S-SCANNER. Prerequisites: NM-01,NM-02.

1. Propagate existing state.genesisHash plus block.hash/network to the reader request and verify the returned binding before applying any event. Collect per-registry scanned ranges even for zero-match blocks and validate continuity across the entire batch.
2. Replace readerPresent with per-registry qualified coverage receipts agreed with advanceNameRegistryCheckpoints. Commit events, source range and registry checkpoint atomically; a malformed answer cannot advance that registry. Use bounded prefetch outside long SQL locks with chain-hash rechecks at commit.
3. For historical Names catch-up, use PROPOSED NEW scripts/backfill-name-registries.mjs against isolated/shadow registry tables and a journaled cursor, then reconcile at a common node hash before a coordinated switch. Do not rewind or edit the live shared chain checkpoint to manufacture history; preserve Zerdinals, ZRunes, ZRC and zkMap writers.

Tests: Existing node --test test/name-registries-decoders.test.mjs test/name-registries-routes.test.mjs; PROPOSED NEW test/name-registry-replay.test.mjs with real MySQL transactions, restarts, duplicate batches, one missing block, reader failure and controlled reorg. Run existing shared scanner/revert and protocol suites after implementation.

Acceptance: No duplicate event or stale root; one registry's missing key never qualifies another; gap and late reader remain incomplete; replay resumes without touching unrelated protocol state.

Rollback/security: Backup registry journals/checkpoints; use additive shadow tables plus fenced switch and retain prior generation. No destructive production rewind. Fault injection is local only.

## NM-02 / NM-A04: indexer / src/projections/name-registries/index.mjs

Symbol: `export async function applyNameRegistries(conn, ctx, tx, txIndex) {`. Coverage: N-INGEST,N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY,M-REG. Findings: D01,D03,D08. Preparation: ANNOTATED. Functional status: BLOCKED.

Current: Only tx.orchard.actions are inspected. reader.read is called without genesisHash; non-array output and malformed rows are silently skipped. Current upstream reader uses IronwoodDomain, so compatibility is not established by adding an HTTP URL.

Sources: S-SCANNER,S-ZNSVERIFY,S-IDX. Prerequisites: NM-01.

1. Use the version/pool mapping approved in NM-01 to choose actual action bytes; include pool identity in all provenance and uniqueness keys if indexes overlap between pools. Do not label an Ironwood note as an Orchard note or change historical decoding silently.
2. Pass {blockHeight,blockHash,txIndex,network,genesisHash,registryId} through the reader contract. Accept plaintext/value only from actual authenticated decryption against those transaction bytes; for zcashme require the correct pinned commitment-kernel result and action binding.
3. Fail registry coverage on malformed/partial reader output, unexpected duplicate actions or identity mismatch instead of returning touched. Only a structurally valid fully-scanned response with zero matching notes is an empty success. Pass ctx.network to the zNS parser after NM-01 parity work.

Tests: PROPOSED NEW test/name-registry-reader.test.mjs and Rust reader vectors; test mismatched cmx, forged plaintext with a matching public cmx, wrong pool, malformed note, duplicate action, missing genesis and legitimate zero-match response. Existing decoder/routes tests must remain passing.

Acceptance: Public ciphertext identifiers alone never authenticate memo/value; no malformed reader output produces a complete empty projection.

Rollback/security: Keep public reads unavailable until reader and replay evidence exist; retain the old generation journal for forensic comparison, never overwrite it with a differently interpreted pool.

## NM-03 / NM-A05: indexer / src/projections/name-registries/index.mjs

Symbol: `export async function advanceNameRegistryCheckpoints(conn, { network, startHeight, endHeight, endHash, readerPresent, touched }) {`. Coverage: N-CHECKPOINT,N-REPLAY,N-EMPTY,M-EMPTY. Findings: D04. Preparation: ANNOTATED. Functional status: FAIL.

Current: readerPresent grants a source to both registries. source_from_height starts at plug-in time; both registry floors are hardcoded to NU5, whereas published zcashnames deployment metadata names birthday 3438108.

Sources: S-IDX,S-REGISTRAR,S-SCANNER. Prerequisites: NM-01,NM-02.

1. Replace the boolean input with per-registry receipts covering every block [startHeight,endHeight], bound to genesis, key fingerprint, pool/version and stable source generation. Reject gaps, incorrect start/end hashes and source identity changes.
2. Store provenance and coverage ranges in PROPOSED NEW additive migrations/0024-name-reader-provenance.sql (choose the next unused migration number at implementation). Resolve each registry's validated inception height from NM-01, not a blanket NU5 rule or an arbitrary new tip.
3. Advance the qualified checkpoint only with its events in the same transaction. Compute roots from complete state at an anchor-compatible checkpoint; expose observed tip separately from the last verified/published snapshot. Verify empty coverage as rigorously as nonempty coverage.

Tests: PROPOSED NEW test/name-registry-replay.test.mjs and MySQL migration tests; assert no-key, one-key-for-two-registries, late source, discontinuity, identity change and zero-match complete history independently.

Acceptance: historicalScanComplete can become true from the verified registry inception, but never by setting source_from_height manually. No migration or rollback mixes networks.

Rollback/security: Additive metadata only; retain older rows and generation mapping until reconciliation passes. Roll back application readers before dropping any future metadata; no destructive down migration on evidence.

## NM-01 / NM-A06: indexer / src/projections/name-registries/zcashnames.mjs

Symbol: `export function parseZcashNamesCommand(`. Coverage: N-NETWORK,N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY. Findings: D05,D08. Preparation: ANNOTATED. Functional status: BLOCKED.

Current: This indexer baseline parses the Mainnet zNS:1 domain only; the application already requires mainnet zNS/testnet tzNS. Unmerged 6f08cca contains relevant decoder parity work. Upstream scanner is Ironwood-specific.

Sources: S-PHP,S-PROVER,S-SCANNER,S-ZIP258,S-ZIP229,S-ZIP318,S-ZIP326. Prerequisites: none.

1. Review/reuse only the network-marker decoder changes at indexer commit 6f08cca and associated tests. Make network explicit and reject unknown networks; preserve existing Mainnet golden bytes and reject cross-domain signatures, especially CHG.
2. Pin the registrar command/prover version and deployed program key. Compare all six operation vectors with Protocol.php and zns-core, including exact integer payment, canonical nonce/price, block time plus tolerance, current-owner authorization and strict UA receiver/network validation.
3. Resolve NM-01 pool/activation compatibility from actual node chain info and the pinned Rust parser before feeding this decoder. Keep historical decode policy by height/version and reindex changed interpretations in an isolated generation; never change memo bytes after signing.
4. NU6.3 qualification: S-ZIP258 and S-ZIP229 are still labelled Draft in the 2026-09-21 capture. Owned-node branch/activation observations match their constants, but this is not blanket proof of every draft rule. Check actual v5/v6 bytes and pinned validator/library behavior; distinguish Orchard protocol receiver/key encoding from Orchard versus Ironwood pool/action identity. S-ZIP318/S-ZIP326 inform native-wallet compatibility; do not add unrelated automatic wallet migration or infer a working spend path from an address encoding.

Tests: node --test test/name-registries-decoders.test.mjs; application backend npm test -- --runInBand zcashnames-protocol.spec.ts zcashnames.adapter.spec.ts. Extend vectors for REG/UPD/CHG/LST/ULT/BUY on both networks and wrong prefixes; Rust/reference corpus parity is required, not yet executed.

Acceptance: Application-produced Testnet commands are accepted only on Testnet; Mainnet bytes remain identical; malformed or under/overpaid commands cannot mutate records.

Rollback/security: No Mainnet default changes. Before decoder deployment, snapshot journals and retain old interpretation generation; a failed replay blocks new admissions instead of rewriting state.

## NM-03 / NM-A07: indexer / src/api/name-registries.mjs

Symbol: `export async function nameRegistryRoute({ pool, rpc, config, registryId, route, normalized = null }) {`. Coverage: N-READ,N-EMPTY,N-PAGE,N-CHECKPOINT,N-ERROR. Findings: D04,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: The source-null 503 is correct and must stay. Listings read all records, silently stop at 10000, do not compare each witness root with the checkpoint as the single-record path does, and can expose a snapshot lacking proven complete registry coverage.

Sources: S-IDX,S-PROVER. Prerequisites: NM-01,NM-02.

1. Retain name-registry-unavailable-v1 reasons and never return [] as an outage workaround. Separate diagnostic observed checkpoint from a fresh complete, verified listing snapshot supplied by NM-03; reject unavailable/incomplete or mismatched snapshots with typed reasons.
2. Compare every listing witness root and declared checkpoint; keep empty-list success bound to the same qualified snapshot. Add PROPOSED NEW query-bound cursor contract with network,registry,snapshot hash and stable name ordering; require explicit hasMore/nextCursor and bounded limit instead of silently slicing 10000.
3. Cache one tree/proof index per immutable snapshot rather than rebuilding for every listing; retire it on reorg/root invalidation. Update validNameRegistryRequest, frontend/backend schemas and controller together; reject unknown/invalid cursors without silently restarting pages.

Tests: Existing node --test test/name-registries-routes.test.mjs; PROPOSED NEW test/name-registry-listings-pagination.test.mjs covering >10000 records, stable traversal, invalid cursor, snapshot transition, empty qualified snapshot, witness mismatch, missing reader, DB timeout and correct 404 unknown registry.

Acceptance: No names omitted without continuation; no mixed checkpoint page; empty result is authoritative only after complete verification. Existing non-Names APIs retain contracts.

Rollback/security: Version/additively extend listing envelopes and deploy provider before consumers; retain existing errors. Keep old snapshot generation until all consumers move; invalidate only Names caches.

## NM-04 / NM-A08: app / backend/src/name-registries/registry-sources.ts

Symbol: `private async get(registryId: string, path: string): Promise<unknown> {`. Coverage: N-ERROR,N-READ,N-RETRY. Findings: D02. Preparation: ANNOTATED. Functional status: FAIL.

Current: Live HTTP503 registry_source_unavailable is collapsed to generic INDEXER_UNAVAILABLE and exposes the internal loopback URL, producing the screenshot. The upstream is reachable; retry cannot provision the missing reader.

Sources: S-APP,S-IDX. Prerequisites: NM-01.

1. Parse non-200 name-registry-unavailable-v1 with bounded structural validation and expected registry/network checks. Map allowlisted reasons to stable public codes: NAME_REGISTRY_SOURCE_UNAVAILABLE, NAME_REGISTRY_HISTORY_INCOMPLETE, NAME_REGISTRY_CHECKPOINT_UNAVAILABLE and NAME_REGISTRY_DEPENDENCY_UNAVAILABLE; keep the upstream reason in structured diagnostics.
2. Keep transport timeout distinct from a valid 503, 404 unknown/missing projection, malformed JSON, HTML gateway error and wrong-network response. Do not trust arbitrary upstream whatNext text; redact URLs, tokens and raw response bodies from public errors; record a correlation ID and safe reason server-side.
3. Carry the typed error through NamesController and frontend ApiError without changing failure into empty data. State operator action for missing reader versus bounded user retry for transient lag; preserve existing status semantics and auth boundaries.

Tests: PROPOSED NEW backend/src/name-registries/registry-sources.spec.ts using real Axios adapter contract fixtures for 200/404/503/malformed/timeouts/network mismatch; npm --prefix frontend test -- names.test.ts NamesPages.test.tsx. Reproduce public-3/public-5 payloads from evidence as fixtures, not as functional acceptance.

Acceptance: A source-unavailable response remains HTTP503 and shows the specific safe cause; neither private baseURL nor secrets reach UI. Unknown errors stay unavailable.

Rollback/security: Error additions are additive; do not loosen proof gates or bypass the authority. Provider and consumer must share the pinned envelope before public enablement.

## NM-05 / NM-A09: app / backend/src/name-registries/registry-sources.ts

Symbol: `async listings(registryId: NameRegistryId) {`. Coverage: N-READ,N-EMPTY,N-PAGE. Findings: D06,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: IndexerNameRegistrySource.listings discards the upstream checkpoint envelope and returns records alone, so an empty response has no carried proof of coverage and the observer cannot validate one atomic page.

Sources: S-APP,S-IDX,S-PROVER. Prerequisites: NM-03,NM-04.

1. Introduce a typed RegistryListingsProjection carrying registry/network, qualified checkpoint, items and continuation metadata. Validate height/hash/root/provenance consistency, unique normalized IDs and integer-string prices; update NameRegistryIndexerSource, observer.listings and all typed test fakes together.
2. Verify the requested cursor/filter binding and that every item belongs to exactly this snapshot; do not silently coerce schema mismatches. Preserve a well-formed checkpoint even when items is empty so NM-05 can verify it before publishing empty state.
3. Keep the response bounded and include cancellation/deadline propagation; do not re-fetch one record per list item when the envelope already carries the evidence.

Tests: PROPOSED NEW registry-sources.spec.ts; extend registry-state.mysql.spec.ts and frontend/src/api/names.test.ts for empty invalid checkpoint, mixed roots, duplicate items, malformed prices and cursor mismatch.

Acceptance: A successful page always retains the evidence needed for verification; item count never substitutes for verified coverage.

Rollback/security: Deploy compatible provider envelope first; use additive types or explicit schema version and test old consumers. Never downgrade to unverified arrays on parser failure.

## NM-05 / NM-A10: app / backend/src/name-registries/registry-sources.ts

Symbol: `export class BscRootAnchorSource implements NameRootAnchorSource {`. Coverage: N-ANCHOR,N-CHECKPOINT,N-REORG,N-READ. Findings: D09. Preparation: ANNOTATED. Functional status: FAIL.

Current: isRootValid is queried, but current code does not qualify RPC chain ID, deployed code/program key/current anchor height or bounded historical-root freshness. Current docs publish anchor metadata; the old unpublished-address comment is obsolete. Production anchor configuration has not been verified.

Sources: S-ANCHOR,S-REGISTRAR,S-PROOFS. Prerequisites: NM-01,NM-03.

1. Read the deployed mainnet chain ID, contract code hash, programVkey, currentRoot/currentBlockHeight and accepted-root status using the protected existing configuration, and compare with S-REGISTRAR/S-ANCHOR pins. Mainnet documented BNB chain56/address is a verification input, not permission to hardcode or trust a random RPC.
2. Return a typed anchor observation including authority chain, contract, anchor block hash/height and registry coverage height; select a complete locally replayed snapshot at a legitimately anchored checkpoint. A newly computed tip root need not already be anchored; expose lag truthfully.
3. Recheck validity/freshness before relying on cached state or admitting mutations. Consume or poll RootInvalidated/rollback with bounded queries and invalidate affected Names caches; a once-true historical root may later be rejected. Never use MockZNSAnchor for real Testnet acceptance.

Tests: Extend registry-sources.spec.ts with wrong chain, empty code, wrong program key, valid historical-but-stale root, invalidated root, RPC failure and lagged anchor. Real approved Testnet anchor with cryptographic verification is a separate BLOCKED prerequisite until qualified.

Acceptance: A forged, wrong-network or invalidated anchor cannot qualify listings or buys. Local complete replay and anchor evidence must agree.

Rollback/security: Pause new payable admissions during unsafe authority changes while preserving submitted-operation recovery; keep prior contract/version metadata and do not cache true indefinitely.

## NM-05 / NM-A11: app / backend/src/name-registries/observer.service.ts

Symbol: `async listings(registryId: NameRegistryId): Promise<AuthoritativeLookup[]> {`. Coverage: N-READ,N-EMPTY,N-PAGE,N-PROOF. Findings: D06,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: The loop silently omits lookup.ok=false records and can return [] after every item failed verification. lookup may return a cached state at its stored height instead of using the incoming listing witness. This is a source-established false-empty/stale-listing defect, not yet a live exploitation test.

Sources: S-APP,S-IDX,S-PROOFS. Prerequisites: NM-03,NM-04.

1. Accept NM-A09's snapshot envelope and verify its network, owned-node block, coverage and anchor once, including on an empty page. Verify each carried item against that exact root/height/hash with verifyZcashNames/verifyZcashMe rather than fetching a different checkpoint per name.
2. On any proof/authority/schema failure, return a typed unavailable response for the page, never skip it into a normal success. If a future partial-results contract is deliberately added, mark partial explicitly and disallow actions; the chosen repair here is atomic all-or-error.
3. Persist verified page records and checkpoint fencing in one transaction. Reject cache entries from another root/hash/epoch even at equal height, preserve exact price strings, and return validated continuation metadata without N+1 lookups.

Tests: Extend backend/src/name-registries/registry-state.mysql.spec.ts; PROPOSED NEW observer-listings.spec.ts asserts one bad/all bad proof never becomes [], empty page still checks anchor, old cached price is rejected, race at equal height/root change, and snapshot-consistent pagination.

Acceptance: No fabricated empty market or stale payable price. Every displayed listing's price/owner/proof belongs to the verified page snapshot.

Rollback/security: Retain old verified rows for audit but label stale/non-actionable after epoch change. No workflow-bypassing DB edits; additive state only.

## NM-05 / NM-A12: app / backend/src/name-registries/observer.service.ts

Symbol: `async observeCheckpoint(`. Coverage: N-CHECKPOINT,N-REORG,N-RECOVER. Findings: D09. Preparation: ANNOTATED. Functional status: FAIL.

Current: observeCheckpoint rejects every lower height; this protects against stale feeds but has no qualified rollback path. Stored sourceKind tracks completeness but cached lookup does not recheck root invalidation on each admission.

Sources: S-ANCHOR,S-APP,S-IDX. Prerequisites: NM-03.

1. Keep ordinary monotonic/fenced updates, but add an explicit verified reorg recovery path using owned-node common ancestor and NM-03 journal generation. Distinguish anchor rollback from node reorg; neither justifies accepting an arbitrary lower upstream height.
2. Atomically increment observer epoch, mark affected cached records stale, reconcile pending operations and verify the new source root before republishing. Preserve network checks and conditional update fencing across replicas.
3. Require freshness and anchor-validity evidence in lookup/admission before trusting same-height cached state; key cache validity by network,registry,blockHash,root,epoch and observation age rather than height alone.

Tests: PROPOSED NEW observer-listings.spec.ts plus real MySQL controlled common-ancestor rollback, competing observer, repeated reorg, anchor invalidation and restart tests. Extend registry-state.mysql.spec.ts; no fault injection against production.

Acceptance: Legitimate reorg can recover without manual state overwrite; stale/malicious rollback remains rejected; old ownership or prices cannot settle new purchases.

Rollback/security: Back up journals and retain reconciliation history; fence in-flight workers before checkpoint generation switch. Never delete evidence to regain readiness.

## NM-05 / NM-A13: app / backend/src/name-registries/registry-state.entities.ts

Symbol: `export class NameRegistryCheckpointEntity {`. Coverage: N-CHECKPOINT,N-REORG,N-RECOVER,N-CONFIG. Findings: D04,D09. Preparation: ANNOTATED. Functional status: FAIL.

Current: Checkpoint identity is registryId with network in a non-key column; isolation currently depends on separate network databases. No persisted reader generation or complete anchor observation is represented here.

Sources: S-APP,S-IDX. Prerequisites: NM-03.

1. Retain separate per-network databases and add explicit reader generation, pool/protocol pin, source coverage, verified root/block and anchor observation fields through PROPOSED NEW backend/migrations/<next-unique-timestamp>-name-registry-provenance.ts. Do not edit already-applied migrations or repurpose existing rows across networks.
2. Wire atomic epoch-fenced observer/reorg reconciliation to the new provenance. Define unique event/operation evidence keys including network,registry,pool,txid,actionIndex so replay is idempotent and pool indexes cannot collide.
3. Backfill provenance only by authenticated replay/verification; old rows remain unqualified until checked. Keep operation/payment association and ledger records recoverable across restart and rollback.

Tests: Extend registry-state.mysql.spec.ts with migration on populated fixture DB, network mismatch, concurrent epoch write, rollback/replay and evidence uniqueness. Migration name is PROPOSED, confirm next unused timestamp before creating it.

Acceptance: No network contamination or default ready state from new nullable columns; existing data preserved and explicitly stale until revalidated.

Rollback/security: Additive expand/contract migration, snapshot before deployment; downgrade readers first and retain metadata/journal until rollback window closes.

## NM-06 / NM-A14: app / backend/src/name-registries/name-operations.service.ts

Symbol: `async prepare(`. Coverage: N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY,N-DUP,N-REFUND,N-RECOVER,M-REG. Findings: D10. Preparation: ANNOTATED. Functional status: FAIL.

Current: prepare stores an authorized command with paymentOrderId:null and state prepared; price/payable remains false and the native shielded settlement path is missing. A readable market alone will not make buy/list/delist operational.

Sources: S-APP,S-PHP,S-MARKET,S-ZIP302,S-ZIP317,S-ZIP321. Prerequisites: NM-01,NM-02,NM-03,NM-05.

1. Preserve creator challenge binding to request digest/principal and separately validate the registry owner signature. Add PROPOSED NEW name-settlement.service.ts to prepare a native registry transaction intent binding network,registry,operation ID, exact memo bytes, registrar shielded receiver, integer amount, fee and expiry; never substitute a platform deposit memo.
2. Use a genuinely supported user-wallet shielded send/approval path. Where server spending is required, integrate only an independently qualified isolated signer through the existing protected boundary; do not put spend keys in this API or label transparent signer health as readiness. Persist a stable intent/idempotency key before submission and reconcile broadcast ambiguity by evidence rather than resubmission.
3. Journal submitted/confirmed/indexed/registry-settled separately. Link authenticated tx/action evidence to this command, observed checkpoint and price; only authoritative readback can settle. Recheck listing nonce/price before approval, handle competing buyers and conflicts without duplicate charges.
4. For registrar custody, show seller/loser credit and withdrawal status exactly as the pinned registrar supports. Credits are not on-chain refunds; a missing authenticated credit/withdrawal contract is a targeted blocker. Recover pending operations on restart and preserve readback across reconnect.

Tests: Existing names.controller.spec.ts and shielded-payment.service.spec.ts; PROPOSED NEW backend/src/name-registries/name-settlement.mysql.spec.ts and frontend/tests-live/names-market-testnet.spec.ts. Separately execute each six-operation journey, wrong owner, rejected signature, insufficient funds, stale quote, duplicate submit, competing buys and restart/reorg recovery on qualified Zcash Testnet.

Acceptance: Actual UI-to-authority-to-chain-to-persisted-readback outcomes, no fabricated payment/settlement, no duplicate debit; seller/loser credit and withdrawal evidence accurate. Unit mocks never count as functional PASS.

Rollback/security: Enable per-operation capability only after gates; disable new admissions on incident while preserving pending intents and reconciliation. Mainnet transactions are not required for tests.

## NM-06 / NM-A15: app / backend/src/payment/shielded-payment.service.ts

Symbol: `getRailCapability(): ShieldedRailCapability {`. Coverage: N-PAY,N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY,N-RECOVER,M-REG. Findings: D10. Preparation: ANNOTATED. Functional status: FAIL.

Current: The rail deliberately always reports SHIELDED_AUTHORITY_UNAVAILABLE; flipping ready:true would hide missing key allocation, authenticated scanning, construction/signing/broadcast and fee estimation.

Sources: S-APP,S-ZIP302,S-ZIP317,S-ZIP321,S-MARKET. Prerequisites: NM-01,NM-02,NM-05.

1. Keep this unavailable guard until a real per-network capability provider has executable qualification evidence. Separate native registrar-send capability from the platform deposit/unshield rail so completing Names does not pretend an unrelated rail is ready.
2. Model discriminated qualified/unavailable capabilities backed by chain/genesis, approved worker/signer implementation, supported pool/receiver, source freshness and fee policy; qualify actual signing responsibility with explicit user approval, not API possession of spend keys.
3. Use exact ZIP-302 memo bytes and ZIP-321 encoding with decimal zatoshi arithmetic and NM-01 active fee rules. Authenticate note detection from the scanner; caller txid/amount and a healthy transparent signer cannot certify payment. Preserve existing unrelated shielded recovery behavior.

Tests: npm --prefix backend test -- --runInBand shielded-payment.service.spec.ts payment-status-shielded.spec.ts; extend for per-operation readiness, wrong network, rejected signatures, memo substitution and duplicated evidence. Native Names public Testnet flow in NM-06 is mandatory before a true capability.

Acceptance: No hardcoded readiness or loss of current fail-closed behavior; Names native send and platform rail expose different truthful capabilities.

Rollback/security: Disable new capability admission through the qualified provider on failure; never erase receiver/attempt records or stop recovery for already submitted transactions.

## NM-07 / NM-A16: app / frontend/src/api/names.ts

Symbol: `export async function getNameListings(`. Coverage: N-READ,N-EMPTY,N-PAGE,N-ERROR,N-NETWORK. Findings: D02,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: The frontend validates registry IDs but carries only nullable checkpointHeight/items. It cannot distinguish complete snapshot evidence, source readiness or pagination from an empty array alone.

Sources: S-APP,S-IDX. Prerequisites: NM-04,NM-05.

1. Extend ListingsSchema and getNameListings with NM-05's versioned snapshot/cursor envelope and strict integer-string prices; require network,registry,height,hash,root and verification metadata to agree with the active request and expected schema.
2. Preserve AbortSignal and propagate stable ApiError.code plus allowlisted reason/action metadata, without displaying raw upstream URLs or bodies. Reject mixed-registry/network pages and cursor mismatch.
3. Keep existing consumer contracts compatible during coordinated deployment; update NamesMarketPage, NameEvidence and tests together. No unchecked fallback to [] or blind valibot coercion on schema failure.

Tests: npm --prefix frontend test -- names.test.ts NamesPages.test.tsx; extend API fixtures for 503 source unavailable, bad envelope, wrong network, mixed checkpoint, huge integer price, explicit continuation and empty qualified snapshot.

Acceptance: UI only receives validated snapshot-bound listings; cancellation and registry changes cannot publish stale data.

Rollback/security: Ship schema-compatible backend first, then frontend. Restore whole matched frontend artifact on rollback; do not hide parse errors with empty defaults.

## NM-07 / NM-A17: app / frontend/src/pages/names/NamesMarketPage.tsx

Symbol: `export function NamesMarketPage() {`. Coverage: N-READ,N-EMPTY,N-ERROR,N-RETRY,N-PAGE,N-UI. Findings: D02. Preparation: ANNOTATED. Functional status: FAIL.

Current: MarketNav and exact NAME_MARKET_UNSUPPORTED code handling are already implemented in this baseline; older CMO comments describing them as absent are stale. The screenshot shows generic source failure text with a Retry button.

Sources: S-APP,S-IDX. Prerequisites: NM-04,NM-05.

1. Preserve current navigation, exact unsupported-code check and abort-on-registry-change. Render source unavailable versus replay/anchor lag versus transient transport errors from NM-04 with compact truthful text; never call an unavailable registry empty or unsupported.
2. Keep retry bounded/user-triggered, suppress duplicate in-flight requests and preserve registry selection. Show any last verified data only as visibly stale/non-actionable with its snapshot time; the chosen initial implementation may instead show no stale data.
3. Add snapshot-bound continuation controls from NM-05 and disable purchase while evidence/capability is stale or unavailable. Retain Names market discoverability and the existing design system, no unrelated gallery redesign.
4. Use status/alert semantics, keyboard-visible focus and clear registry labeling; test desktop/tablet/mobile and both supported themes, reload/back/forward and rapid registry switches.

Tests: npm --prefix frontend test -- NamesPages.test.tsx names.test.ts; PROPOSED NEW frontend/tests-live/names-market-testnet.spec.ts for real API loading/error/retry/recovery and purchase results. Use one approved localhost instance and dedicated browser tab on Linux compiler for visual validation.

Acceptance: Specific safe cause is visible; restored qualified backend recovers on retry; no stale request overwrites new selection; current navigation and unsupported-market distinction remain intact.

Rollback/security: Restore a complete matched static artifact, preserving operation IDs and pending recovery. Never suppress a backend error to make the screenshot disappear.

## NM-06 / NM-A18: app / frontend/src/pages/names/NameOperation.tsx

Symbol: `export function NameOperationView({`. Coverage: N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY,N-RECOVER,N-UI. Findings: D10. Preparation: ANNOTATED. Functional status: FAIL.

Current: The UI shows prepared operations and supports readback but has no completed native shielded send path. A pasted registry signature is not transaction signing or proof of payment.

Sources: S-APP,S-MARKET,S-PHP,S-ZIP321. Prerequisites: NM-05,NM-06 backend settlement.

1. Wire NameOperationForm/View to the qualified native intent response from NM-A14. Present exact network, registry, recipient, memo purpose, amount and fee for user approval; keep registry Ed25519 ownership signature distinct from wallet transaction authorization.
2. Use only supported wallet capabilities; show rejected/disconnected/wrong-network/insufficient-funds states without replacing signature bytes or silently falling back to a different signer. Unsupported required wallet paths remain work, not hidden controls.
3. Persist/reload the server operation ID and show prepared, approval, submitted, confirmed, indexed, settled/conflict and recoverable states truthfully. Add bounded status readback, avoid double-click resubmits, and distinguish registrar balance credit from on-chain refund/withdrawal.

Tests: Extend NamesPages.test.tsx and signRequests.test.ts; real Zcash Testnet app journeys in frontend/tests-live/names-market-testnet.spec.ts must survive reload/reconnect and signature rejection, with authenticated API/chain readback.

Acceptance: No prepared operation labeled complete; no spending without explicit approval; exact prices and network stay bound across reconnect; recovery remains available even if new admissions are paused.

Rollback/security: Retain operation/status schema and IDs across frontend rollback; do not automatically retry ambiguous broadcasts. No spending keys, viewing keys or memo-sensitive data in logs/screenshots.

## NM-08 / NM-A19: app / scripts/verify-deployed-assets.mjs

Symbol: `const origin = (process.argv[2] ?? 'https://zrunes.io').replace(/\/$/, '');`. Coverage: N-RELEASE,REGRESSION-ALL. Findings: D11. Preparation: ANNOTATED. Functional status: NOT TESTED.

Current: Public frontend .release is 51e44351 while prepared develop is a5ea1f92; active API units and indexer release paths differ. An active unit/current symlink alone does not prove the publicly routed revision.

Sources: S-APP,S-IDX. Prerequisites: NM-01,NM-02,NM-03,NM-04,NM-05,NM-06,NM-07.

1. After functional GO, build on the authorized Linux compiler from accepted commits/lockfiles; record artifact hashes and deploy worker/provenance/replay/provider/backend/frontend in dependency order through existing production release authorization, with backups and rollback artifact verified first.
2. Run this existing static-asset verifier against the exact deployed dist, then perform read-only release receipts for /market/names, /.release, /api/names/registries and both indexer/Names listing paths. Record routed API upstream, worker/indexer commit-or-byte hashes, anchor config fingerprints, migration generation and public capability exposure.
3. Add PROPOSED NEW scripts/verify-names-release.mjs for safe read-only operational assertions; no Mainnet test transaction or production fault injection. Merge/push only reviewed relevant accepted work after gates, and reconcile the cfa1ec8/6f08cca unique reader/marker work without losing unrelated contributions.

Tests: Verified existing command shape: node scripts/verify-deployed-assets.mjs https://zrunes.io frontend/dist. New release verifier command is PROPOSED until implemented. Run acceptance matrix and dependent shared-service suites before deployment; post-deploy checks prove operations/configuration, not Mainnet functional transactions.

Acceptance: GO requires all required functional rows PASS on justified Testnet plus completed PUBLIC MAINNET release receipts; source comments/unit passes/local builds/merged PRs alone do not qualify.

Rollback/security: Retain previous matched frontend/backend/indexer artifacts and registry-generation backup. Unsafe rollout pauses new admissions, restores compatible artifacts and preserves pending-operation recovery. Do not merge/deploy in preparation.

## NM-01 / NM-A20: indexer / src/projections/name-registries/zcashme.mjs

Symbol: `export function parseZcashMeNameNote(memo) {`. Coverage: M-REG,M-READ,M-EMPTY,M-PROOF,M-RECOVER. Findings: D08. Preparation: ANNOTATED. Functional status: BLOCKED.

Current: The offered zcashme integration uses a legacy memo/commitment interpretation; current pinned zns-verify 6dd96f56 documents Ironwood and a committed expires_at field. Deployed registry/version compatibility has not been established; this is a required qualification gap, not permission to replace semantics from a README.

Sources: S-ZNSVERIFY,S-IDX,S-ZIP258,S-ZIP229,S-ZIP318,S-ZIP326. Prerequisites: none.

1. Pin the actual offered registry authority, inception, protocol version, supported network and deployed commitment-kernel revision using its on-chain records and authenticated authority metadata. Compare the current parser against src/memo.rs, src/verify.rs and test vectors at the pinned zns-verify revision, including name alphabet/length, expiry units, previous commitment and action.
2. Keep historical legacy decoding keyed by registry/pool/activation height only where verified; add the actually required version with an explicit discriminator and migrate/replay a separate generation. Coordinate backend zcashme-protocol.ts, adapter, observer proof contract and reader so no one treats an unverified kernelVerified boolean as cryptographic evidence.
3. Retain the supported register/read journeys, and retain unsupported-market behavior because this integration offers no Names market. Do not invent trading or legacy release semantics. Unknown authority activation/network remains BLOCKED with the exact next read/test, not silently NOT APPLICABLE.
4. NU6.3 qualification: S-ZIP258 and S-ZIP229 are still labelled Draft in the 2026-09-21 capture. Owned-node branch/activation observations match their constants, but this is not blanket proof of every draft rule. Check actual v5/v6 bytes and pinned validator/library behavior; distinguish Orchard protocol receiver/key encoding from Orchard versus Ironwood pool/action identity. S-ZIP318/S-ZIP326 inform native-wallet compatibility; do not add unrelated automatic wallet migration or infer a working spend path from an address encoding.

Tests: Extend test/name-registries-decoders.test.mjs and PROPOSED NEW test/zcashme-version-parity.test.mjs with authoritative memo/commitment vectors and wrong-version/pool cases. Actual offered registry Testnet claim/readback is mandatory; no mock-kernel PASS.

Acceptance: No field/expiry/network mismatch or wrong commitment accepted; existing offered legacy names are not reinterpreted under incompatible new rules.

Rollback/security: Preserve immutable raw events and separate source generations before replay. Do not drop the existing registry from navigation to avoid qualification.

## NM-01 / NM-A21: app / backend/src/name-registries/zcashme-protocol.ts

Symbol: `export function parseZcashMeNameNoteMemo(`. Coverage: M-REG,M-READ,M-PROOF,M-RECOVER. Findings: D08. Preparation: ANNOTATED. Functional status: BLOCKED.

Current: Local zcashme grammar/proof fields must be reconciled with the deployed authority; current external zns-verify has committed expiry and Ironwood support absent from the legacy interpretation. Compatibility is unresolved, not a verified working integration.

Sources: S-ZNSVERIFY,S-APP,S-IDX. Prerequisites: none.

1. Complete NM-A20's concrete authority/version comparison before changing signed or committed bytes. Bind registry ID, pool, version, network and activation to requests/evidence; reject unsupported combinations rather than guessing an expiry or pretending Orchard/Ironwood commitments are interchangeable.
2. Update memo parsing, request construction, ZcashMeAdapter capability/price contract and observer proof validation together using exact pinned vectors. Keep expired/released/absent distinctions aligned with the proven applicable protocol and real authority response.
3. Preserve existing public register/read entry points and return typed prerequisite errors until the actual supported authority can complete the flow. Any new kernel/reader executable path belongs to NM-02; never accept a caller-provided boolean in place of recomputing the commitment.

Tests: Add PROPOSED NEW backend/src/name-registries/zcashme-protocol.spec.ts parity vectors; extend registry-state.mysql.spec.ts and NamesPages.test.tsx; real supported Zcash Testnet registration/readback/reconnect must pass separately from zcashnames tests.

Acceptance: Proof bytes and API fields reflect the actual network and registry version; unsupported market remains explicit; no invented expiry or fake verified state.

Rollback/security: Use additive/versioned proof contract and isolated replay generation; retain legacy raw evidence and coordinated provider/consumer rollback.

## NM-07 / NM-A22: app / frontend/src/pages/names/NameOperation.tsx

Symbol: `export function NameOperationForm(`. Coverage: N-REG,N-UPD,N-CHG,N-LST,N-ULT,N-BUY,M-REG,N-UI. Findings: D10. Preparation: ANNOTATED. Functional status: FAIL.

Current: Users currently enter command fields and signatures to prepare an operation, while the backend reports settlement unavailable. The form is not evidence of a supported wallet-native shielded transaction journey.

Sources: S-APP,S-PHP,S-MARKET. Prerequisites: NM-01,NM-06.

1. Connect the existing form to NM-06's qualified intent/approval/status path without dropping current supported operations. Keep registry signing separate from principal-control proof and wallet transaction approval; exact nonce/amount/memo/network come from the reviewed intent contract, not unvalidated UI coercion.
2. Enumerate each offered wallet integration and actually supported native Names signing/send variant in the coverage matrix. Implement the required capability where available; a missing wallet capability is explicit work or an authority prerequisite, never silently rerouted to platform spend keys.
3. Guard duplicate submit, disconnect/account/network changes, rejected signature, stale price and expiry; retain the operation ID for restart/reconnect recovery. Surface clear fee/recipient/credit semantics before approval and preserve all existing input validation.

Tests: Extend NamesPages.test.tsx and wallet/signRequests.test.ts; complete separate real Testnet owner/buyer flows for each offered supported wallet variant with approval refusal and refresh recovery. Responsive and keyboard checks run on the approved Linux browser environment.

Acceptance: Every supported native action has a usable approval-to-authoritative-outcome path; no UI-only success, signature substitution or network leakage.

Rollback/security: Keep already-submitted operation readback and wallet disconnect safe across rollout; rollback must not trigger new payments.

## NM-05 / NM-A23: app / backend/src/name-registries/name-operations.service.ts

Symbol: `async listings(registryId: string): Promise<{`. Coverage: N-READ,N-EMPTY,N-PAGE,N-PROOF. Findings: D06,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: The domain response maps observer results then separately fetches currentCheckpoint for the envelope height; the checkpoint can change between calls, and the envelope loses root/network/coverage and continuation metadata.

Sources: S-APP,S-IDX,S-PROOFS. Prerequisites: NM-03,NM-04.

1. Return one typed verified RegistryListingsSnapshot from observer.listings and map NameResolutionResult records without replacing its checkpoint with a second query. Copy the same snapshot identity and qualified source/anchor observation to the public envelope, including empty pages.
2. Accept validated bounded cursor/filter inputs from NamesController and pass them unchanged through the provider contract. Maintain NAME_MARKET_UNSUPPORTED for registries whose adapter actually has no buy operation; unsupported is not a fallback for authority/schema failure.
3. Keep price/owner/record proof and action eligibility bound to that snapshot; reject stale proof/capability before a purchase intent. Update backend/frontend schema fixtures and MySQL tests together.

Tests: Extend names.controller.spec.ts and registry-state.mysql.spec.ts with checkpoint advance between calls, empty pages, explicit continuation, unsupported registry and mixed-root proof rejection. PROPOSED NEW observer-listings.spec.ts must prove no second-snapshot mixing.

Acceptance: Envelope and every record describe one verified checkpoint; no null/unqualified checkpoint may masquerade as an authoritative empty market.

Rollback/security: Deploy provider/observer/domain/frontend envelope changes compatibly; retain typed unavailable behavior instead of returning the legacy unverified array on failure.

## NM-04 / NM-A24: app / backend/src/name-registries/names.controller.ts

Symbol: `async getListings(@Param('registryId') registryId: string) {`. Coverage: N-READ,N-ERROR,N-PAGE,N-NETWORK. Findings: D02,D07. Preparation: ANNOTATED. Functional status: FAIL.

Current: This handler accepts registryId only and delegates; the snapshot/cursor envelope and specific upstream error mapping required by the repair are not yet public API contracts.

Sources: S-APP,S-IDX. Prerequisites: NM-03,NM-05.

1. Keep the existing route and exact unsupported-registry semantics. Add a bounded allowlisted listings-query DTO for limit/cursor and only explicitly supported filters; validate before delegation, and bind cursor scope to registry/network/snapshot rather than trusting client checkpoint fields.
2. Return NM-A23's typed snapshot envelope without catching dependency/proof errors into HTTP200. Preserve NM-04 safe typed code/reason/correlation ID, HTTP503 for unavailable authority and HTTP400 for invalid query, with no private URL/credentials.
3. Coordinate request/response schemas with frontend/api/names.ts and indexer/API tests. Keep publicly proxied indexer mutation methods denied; read pagination does not authorize new admin or signing endpoints.

Tests: Extend names.controller.spec.ts for valid/invalid limit and cursor, wrong registry/network binding, exact unsupported code, upstream source-unavailable and schema failure. Test actual HTTP serialization in an isolated app/MySQL environment before public enablement.

Acceptance: No status-only unsupported classification, unbounded query or false successful empty body; API remains backwards-compatible or explicitly versioned.

Rollback/security: Provider then consumer deployment; preserve current auth/rate-limit boundaries and old route discoverability. Do not deploy before functional gates.

## NM-07 / NM-A25: app / frontend/src/pages/names/NameEvidence.tsx

Symbol: `export function NameEvidence({ record }: { record: NameRecord }) {`. Coverage: N-READ,N-PROOF,N-UI,M-READ. Findings: D06,D09. Preparation: ANNOTATED. Functional status: FAIL.

Current: This record renderer relies on the backend's supplied evidence. After snapshot/anchor repairs it must not continue presenting stale or incompatible evidence as currently actionable ownership.

Sources: S-APP,S-PROOFS,S-ANCHOR. Prerequisites: NM-05.

1. Render the verified snapshot network/checkpoint/root and freshness/capability state from the versioned API; retain distinct registry proof formats. Do not infer proof validity from a transaction ID, a loaded record or an old successful anchor flag.
2. Keep displayed prices exact and distinguish a stale verified historical record from a current actionable listing. Use compact readable labels without exposing viewing keys, credentials, private endpoints or raw sensitive note content.
3. Retain useful navigation and accessible semantics in light/dark and narrow layouts; have the parent disable actions whenever the snapshot/capability is stale rather than changing the evidence text to suggest settlement.

Tests: Extend NamesPages.test.tsx with old root/epoch, source lag, mixed registry evidence, exact large integer price and unavailable proof; real Testnet page refresh/reconnect verifies the final evidence updates after settlement.

Acceptance: The UI does not upgrade historic proof or submitted transaction to current ownership/settled status; supported registry evidence remains usable and clearly distinguished.

Rollback/security: Restore a schema-compatible frontend artifact and preserve readback IDs; no cosmetic change can substitute for backend proof validation.

## NM-08 / NM-A26: docs-app-public / src/content/docs/protocols/names-and-registries.md

Symbol: `## Dual Registries`. Coverage: N-RELEASE,N-READ,N-ERROR,N-PROOF,N-RECOVER. Findings: D01,D02,D06,D09,D10,D11. Preparation: ANNOTATED. Functional status: NOT TESTED.

Current: Current documentation does not describe the complete repaired Names source/verification/settlement contract. Existing explanatory text is preserved during preparation; historical claims are not current release evidence.

Sources: S-APP,S-IDX,S-PROOFS,S-ANCHOR,S-MARKET. Prerequisites: NM-01,NM-02,NM-03,NM-04,NM-05,NM-06,NM-07.

1. Document supported native list/delist/buy separately from zcashme registration and resolution; preserve both entries and the existing ZkMap distinction. Include specific safe source/history/anchor errors, exact price and registrar custody/credit/withdrawal semantics only after accepted release evidence.
2. Use the matched accepted application/indexer contracts and evidence from this handoff. Record actual released versions and supported wallet/network operations; never describe a comment, fixture pass or unavailable capability as implemented or released.
3. Coordinate this documentation with the other three documentation repositories and NM-08 release receipts. Retain legitimate authentication and registry trust distinctions, and keep viewing/spending material and private endpoints out of public documentation.

Tests: Build and run the existing public documentation package scripts after implementation; verify rendered Names links, mobile and keyboard use, no secrets, and the actual deployed page bytes.

Acceptance: Published docs match the actual accepted and publicly deployed behavior, with truthful unsupported/unavailable/settlement distinctions. No hidden required feature or unverified success claim.

Rollback/security: Restore compatible documentation with the matched product/provider artifact. Preserve incident history and pending-operation recovery; no production change during preparation.

## NM-08 / NM-A27: docs-app-private / docs/names-and-registries.md

Symbol: `## Universal Dual-Registry Architecture`. Coverage: N-RELEASE,N-READ,N-ERROR,N-PROOF,N-RECOVER. Findings: D01,D02,D06,D09,D10,D11. Preparation: ANNOTATED. Functional status: NOT TESTED.

Current: Current documentation does not describe the complete repaired Names source/verification/settlement contract. Existing explanatory text is preserved during preparation; historical claims are not current release evidence.

Sources: S-APP,S-IDX,S-PROOFS,S-ANCHOR,S-MARKET. Prerequisites: NM-01,NM-02,NM-03,NM-04,NM-05,NM-06,NM-07.

1. Replace stale field/flow descriptions with the accepted registry-specific snapshot schema, typed 503 reasons, reader provenance, anchor freshness, operation/payment association and idempotent recovery. Document principal authentication, registry ownership signatures and transaction approval as distinct boundaries.
2. Use the matched accepted application/indexer contracts and evidence from this handoff. Record actual released versions and supported wallet/network operations; never describe a comment, fixture pass or unavailable capability as implemented or released.
3. Coordinate this documentation with the other three documentation repositories and NM-08 release receipts. Retain legitimate authentication and registry trust distinctions, and keep viewing/spending material and private endpoints out of public documentation.

Tests: Cross-check every documented request/error with actual Names HTTP integration tests, registry-state.mysql.spec.ts and native Testnet receipts; confirm links and public/private documentation agreement.

Acceptance: Published docs match the actual accepted and publicly deployed behavior, with truthful unsupported/unavailable/settlement distinctions. No hidden required feature or unverified success claim.

Rollback/security: Restore compatible documentation with the matched product/provider artifact. Preserve incident history and pending-operation recovery; no production change during preparation.

## NM-08 / NM-A28: docs-indexer-public / README.md

Symbol: `## API`. Coverage: N-RELEASE,N-READ,N-ERROR,N-PROOF,N-RECOVER. Findings: D01,D02,D06,D09,D10,D11. Preparation: ANNOTATED. Functional status: NOT TESTED.

Current: Current documentation does not describe the complete repaired Names source/verification/settlement contract. Existing explanatory text is preserved during preparation; historical claims are not current release evidence.

Sources: S-APP,S-IDX,S-PROOFS,S-ANCHOR,S-MARKET. Prerequisites: NM-01,NM-02,NM-03,NM-04,NM-05,NM-06,NM-07.

1. Add the accepted name-registries checkpoint/record/listings contracts to docs/api.md and link them here. Explain that global chain coverage does not qualify decrypted Names history; unavailable is not empty, and a proof page must bind one network/root/height plus continuation. Keep existing protocol API documentation intact.
2. Use the matched accepted application/indexer contracts and evidence from this handoff. Record actual released versions and supported wallet/network operations; never describe a comment, fixture pass or unavailable capability as implemented or released.
3. Coordinate this documentation with the other three documentation repositories and NM-08 release receipts. Retain legitimate authentication and registry trust distinctions, and keep viewing/spending material and private endpoints out of public documentation.

Tests: Validate documented paths against src/api/name-registries.mjs and its HTTP tests, including source unavailable, complete empty page and pagination; verify published documentation links and actual public exposure.

Acceptance: Published docs match the actual accepted and publicly deployed behavior, with truthful unsupported/unavailable/settlement distinctions. No hidden required feature or unverified success claim.

Rollback/security: Restore compatible documentation with the matched product/provider artifact. Preserve incident history and pending-operation recovery; no production change during preparation.

## NM-08 / NM-A29: docs-indexer-private / docs/deployment.md

Symbol: `## Topology`. Coverage: N-RELEASE,N-READ,N-ERROR,N-PROOF,N-RECOVER. Findings: D01,D02,D06,D09,D10,D11. Preparation: ANNOTATED. Functional status: NOT TESTED.

Current: Current documentation does not describe the complete repaired Names source/verification/settlement contract. Existing explanatory text is preserved during preparation; historical claims are not current release evidence.

Sources: S-APP,S-IDX,S-PROOFS,S-ANCHOR,S-MARKET. Prerequisites: NM-01,NM-02,NM-03,NM-04,NM-05,NM-06,NM-07.

1. Preserve dated topology observations as historical; add the accepted current Names reader/worker identity, separate network configuration, authenticated source inception/ranges, shadow replay generation and fenced cutover. Update monitoring/reorg/deployment pages together; forbid live shared-checkpoint rewinds and duplicate chain writers.
2. Use the matched accepted application/indexer contracts and evidence from this handoff. Record actual released versions and supported wallet/network operations; never describe a comment, fixture pass or unavailable capability as implemented or released.
3. Coordinate this documentation with the other three documentation repositories and NM-08 release receipts. Retain legitimate authentication and registry trust distinctions, and keep viewing/spending material and private endpoints out of public documentation.

Tests: Compare deployment documentation with accepted source/artifact/routed-upstream receipts and actual nonsecret config fingerprints; exercise isolated migration/rollback/restart tests and verify shared protocol regression.

Acceptance: Published docs match the actual accepted and publicly deployed behavior, with truthful unsupported/unavailable/settlement distinctions. No hidden required feature or unverified success claim.

Rollback/security: Restore compatible documentation with the matched product/provider artifact. Preserve incident history and pending-operation recovery; no production change during preparation.
