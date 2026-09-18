---
title: Buying and selling
description: "How the market works, what a listing really is, what settles a sale in one transaction, what cancelling does and does not do, and exactly what is and is not live today."
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

A nonzero expiry is enforced by the Zcash network itself: the signature
commits to an expiry block, and the network refuses settlement above that
block height. An expiry of zero means the listing does not expire. Removing a
never-expiring listing from the book does not revoke its published signature.

## What settles a sale

One transaction. It spends the seller's asset output and the buyer's
funds, delivers the asset to the buyer's address, pays the seller the
price, and returns the buyer's change, all together. Either that
transaction confirms and all of it happened, or it does not and none of it
did. There is no state where the money moved and the asset did not.

The product confirms a sale only when the configured confirmation policy and
qualified protocol delivery evidence agree. A transaction in the mempool is
shown as pending and can still fail; a chain reorganization reopens a listing
whose settlement was disconnected.

The small amount of ZEC riding on the asset's output (typically 546
zatoshis) transfers to the buyer with the asset. Listings state it, and
prices should account for it.

## What the figures mean

Floor, volume, and sale counts on the market pages are derived from this
service's open listings and confirmed settlements only, and every market
page says so. They are not chain facts and are never presented as such.
An empty market shows as empty; nothing is fabricated to look busy.

## Where this market is

This market is part of the application at [zrunes.io](https://zrunes.io) and
nowhere else. Zerdinals and ZRunes are Zcash protocols, and the wider Bitcoin
Universe surfaces treat them as read and explore only: they display and
search the chain record, and no marketplace outside this application trades
them. If you are looking for somewhere else to buy or sell one, there is not
one to point you at.

## One market, six destinations

The Market navigation keeps six stable destinations: Overview, Zerdinals,
Collections, NFTs, Tokens, and ZRunes. Current source includes fungible
market pages and full-lot asks for ZRunes and ZRC-20, and typed NFT asks and
offers under `/market/nfts` (below). The `zord` and `zecscriptions`
rulesets have separate books; their quantities and prices are never combined.
A deployed page opens an action only when that operation can execute safely.

## Full-lot prices

The next lot-ask version lets a seller name one exact total price in zatoshis
for the whole lot. Token decimals change the displayed quantity, not that
price. A lot of two tokens has 2, 2,000,000, or 2,000,000,000,000,000,000 base
units for tokens with 0, 6, or 18 decimals; the same 1,000-zatoshi lot price
still costs exactly 1,000 zatoshis in every case, before the buyer's separately
reviewed transaction costs.

The buyer takes the entire listed quantity. This change does not open partial
fills, bids, or auctions. Existing version 2 asks keep their original signed
per-base-unit price; they are not silently converted to the new contract.
See [order versions](/docs-zerdinals-and-zrunes/protocols/zmarket-orders-v2/).

Read the complete quantity and the total lot price as separate figures. The
candidate interface preserves every digit of large quantities and keeps the
quantity distinct from the price on narrow screens. Display formatting does
not round the amount being bought or change the signed total.

## NFTs

A ZRC-721 item is traded as the inscription that minted it, because that is
what it is. An NFT listing is a version 2 item ask with protocol `zrc721`,
signed by the holder's wallet over the inscription's carrying output exactly
as a Zerdinal ask is. The collection key and the token id are not in the
signature; they are facts the indexer proves about that inscription, and
the market checks them when the listing is admitted, every time it is
revalidated, when a buyer prepares a purchase, and again before a sale is
called delivered.

What a wallet shows you when you sign or buy is the physical truth: the
inscription id and the outpoint that carries it, the price, and the
recipient address. In the asset composition the item appears as
`zerdinals:<inscription id>`, because the item and the inscription are one
thing; there is no second entry for the NFT. A listing whose output carries
anything besides that one inscription is refused.

From an item's page at `/nfts/:key/:tokenId`, or the collection's market
page at `/market/nfts/:collectionKey`, you can:

- **Buy** a listed item at its asked price, through the same purchase paths
  as a Zerdinal.
- **Offer** on an item, or on any item in a collection. As with every v2
  offer, the seller signs at acceptance; an offer does not settle itself.
- **List** an item you hold, and **cancel** a listing, with the same meaning
  cancelling has everywhere here: withdrawal from this book, not revocation
  of the signature.
- **Sweep** several listed items of one collection through the cart.

A watch-only address sees all of this and can do none of it: listing,
offering and buying need the wallet that controls the output.

A sale is delivered when two independent things agree: the settlement
transaction has reached the configured confirmation depth, and the indexer
reports the item at the buyer's output under the same collection and token
id the listing named. The receipt the product shows
(`market-nft-settlement-receipt-v1`) carries both the inscription transfer
receipt and that item evidence. A transaction id alone is not delivery, and
if either proof is missing the outcome stays unresolved.

Floor, listed count and volume on NFT pages are this service's own open
listings and confirmed settlements, as on every other market page here, and
are never chain facts. Anything shown from a collection's off-chain
metadata is labelled off-chain and plays no part in a sale.

Shielded NFPT items are a different family and are not traded here. The
NFTs category links to their public directory so they can be found; no buy,
list or offer action exists for them, because no proof of shielded
settlement exists that this market could verify.

## Reopen an existing purchase

After a reload or a lost response, return to the existing execution reference
and check its status before starting another purchase. Reopening that execution
does not prepare another trade, request another signature, or submit it again.
An error or timeout does not establish that the earlier purchase failed.

For a confirmed ZRC-20 purchase, the product checks both the inscription
transfer and the token settlement under the selected ruleset. They must describe
the same delivery. A transaction identifier alone is not delivery evidence; if
those proofs are unavailable or disagree, keep the outcome unresolved.

These recovery and display checks belong to the source and testnet candidate.
They do not establish production availability; use the release status below.

## What is live today

The source and public-testnet campaigns include working wallet and marketplace
journeys. They do not establish which release the public site is serving.
The production inspection on 17 September 2026 found an older product release
and an indexer missing the current market receipt contracts and replay
identity evidence. Production marketplace qualification remains incomplete.

The NFT journeys above are part of the same source candidate and follow the
same rule: each action opens only where its own release evidence and
dependencies are healthy, and the page names the blocker otherwise.

Creating a listing requires a wallet qualified for that operation. A published
listing alone does not prove that execution is available: preparation and new
submission also require an explicitly configured confirmation policy, healthy
dependencies, and matching release evidence. An unavailable book must not be
shown as an empty book.

A fixed-price Zerdinal purchase has two independent paths. A connected
wallet can review and sign its funding input. The pay-from-any-wallet path
creates an exact ZEC invoice and, after confirmation, combines those funds
with the seller's already sealed authorization. The service never signs the
seller's asset input. Each path opens only when its own release authorization
and dependencies are healthy. Until then the product shows the precise
blocker instead of offering a path that cannot finish. See
[Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
and [current status](/docs-zerdinals-and-zrunes/start/status/).

## What is public

Everything. The listing, its price, the seller address, the settlement
transaction, the buyer's receiving address, and the full history of all of
it are permanently readable by anyone, on this site and on every other
reader of the Zcash chain. Nothing about market activity is shielded or
anonymous. If you do not want an address linked to a sale, use a fresh
receiving address and understand the linkage a settlement itself creates.
