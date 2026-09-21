---
title: ZRunes
description: "What a ZRune is, the block height at which ZRunes v1 activated on mainnet, how to tell a ZRune v1 from another project using the same name, and how a balance is burned by protocol rule."
---

**You will get from this page:** what a ZRune v1 is, how to read its
activation state from the chain yourself, and how to tell it apart from other
projects on Zcash that use the same name.

## Plain language

ZRunes are transparent fungible assets issued through a Zcash metaprotocol. A
ZRune is etched once with a fixed name and optional mint terms (amount per
mint, mint cap, and an opening and closing block window). Anyone can mint
while the terms allow it. Balances attach to transparent outputs and move by
output allocation in ordinary transactions.

## When ZRunes v1 opened on mainnet

ZRunes v1 activated on Zcash mainnet at **block 3,470,000**. That height has
passed, so the protocol is open and what exists is whatever the chain has
recorded since.

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
Read it rather than trusting any count written on a page, including this one:
a number in prose is true on the day it is written and this endpoint is true
now. With `active` true, an empty list means no ZRune v1 has been etched up
to the checkpoint that answered. The current chain height is on
[the status page](/docs-zerdinals-and-zrunes/start/status/) and on every
page of the product.

## Not every ZRune is a ZRune v1

More than one project on Zcash uses the name ZRunes. They are separate
protocols with separate rules, and this product reads exactly one of them.

A ZRune v1 is carried in an `OP_RETURN` output whose first byte after
`OP_RETURN` is `OP_14` (hex `6a5e`). Other projects write their own payloads
in their own format on the same chain. The most common of those starts with
`OP_13` (hex `6a5d`). To this protocol an `OP_13` output is simply not a
carrier, in the same way a letter addressed to another street is not your
post. That is a rule of the format, not a judgement about the bytes: we hold
no ruleset for them and make no claim, either way, about what their own
protocol does with them.

So five things people often hear as one thing are five separate facts:

1. The transaction is confirmed on Zcash.
2. It carries a payload.
3. Some protocol recognizes that payload.
4. That protocol accepts it as a valid etching or a successful mint.
5. A ledger credits a balance that can be spent.

A block explorer can show you 1 and 2 for anything. This product answers 3,
4 and 5 for ZRunes v1 and says so plainly when a payload is not one.

### Checking any transaction

Paste any Zcash transaction id into the lookup on the
[ZRunes tab of Explore](https://zrunes.io/explore/zrunes), or open it
directly at `https://zrunes.io/scan/tx/<txid>`. If it carries a payload in a
format this product does not read, the page shows the output, the raw bytes
and the one verdict we can honestly give: not ZRunes v1. Nothing there is a
balance, and no id from it is offered to a mint or trade form.

Behind that page the indexer reports those outputs as an optional
`carrier_observations` array on its transaction route, under the contract
`foreign-carrier-observation-v1`. It is a reader over bytes that were already
in hand. It creates no balance, holder, supply figure or spendability
guarantee, and it is not an alternative ledger. If your indexer does not send
the field, it has not looked, which is not the same as having looked and
found nothing.

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
- [Protocol identity: ZRunes v1 and other payloads](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/)
