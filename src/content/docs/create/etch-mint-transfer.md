---
title: Etch, mint, transfer ZRunes
description: "The three ZRune operations, the limits that shape them, the strict handling of malformed transactions, and what a spend with no transparent successor does to a balance."
---

**Outcome:** you will know how a ZRune is created, how minting actually
counts, and how balances move, including every way a balance can burn.

:::caution[Availability today]
ZRunes activate on mainnet at block 3,470,000, measured on the service's own
Zcash node. Etching and minting also need a node level with the network and
an open execution path, but they never wait for the record to finish reading
the chain. Transfers do, because they spend ZRune balances the record has to
see. The create page shows its current availability beside the submit
button; open **Service details** to inspect the reasons. The flows below
describe what an available operation does.
[Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
explains the gates.
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
3. Divisibility (0 to 18): how finely the token can be split when it is
   sent. It never changes the amounts you type.
4. The total supply and an optional premine credited to you at etch time,
   both in whole tokens.
5. An optional amount per mint, also in whole tokens. The number of mints
   follows from it: 21,000,000 supply at 1,000 per mint is 21,000 mints.
   Without an amount per mint, nobody can ever mint; supply is the premine
   alone.

Etching is a two-step flow on chain because of front-running protection:
first a commitment transaction locks a hash of your chosen name (observers
cannot read the name from it), then, after the commitment has at least 6
confirmations, the etch transaction publishes the name and terms. A pending
etch cannot be sniped from the mempool.

On the default payment path, one payment covers both steps and the server
carries the wait: it broadcasts the commitment when your payment confirms,
waits out the six blocks, builds the etch against the chain as it stands
then, and publishes it, whether or not your browser is open. Your name never
appears in the payment request, so nothing leaks before the etch reveals it.
[Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
is the full story of that page.

On the connected-wallet path this is the one flow that asks you to approve
twice, and the wait is why. The transaction that etches spends an output
that does not exist yet when you approve the commitment, and it commits to
a block height chosen from the chain as it is at the time it is built.
Signing both at once would mean signing a deadline picked before a wait that
has not happened.

The commitment carries the whole cost of the etch, so nothing that happens
during those six blocks can invalidate the second step.

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
4. On the payment path, the mint window is re-proved after your payment
   confirms. If the cap was reached or the window closed in between, no
   transaction is broadcast, because it would pay a fee and count for
   nothing, and your ZEC is returned to the verified payer instead (see
   [where unused ZEC goes](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/#where-unused-zec-goes)).

### Minting by id when the ZRune cannot be read

A ZRune id is `block:position`, the exact place its etching sits on chain.
If the record cannot read that ZRune right now, you can still mint it by its
id. The service's own node checks the id first: the transaction at that
position must exist, sit at or above the activation block, and carry a ZRunes
v1 data output. Anything else, including a token from the separate OP_13
family, is refused as not found.

The order then names the id alone. The amount per mint shows as **Set by the
chain**, because nothing was read to confirm it. If the mint window has
closed or the cap is reached, the mint can confirm and count for nothing,
so check the ZRune's page first when you can.

Etching works the same way: if the record cannot say whether a name is free,
the etch can still go ahead, and the earliest etching of a name on chain
wins. A name the record already shows as taken is always refused.

## Transfer

A transfer spends outputs that only your own wallet key can sign, so it is
the one ZRune operation that genuinely needs the connected wallet: a payment
alone can never authorize spending what you already own, and this product
does not pretend otherwise.

You say which ZRune, how much, and to whom. The product works out which of
your outputs carry that balance and builds the exact transaction that moves
it, and the review shows you those outputs by name before you sign.

Underneath, ZRune balances attach to transparent outputs and move by output
allocation:

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

Three consequences of that, which the product handles for you and which are
worth knowing anyway:

- **Anything you do not send comes back to you.** Every transfer the product
  builds puts an output paying your own address first and points the
  remainder at it, so leftovers return rather than landing on whoever you
  were sending to. That includes balances of other ZRunes that happened to
  share an output you spent.
- **One ZRune per transfer, per send.** Edict ids must strictly ascend, so a
  transaction allocates each ZRune once. Sending the same ZRune to two
  people takes two transfers.
- **An output carrying more than ZRunes is left alone.** If one of your
  outputs also holds an inscription, the product refuses to spend it rather
  than moving the inscription by accident, and tells you which output and
  what else is on it.

Only the outputs actually needed are spent. If your balance sits on several
outputs and one covers the amount, the others are not touched.

## What can go wrong, and how to recover

| Situation | What happens | What to do |
| --- | --- | --- |
| Your chosen name is taken by an earlier block | The etch is void; nothing is created | Pick another name and etch again |
| You broadcast the etch before the commitment is 6 blocks old | The etch is not valid | Wait for confirmations; the product will not build this early |
| The mint cap is reached before your mint confirms | Your mint contributes nothing | Check remaining mints before minting; the count is a real chain figure |
| A transaction's payload breaks a rule | It is a Malformed ZRunestone: input balances burn, no edict allocates | Use the product's builder, which refuses to construct anything malformed |
| You try to etch or mint before block 3,470,000 | Nothing reads the data output, so the fee buys nothing | The product refuses to build it and names the block, so no fee is spent |
| An output you would spend also carries an inscription | Spending it would move the inscription too | The product refuses and names the output; move the ZRune balance to an output of its own first |

The malformed state is deliberately strict so that two independent
implementations agree byte for byte. It is a hazard for hand-rolled
transactions, not for product users.

## How to verify success

Search the ZRune name in Scan. Its page shows the etch transaction,
the terms, mint progress, holders, and activity, all from the chain. Your
balance appears against your address and the specific outputs carrying it.

## Related

- [Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
- [ZRunes](/docs-zerdinals-and-zrunes/understand/zrunes/)
- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
- [ZRunes v1 specification](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/)
