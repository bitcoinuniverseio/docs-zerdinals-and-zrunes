# Execution work packages

Preparation status: ANNOTATED. Functional status is unchanged. Source-level instructions below are actually applied in the named worktrees.

Order: WA-00 policy; define WA-03 proof interface and WA-04 additive read contract; WA-02 node/readiness split; integrate WA-03 callers; WA-06 token intent; WA-05 map attempts/payment recovery; WA-01/WA-07 public UI; WA-08 regression, documentation and release. Cross-references are coordinated integration requirements, not a license to enable a partially verified path.

## WA-01-A01 | app/frontend/src/ui/AppShell.tsx

Defect D-01; coverage UI-01,UI-02. Anchor: `export function AppShell() {`.

Observed: AppShell publicly mounts ChainStatusChip in the header and ChainStatusDetail in the account sheet.

Required: Remove public coverage chrome without removing wallet or network controls.

Prerequisites: WA-00 repository policy

1. Remove both public component mounts and their import from this file. Do not replace them with a hidden or disabled badge.
2. Retain the actual network indicator, network switch, wallet entry, search and account actions. Remove only spacing or grid columns that become unused.
3. Keep read-quality metadata for accurate individual read results and private diagnostics, not public header/account coverage counts. Check other mounts before removing the provider.

Tests: npm --prefix frontend test -- src/ui/ChainStatus.test.tsx; add PROPOSED NEW frontend/src/ui/AppShell.coverage.test.tsx asserting no coverage text or status node in public chrome for unknown, partial, stale and complete responses; preserve wallet/network keyboard interactions at mobile and desktop widths.

Sources: USER-01; frontend/src/ui/ChainStatus.tsx; A11Y-01

Rollback: Restore the component mounts only by an explicit product-policy revision, not as a workaround for an indexer problem. No schema or production-data changes.

## WA-01-A02 | app/frontend/src/ui/ChainStatus.tsx

Defect D-01; coverage UI-01,UI-02. Anchor: `export function ChainStatusChip`.

Observed: The reading helper produces Coverage unknown and other internal coverage labels for a public status component.

Required: Coverage diagnostics must not leak back into public chrome through another caller.

Prerequisites: WA-01-A01

1. After removing public mounts, check every import of ChainStatusChip and ChainStatusDetail. Delete unused public exports or rehome diagnostics behind an existing authenticated administrator surface.
2. Do not relabel unknown coverage as complete or suppress meaningful per-result uncertainty. Do not add polling solely to replace this removed badge.
3. Replace tests that assert public badge visibility with tests for its absence and, where retained, access-controlled diagnostics.

Tests: npm --prefix frontend test -- src/ui/ChainStatus.test.tsx; include AppShell public account sheet and unauthenticated navigation in the new regression test.

Sources: USER-01; AppShell.tsx

Rollback: Do not remove underlying read metadata or authentication; this package concerns presentation only.

## WA-02-A01 | app/backend/src/readiness/operation-readiness.ts

Defect D-02; coverage ADM-01 through ADM-12,CTX-01. Anchor: `function sharedBlockers(`.

Observed: sharedBlockers adds chainFreshnessBlockers and indexer dependency failures to creation operations. Production GET /api/readiness blocked new mints and inscriptions with PROTOCOL_QUALIFICATION_INCOMPLETE while node and indexed heights matched.

Required: Read completeness must not be a global creation prerequisite; actual transaction and authorization requirements remain enforced.

Prerequisites: WA-00; WA-03 scoped funding evidence before enabling the changed creation paths

1. Introduce one explicit creation-operation predicate for zerdinals.inscribe, zerdinals.batch, zrunes.etch, zrunes.mint, zkmap.mint and zkmap.batch. Keep transfer and market operation policy separate.
2. For creation only, remove scanComplete, protocolQualified, chainComplete, projection-receipt availability and global indexer lag/reachability from admission blockers. Keep those facts as read diagnostics; do not manufacture healthy evidence.
3. Retain database availability, valid network identity, signer/keyset/KMS and release authorization, operator security controls, wallet signing capability and fee-policy checks. Assess node transaction context directly, not through an indexer aggregate.
4. Replace existing incomplete-coverage creation expectations with table-driven tests for false, null, missing, lagged, timeout and replay states under both execution modes. Keep all wrong-network, invalid-authorization, missing-signing-key and transfer/market safety tests.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=readiness; test each creation operation in each supported mode and continuation separately. Regression must assert that unrelated security failures still reject.

Sources: USER-01; public-probes.json at 2026-09-23T21:38Z; ZIP-225; ZIP-244

Rollback: Keep a previous artifact for deployment rollback; do not alter fee amounts, signed authorization content, protocol activation constants or order records to obtain a pass.

## WA-02-A02 | app/backend/src/readiness/readiness.service.ts

Defect D-02; coverage ADM-01 through ADM-12,CTX-02. Anchor: `  private async evidence(): Promise<ReadinessEvidence> {`.

Observed: evidence combines Zebra and indexer health; activation uses indexedHeight and checkpoint matching determines the indexer dependency result.

Required: Gather creation prerequisites independently from read-model health.

Prerequisites: WA-02-A01 contract; WA-03 input evidence

1. Add separately typed node transaction facts to ReadinessEvidence, validated against configured network/genesis and supported transaction versions. Derive ZRunes activation from verified node height and the existing network activation constants, not indexedHeight.
2. Keep diagnostic indexer/checkpoint facts separate and preserve bounded caching, single-flight gathering and the uncached security-pause check. A slow read probe must not consume the entire creation-readiness deadline.
3. Make assertNewOrderAllowed consume the operation-specific report. Keep continuation and status/recovery behavior independent of new-admission switches; retain real emergency and network failures.
4. Coordinate the response contract with frontend OperationReadinessContext. Prefer additive fields during rollout; never reinterpret missing authorization as allowed.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=readiness; use a hung indexer promise with healthy node/signer evidence, node activation with indexer behind, and wrong-network controls.

Sources: RPC-01; SPEC-ZRUNES section 12; operation-readiness.ts

Rollback: No database migration is required for the readiness split; keep old consumers compatible until the frontend is deployed.

## WA-02-A03 | app/backend/src/zcash/chain-context.service.ts

