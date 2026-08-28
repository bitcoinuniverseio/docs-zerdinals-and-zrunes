---
title: Known limitations
description: The honest list of what does not work yet, why, and where each limitation is tracked.
---

**You will get from this page:** everything the product cannot do today,
stated plainly. If a limitation is not on this list and not on
[the status page](/docs-zerdinals-and-zrunes/start/status/), the product is
expected to do it; report the gap.

## No wallet can sign yet

Creating, etching, minting, and transferring stop at the signing step.
Production writes stay disabled until wallet signing is qualified, and
every create flow says so at the point where it applies.
[Why the gate exists](/docs-zerdinals-and-zrunes/create/signing-availability/).

## ZRunes are not active on mainnet yet

The protocol activates at block 3,470,000. Below that height no ZRune can
exist, by protocol rule. The Tokens surfaces show ZRC-20, which is live;
the ZRunes surfaces show the activation state honestly.
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

## Device-local features do not roam

Watchlists, the visit mark, recent searches, and prepared orders live in
your browser on this device, by design (there are no accounts and no
server-side profiles). Clearing browser data or switching devices resets
them. [Portfolio and watchlists](/docs-zerdinals-and-zrunes/own/portfolio/).

## No prices anywhere

The product carries no floor prices, no volume, no market capitalization,
no rarity scores, and no price estimates, because it cannot verify them
from the chain. This is a permanent editorial rule, not a missing feature.

## Reporting something not on this list

Open an issue in the
[documentation repository](https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/issues)
or follow the product's support path. Security reports have
[their own channel](https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/security/policy).
