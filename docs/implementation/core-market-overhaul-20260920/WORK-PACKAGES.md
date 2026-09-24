# Core-aligned market overhaul: work packages

Preparation only. Annotations are applied; executable behavior is unchanged.

## CMO-01 - Core-shaped market descriptors and typed read models

Prerequisites:
Sources: S-CORE, S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET
Findings: F01, F06, N01

1. Create PROPOSED NEW frontend/src/market/marketRegistry.ts and marketModels.ts using Core descriptor fields label, route, tradeMode, marketKind and separate stable product IDs. Do not copy Core numeric protocol IDs, BTC adapters or chain semantics.

2. Define discriminated token, collectible, name and block view models. Key assets by network/genesisHash + protocol/ruleset/registry + immutable assetId; distinguish orderId/orderHash/revision from inscriptionId/collectionKey/targetHeight. Price values stay decimal integer strings or exact rational pairs; missing metadata stays null.

3. Make MarketNav, overview category entry points and route title helpers read one descriptor registry. Preserve every existing deep link, alias, Pro action, licenses and relay; add discoverable Names entry.

4. Keep original API contracts and introduce explicit v1/v2/native-registry adapters. Read models never grant authorization; every action re-enters its existing reviewed execution contract.

Tests: npm --prefix frontend test -- MarketNav.test.tsx MarketProtocolPages.test.tsx MarketV2ProPages.test.tsx
PROPOSED NEW frontend/src/market/marketRegistry.test.ts and marketModels.test.ts

Acceptance: All current market routes remain reachable; separate same-ticker rulesets and same-name registries; null price never renders zero; existing URL aliases work.

Rollback: Additive frontend models only; revert registry consumers together, keep persisted identifiers and signed bytes unchanged.

## CMO-02 - Authoritative paged market catalogs and exact metrics

Prerequisites: CMO-01
Sources: S-APP-MARKET, S-LOT3, S-CORE
Findings: F01, F02, F10, F12

1. Add PROPOSED NEW backend/src/market-v2/catalog.service.ts plus catalog.dto.ts and additive catalog migration. Extend the existing durable analytics projector rather than starting a second scanner or using browser-wide order scans.

2. Define GET /market/v2/catalog/assets and /market/v2/catalog/collections as PROPOSED NEW routes with explicit family/protocol/network, q, sort, limit<=100 and opaque cursor. Responses carry schemaVersion, network, genesisHash, ruleset, asOf/checkpoint, completeness, items, nextCursor and nullable metrics. Keep existing routes compatible.

3. Filter and join before pagination. Use stable keysets tied to query and snapshot identity; reject mismatched/expired cursors explicitly. For exact rational price sorting use integer cross multiplication in a bounded verified ordering projection, never Number or truncated SQL division. Store original decimal values and deterministic tie-break keys.

4. Scope every query to the serving chain and immutable current revision. Apply confirmed-fill analytics exactly once by durable event/transaction identity; unconfirmed, unsafe and reorged rows cannot contribute to settled volume. Recompute only affected assets on cancel, revision, fill and reorg.

5. Validate or remove the currently unused frontend kind query only through compatible controller support, with malformed filters returning specific errors. Do not silently accept a filter the server ignores.

Tests: npm --prefix backend test -- --runInBand book.service.spec.ts analytics.service.spec.ts market-v2.controller.spec.ts
PROPOSED NEW backend/src/market-v2/catalog.mysql.spec.ts under disposable loopback MySQL

Acceptance: An asset beyond order 200 and a collection beyond row 200 remain discoverable; two pages have no duplicates/gaps at a fixed snapshot; identical symbols on different rulesets/networks stay separate; 0/6/18-decimal exact prices rank correctly; replay/restart/reorg preserves totals.

Rollback: Additive schema and API only; deploy backend before UI, retain old reads and event offsets, never delete funded orders or roll back confirmed ledger rows to hide errors.

## CMO-03 - Collection membership, filtering and indexer pagination

Prerequisites: CMO-01
Sources: S-COLLECTIONS, S-NFT, S-INDEXER
Findings: F02, F13

1. Extend the existing indexer collections handler additively with cursor/q and stable slug+parent_id ordering, limit+1, checkpoint/network identity and a continuation token. Retain the no-cursor response compatibility.