Defect D-02; coverage CTX-01,CTX-02,REG-01. Anchor: `  async signingContext(): Promise<SigningContext> {`.

Observed: signingContext independently calls indexer.health, assertIndexerCheckpoint and chainFreshnessBlockers after reading Zebra. Removing a UI or readiness blocker alone cannot make creation execute.

Required: Creation transaction context must come from the owned node without requiring a complete metaprotocol projection.

Prerequisites: WA-03 scoped funding evidence

1. Extract a node-only creationSigningContext method that validates configured network/genesis, actual supported transaction version, consensus.nextblock and a bounded expiry derived from the node tip. Do not hardcode a branch id or copy an indexer checkpoint into node facts.
2. Retain signingContext as the strict compatibility path for existing non-creation callers. Migrate only explicitly inventoried creation, already-paid creation continuation and their correctly authorized recovery paths to the new method.
3. Update InscriptionsService buildTemplates/prepareBatch, ZRunes creation methods, PaymentOrdersService creation methods and PaymentExecutionService creation fanout together. Pass the context explicitly where a helper also serves transfer or market paths.
4. Test that creationSigningContext does not call indexer.health, including when the indexer throws or never resolves. Validate expiry/upgrade-boundary behavior and retain wrong-network and malformed-node rejections.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=chain-context; rerun inscription, zrune, payment, transfer and market tests for every changed caller.

Sources: ZIP-225; ZIP-244; RPC-01; SPEC-ZERDINALS sections 2 and 13

Rollback: Do not change transaction wire format, signature algorithm, saved transaction bytes or existing non-creation policy. Any new context field must be backward compatible.

## WA-03-A01 | app/backend/src/zcash/utxo-selection.ts

Defect D-03; coverage FUND-01,FUND-02,FUND-03,REG-02. Anchor: `export function selectAssetSafeFunding(`.

Observed: The selector accepts only evidence=scanned with an empty asset list; creation callers currently obtain those verdicts solely from the global indexer.

Required: Remove the global-read dependency without spending unclassified or asset-bearing outputs as fees.

Prerequisites: WA-00

1. Add PROPOSED NEW backend/src/zcash/creation-funding-evidence.service.ts and wire it through the owning Zcash module. Return an explicit proof record for each candidate: network, outpoint, exact value/script, current unspent evidence, observation block/hash, and asset classification source.
2. Reuse current verified per-outpoint indexer evidence when available. When it is unavailable, use owned-node transaction data and a bounded, cached relevant-ancestry verification path with proven stopping anchors. A new address, an empty HTTP response or gettxout alone does not prove absence of metaprotocol assets.
3. Represent proven-safe, asset-bearing and unresolved explicitly. Extend selector types to accept the new proven-safe evidence only after verifier tests establish equivalent asset protection. Skip unresolved candidates and provide a dedicated proven-funding option; do not disable the authoring route.
4. Keep reservations, MAX_FUNDING_INPUTS, integer arithmetic, fee iteration, dust handling, input script ownership and current unspent checks. Add tests with a hidden inscription, ZRune-bearing input, incomplete ancestry, spent input, foreign network and concurrent reservation.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=utxo-selection; add PROPOSED NEW backend/src/zcash/creation-funding-evidence.spec.ts. Real Testnet acceptance must cover both payment and connected-wallet inputs; a mocked empty verdict is not proof.

Sources: SPEC-ZERDINALS sections 5 and 8-10; SPEC-ZRUNES sections 6.3 and 10; RPC-02; ZIP-317

Rollback: Do not enable a new evidence discriminator until its verifier and all dependent signing paths pass. No production backfill, blanket classification update or historical-state reset is authorized by this package.

## WA-03-A02 | app/backend/src/inscriptions/inscriptions.service.ts

Defect D-03; coverage FUND-01,INS-01,INS-02,WRAP-01 through WRAP-06. Anchor: `  private async fundingCandidates(address: string)`.

Observed: Inscription fundingCandidates reads addressUtxos and outpointAssets through IndexerClient, so opening readiness alone leaves an indexer dependency in actual preparation.

Required: Obtain creation funding candidates and evidence through the scoped verifier while preserving asset protection.

Prerequisites: WA-03-A01; WA-02-A03

1. Inject the new creation-funding evidence service and use its owned-node address/outpoint reads plus scoped classification for this creation-only candidate path. Keep batch bounds and exact monetary types.
2. Change buildTemplates and prepareBatch to receive creationSigningContext explicitly. Do not let parent or asset-transfer helpers inherit weaker ownership checks; resolve a referenced parent through its exact authenticated evidence.
3. Keep content commitment, multipart limits, fee calculation, recipient validation, atomic order persistence, capability tokens and commit/reveal validation unchanged.
4. Cover plain inscriptions, multipart and batch, ZkMap wrappers, ZRC-20/ZRC-721 payload wrappers and collection/name creation while read health is incomplete.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=inscriptions; extend existing preparation tests and the scoped-funding suite. Confirm no duplicate order or signed attempt after retry.

Sources: SPEC-ZERDINALS sections 5 and 13; RPC-02

Rollback: Restore service wiring only with a compatible artifact; never delete accepted orders or recompute already-persisted signed transactions.

## WA-03-A03 | app/backend/src/zrunes/zrunes.service.ts

Defect D-03; coverage FUND-02,ZRN-01,ZRN-02,REG-03. Anchor: `  private async fundingCandidates(address: string)`.

Observed: ZRunes fundingCandidates and the private signingContext helper couple creation to indexer asset verdicts and aggregate activation/readiness.

Required: Provide scoped creation evidence without weakening ZRune transfers.

Prerequisites: WA-03-A01; coordinate creation caller integration with WA-02-A03 and WA-06 after the proof interface exists

1. Separate creation candidate selection from the existing transfer path. Route etchPrepare, prepareEtchReveal, mintPrepare, prepareServiceEtchOrder and prepareServiceMintOrder through the new evidence service and node-only creation context.
2. Keep transferPrepare and all asset-bearing spend verification on their existing strict path unless separately proven equivalent. Do not globally change the shared private signingContext helper to relax every caller.
3. Preserve six-block etch commitment maturity, exact runestone bytes, integer limits, postage, fee outputs, reservation fencing and durable attempts.
4. Test all five creation entry methods with partial/unknown read health and safe inputs, and prove an asset-bearing or unresolved fee input remains excluded.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zrunes; run utxo-selection and payment dependent suites. Real Testnet etch must include the commitment maturity step.

