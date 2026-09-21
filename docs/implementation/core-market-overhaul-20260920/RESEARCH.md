# Research and source register

Access date: 2026-09-20. Repository pins identify reference source, not deployed versions. Snapshot hashes and exact retrievable references are in research/source-snapshot-register.json and research/upstream-pins.json.

## S-CORE

User-selected design/data reference; core @ fa765d8725c386168b185e31d1ca1995144f5913

Core registry, terminal, token split layout, collection view, NamesMarketHub, BitmapTradePage. No BTC IDs or trading semantics.

## S-APP-MARKET

Owned application protocol; app @ 3b67b7cee042ae957db6b5135a1f18d7a674a480

docs/protocol/ZMARKET-ORDERS-V1.md; ZMARKET-ORDERS-V2.md; actual backend execution.

## S-LOT3

Owned normative full-lot specification; app @ 3b67b7cee042ae957db6b5135a1f18d7a674a480

docs/protocol/ZMARKET-LOT-ASK-V3.md; exact total and rational price; legacy v2 preserved.

## S-COLLECTIONS

Owned collection protocol; app @ 3b67b7cee042ae957db6b5135a1f18d7a674a480

docs/protocol/COLLECTIONS-V1.md; separate parent-spend membership.

## S-NFT

Owned ZRC-721 implementation; indexer @ cee31a83e886767e457a75022dd0153c0e1f9fcb

src/zrc721/state.mjs and test/zrc721-state.test.mjs; accepted-mint evidence, not metadata matching.

## S-ZKMAP

Owned ZkMap specification; public @ 297c86f8a6304d992d9a73c0039f1109c6130b7b

src/content/docs/protocols/zkmap.md; winner is traded as a Zerdinal, artwork is not ownership.

## S-INDEXER

Owned indexer integration contract; indexer @ cee31a83e886767e457a75022dd0153c0e1f9fcb

docs/name-registries.md; src/main.mjs; src/chain/scanner.mjs; src/api/server.mjs.

## External primary sources

### S-ZIP244

URL: https://zips.z.cash/zip-0244
Classification: normative
Retrieval status: 200
Snapshot: research/external/S-ZIP244.txt
SHA256: 0b2ad7492117aa0f8ae463acff3803c553c2555df271b55a7fcbec2c97072ecc

Zcash V5 signature and transaction digests

### S-ZIP225

URL: https://zips.z.cash/zip-0225
Classification: normative
Retrieval status: 200
Snapshot: research/external/S-ZIP225.txt
SHA256: 38b27c929679cfa3811a962873562f83370426148904563d52978e40d3b09ca4

V5 wire format

### S-ZIP317

URL: https://zips.z.cash/zip-0317
Classification: normative
Retrieval status: 200
Snapshot: research/external/S-ZIP317.txt
SHA256: f8dc23604035ce0dc7b0e5ef77825678db947e00cdb9999013a6c6ee55cea9c9

Logical-action fees

### S-ZIP302

URL: https://zips.z.cash/zip-0302
Classification: normative
Retrieval status: 200
Snapshot: research/external/S-ZIP302.txt
SHA256: 428e904de13b5da336398c903d699546aaca44a603103a113f3c2369cba652f4

Memo wire encoding

### S-NAMES-MARKET

URL: https://docs.zcashnames.co/supported-operations/marketplace/
Classification: owner documentation
Retrieval status: 200
Snapshot: research/external/S-NAMES-MARKET.txt
SHA256: c789f4cb725688a228b4a450a7b0a4ef1cc87c5302d7a407d186341c1c2e4cd0

Native custodial LST ULT BUY, exact price, credit/refund

### S-NAMES-ROOT

URL: https://docs.zcashnames.co/zk-proofs/verifying-proofs/
Classification: owner documentation
Retrieval status: 200
Snapshot: research/external/S-NAMES-ROOT.txt
SHA256: 7194990c2375bb28286c028cefd5346d2c6aa14412e390cd9e1e08f354833723

