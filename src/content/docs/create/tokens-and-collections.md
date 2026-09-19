---
title: Create tokens and collections
description: "Assemble exact ZRC-20 and ZRC-721 inscription bytes, check them against the live reader, then hand them to the ordinary inscription flow that any Zcash wallet can fund."
---

**Outcome:** you will know what the two guided creation pages build, what
their preflight checks prove, and what still depends on block order.

## ZRC-20 tokens

Open **Mint**, or go to `/create/token`. The older `/tokens/create` address
still works and keeps whatever you had in the query.

### The token list

The page opens on every ZRC-20 token this chain carries, a page at a time,
searchable by ticker and filterable by mint state. The default state filter
is **any**, so a finished token is listed rather than hidden.

"Every token" means every distinct deploy the two readers recognise between
them, counted once. `zord` and `zecscriptions` read the same blocks under
different rules, so a token can exist under one and not the other, and the
same token can have different minted totals under each. Each row therefore
names the reading its figures came from and says when only one reading
carries the token or when the two disagree. The total is the number of
distinct tokens, never the two readers' counts added together.

Each row shows its exact minted-of-maximum supply and ends in **Mint**. A
token that cannot be minted under the reading shown keeps a disabled Mint
and the reason beside it, and you can still open it to read its detail.

### Minting from the panel

Choosing a token fills the panel on the right; on a phone the same panel
opens as a drawer you close with **Close**, the back gesture or Escape.

**Choosing a token spends nothing and reserves nothing.** No supply is held
for you, no invoice exists and no wallet is asked to sign. The panel reads
the deployment again under the reading you picked, suggests the amount that
reading would accept, and asks for the address to credit. You then review
those exact values and confirm them before anything is created.

The two readings differ on how much one mint may claim, and the panel says
which applies:

- **zord** credits up to the per-mint limit, and accepts a smaller final
  mint when less than a limit remains.
- **zecscriptions** credits a mint only for exactly the per-mint limit. When
  less than one limit remains, that remainder cannot be minted under this
  reading at all, and the panel says so rather than offering a smaller
  amount.

Once you confirm, the panel becomes the order's own panel: the payment
address, the exact amount, the QR, the expiry, cancellation and refund
appear in place, and the page stays at `/create/token`. Choosing another
token from the list opens a new panel for it and leaves the order you
already created alone; it is still reachable from your saved orders and
from its own recovery link.

Both execution modes are offered independently. Paying an invoice needs no
wallet connection; signing with a connected wallet needs one that can sign
Zerdinals. Either may be closed at any time, and the panel says which is
closed and why. One mode being closed does not make the service read-only:
browsing, existing orders and recovery stay available.

### Delivery is not acceptance

The order finishing means the inscription was delivered. Whether the
reading you chose **credited** the token is a separate fact, and the panel
reports it separately, with the block it was observed in.

A preflight is an observation, not a reservation. A mint that was valid
when you reviewed it can still lose a race to another mint in the same or
an earlier block, and the reading will then reject it. That is a rejected
token operation with a real inscription and real fees already spent; it is
not a failed payment and the fees are not automatically returned. A reorg
can also take an accepted credit back, and the panel shows that rather than
leaving a stale success on screen.

The two Universe readers are what this product states results under.
Differences between them and external readers of the same protocol are
recorded, not resolved here, and acceptance under one reading is never a
claim about any other indexer.

### Deploying, transferring, and the exact bytes

Deploy and transfer keep their own forms, reached from the list with
**Deploy a token** and **Create a transfer inscription**, and
**Advanced: compose mint bytes by hand** opens the same form for a mint you
want to write yourself. These build the exact JSON bytes and show them
before anything is inscribed, keeping the `zord` and `zecscriptions`
verdicts separate as they always have.

Before you continue, these forms ask the live indexer about the ticker and
show each reading independently. They catch a ticker already deployed, a
mint with no deploy, an amount outside that reading's limit, and a transfer
larger than the connected address's available balance. A 404 means the
ticker is free under that reading. An unreachable or incomplete reader is
unknown, never permission to proceed.

A transfer still happens in two steps. Inscribing a transfer operation to an
address you control commits that amount of your balance; sending that
inscription to someone later is what moves it.

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