Sources: SPEC-ZRUNES sections 6,8,9,12; ZIP-317

Rollback: Keep transfer policy, activation constants, etch commitments, saved payloads and signer journals intact.

## WA-03-A04 | app/backend/src/payment/payment-watcher.service.ts

Defect D-03; coverage FUND-03,REC-01,REC-02. Anchor: `  private async reconcileOrder(`.

Observed: reconcileOrder already reads deposits from Zebra but returns before accounting when any indexer verdict is missing, unscanned or below the deposit height. Late deposits repeat the dependency.

Required: A partial global scan must not prevent clearance of independently proven-safe payment outputs.

Prerequisites: WA-03-A01

1. Use the scoped creation-funding verifier for matured deposits on creation orders, with explicit network, value, script, confirmation block and unspent checks. Preserve other operation policies.
2. Apply the same proof handling to scanLateDeposits. Keep unsafe outputs quarantined, unresolved outputs unspent and retryable, and already-proven deposits observable without requiring every unrelated input to have a global scan verdict.
3. Persist the exact proof source and block anchor associated with accepted payment inputs, using an additive nullable proof field or companion table only if existing evidence storage is insufficient; define and test the migration before use.
4. Retain refund-authority binding, confirmationPolicy, exact accounting, expiry and duplicate-deposit handling. Test a safe deposit during replay, asset-bearing deposit, unknown ancestry, late payment and a deposit orphaned by reorg.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=payment-watcher; native Testnet payment must be detected, cleared, executed and reconciled while the isolated read projection is incomplete.

Sources: RPC-02; SPEC-ZERDINALS sections 5 and 8-10; payment-watcher.service.ts

Rollback: Preserve accepted payment records, proof records and refund authority. Never mass-mark unknown deposits safe or edit accounting directly.

## WA-04-A01 | indexer/src/api/zkmap.mjs

Defect D-04; coverage MAP-01,MAP-02,MAP-03,MAP-04. Anchor: `async function readContext({ pool, rpc, config, query = (...args) => pool.query(...args) }) {`.

Observed: readContext returns replay_incomplete before map rows are served whenever the global protocolQualificationComplete result is false, even with matching node and indexed heights.

Required: Map draft browsing must work independently of complete historical claim qualification, while authoritative claim and market receipts remain strict.

Prerequisites: WA-00

1. Keep the existing strict context for claim receipts, claim lookup and market consumers. Add a distinct read-observation context for an opt-in draft range route; do not globally relax readContext.
2. Define the additive zkmap-blocks-draft-v1 response with configured network, verified genesisHash, nodeTip height/hash, optional projectionCheckpoint, exact decimal heights, and per-item observed claim status. Never substitute a node checkpoint for a projection checkpoint.
3. When replay/history is incomplete, return bounded height cells and unknown claim observations rather than a global 503. Positive claimed data must carry its own valid source anchor; lack of a row is never proof of availability.
4. Preserve the existing single-snapshot query discipline, bounded RPC/cache behavior and merged live-tip mempool context fix. A node/network identity failure is still an honest dependency error; the frontend must retain manual draft selection independently.

Tests: node --test test/zkmap-routes.test.mjs test/zkmap-market-consistency.test.mjs; add draft-route cases for replay_incomplete, history_incomplete, missing projection checkpoint, lag, foreign genesis and malformed node data. Existing strict receipt and mempool tests must remain passing.

Sources: SPEC-ZKMAP; RPC-01; public-probes.json; USER-01

Rollback: Additive opt-in contract first, consumers second. Do not reset the scanner, falsify qualification, alter projection rules or force a full historical replay to make creation available.

## WA-04-A02 | indexer/src/api/zkmap.mjs

Defect D-04; coverage MAP-01,MAP-02,MAP-03. Anchor: `export async function zkMapBlocksRoute(`.

Observed: The range route calls heightsAnswer, which rejects the whole request on strict context failure.

Required: Expose the draft observation route without weakening the legacy strict response.

Prerequisites: WA-04-A01

1. Accept an explicit view=draft query at the existing blocks route and dispatch to the new observation reader. Default requests and all receipt routes retain the existing v1 contract.
2. Retain start/limit validation and MAX_BLOCK_RANGE. Bound height generation by the actual verified node tip when known, never by guessed chain length; manual drafts are validated separately.
3. Return individual unknown cells during missing projection data, preserving height/name and verified identity. Do not synthesize ownership, zero supply, a winner or a Free label.
4. Add route contract tests and a two-connection isolated-MySQL snapshot test for concurrent ingestion. Confirm the already-merged occupancy tests still bind observations to the correct node tip.

Tests: node --test test/zkmap-routes.test.mjs; node --test test/zkmap-mempool-context-mysql.test.mjs requires a disposable configured MySQL database, never production.

Sources: SPEC-ZKMAP; WA-04-A01

Rollback: Remove draft consumers before removing the additive route. Strict v1 compatibility must remain intact.

## WA-04-A03 | app/backend/src/zcash/indexer.client.ts

Defect D-04; coverage MAP-01,MAP-02,MAP-04. Anchor: `  private async zkMapRead<T>(`.

Observed: zkMapRead converts indexer replay-unavailable responses into the generic unavailable answer; current block parsers expect a qualified projection response.

Required: Consume a distinct typed draft contract, not a fabricated successful strict response.

Prerequisites: WA-04-A01,WA-04-A02

1. Add an explicit zkmapDraftBlocks method using the existing owned indexer client and view=draft. Validate zkmap-blocks-draft-v1 network/genesis/nodeTip and exact height strings before returning it.
2. Keep strict zkmapBlocks, zkmapClaim, zkmapClaimLookup and market-related validation unchanged. Do not make all generic unavailable responses successful.
3. Use a separate response type for optional projectionCheckpoint and unknown observations. A nullable checkpoint must not be padded with zeros or a node hash.
4. Preserve timeout bounds, connection reuse, network separation and existing route aliases. Test malformed response, foreign network, unsupported contract and complete/partial observations.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zkmap; extend indexer ZkMap parser tests for the draft union and retain strict receipt rejection tests.

