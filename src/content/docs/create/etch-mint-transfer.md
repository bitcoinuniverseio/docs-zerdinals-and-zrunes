---
title: Etch, mint, transfer ZRunes
description: The three ZRune operations, the limits that shape them, and the strict handling of malformed transactions.
---

**Outcome:** you will know how a ZRune is created, how minting actually
counts, and how balances move, including every way a balance can burn.

:::caution[Availability today]
ZRunes activate on mainnet at block 3,470,000, and wallet signing is not yet
available, so no ZRune operation can complete on mainnet today. The flows
below describe the product as built.
[The status page](/docs-zerdinals-and-zrunes/start/status/) is the authority
on both facts.
:::

## The limits that shape everything

| Item | Limit |
| --- | --- |
| Name | 4 to 26 letters, A to Z only |
| Divisibility | 0 to 18 decimal places |
| Payload | 79 bytes in the transaction's data output |
| Edicts | at most 16 per transaction |
| Data outputs | exactly one per transaction (network policy) |

Names are unique per network, forever. Spacers (displayed as bullets between
letters) are display only and never affect identity: `ZRUNE` and `Z•RUNE`
are the same name.

## Etch

Etching creates a ZRune. You choose:

1. The name (4 to 26 letters). If the normalized name is already taken, the
   etching is void.
2. Optional display fields: a symbol and spacers.
3. Divisibility (0 to 18).
4. An optional premine credited to you at etch time.
5. Optional mint terms: amount per mint, mint cap, and an opening and
   closing block height window. Without terms, nobody can ever mint; supply
   is the premine alone.

Etching is a two-step flow because of front-running protection: first a
commitment transaction locks a hash of your chosen name (observers cannot
read the name from it), then, after the commitment has at least 6
confirmations, the etch transaction publishes the name and terms. A pending
etch cannot be sniped from the mempool.

Once etched, the terms are permanent. Nobody, including the etcher, can
change the amount, cap, or window.

## Mint

While a ZRune's mint window is open and its cap is not reached, anyone can
mint:

1. Each mint creates exactly the fixed amount per mint. There are no partial
   mints.
2. Mints are counted in block order, then transaction order within the
   block. When the cap is reached, later mints simply contribute nothing.
3. The product shows real mint state from its own node and indexer: mints
   completed, remaining mints, percent minted, and whether the window is
   open right now.

## Transfer

ZRune balances attach to transparent outputs and move by output allocation:

1. Spending ZRune-bearing outputs pools all their balances in the
   transaction.
2. Edicts (compact instructions in the data output, at most 16) allocate
   amounts from the pool to specific outputs. An amount of zero means the
   entire remaining balance.
3. Whatever the edicts leave unallocated goes to the designated pointer
   output, or by default to the first transparent non-data output.
4. If no valid transparent successor exists for a balance, that balance is
   burned by protocol rule. Sending ZRune-bearing value entirely into a
   shielded pool burns the balance; ZRunes are never attributed to shielded
   addresses.

## What can go wrong, and how to recover

| Situation | What happens | What to do |
| --- | --- | --- |
| Your chosen name is taken by an earlier block | The etch is void; nothing is created | Pick another name and etch again |
| You broadcast the etch before the commitment is 6 blocks old | The etch is not valid | Wait for confirmations; the product will not build this early |
| The mint cap is reached before your mint confirms | Your mint contributes nothing | Check remaining mints before minting; the count is a real chain figure |
| A transaction's payload breaks a rule | It is a Malformed ZRunestone: input balances burn, no edict allocates | Use the product's builder, which refuses to construct anything malformed |

The malformed state is deliberately strict so that two independent
implementations agree byte for byte. It is a hazard for hand-rolled
transactions, not for product users.

## How to verify success

Search the ZRune name in ZordiScan. Its page shows the etch transaction,
the terms, mint progress, holders, and activity, all from the chain. Your
balance appears against your address and the specific outputs carrying it.

## Related

- [ZRunes](/docs-zerdinals-and-zrunes/understand/zrunes/)
- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
- [ZRunes v1 specification](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/)
