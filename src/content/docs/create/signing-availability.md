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
create flow says this at the point where it applies: the wizard builds real
transactions and shows real fees, and it stops at the signing step rather
than presenting a control that cannot finish.

[The status page](/docs-zerdinals-and-zrunes/start/status/) is the
authority for this fact and is verified against the live product.

## Why the gate exists

Signing these transactions safely is harder than signing a payment,
because the thing being signed can carry assets the wallet cannot see
without an index:

1. The wallet must rebuild the commit address from its own key and the
   declared commitment, and refuse to pay one it could not later spend.
   Money sent to a commit nobody can spend is not recoverable, and the page
   asking for the signature is not a source the wallet can take an address
   from on trust.
2. The wallet must check every input against the per-output asset verdict,
   so signing a transaction cannot accidentally spend an output that
   carries an artifact. That verdict fails closed while any block is
   unread.
3. The wallet must display the exact effects of the transaction it is
   signing, byte-bound to the template it received, and refuse anything it
   cannot fully account for. It recomputes the template's own hash, so a
   transaction altered anywhere between preparation and approval stops
   being signable rather than being signed quietly.

A release that skips these checks would put real artifacts at risk to ship
sooner. The qualification process exists to prove each one before the gate
opens.

## What is built, and what the gate is waiting on

Private keys never leave the wallet, and the web application never sees a
seed phrase. That has always been true. What has changed is what the wallet
is asked to sign.

The product used to hand the wallet a description of an operation: a kind, a
commitment, a piece count, a plan. It was not a transaction, and no wallet
could have signed it. The backend now builds the complete transaction, every
input and every output stated exactly, and the wallet reviews and signs that
and nothing else. There is no code left in the browser that could build a
transaction, so there is no path that could put an unreviewed one in front
of a signature.

That covers every write the product offers: a single inscription, a
multi-part one, a collection member, a batch, and a ZRune etch, mint and
send.

The remaining gate is evidence, not construction. Signing opens when the
wallet release proves each check above against a real chain, and the status
page is the record of that.

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
