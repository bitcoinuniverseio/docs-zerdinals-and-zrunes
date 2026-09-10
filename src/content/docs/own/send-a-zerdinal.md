---
title: Send a Zerdinal
description: "Moving an artifact you hold to another transparent address: one transaction, why the recipient is always the first output, and what else travels with it."
---

**Outcome:** you will be able to send an artifact you hold, and you will know
before you sign exactly what moves and where it lands.

## Where to start

Open the artifact's page, or your Portfolio's Artifacts tab. If the connected
wallet is the one holding it, a **Send** action is there. It is not there
otherwise, because only the address controlling the output an artifact sits on
can move it, and a button that could only fail is worse than no button.

You are asked for one thing: the destination transparent address. Which output
carries the artifact is not a question, and it is not a field you can fill in
wrongly. The product reads it from the chain.

## One transaction, and the first output wins

A send is a single ordinary transparent transaction. It spends the output
carrying your artifact and pays the destination. There is no commitment, no
reveal chain, and nothing to come back for later.

The destination is always **output 0**, the first output of the transaction.
That is not a product choice. The protocol rule is that when a carrying output
is spent, the artifact moves to the first transparent, non-data output of the
spending transaction, counted in index order. Anything placed ahead of the
destination would take the artifact instead, so nothing ever is. Your change,
when there is any, comes after it.

The destination output carries a small amount of ZEC with it, and the
transaction's network fee is paid from your other outputs, never from the one
carrying the artifact.

A shielded address cannot hold an artifact, so one is refused outright rather
than attempted. See
[Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/).

## What else travels with it

An output is spent whole. If the output carrying your artifact also carries
other artifacts or a ZRune balance, every one of them moves in this same
transaction, to the same address. Nothing can split them, and the amount of
ZEC sitting on that output gives no hint that they are there.

So the review screen names them. Before you sign, you see the output being
spent and a list of everything else riding on it. If that list holds something
you did not mean to send, stop: see
[Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/) and
[Why one output can carry hundreds of things](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/).

## After you sign

The order is saved in this browser and on the backend, so closing the tab
loses nothing. The page follows the transaction into the mempool, into a
block, and then waits for one more thing: the indexer agreeing that the
artifact now sits on the first output of that transaction.

That last step is the one worth waiting for. A mined transaction proves ZEC
moved; only the indexer's own reading proves the artifact followed it. Until
both agree, the order says it is still confirming rather than claiming
success. If the two ever disagree, the order stops and says so instead of
reporting a delivery nobody can verify.

If something goes wrong in between, nothing is re-signed:
[Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/).

## When Send is unavailable

Sending needs a connected wallet that is authorized to sign this exact
operation, and the page says plainly when it is not yet open here. See
[Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
and [Current status](/docs-zerdinals-and-zrunes/start/status/). A payment
alone can never move something you already own, so unlike inscribing there is
no pay-with-any-wallet path for a send, and this product does not pretend
otherwise.
