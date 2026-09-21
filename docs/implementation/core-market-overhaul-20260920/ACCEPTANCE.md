# Acceptance and evidence protocol

## Environments

Zcash workflows use real Zcash TESTNET because Bitcoin SIGNET cannot execute Zcash V5/Orchard or these native protocols. Mainnet remains the production default. Separate keys, addresses, signatures, transactions, endpoints, genesis hashes, database/cache and indexer state. Controlled local tests are allowed for deterministic faults but are labeled LOCAL, not public-network E2E. No mainnet functional transactions or mainnet funds are required for testing.

## Required per-operation execution

Start with the actual UI or API consumer and intended role. Record candidate commit/artifact, locked dependency identity, UTC time, network/genesis, prerequisites and isolated inputs. Exercise validation, exact request, principal/ownership authorization, construction and user approval, submission, durable effects, required confirmation, protocol indexing and authoritative readback. Finish with the correct usable UI/consumer result across refresh and reconnect and the next offered lifecycle operation.

For each creation/mint/transfer/list/buy/cancel/credit/withdraw/recovery path record actual IDs and evidence separately. Read-only operations begin at the authoritative source and end in the real consumer; do not invent a transaction requirement. Include wrong permissions/network, rejected signing, insufficient funds, stale quote/nonce/ownership, duplicate submission, timeout after broadcast, unavailable authority, delayed indexing, worker restart and reorg as applicable. Never fault-inject into production.

## Coverage rules

coverage.csv/json contains938 NOT TESTED rows at distinct levels:437 journeys,297 HTTP contracts,136 routes,54 indexer branches and14 service preservation entries. These are inventory and execution obligations, not938 executed tests or938 distinct blockchain journeys. Source findings are FAIL in findings.json; component passes do not change these rows. Preserve the denominator; only evidence-backed NOT APPLICABLE exclusions are allowed, never offered-but-broken features. Expand an inventory row into finer operations when targeted implementation reveals a genuinely distinct path.

Every final row must state PASS, FAIL, BLOCKED, NOT TESTED or evidence-backed NOT APPLICABLE, actual network, revision/time, result, evidence, repair state and exact remaining prerequisite. Preserve prior valid evidence only while relevant code/config/dependencies are unchanged.

## Existing preparation evidence

67 frontend and35 backend component/unit tests passed before and after comments. Commands and logs are in evidence/test-runs.json. They ran against installed dependencies recorded in research/dependency-register.json, not a freshly locked release environment. Annotation-only source equality, syntax and diff checks are separately recorded.

## Implementation runner commands

Run package-defined tests/builds from the exact accepted worktree on the approved runner. Frontend: npm --prefix frontend test; npm --prefix frontend run build. There is no frontend lint script. Backend: npm --prefix backend test -- --runInBand; npm --prefix backend run lint; npm --prefix backend run build. SDK: npm --prefix packages/zcash-tx test (includes build). Indexer existing focused node --test commands are listed per work package. Private docs have no package.json. Public docs have package scripts for copy/public-safety/status/llms/markdown.

Implement proposed frontend/tests/market-overhaul.spec.ts and add its name to the actual Playwright gates testMatch. Use the approved browser runner; preserve SERVER guard. For native execution use proposed playwright.market-live.config.ts with explicit existing MARKET_LIVE_URL and no webServer or route fixtures. Record responsive390/768/1440px, both themes, keyboard/focus/touch and loading/empty/stale/pending/failure/retry states.

## GO

Functional GO: every applicable required operation passes with full outcome evidence, every work package implemented/verified and all affected/dependent regressions pass. Final GO: functional GO plus completed public Mainnet deployment and actual release receipts/public exposure. Missing mainnet functional tests is not a blocker; missing real authorities, broken public routes or unimplemented functionality is.
