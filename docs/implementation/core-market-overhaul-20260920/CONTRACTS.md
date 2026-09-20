# Execution-ready read and state contracts

All paths labeled PROPOSED NEW are implementation instructions, not installed routes. Existing clients remain compatible during deployment.

## Market descriptor and view model

Descriptor: stable product ID, label, route, tradeMode, marketKind, protocol/ruleset/registry and supported actions. Discriminant is token, collectible, name or block. Identity includes verified network/genesis plus immutable native identity; orderId, orderHash and revisionId remain separate. Money is a canonical decimal integer string. Unit prices may be exact numerator/denominator pairs, never a floating-point transaction value. Unknown metadata, price, volume and history remain null with a reason.

## PROPOSED NEW catalog reads

GET /market/v2/catalog/assets and /market/v2/catalog/collections accept allowlisted family/protocol/network, q, sort, limit<=100 and opaque cursor. Response: schemaVersion, network, genesisHash, ruleset where applicable, asOf/checkpoint height+hash, completeness with reason, items and nextCursor. Each item includes native identity, qualified metadata, exact ask/quantity, source v1/v2, current revision and nullable scoped metrics.

Filter and join before pagination. Cursors bind version, query digest, chain, snapshot and deterministic last key. Reject query/network/snapshot mismatch explicitly; do not silently restart or present a sample as the catalog. Untrusted cursors are bounded and validated, never SQL fragments. Price ranking uses exact integer rational comparison and deterministic ties. Unknown/malformed/reorged source data cannot silently become zero, empty or executable.

Collection membership comes from accepted NFT mints or parent-spend evidence according to protocol. Partial membership may be displayed as partial but cannot qualify full-collection floors, criteria offers or sweeps. Indexer legacy collection pagination is additive: stable slug+parent_id order, parameterized q, limit+1 and checkpoint-bound continuation.

## Network and request lifetime

A selected network is not evidence that /api and /idx switched. Verify served network/genesis before publishing data or authorizing signing. Initial/retry/append calls share AbortSignal and request generation. Dedupe within and across pages, detect repeated cursors, close old SSE, coalesce invalidations and reject stale completions. Preserve submitted order recovery under its original chain; only unsigned selections are cleared.

## Native name intent

PROPOSED NEW name-settlement service freezes registry, chain/genesis, normalized name, nonce, registry signer, exact signed memo, registrar recipient, zatoshi price, fee review and expiry. The registry signature, creator principal proof and spending approval are different authorities. Mainnet zNS and Testnet tzNS are separate signature domains. State progresses from prepared to submitted to confirmed to registry-settled only on authoritative evidence; conflict, stale price, unavailable authority and registrar credit/withdraw recovery are distinct.

A ZIP321 URI/QR or wallet launch is not payment evidence. Caller-supplied txid/value is not an authenticated note observation. A registrar credit is not an on-chain refund. The actual HTTPS withdrawal schema must be qualified from the upstream service; do not invent it.

## Error and privacy contract

Preserve status plus safe structured error.code/correlation ID. Only NAME_MARKET_UNSUPPORTED means that operation is unsupported;400 validation,503 authority and network failures are separate. Never expose credentials, private memos, signatures or recovery capabilities in public activity/logs. Read models and charts never replace final economic review.
