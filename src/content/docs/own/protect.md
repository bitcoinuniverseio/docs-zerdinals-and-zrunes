---
title: Protect asset-bearing outputs
description: The pre-spend checklist, the per-output verdict that fails closed, and committed balances explained.
---

**Outcome:** you will have a short, reliable routine that makes accidental
spending of an artifact effectively impossible.

## The pre-spend routine

Before spending from any address that might hold assets:

1. **Open the address in ZordiScan.** Every inscription, ZRune balance, and
   ZRC-20 balance is listed against the specific output carrying it.
2. **Check the outputs you are about to spend.** An output is spent whole;
   everything riding on it moves together.
   [Why one output can carry hundreds of things](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/).
3. **Use an inscription-aware wallet** for any address that holds assets,
   and never a general-purpose wallet that shares the same seed.

## The verdict that fails closed

The indexer publishes a per-output verdict on whether an output carries an
asset, and it names every asset on the output rather than the first one it
finds. Universe Wallet consults this verdict before letting a transaction
spend an output.

The verdict fails closed: while any part of the chain is unread, an output
with nothing recorded against it is reported as **unchecked**, not as
clear, because an output created in an unread block is indistinguishable
from one that never carried anything. A wallet that consults the verdict
cannot be told an unknown output is safe to spend.

## Committed balances

A ZRC-20 transfer happens in two steps: inscribing the transfer sets the
amount aside, and spending that inscription's output delivers it. Between
the steps the amount is **committed**: still yours, not available to move
again. Address pages show balances split into available and committed, so
an attempted transfer that fails for insufficient balance has a visible
explanation, and so you know a committed amount is riding on a specific
output you should not spend casually.

## What can go wrong, and how to recover

| Situation | What happens | What to do |
| --- | --- | --- |
| You spent an asset-bearing output to a normal address | The asset moved to the first transparent output's owner | If you control the destination, nothing is lost; move it deliberately next time |
| You spent it entirely into a shielded pool | Zerdinal: tracking ended permanently. ZRune: balance burned | Nothing recovers either state; this is why the routine above exists |
| The verdict says unchecked | Part of the chain is unread | Wait for coverage to complete; the status page shows progress |

## Related

- [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/)
- [Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/)