2. Use existing zrc721 accepted-mint tables, nft collection-item routes and the separate parent-spend collection_members table. Add a bounded membership batch read only where the existing exact-item/collection APIs cannot support backend filtering; do not infer membership from metadata names or media.

3. Add a backend qualified membership projection keyed by network/genesis/protocol/collectionKey/assetId and checkpoint hash, with replay/reorg invalidation. The backend catalog joins current ask rows to this projection before paging, retaining source v1/v2 and current revision.

4. Serve collection-specific item pages for /market/nfts/:collectionKey and /market/collections/:collectionKey; never download 10,000 global orders plus per-item evidence in a browser. Partial membership must remain explicit and cannot qualify collection offers or whole-collection floors.

Tests: node --test test/zrc721-routes.test.mjs test/zrc721-state.test.mjs (indexer cwd)
npm --prefix backend test -- --runInBand collection-membership.authority.spec.ts collection-membership.authority.zrc721.spec.ts
PROPOSED NEW indexer test/collection-catalog-pagination.test.mjs and backend/src/market-v2/catalog.mysql.spec.ts

Acceptance: Find members/listings beyond 200 and 10,000 unrelated asks; no cross-family or cross-checkpoint memberships; reorg removes disconnected membership; empty differs from unknown; no N+1 item fetches in the browser.

Rollback: Additive API/migration; indexer before backend before frontend. Restore consumers before removing a read extension; never rebuild membership from a sampled list or change protocol winning/ownership rules.

## CMO-04 - Network-bound reads, request lifetime and paging

Prerequisites: CMO-01
Sources: S-APP-MARKET, S-ZKMAP, S-ZEBRA
Findings: F03, F04, F05, F11

1. Create PROPOSED NEW frontend/src/market/useMarketContext.ts around appNetwork and ChainCoverageContext. Resolve selected versus serving network/genesis before publishing data; a network selector is not an endpoint router. Keep default Mainnet unchanged.

2. Key catalog/book/metadata/activity/SSE state by verified network, genesis, protocol/registry/ruleset, asset/collection and query snapshot. On identity change abort all first-page, retry and append reads, close old streams, clear unsigned selection and reject stale responses using a monotonic request generation.

3. Create PROPOSED NEW useMarketPagination.ts with single-flight paging, AbortSignal forwarding, stable identity dedupe that updates the seen set while appending, cursor-loop rejection, stale snapshot reset and bounded retry. Keep settled order/recovery records under their original network.

4. Extend ApiError additively to retain safe structured error.code; distinguish malformed query, unsupported operation, missing authority and transport outage. Preserve existing status/message consumers.

Tests: npm --prefix frontend test -- useMarketStream.test.tsx MarketZkMapPage.test.tsx appNetwork.test.ts names.test.ts
PROPOSED NEW frontend/src/market/useMarketPagination.test.tsx including deferred out-of-order promises

Acceptance: Delay page two, switch network/filter, resolve the old page: no stale data publishes; repeated row within one page is rendered once; disconnected streams cannot mutate new state; unknown serving network disables signing without pretending to switch backend.

Rollback: Frontend-state migration only; preserve accepted transaction/order identities and recovery capabilities. Never change production network defaults, share caches across genesis hashes or weaken wallet network checks.

## CMO-05 - Shared market terminal, gallery and responsive design primitives

Prerequisites: CMO-01
Sources: S-CORE, S-APP-MARKET
Findings: N01

1. Create PROPOSED NEW frontend/src/components/market/MarketTerminalLayout.tsx, MarketHubLayout.tsx, MarketToolbar.tsx, MarketStatsStrip.tsx and MarketShell.module.css. Translate Core component slots and sizing into the existing React/TypeScript/CSS-module design system; do not add Redux, MUI, Tailwind or BTC adapters merely to copy markup.

2. Use the Core main-content plus activity/action rail structure: token hub table with 240-300px rail; detail terminal 8/4 or 9/3 columns; gallery with toolbar, optional bounded filters and art cards. At narrow widths put the actionable summary first, then book/grid, then secondary activity.

3. Retain existing application tokens, fonts, themes, Page/Panel/Button/Notice and identifiers. Scope styles to market components. Add clear focus, labels, 44px touch targets, stable aspect ratios, non-color status text, reduced-motion behavior and no horizontal page overflow.

4. Define loading, no-matches, truly empty, stale, unavailable, pending and rejected views in shared primitives. Charts show only real confirmed trades or an explicitly labeled live book view, never simulated price history.

