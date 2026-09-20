---
title: "ZkMap v1 specification"
description: "The specification of ZkMap block names: one Zerdinal-carried name per Zcash block, the exact claim bytes, who wins, how a district moves, and the deterministic district picture."
---

<!-- IMPLEMENTATION-HANDOFF [ZKIDX-09]
Coverage: N01, N02, N03, N04. Functional status: FAIL.
Sources: S01, S02, S03, S04, S08, S09 in handoff/RESEARCH-REGISTER.md.
Prerequisites: ZKIDX-01, ZKIDX-04.
Verified baseline: D05: the developer runbook says Testnet and Mainnet share a parameters digest, but parametersDigest hashes network. It also describes a two-block indexer lag allowance while current safe coverage requires reaching verified node tip. Source and documentation references include older release pins.
1. In docs-dev-zcash-metaprotocols/docs/zkmap-release.md correct the future execution text so Testnet and Mainnet have separately computed parameters digests and genesis identities; equivalent tested code is not equal network-dependent configuration.
2. Distinguish zero indexer lag from the separate six-block node estimated-height tolerance in current coverageFreshness. Update replay instructions to require actual final source identity without declaring every API-only edit a mandatory replay.
3. Update public indexer docs, product protocol docs and private developer docs together with actual new repository/service ownership, legacy/new route compatibility, configuration, occupancy semantics, tests and release receipts. Preserve the protocol grammar, first-winner and terminal ownership rules.
4. Resolve version/activation statements using live supported-node network metadata and pinned governing ZIPs. Product text mentioning V6 is not evidence that a draft transaction format is active on public Mainnet. Record any remaining normative/reference disagreement explicitly rather than inventing semantics.
5. Replace old source/release claims only after the implementation and relevant test evidence exist. Keep implemented-in-source, Testnet acceptance and public Mainnet release as separate statuses. Never publish wallet secrets, private host credentials or unverified URLs.
Tests: Run each affected documentation repository documented check/build commands after implementation; during preparation verify HTML comments preserve all non-comment bytes. ; Assert mainnet and testnet parametersDigest differ for otherwise equivalent configuration; compare documentation freshness wording against src/chain/protocol-qualification.mjs.
Acceptance: All consumer/operator documentation matches the accepted artifact and observed release, with correct network-specific evidence, source pins, limitations and rollback.
Rollback: Revert incorrect published prose to last verified content, not fabricated launch claims. Source preparation HTML comments remain non-executable until implemented.
-->
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
| `available` | Available | Safe history plus a fresh, complete owned-node observation show no matching mempool reveal |
| `claimed` | Claimed | A winner exists; the page names it and its holder |
| `pending` | Mempool | A valid matching reveal is observed in the owned node mempool; it is not a winner or reservation |
| `future` | Not mined yet | A fresh verified node tip proves that the height does not exist yet |
| `ineligible` | Not claimable | The height cannot be claimed, and the page says why |
| `unknown` | Unknown | The indexer could not vouch for this height |

Availability is never a reservation. A block shown as available can be won
by someone else's claim before yours completes, and a claim that loses on
chain still paid for its inscription. Unknown is never shown as available: a
lagging or unqualified indexer produces an unknown cell or a read failure,
not an empty one.

### Current occupancy proof

Range, detail and availability responses carry an additive
`occupancy` envelope with schema `zkmap-occupancy-v1` when the indexer
supports the current observation contract. It is sourced only from the owned
Zebra mempool (`source: owned-zebra-mempool`, decoder
`zkmap-mempool-v1`). A local order, invoice, accepted signature or broadcast
acknowledgement is not membership proof.

The envelope binds `network`, `genesisHash`, `snapshotId`,
`sequenceAtomic` and the observed node `tip` to the historical checkpoint.
It records `startedAt`, `observedAt`, `expiresAt`,
`completeness: complete|partial|unavailable`, an explicit `reason`,
`pendingCountAtomic`, up to eight bounded `candidates` and
`candidatesTruncated`. Each candidate includes the reveal txid, input index,
exact name and target height, decoder version, content hash, commitment and
observed times.