Sources: WA-04-A01; SPEC-ZKMAP; backend/src/zkmap/zkmap.service.ts

Rollback: Deploy additive indexer support before this consumer. Unsupported draft support is a truthful read failure, not permission to weaken receipt parsing.

## WA-04-A04 | app/backend/src/zkmap/zkmap.service.ts

Defect D-04; coverage MAP-01,MAP-02,MAP-03,MAP-04. Anchor: `  async blocks(query: { start?: string; limit?: string }) {`.

Observed: blocks currently throws the generic ZKMAP_INDEXER_UNAVAILABLE response whenever the strict indexer range is unavailable.

Required: The public map must receive useful partial observations instead of a whole-page read barrier.

Prerequisites: WA-04-A03

1. Use the new typed draft range method for the public browse route, while keeping claim, district ownership, delivery and settlement consumers on strict evidence.
2. Map verified node range and per-height observations to a versioned frontend contract. Preserve unknown status; do not call unobserved blocks free or mintable based on an empty claim table.
3. Carry request/network identity through the cache key and return bounded partial data without waiting for protocol replay. Keep malformed input and genuine network/node failures explicit.
4. Extend controller and service tests for partial responses and compatibility. Keep artwork/geometry optional for browsing and creation; media failure must not close the mint path.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zkmap.service; also run zkmap.controller and frontend api/zkmap tests after the contract change.

Sources: WA-04-A01 through WA-04-A03; SPEC-ZKMAP

Rollback: Coordinate indexer, backend and frontend additive rollout; preserve existing strict receipt and media storage schemas.

## WA-05-A01 | app/backend/src/zkmap/zkmap-claims.service.ts

Defect D-05; coverage ZKM-01,ZKM-02,ZKB-01,ZKB-02,MAP-05. Anchor: `  async requireAvailable(heights: readonly bigint[]): Promise<ZkMapPreflight> {`.

Observed: requireAvailable rejects creation unless every claim preflight is available; missing projection evidence therefore closes all ZkMap claim attempts.

Required: Separate a user-authorized claim attempt from a guarantee that the height has no earlier winner.

Prerequisites: WA-02,WA-03,WA-04

1. Add a creation-attempt validator distinct from strict availability checks. Validate exact heights, duplicate bounds, recipient/network and known impossible targets using node facts; do not require global scan completeness.
2. Treat unknown or pending projection observations as non-blocking claim uncertainty for the creation attempt. Retain known confirmed conflicts as target-specific invalidity, not a reason to close the whole application route.
3. Persist the reviewed observation/risk state alongside the exact request and existing request digest; preserve backwards compatibility for existing claims. Any new optional field must have an additive migration and retry tests.
4. Keep attachClaim, poll and reconcileOne strict: only a qualified winning receipt and complete underlying order may produce accepted. Losing, ineligible, orphaned and pending outcomes remain distinct, and no UI selection reserves a name.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zkmap-claims; test unknown/pending preparation without a false accepted outcome, known winner rejection, same-key retry and reorg recovery.

Sources: SPEC-ZKMAP; USER-01; WA-04

Rollback: Preserve claim rows and signed orders. Do not change first-eligible-completion winner semantics or infer ownership from an invoice.

## WA-05-A02 | app/backend/src/zkmap/zkmap-claims.service.ts

Defect D-05; coverage REC-03,ZKM-02,ZKB-02. Anchor: `  async fundingCheckBeforeFunding(`.

Observed: The pre-funding check classifies unavailable projection data as unknown, which PaymentExecutionService treats as a reason to leave a paid order unfunded.

Required: A paid claim attempt must not stall solely because the read model is incomplete.

Prerequisites: WA-05-A01,WA-03

1. Return separate facts for a confirmed target conflict, uncertain observation, and actual transaction/funding invalidity. Unknown global read state must not be the sole stop condition for a previously authorized claim attempt.
2. Keep confirmed conflicts and any applicable refund decision tied to real evidence and the sealed order policy. Do not silently change the requested height or construct a replacement order.
3. Keep claim observation polling independent of the payment/fanout execution state. Record attempts as pending verification until strict readback can establish their result.
4. Test an indexer outage before deposit, after deposit, before fanout, after signing and after broadcast; ensure one request produces one durable set of transaction attempts.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zkmap-claims; pair with payment-execution tests and a native Testnet interrupted-read campaign.

Sources: USER-01; SPEC-ZKMAP; payment-execution.service.ts handlePreparing

Rollback: Do not delete claim companions or payment events. Retain exact signed transaction recovery and refund ownership restrictions.

## WA-05-A03 | app/backend/src/zkmap/zkmap.service.ts

Defect D-05; coverage ZKM-01,ZKM-02,ZKB-01,ZKB-02. Anchor: `  async prepare(dto: PrepareZkMapDto) {`.

Observed: prepare and invoice creation call requireAvailable; batch creation shares the same claim-admission assumptions.

Required: Wire every offered single/batch and wallet/invoice ZkMap creation path to the new attempt contract.

Prerequisites: WA-05-A01,WA-02,WA-03

1. Update prepare, prepareBatch, createInvoice and createBatchInvoice together to call the creation-attempt validator, never the strict read-availability gate.
2. Continue generating exact ASCII text/plain height names on the server. Keep maximum 24 transaction items, campaign bounds, duplicate rejection, order/request capabilities and network-bound request digests.
3. Attach claim metadata in the same database transaction as each inscription/payment order. Do not allocate a second invoice when a read retry occurs.
4. Propagate explicit per-item unknown observation versus known conflict outcomes; no guessed winning inscription id. Extend both connected-wallet and service-invoice acceptance cases.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zkmap-mint-admission; also run zkmap-idempotency tests against disposable MySQL and frontend ZkMapMintPage tests.

Sources: SPEC-ZKMAP; WA-05-A01; zkmap-name.ts

Rollback: Retain sealed requests and historical order rows. Version any added companion field without rewriting existing signed manifests.

## WA-05-A04 | app/backend/src/payment/payment-execution.service.ts

Defect D-05; coverage REC-01,REC-02,REC-03,ZKM-02,ZKB-02,ZRC-02. Anchor: `  private async handlePreparing(order: PaymentOrderEntity): Promise<void> {`.