Tests: npm --prefix frontend test -- MarketNav.test.tsx MarketPage.test.tsx tokensContrast.test.ts
PROPOSED NEW frontend/src/components/market/MarketTerminalLayout.test.tsx and frontend/tests/market-overhaul.spec.ts (verify existing Playwright testDir before creating)

Acceptance: All four requested families share Core visual hierarchy while retaining Zcash identity and actions; keyboard, 390/768/1440px and both supported themes are usable; missing data does not fabricate values.

Rollback: Presentation-only first rollout; revert shell and consumers together. No global theme reset, new signing implementation or removal of an existing route.

## CMO-06 - Token tables and trading terminal

Prerequisites: CMO-02, CMO-04, CMO-05
Sources: S-CORE, S-LOT3, S-ZIP244, S-ZIP317
Findings: F01, F03, N01

1. Replace AskBook discovery grouping of a single 200-order page with the authoritative token catalog. Present Core-like sortable rows: verified name/ticker, protocol, exact ask/lot information, listed quantity and nullable windowed volume; add URL-backed q/sort/period and cursor paging.

2. Create PROPOSED NEW TokenMarketTerminal.tsx shared by MarketTokenDetailPage and MarketZRuneDetailPage. Keep metadata adapters separate, use the existing BookOrderRows, LotAskComposer and DepthChart behind common slots, and add verified trade activity/price history only when served.

3. Preserve full-lot v3 and legacy v2 distinctions, exact total/quantity ratios, sealed fee allocations, unavailable precision state, activation/readiness, owned lots and buyer review. Do not promise partial fills, bids or swaps where the protocol/authority is not executable.

4. No heuristic risk/liquidity score is transferred from Core without a separately specified, labeled data definition. Numbers used for chart pixels must never feed price labels or transaction decisions.

Tests: npm --prefix frontend test -- MarketProtocolPages.test.tsx MarketOrderPage.lotAsk.test.tsx MarketV2ProPages.test.tsx
npm --prefix packages/zcash-tx test (includes build; approved runner only; retain market-lot-total.test.mjs and golden-hash suite)

Acceptance: Every ZRune and both ZRC-20 rulesets remain independently searchable and tradable; 18-decimal lots display exact total, metadata cannot change agreed price; owned seller actions and buyer review survive the new layout.

Rollback: Migrate one consumer at a time behind compatible read adapters; preserve signed envelopes, route keys, price math and current committed ownership UX.

## CMO-07 - NFT and collection galleries with authoritative item books

Prerequisites: CMO-02, CMO-03, CMO-04, CMO-05
Sources: S-CORE, S-NFT, S-COLLECTIONS, S-APP-MARKET
Findings: F02, F06, N01

1. Use one Core-style collection gallery shell with protocol-discriminated cards; Zordinal parent-spend collections and ZRC-721 collections remain different identities even with identical names.

2. Replace readNftBook global scanning and LegacyCollectionBook browser intersections with collection-scoped catalog pages. Show verified item artwork, collection membership, listing state/price and owner actions; never infer membership from an image or name.

3. Reuse NftCollectionArtwork, NftItemArtwork, NftThumb and existing safe same-origin media descriptors. Preserve pending/failed/retry states, source identity reset and bounded fetch concurrency; remote metadata is not executable markup.

4. Support grid/list preference, URL filters and accepted trait definitions only when authoritative traits are actually served. A partial index cannot provide a complete floor or sweep eligibility. Keep cart/offer/item-review routes wired to their existing execution validators.

Tests: npm --prefix frontend test -- MarketNftsPage.test.tsx NftMediaThumbs.test.tsx MarketV2Execution.test.tsx
PROPOSED NEW frontend/src/pages/MarketCollectionPage.catalog.test.tsx with >200 members and >10000 unrelated orders

Acceptance: Full catalog remains discoverable, no global order scan in browser, family identities never merge, media failure cannot hide ownership/trading controls, absent price is never a zero ask.

Rollback: Additive read migration and presentation only; revert consumers before catalog APIs. Do not drop legacy v1 listing access, cart recovery or accepted membership history.

## CMO-08 - Names market layout and registry-specific discovery

Prerequisites: CMO-01, CMO-04, CMO-05
Sources: S-CORE, S-NAMES-MARKET, S-NAMES-PHP
Findings: F05, F06, N01

