---
title: The admin area
description: "What /admin is, who it is for, and the things an administrator deliberately cannot do to your assets."
---

**You will get from this page:** what the `/admin` area is, why you can see a
password form there, and the exact limits on what anyone signed into it can do
to an asset you own.

## What it is

`/admin` is an operator area for the people who run this site. It is where they
watch the health of the service: which orders failed, which invoices are still
waiting for payment, which payments were quarantined, which refunds are
unresolved, and which reported assets are still awaiting a decision.

It is not a second version of the app, and it is not a way to manage your own
assets. Everything you can do with what you own is in the ordinary product:
[your portfolio](/docs-zerdinals-and-zrunes/own/portfolio/),
[sending](/docs-zerdinals-and-zrunes/own/send-a-zerdinal/),
[creating](/docs-zerdinals-and-zrunes/create/inscribe/) and
[the market](/docs-zerdinals-and-zrunes/market/buying-and-selling/).

## Why you can see the password form

The page is part of the same application, so the address resolves for anyone.
The password is held on the server and checked there. Nothing you type is
compared in your browser, and no amount of reading the page source reveals it.
Without a signed-in session, every administrative request is refused before it
reaches any data.

## What an administrator cannot do

This matters more than the list of what they can do, so it is stated exactly.

An administrator's password is an operator credential. It is not a key, and it
is not ownership. Someone signed into the admin area **cannot**:

- sign a transaction, or spend any output, including yours;
- move, send, or take an asset you hold;
- delete an inscription, a token, or a collection that the chain has accepted;
- change a supply, a mint count, a holder, or any other protocol fact;
- use an order capability belonging to you, or recover an order on your behalf;
- alter a sealed launch's supply, phases, or payout terms.

Those limits are not a policy that could be relaxed by a setting. Ownership
follows the output that carries an asset, and only its owner's signature can
move it. There is no path from the admin area to your key.

## What an administrator can do

- Read the service's own records: orders, invoices, listings, fills, projects,
  storefronts, names and notifications.
- Read the public asset catalogue, exactly as the indexer publishes it and
  without being able to change it.
- Edit the display title and description of a launch project.
- Publish, withdraw or archive a creator storefront page.
- Pause new orders for an operation while something is wrong, and resume them.
  A pause stops new work being accepted. Work already accepted keeps running
  and keeps its recovery path, so a pause never strands an order you have
  already paid for.
- Record a decision on a reported asset.
- Run the order and payment checks immediately instead of waiting for the next
  scheduled run.

Every one of those changes is written to an audit trail with what it replaced
and the reason given.

## A safety decision is not a chain action

If an asset is reported and an administrator flags or restricts it, that is a
signal inside this application: how the asset is presented and whether it is
surfaced here. It does not confiscate the asset, does not move it, and does not
change anything on the chain. The owner still owns it, and every other
application reading the same chain is unaffected.

## If new orders are paused

You may find an action unavailable with a message saying an administrator has
paused new orders. That is deliberate and temporary, usually because something
downstream needs attention before more work is accepted. Existing orders
continue, and [recovery](/docs-zerdinals-and-zrunes/own/recovery/) stays
available. Check [current status](/docs-zerdinals-and-zrunes/start/status/) for
what is going on.
