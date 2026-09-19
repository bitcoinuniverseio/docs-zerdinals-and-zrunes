---
title: "ZkMap v1 specification"
description: "The specification of ZkMap block names: one Zerdinal-carried name per Zcash block, the exact claim bytes, who wins, how a district moves, and the deterministic district picture."
---

:::note[Where the rules live]
ZkMap is a ruleset (`zkmap-v1`) read by the indexer over ordinary Universe
Zerdinals v1 inscriptions. It adds no envelope field and no new transaction
shape; every claim is a plain Zerdinal that any existing decoder reads. This
page states the rules the indexer applies and the product shows. Where the
product and this page disagree, the indexer's claim projection is the
authority, and the product only ever displays what it reports.
:::

Status: Implemented in source. Mainnet creation follows the same launch gates
as every other Zerdinal operation; the status page says what can complete
today.
Ruleset: `zkmap-v1`
Date: 2026-09-18

## 1. Overview

ZkMap assigns one name to every Zcash block. The name of block 1,500,000 is
`1500000.zkmap`; the name of the genesis block is `0.zkmap`. A block name is
claimed by inscribing it as a Zerdinal. The first eligible claim completed on
chain wins the block, and the block (its district) then belongs to whoever
holds the output that carries the winning inscription.

A district is therefore a Zerdinal with a verdict attached to it. It moves
the way any Zerdinal moves, lists and sells the way any Zerdinal does, and is
tracked by the same ownership rules. ZkMap adds exactly two things: the rule
that decides which inscription wins a block, and a deterministic picture drawn
from the block itself.

## 2. The claim

A claim is an inscription that satisfies all of the following:

1. It is a complete, verified Universe Zerdinals v1 inscription: the envelope
   parses under
   [Zerdinals v1](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/), every
   piece has arrived, and the v1 content commitment verifies. Legacy
   inscriptions without the v1 commitment are never claims, whatever their
   text says.
2. Its content type is exactly the ASCII string `text/plain`. No parameters,
   no charset, no other media type.
3. Its body is exactly the ASCII text `<height>.zkmap` and nothing else: no
   leading zeros in the height, no whitespace, no newline, no byte order
   mark, no other bytes. `0.zkmap` is valid. `007.zkmap`, `7.zkmap`
   followed by a newline, and `7.zkmap` preceded by a space are not claims;
   they are ordinary Zerdinals.
4. The height is an unsigned decimal from `0` to `2147483647`.

The grammar of the body is:

```text
name   = height ".zkmap"
height = "0" / ( %x31-39 *9DIGIT )
```

Because the bytes are fixed, so is the content hash: the SHA-256 of the
ASCII text is the same for every claim of the same block, and the v1
commitment is `SHA-256("UZRD1" || "text/plain" || 0x00 || name)`. The
product generates these bytes on the server for every mint; nothing about
the inscription is composed in the browser.

## 3. Eligibility

A claim targets the block named in its body. The target height must be
strictly below the height of the block in which the claim completes (the
block containing the reveal transaction that carries the final piece). A
claim that names its own block, or a block that has not been mined yet, is
ineligible and can never win, even if nobody else ever claims that block.

`0.zkmap` targets the genesis block and is eligible from block 1 onward.

## 4. Who wins

For each target height, the winner is the first eligible claim completed on
the active chain, in chain order:

1. lower completion height first;
2. within a block, lower transaction index first;
3. within a transaction, lower inscription index first.

Every later eligible claim for the same height is a loser. A losing claim is
not deleted, hidden or refunded by the protocol: it is an ordinary Zerdinal,
owned and transferable like any other, with a claim receipt whose verdict is
`loser` and which names the winning inscription.

The product's claim receipt (`GET /api/zkmap/claims/{inscriptionId}`) carries
one of four verdicts: `winner`, `loser`, `ineligible` (a valid claim whose
target was not strictly below its completion height) or `invalid` (the bytes
or the commitment did not qualify). An inscription that is not a claim at all
has no receipt.

## 5. Ownership

The district belongs to the holder of the winning inscription's carrying
output, exactly as
[ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/)
for every Zerdinal. Consequences:

1. Sending the winning inscription sends the district. A market sale that
   settles the winning inscription's output delivers the district to the
   buyer.
2. The name itself never changes hands; its inscription does. There is no
   transfer operation specific to ZkMap.
3. A winner whose output is burned, or spent into a shielded pool where the
   protocol stops tracking it, keeps the block occupied forever. The block
   shows as claimed with no spendable owner. It can never be re-minted, and
   no later claim for that height can win.
4. A chain reorganization can change the winner: if the block that
   completed the winning claim is disconnected, the verdict is recomputed on
   the new active chain, and the product reports the affected mint outcome as
   `reorged`. The map only ever shows the active chain at the indexer's
   checkpoint.

## 6. Availability is an observation

The product reports one status per block, at the indexer's qualified
checkpoint:

