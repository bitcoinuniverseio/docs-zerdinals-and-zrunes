---
title: "ZMarket Orders v1 specification"
description: "The normative specification of the market order protocol: the listing authorization, the settlement layout, validity, states, and versioning."
---

:::note[Normative source]
This page is the published copy of the normative specification maintained in the product repository (docs/protocol/ZMARKET-ORDERS-V1.md at commit f693f3e7a51b). Where this page and that file disagree, the product repository file is the authority.
:::

The signed-order protocol behind the Universe market for Zcash metaprotocol
assets. This document is normative for order container version `1`.

The market is not chain truth. Everything in this document describes signed
intent and derived market state, kept strictly apart from the archive and the
chain record. A listing is a revocable public offer; only a confirmed Zcash
transaction settles anything. No figure derived from this layer may ever be
presented as a consensus fact.

## 1. Model

A fixed-price listing is one ECDSA signature by the seller over a ZIP-244
transaction digest with sighash type `SINGLE | ANYONECANPAY` (0x83). The
signature commits the seller's asset outpoint to exactly one outcome: any
transaction that spends it must pay the seller's payout output at the same
output index as the asset input's input index, under the pinned transaction
header (version, version group, consensus branch, lock time, expiry height).

Everything else about the final transaction is the buyer's to build. Delivery
of the asset, the platform fee, and the buyer's change are buyer-side outputs
that the seller's signature deliberately does not constrain.

Atomicity follows from the script system, not from this service: the asset
outpoint cannot be spent without paying the seller, and the seller cannot be
paid by that signature without the asset outpoint being spent in the same
transaction. There is no escrow, no custody, and no service key that can move
the seller's asset.

### What the model does not provide

1. The signature does not restrict who buys. Anyone holding the authorization
   can settle it by paying the seller. Publication is therefore equivalent to
   an open offer at the stated terms.
2. Off-market cancellation is advisory. The service can stop serving an
   authorization, but a copy that already left the service remains valid until
   the asset moves or the pinned expiry height passes. Guaranteed revocation is
   a self-transfer of the asset.
3. Ownership settles at confirmation depth, never from the mempool.

## 2. Settlement transaction layout

The final settlement transaction is a Zcash V5 transparent transaction with
this exact layout:

| Index | Input | Output |
| --- | --- | --- |
| 0 | buyer funding | asset delivery to the buyer's recipient |
| 1 | seller asset outpoint | seller payout (the price) |
| 2..n | further buyer funding | platform fee, then buyer change |

The layout is forced by two rules meeting:

1. ZERDINALS-V1 section 8.2 moves an inscription spent from its carrying
   output to the first transparent non-data output of the spending
   transaction. Delivery must therefore be output 0.
2. `SIGHASH_SINGLE` binds the signed input to the output at the same index.
   The seller's input and payout therefore share index 1.

The asset delivery output carries exactly the zatoshi value of the asset
outpoint. The ZEC riding on the asset outpoint transfers with the asset, and
the price must be set with that in mind; the listing container and every
surface display it.

The platform fee output is present only when the fee policy in force at
listing time is non-zero. Fee policy is deployment configuration, sealed into
the listing at creation, and can never change for an existing listing.

## 3. Listing authorization container

A listing authorization is this JSON object, serialized with the exact key
order below. Its SHA-256 over the serialized bytes is the authorization hash.
Every hex field is lowercase. Every amount is a decimal string of zatoshis.

```
domain               "universe-zmarket-listing-v1"
version              "1"
network              zcash:mainnet | zcash:testnet | zcash:regtest
orderId              UUID, assigned by the service at sealing
protocol             "zerdinals"
assetId              the inscription id the listing is about
assetOutpoint        { txid, vout }
assetValueZatoshis   value of the asset outpoint
consensusBranchId    uint32 of the pinned branch
lockTime             0
expiryHeight         uint32, consensus-enforced listing expiry
sellerAddress        transparent address that owns the asset outpoint
sellerPayoutScript   scriptPubKey hex of the payout output
priceZatoshis        value of the payout output
platformFeeZatoshis  fee amount sealed at creation ("0" when none)
platformFeeScript    scriptPubKey hex of the fee output, or null
signature            DER signature || 0x83, hex
publicKey            33-byte compressed key, hex
```

The signature is over the ZIP-244 signature digest for a V5 transaction with:

