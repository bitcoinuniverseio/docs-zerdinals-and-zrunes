---
title: Create tokens and collections
description: "Assemble exact ZRC-20 and ZRC-721 inscription bytes, check them against the live reader, then hand them to the ordinary inscription flow that any Zcash wallet can fund."
---

**Outcome:** you will know what the two guided creation pages build, what
their preflight checks prove, and what still depends on block order.

<!-- IMPLEMENTATION-HANDOFF [Z20-08] @Z20-08-public-docs
Coverage: DOCS-PUBLIC; ENTRY-LEGACY; REG-DEPLOY; REG-TRANSFER
Update this section only after the implementation is verified; preparation comments do not announce a released feature. Sources R01/R02/R03; depends on Z20-01..07.
1. Document /create/token as a browsable token list with exact progress, an end-of-row Mint action and a right-side detail/payment panel. Explain All versus selected reading, and preserve deploy, transfer and manual byte-inspection entry points plus /tokens/create redirects.
2. State that row selection does not spend or reserve supply; the user reviews recipient, amount, fee and execution mode before invoice creation/signing. Explain invoice versus connected-wallet availability without treating one closed mode as a globally read-only service.
3. Explain token-credit acceptance under the selected Universe reader separately from inscription delivery and unresolved external reader differences. A valid preflight can lose a block-order race; fees already spent are not automatically refundable. Keep exact-bytes and two-stage transfer explanations accurate.
4. Add order recovery and mobile drawer instructions after verified behavior, with no account secrets or sample paid mainnet orders. Preserve all ZRC-721 content. Verify navigation/internal links and the docs build, and link actual public release evidence only after Z20-08 deployment. Roll back inaccurate feature announcements with the UI, not existing protocol documentation.
-->
## ZRC-20 tokens

Open **Tokens**, then **Deploy or mint**, or go to `/tokens/create`. The page
builds the exact JSON bytes for a deploy, mint, or transfer. It keeps the
`zord` and `zecscriptions` readings separate because they disagree about
ticker length and partial mints.

Before you continue, the page asks the live indexer about the ticker and
shows each reading independently. It catches a ticker already deployed, a
mint with no deploy, an amount outside that reading's limit, and a transfer
larger than the connected address's available balance. A 404 means the
ticker is free under that reading. An unreachable or incomplete reader is
unknown, never permission to proceed.

## ZRC-721 collections and items

Open **Collections**, then **Create a collection or item**, or go to
`/collections/create`. A collection's own page at `/nfts/:key` also
offers **Mint**, which opens the same page with that collection filled in.
ZRC-721 has two operations:

1. **Deploy** names a collection, declares a supply, and may include either
   an off-chain metadata reference or inline JSON. A royalty field is only a
   note recorded verbatim. Nothing on Zcash enforces a royalty payment.
2. **Mint** claims one zero-based id below that supply. There is no ZRC-721
   transfer operation. The item moves when the inscription that minted it
   moves.

The reader applies these rules in confirmed block and transaction order,
and only their result counts:

- The collection name is trimmed and must be 1 to 64 UTF-8 bytes. Its
  lower-cased form is the collection key, the `:key` in `/nfts/:key`.
  The first deploy of a key wins; a later deploy of the same key is
  rejected.
- Supply is a whole number from 1 to 10,000,000.
- A mint id is a whole number from 0 up to, but not including, the supply.
  An id at or above the supply is rejected, and so is an id that an earlier
  accepted mint already took.
- A mint is accepted only when its collection was already deployed when the
  mint completed, and only when the reveal has a transparent output to
  carry the item.

A rejected mint is still an inscription: it exists, it cost a fee, and it
holds nothing. The collection page lists rejected operations by reason (an
id already taken, an id above the supply, a mint before the deploy), so the
holder of one can see why it holds no item.

The live preflight refuses a name already deployed, a mint whose collection
does not exist, an id outside the supply, and an id an earlier mint already
claimed. For a large collection where the current read API cannot prove one
id efficiently, the page says that instead of guessing.

### An accepted mint is the item

An accepted mint inscription **is** the item. There is no separate token
record that could be owned apart from it: whoever controls the transparent
output carrying that inscription holds the item, and the item follows every
ordinary rule for a Zerdinal, including the terminal states. A carrying
output spent into a shielded transaction ends tracking, and the item shows
that it is no longer observable rather than naming a holder; one spent with
no transparent successor is burned. The minter is a separate fact from the
holder: a `to` field in the mint payload records who was credited at mint
time and is never evidence of who controls the output now.

Once the mint is confirmed and indexed, the item has its own page at
`/nfts/:key/:tokenId`, the collection lists it under `/nfts/:key`, and it
appears on the **NFTs** tab of the holder's portfolio. To move it, use the
ordinary Send flow for the inscription; to sell it, see
[NFTs on the market](/docs-zerdinals-and-zrunes/market/buying-and-selling/#nfts).

### Metadata is a reference, not the item

A deploy's metadata (inline JSON, an IPFS address, or an `https` address)
is stored as bytes. The product may fetch the JSON it names through its own
service, with a timeout, a size cap and a check that the address is public,
and show the name, description and traits as text, always labelled
**off-chain**. It never proxies images, and nothing fetched that way is
ownership evidence: the chain proves the inscription, its content and its
carrying output, and nothing else.

## Exact bytes, then an ordinary inscription

Both pages show the final JSON exactly as it will be inscribed. Continuing
places those bytes into the existing Inscribe flow, which owns payment,
signing, broadcast, and recovery. The guided page does not reserve a ticker,
collection name, or item id. If two valid operations compete, confirmed
block and transaction order decide which one counts.

## Related

- [ZRC-20 and its two readings](/docs-zerdinals-and-zrunes/understand/zrc-20/)
- [Collections](/docs-zerdinals-and-zrunes/understand/collections/)
- [Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