1. Apply the Core NamesMarketHub visual hierarchy: activity rail, compact search/sort/length/price toolbar, 4:3 name-preview cards and exact ask metadata. Use normalized label plus explicit registry badge and proof freshness.

2. Keep zcashnames-zns1 and zcashme-zns in separate scopes. zcashme-zns has no native listing/buy operation in the reviewed protocol, so show supported resolve/register/manage entry points without inventing a market or treating outages as unsupported.

3. Add bounded server-side names listing filters/paging tied to registry/network/checkpoint; preserve legacy unfiltered response until consumers migrate. Do not download the whole registry or imply browser filtering covers the whole market.

4. Only offer label-character/zone/length filters valid under the selected registry. Do not copy Core emoji or Bitcoin-specific name properties into the ASCII zNS1 protocol. Actions use CMO-10 native registry reviews, never v2 inscription checkout.

Tests: npm --prefix frontend test -- NamesPages.test.tsx names.test.ts MarketNav.test.tsx
npm --prefix backend test -- --runInBand names.controller.spec.ts
PROPOSED NEW frontend/src/pages/names/NamesMarketPage.catalog.test.tsx

Acceptance: Names is reachable from Market navigation; registry changes restore URL state and clear stale data; unsupported code is exact, transport/validation errors remain distinct; same labels in two registries cannot merge.

Rollback: Retain native name operation IDs, registry normalization and existing routes; layout rollback cannot drop operation recovery or misrepresent registrar custody.

## CMO-09 - Native Names ingestion, authority and network semantics

Prerequisites: CMO-01
Sources: S-NAMES-PHP, S-NAMES-ROOT, S-NAMES-REGISTRAR, S-ZIP302, S-INDEXER
Findings: F07, F08, F14

1. Wire the existing optional orchardNoteReader into the owned indexer scanner, using a pinned supported Orchard note-decryption implementation against the registry viewing capability. Authenticate reader output, enforce network/birthday and match action index/cmx against owned-node transactions; checkpoint/reorg with the single existing scanner. Do not replace owned infrastructure with a hosted resolver.

2. Use the pinned official Protocol.php semantics and network configuration: Mainnet zNS, Testnet tzNS. Parameterize the backend signed-message builder and indexer decoder by verified network/ruleset, preserving Mainnet golden bytes. Never accept both prefixes indiscriminately on one chain.

3. Validate zNS1 compact SMT proofs against independently verified anchor contract/chain metadata and current owned-node checkpoint. The published Mainnet contract now exists; the old source comment saying it is unpublished is obsolete. isRootValid alone does not establish latest freshness. Record contract code/version and separate Testnet authority.

4. Do not copy AGPL implementation into private product code without addressing licensing. Use a separately deployed compatible reader/reference implementation with explicit protocol adapter and dependency register. For zcashme existing resolution/registration preservation also requires its actual commitment-verification kernel; do not claim kernelVerified=true from JSON shape.

5. Backfill from a verified registry birthday into isolated state, compare deterministic roots and reconcile reorgs, then qualify authoritative readback. Public viewing capability may be retrieved securely but secrets/private memos must not enter logs or ZIP. Missing Testnet registrar/root/viewing authority is an explicit blocker, not permission to create a fake authority.

Tests: node --test test/name-registries-decoders.test.mjs test/name-registries-routes.test.mjs (indexer cwd)
npm --prefix backend test -- --runInBand zcashnames-protocol.spec.ts zcashnames.adapter.spec.ts
PROPOSED NEW indexer test/name-registry-reader.test.mjs; real Testnet registrar/anchor prerequisite must be recorded

Acceptance: Correct chain prefix accepted and cross-network prefix rejected; owned scanner provides real authenticated notes, stable root/checkpoint through restart and reorg; absence never inferred from missing reader; authority outage fails closed.

Rollback: Deploy reader/identity before enabling read/write capability. Preserve journal/backfill checkpoint, stop new admissions on unsafe authority but keep recovery; never share Mainnet/Testnet viewing state or DB.

## CMO-10 - End-to-end native Names payment, signing and recovery

Prerequisites: CMO-04, CMO-08, CMO-09
Sources: S-NAMES-MARKET, S-NAMES-PHP, S-ZIP302, S-ZIP321, S-ZIP317, S-NAMES-CUSTODY
Findings: F07, F08, F14

