---
title: ZRunes
description: "What ZRunes are, the block height at which they activate on mainnet, which facts about them are real chain facts today, and how a balance is burned by protocol rule."
---

**You will get from this page:** what a ZRune is, why none exist on mainnet
yet, and how to check the activation state yourself.

## Plain language

ZRunes are transparent fungible assets issued through a Zcash metaprotocol. A
ZRune is etched once with a fixed name and optional mint terms (amount per
mint, mint cap, and an opening and closing block window). Anyone can mint
while the terms allow it. Balances attach to transparent outputs and move by
output allocation in ordinary transactions.

## When ZRunes open on mainnet

ZRunes activate on Zcash mainnet at **block 3,470,000**.

Before that height the protocol ignores ZRune data outputs entirely, so
nothing can be etched or minted and no ZRune can exist. That is a rule of the
protocol rather than a setting on our side: a node reading the chain
independently reaches the same answer, and anything written into an earlier
block is not a ZRune and never becomes one.

You can check the height, and whether it has been reached, against the
product's own indexer, which publishes both:

```text
https://zrunes.io/idx/zcash-metaprotocols/status
```

The `zrunes` block in the response carries `activationHeight` and `active`.
Until `active` is true, an empty list of ZRunes means the protocol has not
opened yet, not that nobody wanted one. The current chain height is on
[the status page](/docs-zerdinals-and-zrunes/start/status/) and on every
page of the product.

## Why it matters

Etch terms are permanent: once a ZRune exists, nobody, including its etcher,
can change the amount per mint, the cap, or the window. A mint window opening
is a real chain event at a real block height, which is why the product can
show mint progress and remaining supply as facts rather than as marketing.

## A concrete example

An etcher creates `EXAMPLE` with terms of 1,000 units per mint, a cap of
10,000 mints, and a window from block 3,480,000 to 3,520,000. From the
opening block, anyone can mint exactly 1,000 units per transaction. Mints
count in block order, then transaction order; when 10,000 mints have counted,
later mints contribute nothing. Nothing about this can be renegotiated.

## Safety boundary

ZRunes use Zcash transparent outputs. Balances and activity are public. If a
ZRune-bearing output is spent with no valid transparent successor, the
balance is burned by protocol rule; spending it entirely into a shielded pool
is exactly that case. ZRunes are not shielded assets and are never presented
as private.

## Reading one

Every ZRune has its own page, reached from the ZRunes list or by searching
its name or its id. It states, all from the chain and none of it rounded:

- how much exists, how much is still held after burns, and the most there
  can ever be
- the premine written into the etching
- the mint terms: what each mint gives, how many mints are allowed, how many
  are left, and the exact block range the window covers
- whether a mint would count right now, and the reminder that the chain
  decides at the block your mint lands in rather than at the moment you read
  the page
- the transaction that etched it, the block it landed in, and its protocol
  sequence number
- who holds it, by address and by how many outputs each holder's balance
  sits on
- everything that has happened to it, with the transaction behind each event

Amounts are shown in base units with the ZRune's own decimal places applied.
Nothing is converted through a floating point number anywhere between the
chain and the page.

## Technical detail

The protocol has three operations (etch, mint, transfer) carried in a single
data output of at most 79 bytes, with front-running protection on etches (a
name commitment that must be 6 blocks old), strict malformed-transaction
handling, and a supply invariant the indexer verifies at every block. The
full rules, including every failure mode, are in
[the normative specification](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/).

## Related

- [Etch, mint, transfer ZRunes](/docs-zerdinals-and-zrunes/create/etch-mint-transfer/)
- [Normative specification: ZRunes v1](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/)
- [Current status](/docs-zerdinals-and-zrunes/start/status/)