* header: version 5, version group `0x26A7270A`, `consensusBranchId`,
  `lockTime`, `expiryHeight` as above;
* the asset outpoint as the sole considered input, spending its actual
  scriptPubKey and value, sequence `0xffffffff`;
* the payout output (`sellerPayoutScript`, `priceZatoshis`) at the signed
  input's index;
* sighash type `0x83` (`SINGLE | ANYONECANPAY`).

Under `ANYONECANPAY` the digest ignores every other input, and under `SINGLE`
every other output, so this digest is computable from the container alone plus
the asset outpoint's scriptPubKey, and identical for every conforming final
transaction. A verifier recomputes it and checks the signature against
`publicKey`, then checks `publicKey` hashes to the asset outpoint's P2PKH
scriptPubKey. Only P2PKH asset outpoints are listable in v1.

### Expiry is consensus-enforced

`expiryHeight` sits inside the ZIP-244 header digest, so the network itself
refuses the settlement after that height. Expiry is not service policy that a
copied authorization could outlive. The service additionally refuses to serve
expired listings, and the pinned `consensusBranchId` makes every open listing
invalid across a network upgrade by construction; both facts are displayed,
not hidden.

## 4. Validity and revalidation

A listing is served as OPEN only while every one of these holds:

1. The asset outpoint is unspent, checked against the node.
2. The indexer's projection agrees the asset lives at that outpoint and the
   owner address matches `sellerAddress`.
3. The outpoint's asset composition has an authoritative `scanned` verdict.
   Every asset claim on the outpoint travels with the listing; an outpoint
   carrying several assets sells them together and the listing says so.
4. The pinned consensus branch is still the network's next-block branch.
5. The current height is below `expiryHeight`.
6. The signature verifies against the recomputed digest.

These checks run at creation, on a rolling revalidation schedule, immediately
before a buyer is handed a settlement template, and again immediately before
broadcast. A listing failing any check is INVALIDATED or EXPIRED with the
exact reason recorded, immediately and permanently. A mempool transaction
spending the asset outpoint marks the listing UNSAFE while it is unconfirmed.

## 5. States

```
OPEN         served, biddable, buyable
UNSAFE       a conflicting spend is in the mempool; not buyable
CANCELLED    seller withdrew it; advisory, see section 1
EXPIRED      height passed expiryHeight
INVALIDATED  a validity check failed permanently (asset moved, branch
             changed, composition changed, ownership disagreed)
FILL_PENDING settlement broadcast or observed, unconfirmed
FILLED       settlement confirmed to completion depth
REORGED      a recorded fill's block was disconnected; returns to
             FILL_PENDING or OPEN by revalidation
```

Every transition is journalled append-only with its reason. Fills record the
settlement txid, block height, exact decimal amounts, and the fee breakdown
sealed at listing time.

## 6. Buying

The service prepares a complete settlement transaction template under the
signing contract (`docs/wallets/SIGNING-CONTRACT.md`, version 2) with the
layout of section 2. The buyer's wallet reviews and signs only the buyer's
inputs; the seller's input travels unsigned through the wallet and the
service injects the seller's signature script before broadcast. Injection
cannot change the transaction id: a V5 transaction id commits to effects,
not to signature scripts.

The walletless path uses the payment order plane: the service quotes an exact
invoice, receives ZEC on an isolated per-order key, and the sealed manifest
authorizes the signer to fund only this listing's settlement, paying only the
sealed seller payout, fee output, and the sealed buyer recipient. The seller's
asset is never held by the service in either path.

No settlement is recognized from the mempool. FILLED requires confirmation to
the completion depth used by the rest of the product, and a reorg rolls the
fill back exactly as the indexer rolls back chain state.

## 7. Aggregates

Floor, volume, sale counts and price history are derived exclusively from
confirmed fills and currently OPEN listings of this service, and say so. They
carry the chain checkpoint and the coverage statement of the indexer they
were computed against. Unknown is answered as unknown, never as zero. ZRC-20
quantities never mix rulesets.

## 8. Versioning

The `domain` and `version` fields are inside the signed digest input, via the
container fields they bind. A change to layout, digest construction, or field
meaning is a new version with a new domain string. Version 1 covers
fixed-price listings of P2PKH-held Zerdinal inscriptions. Offers, auctions,
fungible amount orders, and ZRune listings extend this document in later
versions rather than mutating v1.