Observed: handlePreparing throws on ZkMap pending/unknown observations before funding. Creation fanout and refund construction also call the globally indexer-gated signing context.

Required: Continue legitimate paid creation and recovery without a global read-completeness condition.

Prerequisites: WA-02,WA-03,WA-05-A02,WA-06

1. Consume the new claim-attempt and ZRC-20 observation results without treating unknown supply/claim reads as proof that execution is forbidden. Keep known confirmed conflicts and actual invalid transaction conditions explicit.
2. Migrate creation-only child construction, prepareFanout and correctly authorized creation refund construction to node creation context plus scoped funding proofs. Leave market settlement and asset-transfer checks unchanged.
3. Persist signed bytes before broadcasting and reuse existing leases, durable attempt ids and txKnown checks. Indexer outages must not cause re-signing, duplicate invoices, double charges or unconditional refunds.
4. Keep post-broadcast indexing, protocol acceptance and delivery reconciliation separate. A transaction confirmation does not imply a winning map claim or credited token amount.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=payment-execution; test restart/retry at each changed state, known conflict refunds, wrong refund authority and a read outage spanning the whole paid execution path.

Sources: SPEC-ZERDINALS section 13; SPEC-ZKMAP; WA-02-A03; WA-03

Rollback: Preserve all accepted payments, attempts, fee state and capabilities. Roll back artifacts, not order state; never rebuild an already signed transaction to match new code.

## WA-06-A01 | app/backend/src/zcash/indexer.client.ts

Defect D-06; coverage ZRC-01,ZRC-02. Anchor: `function parseZrc20Token(`.

Observed: parseZrc20Token throws when protocolQualified or scanComplete is not true, before a guided mint can reach its payload checks.

Required: Separate optional read observations from exact transaction intent; never infer supply or precision from incomplete reads.

Prerequisites: WA-00

1. Keep the existing strict token-reading parser for consumers that require authoritative supply. Add a separate typed observation method for creation, whose unknown result is not an exception or a zero balance.
2. Preserve network, lens/ruleset, ticker key, exact decimal strings and deployment identity whenever an observation is available. Never substitute one reading for another or fabricate decimals.
3. Return an explicit unavailable observation on partial replay or read timeout. The creation service must still validate exact user-reviewed JSON bytes independently.
4. Add parser tests for same-token different-reading precision, unknown coverage, malformed amounts and foreign network; ensure no unknown observation is emitted as an accepted mint.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=indexer-zrc20-mint; pair with zrc20-mint-intent tests.

Sources: SPEC-ZRC20; SPEC-ZERDINALS section 15; USER-01

Rollback: Do not weaken settlement receipt parsers or change historical token supply. Additive creation observation contract only.

## WA-06-A02 | app/backend/src/zrc20/zrc20-mint-intent.service.ts

Defect D-06; coverage ZRC-01,ZRC-02,REC-04. Anchor: `  async preflight(`.

Observed: preflight requires a qualified token detail, deployment and live mintability assertion before accepting the exact mint bytes.

Required: Allow an explicitly reviewed protocol mint attempt when the read projection is incomplete, without guessing protocol metadata or guaranteeing allocation.

Prerequisites: WA-06-A01,WA-02,WA-03

1. Split immutable request validation from optional current-reading observation. Keep network, payload hash, UTF-8 JSON, ticker, amount syntax and chosen ruleset validation mandatory.
2. Add an explicit raw-intent variant for missing deployment observations: exact user-entered amount text and content bytes are signed without synthesizing decimals, deployment id, max supply or remaining supply. Validate the variant in zrc20-mint.dto.ts and frontend types together.
3. Make deploy/checkpoint/base-unit observation fields nullable only in the new variant, with an additive migration where existing entity columns are non-null. Preserve existing strict-context requests and request-key fencing; never mutate an accepted sealed request.
4. Update assertBeforeFunding and outcome reconciliation callers to distinguish missing read evidence from known invalidity. Keep accepted/rejected/orphaned results dependent on actual protocol observation, and preserve bounded retries.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zrc20-mint-intent; add raw-intent and strict-context variants, exact bytes, duplicate retries, read outage before funding and delayed/rejected allocation. Inspect the actual funding-check symbol before editing; its name is not assumed by this note.

Sources: SPEC-ZRC20; SPEC-ZERDINALS section 15; WA-06-A01

Rollback: Do not backfill unknown deployment or precision with fake values. Preserve old intent rows and compatibility during a nullable-field migration.

## WA-06-A03 | app/backend/src/zrunes/zrune-write-validation.ts

Defect D-06; coverage ZRN-01,ZRN-02. Anchor: `export function assertMintOpen(`.

Observed: assertMintOpen treats an absent indexed record as a nonexistent ZRune and refuses the order, conflating an incomplete read with a protocol fact.

Required: Creation intent validation must distinguish unknown observation from a proven invalid mint.

Prerequisites: WA-00

1. Introduce a creation-specific observation result: known-valid, known-invalid or unknown. Keep exact ZRune id parsing and wire bounds independent from this result.
2. A missing or partial indexer answer is unknown, not ZRUNE_NOT_FOUND. When exact terms are available, retain their cap/window constraints; when unavailable, permit an explicitly reviewed mint attempt without inventing a name, amount or allocation.
3. Move creation activation checks in assertZRunesActive to verified owned-node height and the existing network-specific activation configuration. Preserve the pre-activation rule and non-creation consumers.
4. Update mintPrepare, prepareServiceMintOrder and createMintInvoice to use the same creation observation contract. The encoder still emits tag 24 plus the exact block/transaction id; successful allocation remains a later protocol verdict.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=zrune-write-validation; test unknown projection, known exhausted cap, malformed id, correct activation and confirmed zero-allocation outcomes.

Sources: SPEC-ZRUNES sections 6.2 and 12; USER-01

Rollback: Do not alter OP_14 encoding, activation heights, supply accounting or ZRune transfer validation.

## WA-06-A04 | app/backend/src/payment/payment-orders.service.ts

Defect D-06; coverage ZRN-02,INS-02,ZRC-02,ZKB-02. Anchor: `  async createMintInvoice(dto: CreateMintInvoiceDto, clientIp: string) {`.

Observed: createMintInvoice requires indexer activation and token detail; all creation invoice builders obtain the strict indexer-gated signing context.