1. Implement a registry-native payment intent, not a generic inscription swap. Freeze registry/network/genesis/name/nonce/owner-or-buyer key/command bytes/registrar recipient/exact price and fee review with a short expiry. Revalidate price/owner/checkpoint immediately before signing and send.

2. Provide an explicit registry-key signing capability separate from Zcash spending authorization and creator identity proof. Keep keys on the user-controlled wallet/secure client; never derive an Ed25519 registry signature by pretending a transparent secp256k1 signature is equivalent. Retain advanced externally signed commands without making pasted signatures the only usable path.

3. Integrate a real shielded wallet send/review capability or the existing isolated shielded authority once fully qualified. Emit a verified ZIP321 request/QR for supported external wallets as a real completion path only when it carries the exact memo and recipient and is followed by authenticated observed transaction association/readback. A payment URI or manual success button is not payment evidence.

4. Add names.operation intent association, idempotency, durable submission state, authenticated note observation and final registry readback. Distinguish prepared/submitted/confirmed/registry-settled/conflict/refund-or-credit-pending; allow restart/reconnect recovery without duplicate payment. Never mark settlement from a generic payment webhook alone.

5. Preserve native registrar custody: seller proceeds and competing/invalid buyer refunds may be registrar credits under the official marketplace model. Surface custody/fees and authoritative credit status, then actual supported withdrawal recovery; do not invent an automatic on-chain refund. Exact credit/withdraw API support is an unresolved targeted upstream requirement until inspected.

6. Qualify NameOperationsService settlement/payable types from actual capability instead of literal false only after the real pipeline passes. The generic shielded rail has receiver/scanner/spend prerequisites; do not flip ready to true, bypass it or charge to an unrelated platform address.

Tests: npm --prefix backend test -- --runInBand names.controller.spec.ts shielded-payment.service.spec.ts
npm --prefix frontend test -- NamesPages.test.tsx signRequests.test.ts signRequests.test.ts
PROPOSED NEW backend/src/name-registries/name-settlement.mysql.spec.ts and frontend/tests-live/names-market-testnet.spec.ts

Acceptance: List, delist, buy, conflicting buy and supported credit/refund recovery each finish through real Testnet transactions, authoritative registry state and reload; no duplicate debit, key leakage, substituted memo/recipient or fabricated refund.

Rollback: Enable only after actual authority qualification; disable new intent admission on incident while preserving submitted transaction/credit recovery and original network. Additive schema, keep payment/registry journals and backups.

## CMO-11 - Bitmap-style ZkMap trading without changing ZkMap rules

Prerequisites: CMO-01, CMO-04, CMO-05
Sources: S-CORE, S-ZKMAP, S-APP-MARKET
Findings: F04, F11, N01

1. Use Core BitmapTradePage/CollectionMarketView as the composition reference: district grid, top metrics, exact block-name search, status/sort/filter toolbar, My items/List action, real activity and a side panel. Keep the existing ZkMap district art and yellow-accent design tokens rather than importing Bitmap imagery.

2. Retain existing For sale/Sold/All discovery lenses and qualified server metrics. If adding digit/height ranges, derive only exact height properties; do not invent rarity, area, supply, geography or sale history from artwork. Bind every view and cache to network/genesis/checkpoint.

3. Route owned winner listing through existing v1 Zordinal listing/review; buying uses the listing execution receipt. No new zkmap transfer protocol or name-registry operation is introduced. Burned/shielded winners remain occupied, loser claims are not districts.

4. Use the shared page controller for every initial/retry/more path, keeping abort plus generation checks. Prefer existing batched winner observations when validated, with receipt detail fallback; image hashes/versioned cache identify artwork, not current ownership.

Tests: npm --prefix frontend test -- MarketZkMapPage.test.tsx ZkMapListingCard.test.tsx ZkMapMarketMetrics.test.tsx
node --test test/zkmap-market-consistency.test.mjs test/zkmap-routes.test.mjs (indexer cwd)
PROPOSED NEW frontend/tests/market-overhaul.spec.ts ZkMap desktop/mobile cases

Acceptance: Bitmap-like hierarchy is visible with real ZkMap assets; exact height search and stated scope metrics work beyond one page; retry after network switch cannot publish old-chain rows; stale winner/unsafe/pending cards never become guaranteed buys.

Rollback: Presentation and compatible reads only. Preserve zkmap-v1 grammar, winner ordering, terminal occupancy, art versions, v1 listing IDs and accepted mint/payment recovery.

