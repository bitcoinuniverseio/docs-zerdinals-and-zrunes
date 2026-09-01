---
title: Create tokens and collections
description: "Assemble exact ZRC-20 and ZRC-721 inscription bytes, check them against the live reader, then hand them to the ordinary inscription flow that any Zcash wallet can fund."
---

**Outcome:** you will know what the two guided creation pages build, what
their preflight checks prove, and what still depends on block order.

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
`/collections/create`. ZRC-721 has two operations:

1. **Deploy** names a collection, declares a supply, and may include either
   an off-chain metadata reference or inline JSON. A royalty field is only a
   note recorded verbatim. Nothing on Zcash enforces a royalty payment.
2. **Mint** claims one zero-based id below that supply. There is no ZRC-721
   transfer operation. The item moves when the inscription that minted it
   moves.

The live preflight refuses a name already deployed, a mint whose collection
does not exist, an id outside the supply, and an id an earlier mint already
claimed. For a large collection where the current read API cannot prove one
id efficiently, the page says that instead of guessing.

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
