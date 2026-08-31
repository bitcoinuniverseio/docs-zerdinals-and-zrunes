---
title: Buying and selling
description: How the market works, what a listing really is, what settles a sale, and exactly what is and is not live today.
---

**Outcome:** you will know what a listing on this market actually is, why a
purchase cannot half-happen, what cancelling does and does not do, and what
the product will and will not let you do today.

## What a listing is

A listing is one signature by the seller. It binds the output carrying the
asset to one outcome: any transaction that spends that output must pay the
seller the exact listed price. Nothing else about the final transaction is
decided by anyone but the buyer.

Three consequences follow, and each is shown in the product rather than
buried here:

1. **The service never holds anything.** Your asset stays on your output;
   your funds stay in your wallet. There is no deposit, no escrow, and no
   account.
2. **A listing is a public offer.** Anyone can settle it at the signed
   terms. Listing something is publishing it.
3. **Cancelling is withdrawal, not revocation.** Cancelling removes the
   listing from this market, but the signature it published stays
   technically valid until the asset moves or the listing's expiry block
   passes. If you need certain revocation, transfer the asset to yourself;
   that spends the output and no old signature can ever use it again.

The expiry is enforced by the Zcash network itself: the signature commits
to an expiry block, and the network refuses the settlement from that block
on. It is not a service policy that a copied signature could outlive.

## What settles a sale

One transaction. It spends the seller's asset output and the buyer's
funds, delivers the asset to the buyer's address, pays the seller the
price, and returns the buyer's change, all together. Either that
transaction confirms and all of it happened, or it does not and none of it
did. There is no state where the money moved and the asset did not.

The product treats a sale as final only after confirmation depth, the same
depth everything else here uses. A transaction in the mempool is shown as
pending and can still fail; a chain reorganization honestly reopens a
listing whose settlement was disconnected.

The small amount of ZEC riding on the asset's output (typically 546
zatoshis) transfers to the buyer with the asset. Listings state it, and
prices should account for it.

## What the figures mean

Floor, volume, and sale counts on the market pages are derived from this
service's open listings and confirmed settlements only, and every market
page says so. They are not chain facts and are never presented as such.
An empty market shows as empty; nothing is fabricated to look busy.

## What is live today

Reading the market is always available. Creating a listing and buying are
connected-wallet operations, and they open only when a Universe Wallet
release that has been qualified for exactly these operations is publicly
installable. Until then the product shows the precise blocker on the
listing and purchase controls instead of offering a path that cannot
finish. The [current status](/docs-zerdinals-and-zrunes/start/status/)
page reflects what is open right now.

Walletless purchases (paying from any Zcash wallet, the way
[walletless creation](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
works) are not offered yet; the product says so where the option would
appear.

## What is public

Everything. The listing, its price, the seller address, the settlement
transaction, the buyer's receiving address, and the full history of all of
it are permanently readable by anyone, on this site and on every other
reader of the Zcash chain. Nothing about market activity is shielded or
anonymous. If you do not want an address linked to a sale, use a fresh
receiving address and understand the linkage a settlement itself creates.