Required: Invoice creation must depend on actual signing/funding prerequisites, not whole-chain read completion.

Prerequisites: WA-02,WA-03,WA-06-A03

1. Use the creation observation contract for ZRune mint intent and node-based activation. Store the exact id/payload even when a display name is unknown; display the id rather than inventing token metadata.
2. Update createInscribeInvoice, createBatchInvoice and createEtchInvoice to use creationSigningContext. Keep createMarketBuyInvoice on its existing strict settlement path.
3. Version optional observation fields in the sealed manifest without changing the exact recipient, fees, payload or idempotency semantics of already accepted invoices.
4. Retain signer allocation authorization, rate/size limits, atomic onPersist hooks, capability validation and refund policy. A read error must not allocate a duplicate invoice on retry.

Tests: npm --prefix backend test -- --runInBand --testPathPatterns=payment-orders; cover all creation invoice types under incomplete reads and all existing rejection/duplicate cases.

Sources: WA-02-A03; WA-06-A03; SPEC-ZRUNES; SPEC-ZERDINALS

Rollback: Preserve signed manifests and outstanding invoice accounting. Add compatibility parsing before emitting new optional observation fields.

## WA-07-A01 | app/frontend/src/chain/OperationReadinessContext.tsx

Defect D-07; coverage UI-03,UI-04,UI-05. Anchor: `export function useOperationReadiness(`.

Observed: The hook exposes admission state used to replace creation forms when readiness is unavailable; read-state failure is propagated into user path availability.

Required: Keep authoring access distinct from the backend's transaction submission decision.

Prerequisites: WA-02 response contract

1. Add an explicit authoring-access state that remains available during readiness loading, stale reads and indexer failure. Do not implement this by fabricating newOrderAllowed=true.
2. Consume backend creation capability separately for submission and render actual transaction prerequisites near the action. A read-only diagnostic must not become a public coverage banner or a reason to unmount the form.
3. Preserve network mismatch handling, signed authorization requirements and request cancellation/network scoping. Keep draft state through retries and reconnects.
4. Test missing readiness, delayed response, healthy creation with partial read metadata and genuine wrong-network rejection in each execution mode.

Tests: npm --prefix frontend test -- src/chain; add form-persistence tests to each changed creation page and do not count these component tests as Testnet acceptance.

Sources: USER-01; WA-02; A11Y-01

Rollback: Maintain compatibility with the existing v2 readiness response until backend rollout completes; never treat unknown signing authority as valid.

## WA-07-A02 | app/frontend/src/chain/useExecutionPath.ts

Defect D-07; coverage UI-03,UI-04,UI-05. Anchor: `export function useExecutionPath(`.

Observed: Execution path openness is derived from newOrderAllowed, so consumers can close the entire authoring surface on a read-derived blocker.

Required: Separate choosing/editing a path from executing a transaction on that path.

Prerequisites: WA-07-A01

1. Expose separate canEditDraft and canSubmit facts, retaining the selected execution mode and actual backend submission conditions.
2. Do not let browser-wallet state close a service-invoice route, and do not switch modes for an already funded campaign. Preserve wallet rejection, disconnect and recovery behavior.
3. Remove read-coverage consequences from public path descriptions; show concise transaction-specific errors without suggesting users must wait for the whole chain to be read.
4. Update every creation consumer identified in the caller inventory, including wrappers, not just the ZkMap page.

Tests: npm --prefix frontend test -- src/chain; verify both modes, a retained draft during timeout, and no silent mode change after funding.

Sources: USER-01; WA-07-A01

Rollback: No change to ownership, signature or release authorization semantics; frontend access is not a replacement for server validation.

## WA-07-A03 | app/frontend/src/pages/CreateStudioPage.tsx

Defect D-07; coverage UI-03,INS-01,INS-02,WRAP-01 through WRAP-06. Anchor: `export function CreateStudioPage() {`.

Observed: The shared creation studio consumes execution readiness and includes read-coverage explanations in the creation path.

Required: Plain, batch and protocol-wrapped inscription drafts remain accessible during read degradation.

Prerequisites: WA-07-A01,WA-07-A02,WA-02,WA-03

1. Keep the form and all offered creation tabs mounted and editable regardless of scan/replay state. Remove global coverage explanations and whole-form readiness replacement.
2. Bind submission to the new transaction-specific capability; retain file size/type, recipient, network, fee review and wallet approval validation.
3. Preserve prepared and funded order recovery separately from new submission; neither a refresh nor a read outage may discard an accepted order or trigger another payment.
4. Exercise incoming drafts from ZRC-20, ZRC-721, collections and names, plus direct plain and batch inscription. Keep exact payload bytes and the chosen protocol context.

Tests: npm --prefix frontend test -- src/pages/CreateStudioPage; add incomplete-read cases for each draft source and desktop/mobile keyboard interaction; pair with native Testnet inscription journeys.

Sources: USER-01; WA-07-A01; SPEC-ZERDINALS

Rollback: Do not remove offered tabs, upload support or protocol wrappers to improve availability tests.

## WA-07-A04 | app/frontend/src/pages/token/TokenOperationComposer.tsx

Defect D-07; coverage ZRC-01,ZRC-02,WRAP-01,WRAP-02,WRAP-03. Anchor: `export function TokenOperationComposer(`.

Observed: The token operation composer consumes admission readiness and live token readings before producing inscription drafts.

Required: Maintain exact token authoring without requiring a globally complete reading.

Prerequisites: WA-06,WA-07-A01,WA-07-A02

1. Keep deploy, mint and transfer-inscription draft controls accessible during missing read observations; spending an already-owned transfer artifact remains subject to its own ownership checks.
2. Implement the reviewed raw-intent variant for minting when token metadata is unknown. Ask for the exact ticker and amount text already supported by the protocol; never infer decimals or use another reading's deployment.
3. Keep authoritative supply/eligibility observations advisory when unknown and definitive when genuinely proven invalid. Display submitted, pending verification, accepted and rejected separately.
4. Test entry from a token detail, direct token creation and an unavailable token read. Preserve exact JSON/hash through the shared inscription studio and invoice mode.

Tests: npm --prefix frontend test -- src/pages/token src/utils/zrc20Mint.test.ts; add raw-intent tests coordinated with backend DTO changes.

