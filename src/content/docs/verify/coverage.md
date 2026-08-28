---
title: What an empty result means
description: The four situations behind an empty page, why the product never blurs them, and how the same rule protects wallets.
---

**Outcome:** you will be able to read any empty page or missing record
correctly, because the product always tells you which of four different
situations produced it.

## Why this needs a page

A Zcash node has to read the chain from the beginning before anything on
it can be indexed, and that takes time. While it is doing so, a section
with nothing in it is not a statement that nothing exists: the records may
sit in blocks the node has not reached. Most explorers blur this into a
generic empty state. This one never does.

## The four situations

1. **The chain is still being read.** The status tape shows READING THE
   CHAIN with the blocks read, the chain length, and how much of it the
   scan covers, and every empty section repeats those figures instead of
   reporting a count. Absence here means nothing at all. While this is the
   case, no page reports a count of Zerdinals, ZRunes, collections, or
   activity, because any such number would be wrong, and creating and
   transferring are gated on the same evidence.
2. **No records yet.** Shown only once the whole chain has been read. This
   is a real, checkable statement that nothing of that kind exists.
3. **Indexer unreachable.** The service could not be reached, so nothing
   can be said either way. Nothing is hidden or lost.
   [The outage model](/docs-zerdinals-and-zrunes/own/recovery/).
4. **Data is stale.** The last known values are still shown, labeled, with
   the time they were last confirmed.

## The same rule protects wallets

The per-output asset verdict follows the identical logic: until the chain
has been read in full, an output with nothing recorded against it is
reported as unchecked rather than clear, so a wallet refuses to spend it
instead of risking an artifact it cannot yet see.
[Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/).

## How to check coverage yourself

The product's status surfaces show scanned height against network height,
and the same figures are public:

```text
https://zrunes.io/idx/zcash-metaprotocols/status
```

`coverage.scannedHeight`, `coverage.networkHeight`, and
`coverage.chainComplete` answer the question directly.
[The status page](/docs-zerdinals-and-zrunes/start/status/) records the
last verified values.

## Related

- [ZordiScan](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