Only safe complete historical coverage plus a fresh, unexpired, same-tip,
complete current-decoder observation with zero candidates can be `available`.
A positive candidate may be `pending` even when the pool sample is partial,
but that is advisory and does not elect an owner. A confirmed winner remains
`claimed`, including when its owner is burned or shielded. Partial, stale,
lagged, old-decoder or mismatched observations are `unknown` for current
mint admission, and a missing block hash alone is not proof that a block is
future.

The legacy HTTP `status` field remains the five-value rolling-deployment
contract. Pending is serialized there as `unavailable` with reason
`PENDING_CLAIM_OBSERVED`; this page's six-state status comes from
`occupancy.effectiveStatus`. Clients without the additive envelope must
normalize historical `available` to current `unknown` rather than mint from
it. Pending candidates are evidence only; the confirmed scanner and chain
order decide winners.

## 7. The district picture

Every district has a picture, rendered by the product from the target block
itself and served as an inert SVG at
`GET /api/zkmap/blocks/{height}/art.svg`. The picture is not inscribed and
is not part of the claim; the inscription's bytes remain exactly
`<height>.zkmap` and are one click away from every picture. Nothing about
ownership, price or rarity can be read out of a drawing.

Two things are versioned separately. The **layout**
(`zkmap-treemap-v1`) decides which rectangle each transaction gets. The
**artwork** (`zkmap-art-v2`, and the frozen `zkmap-art-v1` before it) decides
what is drawn on those rectangles. The claim ruleset `zkmap-v1` is a third
thing again, and neither version touches it.

### The layout: `zkmap-treemap-v1`

Fully determined by public chain data:

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

A block whose only transaction is the coinbase is one parcel, and stays one
parcel: transactions are never invented to make a picture busier. Two blocks
with equal or proportional transaction sizes share this geometry, and that is
correct: they really do have the same shape. Changing any rule above is a new
layout version, never a silent change to `zkmap-treemap-v1`.

### The artwork: `zkmap-art-v2`

What distinguishes two districts of the same shape is the artwork, and it is
derived from the whole block identity:

1. A seed is taken over the network, the genesis hash, the decimal height and
   the **full** block hash. It chooses one of eight frozen palettes.
2. Every parcel has its own hash, over that seed, the parcel's position, its
   inclusive transaction bounds and the first and last transaction id it
   covers. That hash picks its fill from the palette's five shades and draws
   its engraved contours. Two blocks with identical transaction sizes still
   differ here, because their transaction ids differ.
3. The full 256-bit block hash is drawn once around the frame, most
   significant bit first, as 256 small cells running clockwise from the
   top-left, outside a uniform inset. This is the district's signature.

The perimeter signature is a signature and the interior contours are texture.
Neither is a transaction, a parcel or a claimable piece of a district. The
coinbase parcel is marked with a thin outline and otherwise takes the ordinary
colour its own hash chose.

### `zkmap-art-v1` is kept, and its promise is corrected

The first artwork chose its palette from the first byte of the block hash and
painted every coinbase parcel one fixed colour. The earlier version of this
page said that two blocks with the same transaction shape still differ by the
block they name. **That was not true of `zkmap-art-v1`**: proof-of-work makes
leading hash bytes anything but uniform, and with the coinbase always the same
colour, a block whose only transaction is the coinbase drew the same picture as
any other such block. `zkmap-art-v1` is still served, byte for byte, for
clients built against it; `zkmap-art-v2` is what makes the promise true.

### Asking for a picture

```text
GET /api/zkmap/blocks/{height}/art.svg
    ?art=zkmap-art-v2&network=testnet&size=256&hash=<block hash>
```