## CMO-12 - Preserve wallet review, settlement and all market order families

Prerequisites: CMO-01, CMO-04, CMO-06, CMO-07, CMO-11
Sources: S-APP-MARKET, S-LOT3, S-ZIP244, S-ZIP225, S-ZIP317
Findings: N02

1. Keep marketReadModel action dispatch explicit: v1 listing -> MarketListingPage; v2 order -> MarketOrderPage; native name -> NameOperation; owned lot -> LotAskComposer. Read model prices/states must be revalidated at execution and never treated as authority.

2. Preserve creator/principal authorization, seller signature commitments, buyer economic review, asset-free funding rules, fee allocation, network/branch context, input reservation, idempotent execution ticket and persisted recovery. Wallet/account/network change invalidates unsigned review but not accepted order recovery.

3. Inventory and separately retest item ask/offer, collection criteria offer, lot ask, book placement, English/stepped/smooth auction, bulk cart/sweep, route execution, policies, cancellations and legacy listing paths where offered. Existing unavailable paths remain required work when offered; do not hide them to make the overhaul pass.

4. Reuse MarketExecutionWorkerService and existing durable execution/observation states. For each family verify pending->confirmed->indexed/settled outcome and reorg recovery, not merely broadcast. Failure handling must preserve ownership/funds and route users to the same operation ID.

5. Preserve all wallet adapters and walletless/connected/read-only distinctions; do not claim a signing capability from a connection alone. Test each offered integration using actual capabilities and network, plus rejected signatures, stale quotes and disconnected sessions.

Tests: npm --prefix frontend test -- MarketV2Execution.test.tsx MarketV2ProPages.test.tsx MarketOrderPage.recovery.test.tsx LotAskComposer.test.tsx webWalletMarket.test.ts
npm --prefix backend test -- --runInBand kind-execution.service.spec.ts route-execution.service.spec.ts execution-observation.spec.ts authorization.spec.ts
Real TESTNET matrix in ACCEPTANCE.md; isolated MySQL execution/worker fault suites separately labeled

Acceptance: Every existing offered market family/action is retained and receives its own result/evidence; no false filled state on broadcast; double-submit/restart/reorg and buyer/seller authorization preserve exact funds and ownership.

Rollback: Do not edit frozen v1/v2 signature layouts or v3 lot total semantics for visual parity. Keep durable execution rows, receipts and recovery while rolling back new admission/UI; never reset production data or weaken permissions.

## CMO-13 - Unified market activity and truthful analytics

Prerequisites: CMO-02, CMO-03, CMO-09, CMO-12
Sources: S-CORE, S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET
Findings: F09, F12

1. Add PROPOSED NEW backend/src/market-v2/activity-read.service.ts as a read adapter over existing v1 fills/events, v2 confirmed fills and native registry events; keep each source ID/state/proof, network/genesis, asset family and event timestamp. Do not double-count one settlement seen by two projections.

2. Expose paged, family/asset/collection/registry-scoped public activity with no private memo/signature/credentials. Public cancellation/listing/submitted events are not sales; personal recovery data stays behind existing authorization.

3. Feed overview and Core-style rails from this adapter, with explicit event labels and correct family detail links. Coalesce SSE invalidation and use bounded cursor reads rather than polling every rail independently.

4. Compute floor/listed/book value/verified trade volume as different metrics. Freeze period/denomination/source/completeness metadata; no zero when unavailable, no liquidity/risk score copied from heuristics, no chart fallback pretending asks are sales.

Tests: npm --prefix backend test -- --runInBand analytics.service.spec.ts market-v2-events.spec.ts
npm --prefix frontend test -- MarketPage.test.tsx AddressMarketActivity.test.tsx useMarketStream.test.tsx
PROPOSED NEW backend/src/market-v2/activity-read.mysql.spec.ts

Acceptance: Each confirmed fill appears once after refresh/reconnect; canceled/submitted/reorged events never count as settled sales; all family links point to the correct detail identity and unavailable metrics remain explicit.

Rollback: Read-only compatible endpoint rollout; preserve original event journal and versioned cursors. Revert consumers before endpoint removal and never relabel historical events to inflate metrics.

## CMO-14 - Reproducible checks, browser validation and Testnet acceptance

