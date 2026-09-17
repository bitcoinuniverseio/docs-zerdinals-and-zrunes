---
title: Known limitations
description: "The honest list of what does not work yet and why: wallet signing, ZRunes activation, deliberately unanswered ZRC-20 questions, and permanent shielded terminal states."
---

**You will get from this page:** everything the product cannot do today,
stated plainly. If a limitation is not on this list and not on
[the status page](/docs-zerdinals-and-zrunes/start/status/), the product is
expected to do it; report the gap.

## Marketplace source and production differ

Wallet signing and marketplace journeys have passed public-testnet campaigns.
The production inspection on 17 September 2026 still found older serving
artifacts without the current indexer receipt contracts and replay identity
evidence. Those source tests do not establish production marketplace readiness.
Check [current status](/docs-zerdinals-and-zrunes/start/status/) and the action's
own availability before signing or paying.

Exact total-price full-lot asks are a version 3 candidate. They cover ZRunes
and each ZRC-20 ruleset separately, including 0, 6 and 18 decimal quantities.
They do not open partial fills, bids or auctions. Execution also requires an
explicit confirmation policy; publishing an order does not satisfy it.

## ZRunes need complete indexed evidence

The protocol activates at block 3,470,000. Below that height no ZRune can
exist, by protocol rule. Reaching that height does not prove that the serving
indexer has completed the required history or can provide settlement receipts.
An unavailable ZRune route is not evidence that its market is empty.
[ZRunes](/docs-zerdinals-and-zrunes/understand/zrunes/).

## Some ZRC-20 questions are deliberately unanswered

Where the two historical rule sets disagree in ways that cannot be settled
without inventing a fact (an unrecorded activation height, a shielded
accounting choice), the product lists the difference as undecided rather
than guessing.
[ZRC-20, and its two readings](/docs-zerdinals-and-zrunes/understand/zrc-20/).

## Shielded terminal states are permanent

An inscription spent into a shielded pool is untrackable forever; a ZRune
balance shielded with no transparent successor is burned. These are
protocol facts, not product gaps, but they are listed here because people
look for a recovery path that does not exist.
[Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/).

## Some artifacts point at content that is not on Zcash

12,881 indexed inscriptions, better than one in ten, are records naming
content stored somewhere else rather than content written into the chain.
The record is permanent; what it points at is not, and no transaction proves
what that content currently is.

The product marks these and shows the reference rather than rendering it as
the artifact, but it cannot make the referenced content permanent and does
not fetch, cache, or mirror it. If that content disappears, the chain still
carries the record and nothing more.
[Collections and pointer records](/docs-zerdinals-and-zrunes/understand/collections/).

## Most ZGODS mints hold nothing

ZGODS is the only ZRC-721 collection on this chain. 8,503 mint inscriptions
were made against it and 7,171 counted: 1,319 claimed an id an earlier mint
had already taken, and 13 were inscribed before the collection was deployed.

Those 1,332 inscriptions cost a fee and hold no item. This is the chain as it
happened rather than a product gap, and it is listed here because somebody
holding one will go looking for the item. The collection page lists the
rejections by reason so that search ends with an answer.

## Device-local features do not roam

Watchlists, the visit mark, recent searches, and prepared orders live in
your browser on this device, by design (there are no accounts and no
server-side profiles). Clearing browser data or switching devices resets
them. [Portfolio and watchlists](/docs-zerdinals-and-zrunes/own/portfolio/).

## Market quotes are scoped observations

Listed prices, floors and volume describe this service's orders and confirmed
settlements. They are not chain-wide valuations or price guarantees. The two
ZRC-20 rulesets retain separate quantities and prices.

## Reporting something not on this list

Open an issue in the
[documentation repository](https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/issues)
or follow the product's support path. Security reports have
[their own channel](https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/security/policy).