Sources: SPEC-ZRC20; WA-06; USER-01

Rollback: Do not silently convert old strict-context drafts to raw intent or mutate an accepted request key's payload.

## WA-07-A05 | app/frontend/src/pages/zkmap/ZkMapExplorerPage.tsx

Defect D-07; coverage MAP-01,MAP-02,MAP-03,MAP-05,UI-05. Anchor: `export function ZkMapExplorerPage() {`.

Observed: The page displays the exact Map unavailable / Nothing can be selected banner on range failure, while unknown fallback cells are not selectable in the grid.

Required: Keep browsing, manual height entry, selection and the mint link usable without falsely reporting claim availability.

Prerequisites: WA-04,WA-05,WA-07-A01

1. Consume the draft observation range and keep known/unknown claim states distinct. Remove the blocking coverage-style error panel; an actual read error may have a small retry control that does not disable drafting.
2. Retain existing selection and manual height entry when the map fetch fails. Permit choosing unknown draft heights through the same validated selection function as manual input.
3. Never label unknown as Free or reserved. Keep known confirmed conflicts and future/ineligible targets distinct; a selected height is only a proposed claim attempt.
4. Keep bounded polling, abort stale requests and scope caches/selection by network. Verify selection survives retry, back/forward, refresh and mobile interaction without duplicating a campaign.

Tests: npm --prefix frontend test -- src/pages/zkmap/ZkMapExplorerPage.test.tsx; update the old blocking-banner assertion and frontend/tests/zkmap-ui.spec.ts to require usable selection during a 503 or replay response.

Sources: USER-01 screenshots; WA-04; WA-05; A11Y-01

Rollback: Do not remove map browsing, artwork, filters or manual selection as a shortcut; keep unknown read truth and draft state recoverable.

## WA-07-A06 | app/frontend/src/components/zkmap/ZkMapGrid.tsx

Defect D-07; coverage MAP-05,UI-05. Anchor: `export function ZkMapGrid(`.

Observed: isSelectable only admits status=available, so an unknown projection disables pointer and keyboard selection despite a valid draft height.

Required: Grid selection must represent draft intent, not a claim-availability guarantee.

Prerequisites: WA-05,WA-07-A05

1. Replace the availability-only predicate with a shared canSelectDraft predicate based on valid height, selection capacity and known per-target invalidity. Unknown observations can be selected without changing their status label.
2. Use the same predicate for grid cells, list-view controls, pointer, Enter/Space and inspector selection. Preserve removal of already selected items when the selection limit is reached.
3. Retain roving focus, arrow/Home/End navigation, accessible labels and selection feedback. Unknown cells must not announce Free or claimed ownership.
4. Update grid tests to cover unknown selection, known conflict, maximum capacity, keyboard and pointer equivalence, and selection retention through an updated read response.

Tests: npm --prefix frontend test -- src/components/zkmap/ZkMapGrid.test.tsx; include mobile touch targets and both supported themes in browser validation.

Sources: A11Y-01; USER-01; SPEC-ZKMAP

Rollback: Keep the existing selection bounds and accessibility model. No backend permission is granted by a selectable cell.

## WA-07-A07 | app/frontend/src/components/zkmap/ZkMapInspector.tsx

Defect D-07; coverage MAP-05,UI-05. Anchor: `export function ZkMapInspector(`.

Observed: The inspector disables its selection control when the observed cell is not classified selectable.

Required: Inspector, grid and manual entry must agree on draft selection while retaining truthful claim observations.

Prerequisites: WA-07-A06

1. Use the same canSelectDraft rule as the grid, including unknown observations and removal at capacity.
2. Keep claim status wording separate from the selection action. Do not call selected unknown cells available or guarantee a winning claim.
3. Keep the detail and mint routes accessible, preserve focus when inspector data refreshes, and show real per-target conflicts without a global coverage banner.

Tests: Extend ZkMapExplorerPage and grid component tests to activate selection through the inspector under unknown read status; verify keyboard focus and mobile layout.

Sources: WA-07-A06; SPEC-ZKMAP; A11Y-01

Rollback: Do not remove the inspector or conceal a known claimed state to enable selection.

## WA-07-A08 | app/frontend/src/pages/zkmap/ZkMapMintPage.tsx

Defect D-07; coverage ZKM-01,ZKM-02,ZKB-01,ZKB-02,REC-03. Anchor: `export function ZkMapMintPage() {`.

Observed: The page groups every non-available preflight item as blocked and disables actions from execution.open, propagating read uncertainty into creation-path closure.

Required: Review and submit exact claim attempts through both modes without requiring a complete map read.

Prerequisites: WA-05,WA-07-A01,WA-07-A02

1. Separate unknown/pending observations from known-invalid targets in the review. Unknown reads cannot be the reason to disable a correctly formed claim attempt.
2. Review exact heights, recipient and fees before submission, with concise truthful claim-outcome uncertainty; do not expose global coverage metrics or say a name is reserved.
3. Keep 24-item chunks, campaign limit, per-chunk request keys, existing funded execution mode, persisted campaign state and accepted-order recovery. Retry the same request rather than allocating another invoice.
4. After broadcast, display pending verification until strict claim receipts establish accepted/conflict/ineligible/reorg states. Never use transaction confirmation alone as claim success.

Tests: npm --prefix frontend test -- src/pages/zkmap/ZkMapMintPage.test.tsx src/pages/zkmap/zkmapCampaignStore.test.ts; native Testnet must cover single and multi-chunk campaigns under an interrupted read projection.

Sources: WA-05; WA-07-A01; SPEC-ZKMAP

Rollback: Preserve local campaign and server order identities; compatibility parsing must precede emission of any new observation fields.

## WA-07-A09 | app/frontend/src/api/zkmap.ts

Defect D-04; coverage MAP-01,MAP-02,MAP-04,MAP-05. Anchor: `export const ZkMapStatusSchema =`.

Observed: The frontend's existing map types are centered on strict read responses; the proposed partial browsing contract needs explicit validation rather than unchecked casts.

Required: Represent node identity and optional projection observations without disguising unknown data.

Prerequisites: WA-04

