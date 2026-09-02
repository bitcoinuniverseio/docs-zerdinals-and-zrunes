---
title: Ownership lives on outputs
description: "Why owning a Zerdinal or a ZRune balance means controlling one transparent output, why a single output can carry hundreds of assets, and everything that follows from it."
---

**You will get from this page:** the single mental model that explains how
these assets move, how they are lost, and why one output can quietly carry
hundreds of things.

## Plain language

A transparent Zcash transaction consumes outputs and creates new ones, like
bills handed over and change handed back. Zerdinals and ZRunes attach to
those outputs. Owning an asset means controlling the private key that can
spend the output it currently sits on. There is no registry beside the
chain, no account, and no undo.

When the output is spent:

- a **Zerdinal** moves to the first transparent non-data output of the
  spending transaction;
- **ZRune balances** pool with everything else the transaction spent and
  are allocated to outputs by the transaction's edicts, with a default rule
  for anything left over;
- a **ZRC-20 transfer inscription** delivers its committed amount to the
  first transparent output.

## Why it matters

Everything protective and everything dangerous about these assets follows
from one fact: the output does not know what it carries. To the network it
is a small amount of ZEC. Only an indexer that has read the chain knows an
artifact is riding on it. So the asset moves when the output moves, whoever
spends it and for whatever reason, including a wallet paying a fee.

## One output can carry many assets

Gathering many inscriptions onto a single output is ordinary practice on
this chain, and outputs carrying hundreds of inscriptions exist on mainnet.

This matters when you spend. An output is spent whole: you cannot send part
of one. If an output carries three hundred inscriptions and you spend it,
all three hundred move to whoever receives it, in one transaction, whether
or not you meant to move more than one. Nothing about the ZEC amount on the
output hints at how much is riding on it.

So before you spend, check what the output actually carries rather than
what you remember putting there. The Scan page for an address lists
every inscription against the output holding it, and the per-output verdict
the product publishes names every asset on an output rather than the first
one it finds.

## A concrete example

You inscribe No. 100000 to address `t1...abc`. Later you use the same seed
in a general-purpose wallet and send someone 0.05 ZEC. The wallet, knowing
nothing about inscriptions, selects the inscription's output as part of the
payment. No. 100000 now belongs to the payee, or was destroyed if the
output was consumed as fee value. The transaction looked completely
ordinary while it happened.

## Safety boundary

- Keep artifact addresses separate from spending addresses.
- Check an address on Scan before spending from it.
- Prefer a wallet that consults the per-output asset verdict, which fails
  closed: while any block is unread, unknown outputs are reported as
  unchecked rather than clear.

## Technical detail

The successor rules (which output an asset moves to, and when a spend is a
burn or a shielded terminal state instead) are normative and deterministic.
They are specified in
[Zerdinals v1](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/) and
[ZRunes v1](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/).

## Related

- [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/)
- [Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/)
- [Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/)