| Status | Shown as | Meaning |
| --- | --- | --- |
| `available` | Available | No eligible claim completed up to the checkpoint |
| `claimed` | Claimed | A winner exists; the page names it and its holder |
| `future` | Not mined yet | The height is above the checkpoint |
| `ineligible` | Not claimable | The height cannot be claimed, and the page says why |
| `unknown` | Unknown | The indexer could not vouch for this height |

Availability is never a reservation. A block shown as available can be won
by someone else's claim before yours completes, and a claim that loses on
chain still paid for its inscription. Unknown is never shown as available: a
lagging or unqualified indexer produces an unknown cell or a read failure,
not an empty one.

## 7. The district picture

Every district has a picture, layout `zkmap-treemap-v1`, rendered by the
product from the target block itself and served as an inert SVG at
`GET /api/zkmap/blocks/{height}/art.svg`. The picture is not inscribed and
is not part of the claim; the inscription's bytes remain exactly
`<height>.zkmap` and are one click away from every picture.

The drawing is fully determined by public chain data:

1. The canvas is the square from (0, 0) to (1024, 1024), with an 80-unit
   label band below it that never overlaps the geometry.
2. The parcels are the block's transactions in block order, the coinbase
   included, each weighted by its serialized byte length. A shielded
   transaction contributes only its byte size, which is public. No owner,
   price, time or randomness enters the geometry.
3. The rectangle is split recursively: the ordered list is divided at the
   boundary whose cumulative weight is nearest half the total (the earlier
   boundary on a tie), and the rectangle is cut across its longest axis (x
   on a tie) in proportion to the two weights, clamped to at least one unit
   each side. Recursion stops at a single transaction, or when the longest
   axis is below 2 units, in which case the remaining transactions become
   one aggregate parcel that records their count.
4. A one-unit gutter is taken from the right and bottom edge of every parcel
   that can spare it.
5. The palette is one of three frozen sets (emerald, gold, slate), chosen by
   the first byte of the target block hash modulo three, so two blocks with
   the same transaction shape still differ by the block they name. The
   coinbase parcel has its own fixed color in every palette.

The SVG contains only `svg`, `rect`, `g` and `text` elements, escaped
numeric and hex labels, and fill and stroke attributes: no script, no
external reference, no `foreignObject`, no event handler. A hash-pinned
request (`?hash=<block hash>`) is immutable and answers 409 once that hash no
longer names the block at that height, which is how a reorg changes the
picture without ever serving a stale one as current. Changing any rule above
is a new layout version, never a silent change to `zkmap-treemap-v1`.

## 8. Public API

All operations are under the `zkmap` tag of the
[public HTTP API](/docs-zerdinals-and-zrunes/developers/api/). Heights travel
as exact decimal strings.

| Operation | Purpose |
| --- | --- |
| `GET /api/zkmap/blocks?start=&limit=` | A window of statuses, block hashes, winners and owners (limit up to 1024) |
| `GET /api/zkmap/blocks/{height}` | One block's status, winner and owner |
| `GET /api/zkmap/blocks/{height}/geometry` | The renderer input: ordered transaction byte sizes and their digest |
| `GET /api/zkmap/blocks/{height}/art.svg?size=&hash=` | The district picture at 256, 512 or 1024 |
| `GET /api/zkmap/districts?owner=&cursor=&limit=&order=` | Claimed districts, optionally held by one address |
| `GET /api/zkmap/claims/{inscriptionId}` | The claim receipt and verdict of one inscription |
| `POST /api/zkmap/availability` | Preflight of up to 24 heights; an observation, not a reservation |
| `POST /api/zkmap/prepare`, `POST /api/zkmap/batch/prepare` | Connected-wallet mint of one, or up to 24, names |
| `POST /api/zkmap/invoices`, `POST /api/zkmap/invoices/batch` | Pay-from-any-wallet mint of one, or up to 24, names |
| `GET /api/zkmap/orders/{orderId}/claim` | The claim outcome of a connected-wallet mint order |
| `GET /api/zkmap/payment-orders/{orderId}/claims` | The claim outcomes of an invoice mint |

Every response is bound to the indexer checkpoint (height and hash) it was
read at. A mint order's claim outcome (`pending`, `accepted`, `conflict`,
`invalid`, `reorged`, `unknown`) is tracked separately from the order state:
only `accepted` beside a complete order is a won district. A complete order
whose claim lost is a conflict, and the product says so.

## 9. What this protocol does not do

1. It does not resolve names to addresses and is not part of any name
   registry. See
   [Names and Dual-Registry Architecture](/docs-zerdinals-and-zrunes/protocols/names-and-registries/).
2. It does not reserve a block for anyone before a claim completes on
   chain.
3. It does not refund a claim that lost on chain; the inscription was made
   and is the loser's to keep. (The product's invoice path refunds a payment
   whose name was already taken before the payment was executed, which is a
   product rule, not a protocol rule.)
4. It does not re-open a block whose winner was burned or shielded.

## Related

- [Zerdinals v1 specification](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/)
- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/)
- [Search](/docs-zerdinals-and-zrunes/verify/search/)
