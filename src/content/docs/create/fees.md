---
title: Fees and confirmation
description: ZIP 317 conventional fees, what each operation costs in logical actions, and what confirmation means for each flow.
---

**Outcome:** you will be able to predict the fee for any operation before
the product shows it, and know why the shown fee is a floor rather than an
estimate.

## The fee rule

Zcash fees follow ZIP 317, the network's conventional fee rule: **5,000
zatoshis per logical action**, computed from the actual shape of each
transaction. The network relays nothing below this fee, so it is a floor,
not a suggestion, and there is no fee market to time.

Typical shapes:

| Operation | Logical actions | Conventional fee |
| --- | --- | --- |
| Simple send | 2 | 10,000 zatoshis |
| ZRune mint (single input) | about 4 to 5 | 20,000 to 25,000 zatoshis |
| Full 4-piece inscription reveal | about 8 | 40,000 zatoshis |

The large reveal input raises the reveal cost; a ZRune data output adds
about 3 logical actions for a full 79-byte payload.

## What the product shows before you sign

Every flow shows the complete fee display before anything is signed: the
network fee, any service fee, the total in ZEC, the total in zatoshis, and
a clearly labeled fiat estimate. There are no fee surprises after approval,
because the transactions are fully planned before the first signature.

## Confirmation

A transaction is final when it is mined into a block; deeper confirmation
makes reorganization vanishingly unlikely. Two places where confirmation
depth matters in these protocols:

1. **Etch commitments** must be at least 6 blocks old before the etch that
   uses them is valid.
2. **Sequence numbers** for fresh inscriptions are stable only after
   confirmation depth; a just-confirmed inscription displays its
   provisional nature honestly.

The product tracks orders through real chain states, so you watch the
commit confirm, then each reveal, rather than a spinner.

## What can go wrong

| Situation | What happens | What to do |
| --- | --- | --- |
| The fee display shows more than you expected | The transaction shape (pieces, inputs, data output) drives the count | Check the piece count in Preview; smaller content costs less |
| A chain reorganization touches your transaction | The indexer recomputes deterministically from the surviving chain | Wait for the order timeline to settle; nothing needs your action |

## Related

- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Etch, mint, transfer ZRunes](/docs-zerdinals-and-zrunes/create/etch-mint-transfer/)
