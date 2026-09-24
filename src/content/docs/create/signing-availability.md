---
title: Signing availability
description: "What gates each way of creating, why neither waits for the chain to be read, why the connected-wallet path waits on a qualified wallet release, and how you will know the moment each one of them opens."
---

**Outcome:** you will know exactly why write flows are gated, what has to be
true before each path opens, and why the gates exist to protect you rather
than to slow you down.

## Two paths, two gates

Creating has two paths, and each is gated on its own facts:

- **Pay with any wallet** needs no wallet release at all. It opens when the
  service's own execution machinery is qualified: its isolated signer, its
  key encryption, its payment watcher, and a service execution authorization
  binding the exact deployed build. An unavailable browser wallet never
  closes it. [How that path works](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/).
- **The connected wallet** waits on a qualified wallet build, exactly as
  described below. A ZRune transfer is connected-wallet only, honestly,
  because it spends outputs only your own key can sign.

Neither path waits for the record to finish reading the chain. Creating
checks only what the transaction itself needs, from the service's own Zcash
node: the right network, a usable chain height, the next block's signing
rules, ZRunes activation where it applies, and funding proven free of assets
output by output. Sending, listing and buying keep waiting for the full
record, because they move assets the record has to see first.
[Why creating does not wait](/docs-zerdinals-and-zrunes/verify/coverage/).

Each create page shows, beside its submit button, whether the order can be
sent now and the one thing holding it if not. Open **Service details** for
the individual dependency states and technical reasons. Changing wallets does
not repair a service outage.

A **Wrong network** indicator is the one you can clear yourself: the network
selected in this browser is not the one this deployment serves, so prices,
balances and addresses on screen belong to the other chain. Switch back, or
open the deployment that serves the network you want. Nothing is prepared,
quoted or signed while the two disagree, and an order already accepted is
unaffected.

The form itself is always there. You can write and edit a draft whatever
the service is doing, and a slow or failed check never clears it; only the
submit button waits for the service to say yes.

[The status page](/docs-zerdinals-and-zrunes/start/status/) records dated
observations. Use the create page or `/api/readiness` for current availability.

### What has to be true before connected-wallet signing opens

Every one of these, checked on every request against the live system rather
than assumed:

1. The operator has opened admissions on this deployment.
2. A protocol release authorization exists, produced by a qualification
   campaign against an exact wallet commit.
3. The wallet build that authorization covers is the one this deployment
   requires.
4. That authorization covers the specific operation being asked for, not
   merely the protocol.
5. The database and the Zcash node are answering, and the node is level
   with the network.
6. The protocol itself has activated on this network.

For sending a Zerdinal or a ZRune, the record must also have read the whole
chain and be level with the node, because a send spends outputs the record
has to vouch for.

Anything unknown counts as closed. A deployment that cannot establish one of
these does not guess.

## Why the gate exists

Signing these transactions safely is harder than signing a payment,
because the thing being signed can carry assets the wallet cannot see
without an index:

1. The wallet must rebuild the commit address from its own key and the
   declared commitment, and refuse to pay one it could not later spend.
   Money sent to a commit nobody can spend is not recoverable, and the page
   asking for the signature is not a source the wallet can take an address
   from on trust.
2. Every input must be checked against per-output asset evidence, so
   signing a transaction cannot accidentally spend an output that carries
   an artifact. An output that cannot be proven clean is treated as unsafe
   and left alone.
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
seed phrase. That has always been true. The built-in
[Web Wallet](/docs-zerdinals-and-zrunes/own/web-wallet/) is the one place the site holds keys, and
it holds them encrypted in your browser for its address and balance only;
it is not a signer. What has changed is what the wallet
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

Source implementation does not establish production readiness. Signing opens
only after the deployed services and wallet release pass qualification against
a real chain.

## How you will know

When signing is available, the create pages enable their submit buttons
and the live readiness endpoint reports that the operation is open. A dated
documentation snapshot does not override these live checks.

You can read the same answer the pages read:

```bash
curl -s https://zrunes.io/api/readiness
```

It names one state per operation and per path, the reasons in the order they
matter, what each reason means, and what is at risk. The create routes
enforce that exact state, so the page and the route can never disagree.

## What you can do today

- Read what each create flow will do, including the exact protocol rules and
  fee model, on the pages that describe them.
- Inspect any address, artifact, token, or collection read-only.
- Watch addresses and artifacts, and export share cards.
- Verify the chain facts behind all of it in
  [Scan](/docs-zerdinals-and-zrunes/verify/zordiscan/).