1. Add a validated zkmap-blocks-draft-v1 schema with network/genesis/nodeTip and nullable projectionCheckpoint, exact decimal heights and existing truthful per-item status variants.
2. Update only the public map browse client to consume the draft response. Leave claim receipts, order outcomes and market settlement evidence on their strict schemas.
3. Keep unknown distinct from available, pending and claimed. Reject mismatched network, malformed heights and guessed placeholder hashes rather than coercing them.
4. Update api/zkmap.test.ts and fixtures to cover both existing strict receipt compatibility and partial browse responses.

Tests: npm --prefix frontend test -- src/api/zkmap.test.ts src/api/zkMapStatus.test.ts; rerun explorer, grid, inspector, detail and mint page tests.

Sources: WA-04-A01 through WA-04-A04; SPEC-ZKMAP

Rollback: Coordinate additive consumer rollout with backend/indexer versions; preserve strict receipt compatibility.

## WA-08-A01 | publicDocs/src/content/docs/verify/coverage.md

Defect D-08; coverage DOC-01. Anchor: `## The four situations`.

Observed: This page promises a public chain-reading status tape and says creating and transferring are gated on the same full-read evidence.

Required: Document the new public creation policy accurately, without claiming unknown reads are complete.

Prerequisites: WA-01 through WA-07 implemented and verified before publishing changed claims

1. Remove the promise of public coverage chrome and the statement that full history is required for creation. Explain missing/stale read results without inventing zero counts.
2. Explain that minting/inscription use per-operation node, signing and safe-funding requirements, while read projections may catch up independently.
3. Replace the blanket wallet refusal description with precise per-outpoint asset protection: unknown funding evidence remains unsafe, but proven inputs do not require an unrelated global scan to finish.
4. Update linked recovery/protect/status pages only where they repeat the obsolete global-admission rule. Preserve technical diagnostic APIs and legitimate ownership safeguards.

Tests: Use this repository's existing package scripts after inspecting package.json; verify links and generated public copy. Do not publish promises before the application acceptance gate passes.

Sources: USER-01; WA-00; SPEC-ZERDINALS

Rollback: Rollback public documentation with the matching application release, without reintroducing the prohibited public header badge as a repair.

## WA-08-A02 | privateDocs/docs/architecture.md

Defect D-08; coverage DOC-02,REG-01,REL-01. Anchor: `### Operation readiness (backend/src/readiness)`.

Observed: Architecture documentation describes global indexer readiness and whole-form gating; it does not separate read observations from creation prerequisites.

Required: Make the read/write separation and its regression requirements durable for future engineering work.

Prerequisites: WA-02,WA-03,WA-04,WA-05,WA-06,WA-07

1. Document node-only creationSigningContext, explicit creation operation classification and scoped funding proof service alongside the existing strict transfer/market path.
2. Update ZkMap and frontend sections for the draft observation API, selectable unknown draft heights, independent authoring access and strict post-broadcast outcomes.
3. List every dependent creation wrapper and both execution modes; link the new regression matrix and explain why an indexer replay cannot become a global mint gate again.
4. Record frontend/backend/indexer/signer release identities separately and preserve accurate native-Testnet acceptance evidence. Historical regtest evidence is not a fresh Testnet pass.

Tests: Run this repository's documented link/content checks and review the API descriptions against the actual implemented contracts before release.

Sources: WA-00 through WA-07; USER-01

Rollback: Keep historical evidence intact and label superseded architecture rather than rewriting past release results.

## WA-08-A03 | app/docs/protocol/ZERDINALS-V1.md

Defect D-08; coverage POL-01,DOC-03. Anchor: `## 14. Launch gates for mainnet creation`.

Observed: The historical launch gate requires indexer-tip agreement and green readiness, which conflicts with the current product instruction when interpreted as a runtime creation prerequisite.

Required: Clarify the product admission policy without changing Zerdinal encoding, ownership or validity rules.

Prerequisites: WA-00,WA-02,WA-03

1. Add an explicitly dated product-policy clarification separating initial release evidence and ongoing read diagnostics from runtime creation admission.
2. State that global scan/replay completeness is not a prerequisite for constructing or signing a valid inscription. Retain actual node/network, signature, exact fee, safe-input and recovery requirements.
3. Do not edit protocol byte layouts, content commitments, ownership transfer semantics or historical release evidence to make the policy appear previously implemented.

Tests: Review the clarification against AGENTS.md and the implemented readiness tests. Verify unchanged protocol vectors after any actual implementation edits.

Sources: USER-01; SPEC-ZERDINALS sections 2,5,8,13; ZIP-225; ZIP-244

Rollback: Do not change a protocol version or historical ruleset for a product-readiness correction.

## WA-08-A04 | app/ops/DEPLOYMENT.md

Defect D-08; coverage REL-01,REL-02. Anchor: `# Production deployment`.

Observed: Observed production frontend, backend and signer revisions differ from each other and from the prepared repository baseline; a repository commit alone does not prove a public fix.

Required: Release only after functional acceptance, with exact component deployment receipts and a tested rollback.

Prerequisites: WA-01 through WA-07 implemented and all applicable acceptance rows passing

1. Use the existing authorized deployment procedure below, preserving unrelated concurrent work. Resolve targeted baseline/configuration drift and release-related PRs before integration; do not repeat the broad audit.
2. Run real native Zcash Testnet journeys for modified creation modes and dependent workflows, plus isolated deterministic failure tests. Bitcoin Signet is not supported by this Zcash stack. Do not use Mainnet transfers to manufacture test evidence.
3. Deploy additive indexer contracts, compatible backend/schema changes, then frontend/docs in the established service order. Validate network separation, required signer authorization and fee policy without exposing credentials.
4. Record public URLs, frontend/backend/indexer/signer revisions, deployment receipts, service health, visible mint/inscribe routes, absent coverage chrome and degraded-read behavior. Roll back unsafe artifacts while preserving accepted orders, signed attempts and recovery.

Tests: Follow verified commands in ops/TESTNET-QUALIFICATION.md and this deployment runbook; no blanket green release claim from component tests or HTTP 200. Final GO requires functional acceptance and completed public Mainnet deployment.

Sources: USER-02; NETWORK-01; public-probes.json; runtime identity observations

Rollback: Capture previous artifact identities and compatible schema recovery before rollout. Never reset an indexer or delete production order data as rollback.
