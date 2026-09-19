---
title: Portfolio and watchlists
description: "Inspect what any address holds, watch what matters to you, and see what changed since your last visit, all without an account, a connection, or a signature of any kind."
---

**Outcome:** you will be able to see everything an address holds, follow the
things you care about, and understand exactly what data this involves
(little, and none of it leaves your machine).

## Inspect any address, read-only

Search any transparent address and its page lists what it holds:
inscriptions (against the specific output carrying each one), ZRune
balances, ZRC-20 balances (split into available and committed), collections
represented, and activity. No wallet connection is needed to look; reading
is free and anonymous.

This is also the pre-flight check before spending from an address:
[Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/).

## Block names (ZkMap districts)

A ZkMap district is the winning inscription of a block name, so it is held
on an output like any Zerdinal and appears in two places on the address
page. Among the inscriptions, its card carries a district badge (`ZkMap
<height>.zkmap`) and shows the district picture drawn from the block
instead of the inscription's text; the inscription's exact bytes stay one
click away. The ZkMap tab lists the address's districts on their own, each
with its picture, its name linking to the block page at `/zkmap/<height>`,
the block it was claimed in, and a Send action when the address is yours.
Sending or selling the winning inscription moves the district; there is no
separate district action. The badge and the tab come from the indexer's
claim verdict, never from the inscription's text, so a losing claim for the
same block appears as an ordinary Zerdinal. See the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/).

## Watchlists

You can watch a ZRune, a collection, a transparent address, or a single
Zerdinal from its page. What that means, exactly:

1. Watchlists are stored in your browser on this device. There is no server
   component and no account; nothing about your watchlist leaves your
   machine.
2. A watched item stores only a public identifier (the ZRune name,
   collection slug, address, or inscription id) plus a snapshot of public
   indexer counters from your last visit. Never balances, never keys.
3. The Activity page compares current chain data against your last-visit
   snapshot and reports real deltas: supply minted and holder count changes
   for a ZRune, member count for a collection, inscriptions held at an
   address, and state or owner changes for a Zerdinal. If nothing changed,
   it says nothing changed.
4. Removing the item, or clearing the browser's storage, removes the
   watchlist. There is no copy anywhere else.

## What changed since you were last here

Home reports the number of numbered inscriptions that arrived since
your previous visit, and a list of the artifacts you opened most recently.

Both are stored in your browser on this device. The visit mark holds one
number, the highest inscription sequence this device has seen; the recent
list holds up to twelve public inscription ids.

The count only appears when there are two real readings to subtract. A
first visit is told nothing rather than being told that nothing happened,
and a sequence that moved backwards (which means a reindex rather than
news) is reported as nothing at all.

## Share cards

A Zerdinal detail page can export a share card: a 1200 by 630 PNG drawn
entirely in your browser, with no external calls. The card contains only
public chain facts: the content preview, the name or short id, the serial
number, the collection if any, the genesis block height, the content type,
and the Scan link. Never wallet balances and never anything private,
because the card is built from the same public indexer data anyone can
read.

## What can go wrong

| Situation | What happens | What to do |
| --- | --- | --- |
| You clear browser data or switch devices | Watchlists and the visit mark are gone; they have no server copy | Re-add watches; nothing on chain was affected |
| A watched item shows no delta after real activity | Your snapshot may be newer than you think | Open the item's page; live figures are always current |

## Related

- [Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/)
- [Search](/docs-zerdinals-and-zrunes/verify/search/)
