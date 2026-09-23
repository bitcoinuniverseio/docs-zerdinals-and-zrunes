---
title: What an empty result means
description: "The four situations behind an empty page, why the product never blurs them together, how every response carries the height it was read at, and how that protects wallets."
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

<!--
IMPLEMENTATION-HANDOFF [WA-08-A01]
DOC-01; D-08; preparation only, executable behavior unchanged.
Observed: This page promises a public chain-reading status tape and says creating and transferring are gated on the same full-read evidence.
Required: Document the new public creation policy accurately, without claiming unknown reads are complete.
Sources: USER-01; WA-00; SPEC-ZERDINALS
Prerequisites: WA-01 through WA-07 implemented and verified before publishing changed claims
1. Remove the promise of public coverage chrome and the statement that full history is required for creation. Explain missing/stale read results without inventing zero counts.
2. Explain that minting/inscription use per-operation node, signing and safe-funding requirements, while read projections may catch up independently.
3. Replace the blanket wallet refusal description with precise per-outpoint asset protection: unknown funding evidence remains unsafe, but proven inputs do not require an unrelated global scan to finish.
4. Update linked recovery/protect/status pages only where they repeat the obsolete global-admission rule. Preserve technical diagnostic APIs and legitimate ownership safeguards.
Verify: Use this repository's existing package scripts after inspecting package.json; verify links and generated public copy. Do not publish promises before the application acceptance gate passes.
Evidence: record revision, network, assertions and logs; component checks are not end-to-end acceptance.
Rollback: Rollback public documentation with the matching application release, without reintroducing the prohibited public header badge as a repair.
-->

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

- [Scan](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
