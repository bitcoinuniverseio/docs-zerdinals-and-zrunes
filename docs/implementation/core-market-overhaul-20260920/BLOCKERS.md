# Blockers and exact next checks

Preparation artifacts are delivered, but complete native research, execution and public release are not established. Do not describe this as functional GO.

| ID | Affected scope | Evidence / missing prerequisite | Next executable action and decision rule |
|---|---|---|---|
| B01 | Locked build and visual gate | Installed dependency versions differ from lockfiles; SERVER browser guard forbids Playwright | Use existing approved runner, provision isolated lockfile dependencies, run exact recorded tests plus builds and proposed visual suite; do not override guard or install through junctions |
| B02 | Native Testnet acceptance | No real native workflow, funded isolated wallet or end-to-end receipt executed in this preparation | Resolve authorized Zcash Testnet app/node/indexer/signers, create isolated test wallets and obtain faucet funds, then execute coverage rows with actual readback; no fake authority or mainnet test spending |
| B03 | Native Names ingestion | src/main.mjs omits orchardNoteReader; exact deployed cause of503 is unresolved | Implement CMO-09 and verify reader provenance/actionIndex/cmx/value/checkpoint against owned node before treating any result as complete |
| B04 | Names payment and credit recovery | Literal unavailable/payable=false, no end-to-end shielded name payment; generic rail not qualified | Implement CMO-10 with real registry and spending approvals, authenticated observation and durable readback; do not flip capability flags |
| B05 | Native registry authority/version | Testnet registrar, anchor/prover and native zcashme kernel not pinned/qualified | Obtain authoritative versions/configurations and verify real network deployment; a directory API or hosted resolver is not native proof |
| B06 | Names withdrawals | Official custody docs describe signed HTTPS requests but exact service schema is not established | Inspect actual upstream integration contract and retain request/recipient evidence; do not invent refund endpoint or claim automatic on-chain refund |
| B07 | Production identity /503 | Frontend marker observed, backend/indexer revision and runtime cause not independently established | Read authorized deployment receipts, service build identity and relevant redacted logs; compare actual configuration/source without inferring identity from frontend |
| B08 | Existing PR integration | PR278 documents private-content Vault encryption custody; not marketplace deployment | Recheck targeted PR status and preserve legitimate unique work during gated integration; no blind merge and no prep deployment |

Browser screenshots and native E2E evidence are NOT TESTED, not failed because mainnet tests were omitted. A read-only HTTP200 is not full acceptance. Functional GO needs every required outcome and recovery path; final GO also needs actual public Mainnet release.
