---
title: Transparent and shielded
description: Zcash has two pools. Zerdinals and ZRunes live entirely in the transparent one, and what shielding actually does to an asset.
---

**You will get from this page:** an honest account of privacy here, and what
the shielded pool does to an asset that enters it. This product treats the
shielded pool as a first-class state, so it is worth two minutes to
understand.

## Plain language

Zcash has two kinds of value. Transparent value works like Bitcoin:
addresses, amounts, and transactions are public. Shielded value is hidden by
cryptography: the chain proves the money moved correctly without revealing
addresses or amounts.

Zerdinals and ZRunes use only the transparent side. Content, addresses,
balances, and activity are publicly visible, forever. Nothing in this
product makes your on-chain activity private.

## What shielding does to an asset

Shielding does not make an asset private. It ends its trackability.

- If an inscription-bearing output is spent entirely into a shielded pool,
  the protocol can no longer follow it. The inscription enters the terminal
  state **shielded, untrackable**: it provably existed, its provenance up to
  that transaction remains verifiable, and no owner can ever be named again.
  The product displays this state plainly, with its own colour and its own
  broken-outline chip, and never guesses a shielded owner.
- If ZRune-bearing value goes shielded with no transparent successor, the
  balance is **burned by protocol rule**. It does not wait in the shielded
  pool; it is gone.

Unshielding later does not undo either outcome. Tracking that has ended
stays ended.

## Why the product treats this as a state, not a gap

Most explorers show a shielded spend as a dead end or hide it. This product
records it as what it is: a deterministic terminal state with a transaction
behind it. An artifact page for an untrackable Zerdinal still shows the full
provenance chain up to the shielding transaction, because those facts remain
true and verifiable.

## A concrete example

An owner spends the output carrying inscription No. 087871 into a shielded
pool. From that block on, the artifact's page shows its complete history,
then the shielding transaction, then the state **shielded, untrackable**.
If someone later unshields the same amount of ZEC, nothing connects it to
the inscription; the protocol never re-attaches tracking, and neither does
the product.

## Safety boundary

If you need financial privacy on Zcash, use shielded ZEC through a shielded
wallet, and keep that activity separate from your artifact activity. Do not
shield an asset-bearing output expecting to get the asset back.

## Technical detail

The exact conditions distinguishing a move, a burn, and a shielded terminal
state are normative:
[Zerdinals v1](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/) defines
`SHIELDED_UNTRACKABLE` and `BURNED`;
[ZRunes v1](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/) defines when a
balance burns. Both are deterministic: two independent indexers reach the
same answer for every transaction.

## Related

- [Ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/)
- [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/)