Prerequisites: CMO-06, CMO-07, CMO-08, CMO-10, CMO-11, CMO-12, CMO-13
Sources: S-APP-MARKET, S-CORE, S-ZEBRA
Findings: F15, N03

1. Provision the accepted candidate on an approved runner using Node24.19.0/npm11.17.0 and each checked-in lockfile. Shared SERVER node_modules differ from locks and are joined read-only for preparation checks only; never npm ci through a junction or change locks to match stale installed folders.

2. Keep frontend/playwright.config.ts SERVER/PowerVPS restriction. Add PROPOSED NEW frontend/tests/market-overhaul.spec.ts to the existing gates testMatch; use its fixture-based visuals for responsive/accessibility only, not blockchain acceptance.

3. Add PROPOSED NEW frontend/playwright.market-live.config.ts with no webServer and explicit MARKET_LIVE_URL, plus frontend/tests-live/market-testnet.spec.ts. Use one existing authorized Testnet app endpoint and dedicated page; no fixture route interception, fake signing or forced payment states.

4. Execute every required operation/role/wallet/entry-path row in coverage.csv, with actual revision/time/network, exact tx/order/receipt identity, authoritative ownership/registry readback, persisted state and reload/reconnect evidence. Signet cannot execute Zcash, so use actual Zcash Testnet; isolated controlled fault tests remain labeled LOCAL.

5. Run targeted regression plus complete downstream suite under the locked environment, retain failures and coverage denominator, and compare all modified UI states at390/768/1440px in both themes with keyboard/touch. Do not regenerate baselines merely to accept a defect.

Tests: Existing verified local commands recorded verbatim in evidence/test-runs.json
Approved runner: npm --prefix frontend test; npm --prefix frontend run build; npm --prefix backend test -- --runInBand; npm --prefix backend run lint; npm --prefix backend run build
Approved runner: node frontend/node_modules/@playwright/test/cli.js test --config frontend/playwright.config.ts --project=gates; proposed live config after implementation

Acceptance: No annotation-induced syntax/output regression; every required functional row PASS on supported real environment and every repaired/dependent flow retested before release; local unit counts never become E2E coverage.

Rollback: No runtime/config/host-guard changes for preparation; retain isolated test-owned wallets/data and secrets outside logs. Tests may destroy only explicitly isolated test databases, never production.

## CMO-15 - Documentation, integration and gated public Mainnet release

Prerequisites: CMO-14
Sources: S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET, S-NAMES-REGISTRAR
Findings: F16, N03

1. Reconcile only targeted baseline drift and legitimate related PRs/local commits from baseline.json. Preserve the three original dirty frontend files and unrelated worktrees. Core is a pinned reference, not a repository to copy/deploy blindly.

2. Update public buying/selling, names and ZkMap guidance and private product/API/release runbooks to the accepted actual routes, data scope, custody and supported operations. Do not generalize trustless inscription swaps to native registrar name purchases.

3. After all applicable coverage rows PASS, produce immutable release artifacts from accepted commits, prove source/build identity, validate separate Mainnet network/genesis/ZIP parameters/endpoints/authorities/schema/credential requirements offline, and take needed backups. Do not perform Mainnet functional transactions or spend funds to manufacture evidence.

4. Deploy compatible indexer/read schema before backend catalog/authority/worker changes and frontend; keep production writes gated until functional acceptance. Then merge/push only reviewed legitimate release work through established CI/CD, expose all required routes and record actual deployment receipts, serving revisions, health and public availability.

5. Use existing ops/DEPLOYMENT.md and private runbooks for exact authorized deployment machinery. No merge/deployment occurs in preparation. Unsafe rollout: stop new admissions and roll back consumers first while accepted-order workers, recovery and journals remain intact; no destructive down migration with pending data.

Tests: Existing scripts/verify-deployed-assets.mjs against the actual published origin/artifact, after accepted release only
Read-only public /.release and /api/ready checks; verify backend/indexer serving revision separately
Functional GO requires every required row PASS; final GO additionally requires RELEASED: PUBLIC MAINNET evidence

Acceptance: The overhaul is implemented, tested and publicly released through all actual services after acceptance; a ZIP, build, merged PR, private preview or disabled feature is not public release.

Rollback: Keep prior immutable artifacts/config backups and compatible schema. Roll back unsafe admission/UI in dependency order while preserving real funds, accepted operations, authoritative indexer history and recovery.