`art` omitted, or `art=zkmap-art-v1`, returns the legacy picture unchanged.
`art=zkmap-art-v2` needs `network`, and it must be the network the block was
read on: a missing network is an error, not an assumed mainnet, and a network
this service does not serve is refused rather than drawn from another chain.
`size` is 256, 512 or 1024, and every size shows the same complete picture and
signature. The response names what it drew in `x-zkmap-art-version` and
`x-zkmap-network`.

The SVG contains only `svg`, `rect`, `g`, `path` and `text` elements, escaped
numeric and hex labels, and fill and stroke attributes: no script, no external
reference, no `foreignObject`, no event handler, no animation.

### A cached picture is history, not a live answer

A hash-pinned request (`?hash=<block hash>`) may be kept by a browser for a
year. Such a copy is a picture of one block as it was, and it cannot notice a
reorg by itself: a browser holding a fresh immutable copy does not ask again.
That is why the artwork version is part of the address: a new drawing is
published at a new URL rather than swapped in at the old one. Only a *fresh*
request that pins a hash which no longer names the block at that height
answers 409. Which block a height names now is decided by reading the block or
the claim receipt again, never by looking at an image.

<!--
IMPLEMENTATION-HANDOFF [CMO-15] CMO-A040 | 2026-09-20 | PREPARATION ONLY
Coverage: DOC-02,ZKM-01. Findings: F16, N03.
Verified current behavior: The ZkMap specification already separates claim rules, artwork and ownership;
the market presentation overhaul must not change those protocol promises.
Sources: S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET, S-NAMES-REGISTRAR in
docs/implementation/core-market-overhaul-20260920/RESEARCH.md.
Prerequisites: CMO-14.
1. Add the accepted market discovery/filter/metric contract and Bitmap-style presentation explanation
without changing zkmap-v1 claim bytes, winner ordering, occupancy or art version semantics.
2. Explain that the market lists the verified winning Zerdinal through existing settlement, not a new
token or name registry; image hashes are not ownership proof.
3. Update public route/action screenshots and release status only after actual browser/Testnet evidence
and deployment exist; label observation scope and unknown metrics.
Verify: Existing scripts/verify-deployed-assets.mjs against the actual published origin/artifact, after
accepted release only ; Read-only public /.release and /api/ready checks; verify backend/indexer serving
revision separately ; Functional GO requires every required row PASS; final GO additionally requires
RELEASED: PUBLIC MAINNET evidence.
Assert: The overhaul is implemented, tested and publicly released through all actual services after
acceptance; a ZIP, build, merged PR, private preview or disabled feature is not public release.
Rollback/security: Keep prior immutable artifacts/config backups and compatible schema. Roll back unsafe
admission/UI in dependency order while preserving real funds, accepted operations, authoritative indexer
history and recovery.
Full cross-repository contract: docs/implementation/core-market-overhaul-20260920/WORK-PACKAGES.md.
ANNOTATED is not functional PASS. Preserve executable behavior during preparation.
-->
## 8. Public API

All operations are under the `zkmap` tag of the
[public HTTP API](/docs-zerdinals-and-zrunes/developers/api/). Heights travel
as exact decimal strings.

| Operation | Purpose |
| --- | --- |
| `GET /api/zkmap/blocks?start=&limit=` | A window of statuses, occupancy proof, block hashes, winners and owners (limit up to 1024) |
| `GET /api/zkmap/blocks/{height}` | One block's status, occupancy proof, winner and owner |
| `GET /api/zkmap/blocks/{height}/geometry` | The renderer input: ordered transaction byte sizes and their digest |
| `GET /api/zkmap/blocks/{height}/art.svg?art=&network=&size=&hash=` | The district picture at 256, 512 or 1024; `art=zkmap-art-v2` needs the network it was observed on |
| `GET /api/zkmap/districts?owner=&cursor=&limit=&order=` | Claimed districts, optionally held by one address |
| `GET /api/zkmap/claims/{inscriptionId}` | The claim receipt and verdict of one inscription |
| `POST /api/zkmap/availability` | Preflight of up to 24 heights with historical and current occupancy evidence; an observation, not a reservation |
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
