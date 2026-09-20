---
title: Buying and selling
description: "How the market works, what a listing really is, what settles a sale in one transaction, what cancelling does and does not do, and exactly what is and is not live today."
---

**Outcome:** you will know what a listing on this market actually is, why a
purchase cannot half-happen, what cancelling does and does not do, and what
the product will and will not let you do today.

<!--
IMPLEMENTATION-HANDOFF [CMO-15] CMO-A038 | 2026-09-20 | PREPARATION ONLY
Coverage: DOC-01,REL-03. Findings: F16, N03.
Verified current behavior: The page describes trustless inscription settlement generically and has an
outdated six-destination statement; native registrar names follow different custody and payment rules.
Sources: S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET, S-NAMES-REGISTRAR in
docs/implementation/core-market-overhaul-20260920/RESEARCH.md.
Prerequisites: CMO-14.
1. Scope the current single-signature/atomic-swap explanation to the actual v1/v2 inscription and lot
families. Add distinct native name marketplace guidance with registrar custody, required memo,
credits/refunds and proof/readback, based on accepted implementation.
2. Replace the fixed destination count with the actual registry-driven navigation, covering tokens,
collectibles, names and ZkMap while preserving advanced market routes and cancellation warnings.
3. State exact metric scope, completeness, network and actual release status; no generic claim that every
market service never holds funds when names use registrar credits.
Verify: Existing scripts/verify-deployed-assets.mjs against the actual published origin/artifact, after
accepted release only ; Read-only public /.release and /api/ready checks; verify backend/indexer serving
revision separately ; Functional GO requires every required row PASS; final GO additionally requires
RELEASED — PUBLIC MAINNET evidence.
Assert: The overhaul is implemented, tested and publicly released through all actual services after
acceptance; a ZIP, build, merged PR, private preview or disabled feature is not public release.
Rollback/security: Keep prior immutable artifacts/config backups and compatible schema. Roll back unsafe
admission/UI in dependency order while preserving real funds, accepted operations, authoritative indexer
history and recovery.
Full cross-repository contract: docs/implementation/core-market-overhaul-20260920/WORK-PACKAGES.md.
ANNOTATED is not functional PASS. Preserve executable behavior during preparation.
-->
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

## Block names (ZkMap districts)

A ZkMap district is the winning inscription of a block name such as
`1500000.zkmap`, so it is listed and bought as a Zerdinal: the seller's
single signature binds the output carrying the winning inscription, one
transaction settles the sale, and the district follows that inscription to
the buyer. There is no separate district order type. The rules are in the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/).

The Market navigation has a ZkMap destination at `/market/zkmap`, which is
the Zerdinal order book filtered on the server to listings the backend
admitted as winning districts. A district is verified against the chain
when it is listed and again when it is bought; a losing or invalid claim
cannot be listed as a district, only as the ordinary Zerdinal it is. The
book has three filters (For sale, Sold, Everything), and an empty book says
whether it is empty or unreadable. Holders list a district from its block
page at `/zkmap/<height>`, whose Market section addresses the winning
inscription itself, and the market header links straight to the districts
you hold.

### Finding a district

Search a block name exactly: `780000` and `780000.zkmap` both find that one
district. It is not a text search over listings, so a partial height finds
nothing rather than a list of near misses, and `007` is refused because it
is not how a block name is written.

The book can be ordered by newest, by price in either direction, or by
block height. The search and the ordering are part of the page address, so
a book you are looking at can be linked to someone else and the back button
returns you to it rather than to a reset page. Ordering applies to the
whole book, not to the listings currently on screen.

### What the district figures mean

Above the book, districts for sale, the floor, sales and volume are counted
across the whole book for the network you are on, not across the listings
shown, and not across the wider market, which contains things that were
never districts. Amounts are exact.

When the district index cannot vouch for its own coverage, the figures read
**Unavailable** and say why. That is deliberate: a zero would look like a
real, empty market. A book that genuinely holds nothing shows zero and no
floor, which is a different statement.

### On a district's listing page

A district listing shows its block name, its picture and a link to the
district itself, above the signed terms rather than instead of them. The
name comes only from a current winning claim. If the inscription has since
lost its block name, the page says so: it can still be bought, but it is
not a district. If the claim simply cannot be read right now, the page says
that too, and does not present an unreadable claim as an invalid one.

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

### The collection directory

The NFTs category also carries a directory of collections reported across
Zcash, so a collection can be found here whether or not this service can
trade it. A directory entry records what a project has published about
itself: a name, a link, and the protocol it says it uses. It is labelled
**Unverified** until the collection's identity and protocol are established
against Universe-operated chain data, and an unverified entry carries no
ownership, supply, volume or price claim. Anything a project reports about
itself is shown as reported by the project, next to whatever this service
has actually observed, and the two are never added together.

The directory is seeded with eight discovery leads recorded on 18 September
2026: zkSNARKs, ZecBit Genesis, ZADDR, Zec Punks, BITFOOTS, ZecFrogs, ZecCat
and Zecutives. Every one of them is seeded unverified, with no collection
identifier and with every capability except discovery blocked, and each entry
names the evidence that would unblock it.

Capability is answered per protocol, not for the directory as a whole. Each
entry says which of explore, mint, transfer, list and buy it can execute,
and an entry that cannot execute one names the blocker rather than showing
an empty book. Listing, buying and cancelling exist only for ZRC-721 items
this service's own indexer has accepted; everything else in the directory is
discovery only.

ZRC-721 is a transparent inscription protocol and is not a shielded-asset
protocol. ZIP 226 and ZIP 227, the Zcash Shielded Assets proposals, are
Draft: there is no deployed shielded-asset support for this market to trade,
and a project describing its collection as ZSA does not create one.

These entries stay discovery only and unverified. The Zcash Testnet
acceptance of 18 September 2026 covered the launch economics, not the
admission of any of these collections, and ZIP 226 and ZIP 227 are still
Draft. Nothing here is deployed on Zcash mainnet.

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

<!-- IMPLEMENTATION-HANDOFF [WP-DOCS-03]
Dependencies: WP-MARKET, WP-UI, WP-LAUNCH.
1. Reuse origin/docs/nft-integration-20260918 market and collection guides after checking their revision against qualified code. Describe a hub with explicit protocol-specific explore, mint, transfer, list and buy capabilities, not universal trading.
2. Treat zkSNARKs, ZecBit Genesis, ZADDR, Zec Punks, BITFOOTS, ZecFrogs, ZecCat and Zecutives as unverified discovery leads. Verify identity, protocol, official metadata and own-indexer evidence before admitting assets; supplied popularity and volume figures are not measured market data.
3. Keep ZRC-721 inscription support distinct from any ZSA or private protocol. ZIP 226 and ZIP 227 are Draft proposals, not evidence of mainnet ZSA support. Shielded/untrackable ownership cannot authorize transparent trades.
4. Production chain data must use Universe-operated nodes/indexers only; external collection/trait/metadata sources may inform attributed metadata, never ownership, settlement or volume. Require functional TESTNET lifecycle evidence and matching release status before publishing availability; no mainnet transactions.
-->

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
