---
title: Safety in sixty seconds
description: "The one way people actually lose inscriptions and ZRunes, the two habits that prevent it, the safety net that fails closed, and why everything here is permanently public."
---

**You will get from this page:** the single most common way these assets are
destroyed, and how to make it impossible for you. Read this before holding or
moving anything.

:::danger[The one way people lose these]
An inscription or a ZRune balance is not a separate object beside your coins.
It is attached to one specific transparent output, and that output holds a
small amount of ZEC like any other. A wallet that does not know about
inscriptions sees only the ZEC. If it selects that output to pay a fee or to
make change, the asset goes to whoever receives the output, or is destroyed.
Nothing warns you, and nothing undoes it.
:::

## Two habits that prevent it

1. **Keep artifact addresses separate from spending addresses.** Give assets
   their own address and never send ordinary payments from it.
2. **Never spend from those keys with a wallet that is not
   inscription-aware**, including a general-purpose mobile wallet that
   happens to hold the same seed.

## Before you spend, check the output

The ZordiScan page for an address lists every inscription, ZRune balance, and
ZRC-20 balance it holds, against the specific output that carries each one.
Search the address at [zrunes.io](https://zrunes.io) before moving anything.

Two things that surprise people:

- **One output can carry many assets.** Outputs holding hundreds of
  inscriptions exist on mainnet. An output is spent whole, so spending it
  moves everything on it at once.
  [Details](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/).
- **Shielding is not storage.** Spending an asset-bearing output entirely
  into a shielded pool ends tracking permanently for a Zerdinal and burns a
  ZRune balance by protocol rule. Unshielding later does not undo either.
  [Details](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/).

## The safety net that fails closed

The indexer behind the product publishes a per-output verdict on whether an
output carries an asset, and Universe Wallet consults it before spending.
While any part of the chain is unread, an output with nothing recorded
against it is reported as **unchecked**, not as clear, because an output
created in an unread block is indistinguishable from one that never carried
anything. A wallet that consults the verdict cannot be told an unknown output
is safe.

## Looking at something somebody else wrote

An inscription is written by whoever paid the fee. Most of it is an image or
a record, but some of it is HTML, which is a program.

The product never runs one by itself. A gallery shows a typed card and
nothing more; a document only runs when you ask for it on its own page, and
then it runs inside a frame that has an origin of its own. It cannot read
the page around it, cannot reach your wallet, cannot reach the network, and
cannot open a window, submit a form, or start a download. What you see is
the bytes exactly as they were inscribed: they are not rewritten or cleaned
up, because they are the artifact. What is contained is what they are
allowed to reach.

## Everything here is public

Zerdinals and ZRunes use transparent Zcash transactions. Content, addresses,
balances, and activity are publicly visible, forever. Nothing in this product
makes on-chain activity private. If you need financial privacy on Zcash, use
shielded ZEC in a shielded wallet, and keep that activity separate from your
artifact activity.

## Related

- [Ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/)
- [Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/)
- [Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/)
