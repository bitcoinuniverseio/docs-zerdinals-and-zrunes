---
title: Scan
description: "The first-party explorer, its three views on every record, what you can inspect on each of them, and the honesty rules it never breaks when a record is incomplete."
---

**Outcome:** you will know how to inspect any block, transaction, address,
or protocol object, and how to read the same record at three depths.

## What Scan is

Scan is the explorer inside the product, at `/scan`. It was called ZordiScan
until the Clear Signal release; the address `/zordiscan` still resolves, and so
does every block, transaction and address link under it.

It reads only from Universe-operated Zcash infrastructure: a Zcash node and an
indexer run by the same team, with no third-party chain service anywhere, not
even as a fallback. That is not a convenience claim; it is what makes every figure
on the site checkable against the chain itself.

## Three views on every detail page

1. **Friendly:** the human reading. What this artifact is, who owns it,
   what happened and when.
2. **Protocol:** the protocol-level facts. Envelope fields, commitments,
   edicts, families, states, and events, decoded and labeled.
3. **Raw:** the underlying data, unedited. Raw data stays available
   everywhere.

Friendly explanation and raw proof coexist on the same page, so you never
have to choose between understanding a record and verifying it.

## What you can inspect

- **Blocks:** by height or hash, with the transactions and protocol events
  they contain.
- **Transactions:** inputs, outputs, and every protocol meaning the
  parsers found in them.
- **Addresses:** inscriptions, ZRune balances, ZRC-20 balances (available
  and committed), collections, and activity, each against the output
  carrying it.
- **Artifacts, tokens, ZRunes, collections:** the full record with
  provenance, and the transaction behind every step.

## Finding artifacts among the bookkeeping

Most of what is written to this chain is token bookkeeping: ZRC-20
deploys, mints, and transfers, all small JSON documents. In an unfiltered
feed they bury the images and the writing.

Explore therefore shows **artifacts** by default and lets you switch to
token operations or to everything. The split is taken from what the
protocol parsers actually found in each inscription, not from its media
type, because a token operation and a piece of writing are both plain text
on the wire. A second filter narrows by media: image, text, HTML, JSON,
video, audio, or 3D. When a filter returns nothing, the page says the
filter is why rather than implying the chain holds nothing.

## Honesty rules

- Status information (node height, indexer height, lag, mempool state) is
  always shown honestly; stale data is labeled STALE with the checkpoint
  time.
- Chain literals (txids, addresses, heights, hashes) render in full or
  with an explicit middle ellipsis plus a copy control, never truncated
  silently.
- An empty result always states which of the four situations produced it.
  [What an empty result means](/docs-zerdinals-and-zrunes/verify/coverage/).

## Related

- [Search](/docs-zerdinals-and-zrunes/verify/search/)
- [Public HTTP API](/docs-zerdinals-and-zrunes/developers/api/)