Compact SMT and accepted anchor roots; independent freshness

### S-NAMES-REGISTRAR

URL: https://docs.zcashnames.co/
Classification: owner documentation
Retrieval status: 200
Snapshot: research/external/S-NAMES-REGISTRAR.txt
SHA256: 94fe33fca5a165616f246e57a4a4aebc0128418ab4f9d544ae6d777fda41c360

Published Mainnet anchor/birthday; public viewing key omitted from archive

### S-ZEBRA

URL: https://zebra.zfnd.org/
Classification: reference node
Retrieval status: 200
Snapshot: research/external/S-ZEBRA.txt
SHA256: 7e040c95d29f87ff076d7c6676972eee1e60645c4c9763090e0377924a1e7e1e

Zcash Testnet supported; not Bitcoin Signet

### S-NAMES-PHP

URL: https://raw.githubusercontent.com/ZCashNames/zcash-name-indexer/5fe5072f502ffded7ed6e11efe5f95398d179b9b/include/Protocol.php
Classification: reference implementation
Retrieval status: 200
Snapshot: research/external/S-NAMES-PHP.txt
SHA256: 84448d9cd3c1435348d7967ac56776555df183b54fb406b60d30051cd8f624ec

Pinned source; mainnet zNS vs testnet tzNS marker configured externally; CHG new key occupies pubkey field and old key verifies.

### S-ZIP321

URL: https://zips.z.cash/zip-0321
Classification: normative
Retrieval status: 200
Snapshot: research/external/S-ZIP321.txt
SHA256: e05522e909ffee4b0b31ecac6f97b83228dcfba27bd8d22030919ab3edafad93

Exact decimal ZEC, percent-encoding and base64url memo payment URI; not proof of actual send.

### S-NAMES-CUSTODY

URL: https://docs.zcashnames.co/trust-and-privacy/
Classification: protocol-owner documentation
Retrieval status: 200
Snapshot: research/external/S-NAMES-CUSTODY.txt
SHA256: 73bf7710693cc6cb696be534745101f5cb8a5cd38cf8ac3d6173636fd0e7dce7

Credits from verified command stream; payout amounts from authenticated note value, memo only attribution; HTTPS signed withdrawal request retained by recipient, no public withdrawal API specified.

### S-ZCASHME-API

URL: https://zcash.me/docs/api
Classification: owner documentation
Retrieval status: 200
Snapshot: research/external/S-ZCASHME-API.txt
SHA256: 0ac7963c10429ffa10b768dc782fcd68e1c5af82689c63ce3f9b26571800ac6a

Directory API is not native name-note ownership proof. Follow wallet API guide for actual protocol before qualifying preserved registration.

## Interpretation and open prerequisites

Zcash ZIPs govern transaction/memo/payment-request behavior. Owned market, collection and ZkMap specifications govern these protocols. Core is a presentation/data-shape reference, not Zcash consensus. The official Names PHP is AGPL reference behavior; resolve licensing before copying implementation code.

Published Mainnet Names anchor metadata corrects an obsolete local comment, but deployment code/chain and current authority were not independently verified. isRootValid does not prove freshness. Mainnet zNS and Testnet tzNS must be separate signed-byte domains. Native Names uses registrar custody, credits and withdrawals, not atomic inscription swaps. Exact HTTPS withdrawal API and qualified Testnet registrar/anchor/prover remain targeted research prerequisites.

The official zcash.me Wallet API describes directory profiles, not proof of the local native zcashme-zns claim kernel. That kernel source/version and authenticated reader remain unresolved. Do not substitute address_verified for native ownership or invent a market for an unsupported registry.

Installed-versus-locked dependencies are recorded separately. Native wallet/scanner versions and lockfile builds need qualification on the approved runner. Research is sufficient to specify the grounded changes below, but the unresolved prerequisites in BLOCKERS.md prevent claiming complete native implementation readiness.
