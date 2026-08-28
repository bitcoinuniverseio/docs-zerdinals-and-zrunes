---
title: Signing availability
description: Why creating and transferring stop at the signing step today, what the wallet design guarantees, and how you will know when it opens.
---

**Outcome:** you will know exactly why write flows are gated, what has to be
true before they open, and why this gate exists to protect you rather than
to slow you down.

## The state today

No wallet can currently sign Zerdinals or ZRunes transactions, and
production writes stay disabled until wallet signing is qualified. Every
create flow says this at the point where it applies: the wizard plans real
transactions and shows real fees, and it stops at the signing step rather
than presenting a control that cannot finish.

[The status page](/docs-zerdinals-and-zrunes/start/status/) is the
authority for this fact and is verified against the live product.

## Why the gate exists

Signing these transactions safely is harder than signing a payment,
because the thing being signed can carry assets the wallet cannot see
without an index:

1. The wallet must verify the commit address against the content
   commitment independently, so what you approved is what goes on chain.
2. The wallet must check every input against the per-output asset verdict,
   so signing a transaction cannot accidentally spend an output that
   carries an artifact. That verdict fails closed while any block is
   unread.
3. The wallet must display the exact effects of the transaction it is
   signing, byte-bound to the intent it received, and refuse anything it
   cannot fully account for.

A release that skips these checks would put real artifacts at risk to ship
sooner. The qualification process exists to prove each one before the gate
opens.

## The design that is fixed

Private keys never leave the wallet. The backend prepares effects-only
transaction intents; the wallet independently verifies every input, every
output, and every commitment before signing; and the web application never
sees a seed phrase. This architecture is already built and is not what the
gate is waiting on.

## How you will know

When signing opens, the create flows complete end to end,
[the status page](/docs-zerdinals-and-zrunes/start/status/) row changes,
and the product's own status surfaces say the same thing. Nothing about
availability is announced anywhere these three places do not confirm.

## What you can do today

- Plan an inscription end to end, including exact fees, up to the signing
  step.
- Inspect any address, artifact, token, or collection read-only.
- Watch addresses and artifacts, and export share cards.
- Verify the chain facts behind all of it in
  [ZordiScan](/docs-zerdinals-and-zrunes/verify/zordiscan/).
