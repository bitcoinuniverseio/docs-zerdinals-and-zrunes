---
title: Finding your way around
description: The seven places in the product, what each one is for, and where every older link now goes.
---

**Outcome:** you will know which of the seven places to open for anything you
want to do, and you will know that nothing you saved has stopped working.

## The seven places

| Place | Address | What it is for |
| --- | --- | --- |
| Home | `/` | what this is, one search box, five things to do, and whether the chain behind it is current |
| Explore | `/explore` | finding artifacts, tokens, collections and ZRunes, with filters and shareable results |
| Create | `/create` | making an artifact, a batch, a token, a collection or a ZRune |
| Market | `/market` | signed offers, confirmed settlements, and what a purchase would cost |
| Portfolio | `/portfolio` | what an address holds, for your wallet or for any address you watch |
| Scan | `/scan` | blocks, transactions and addresses, and the search box that takes any identifier |
| Orders | `/orders` | every order this browser has, its live state, and what it needs from you |

On a phone the first five sit along the bottom of every screen. Activity,
Orders, Scan, the theme, the detail level and the chain figures are in the
account sheet behind the control at the top right.

On a wider screen they are one row along the top, and the account sheet holds
the same extras.

## Search takes anything

The search box accepts a block height, a block hash, a transaction id, an
address, an inscription id, a token ticker, a ZRune name or a collection slug,
and it works out which it is on your device before anything is sent anywhere.

Where a value could be two things it says so and offers both, rather than
picking one. Sixty-four hexadecimal characters is the shape of a transaction id
and of a block hash; short capitals is the shape of a ZRC-20 ticker and of a
ZRune name. Guessing would send half of those searches to the wrong place.

Press `/` anywhere to open it.

## Simple and Technical

Every screen has two depths, and the switch is in the account sheet.

**Simple** states what a thing is, what an action will do, and what to do
next. **Technical** additionally opens the exact payloads, hashes, outpoints,
scripts, ruleset evaluations and raw events by default.

They are the same screens and the same data, disclosed differently. Nothing
that could cost you an artifact is hidden in either one.

## Every older link still works

If you saved a link, sent one, or published one, it still resolves. The query
string and the fragment travel with you, which matters most for an order
recovery link: the private part of one lives in the fragment.

| Older address | Now |
| --- | --- |
| `/inscribe` | `/create/artifact` |
| `/tokens` | `/explore/tokens` |
| `/tokens/create` | `/create/token` |
| `/collections` | `/explore/collections` |
| `/collections/create` | `/create/collection` |
| `/zrunes` | `/explore/zrunes` |
| `/zrunes/etch` | `/create/zrune` |
| `/zrunes/mint` | `/create/zrune/mint` |
| `/zrunes/send` | `/create/zrune/send` |
| `/zordiscan` | `/scan` |
| `/zordiscan/block/…` | `/scan/block/…` |
| `/zordiscan/tx/…` | `/scan/tx/…` |
| `/zordiscan/address/…` | `/scan/address/…` |
| `/market/zerdinals` | `/market/artifacts` |

The pages for one artifact, one token, one collection, one ZRune, one listing
and one order did not move at all. Those are the addresses people share and the
ones written into proof bundles, and changing them would have bought nothing.

## Install it

The product installs as an application. Add it from your browser's menu and it
opens without browser chrome, with shortcuts straight to Explore, Create,
Market, Portfolio and Scan.

Installed, it opens without a network and shows you your saved drafts, your
recent searches and your order links. What it will not do is show you a stale
balance as though it were current: with no connection every section says it
cannot read, because a figure you cannot check is worse than no figure.

## Next

- [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/)
- [Scan, the explorer](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [Portfolio and watchlists](/docs-zerdinals-and-zrunes/own/portfolio/)
