---
title: "ZMarket Orders v2 specification"
description: "The normative specification of ZMarket Orders v2: covering 17 frozen order kinds, English and Dutch auctions, criteria offers, and companion policy leases."
---

The signed-order protocol for Zcash metaprotocols version 2.

## Implementation status

Current source and public-testnet campaigns cover transparent Zordinal
single-item asks and full-lot fungible asks. Production qualification remains
incomplete: the 17 September 2026 deployment inspection found older serving
artifacts without the indexer contracts required by current market execution.
The order kinds below describe protocol vocabulary, not universal trading
availability. Read [current status](/docs-zerdinals-and-zrunes/start/status/).

A purchase retains one execution reference across refreshes and interrupted
responses. Review the recipient, seller proceeds, creator payout, platform
fee, network fee, change and total debit before signing. An accepted request
or a transaction reference still needs observation. Delivery requires a
matching historical inscription transfer receipt at the configured
confirmation depth, even if the asset has since moved onward.

For an accepted, uncertain or reorganized transaction, reopen the existing
order and check its status. Do not start another purchase to resolve an
uncertain result. Offers, auctions, criteria, partial fills and private
settlement retain their separate qualification requirements.

## Exact total-price lot asks

The version 3 candidate is limited to offline `lot-ask` orders for ZRunes,
`zrc20-zord`, and `zrc20-zecscriptions`. It records `lotPriceZatoshis`, the exact
price of the complete lot, in a distinct v3 envelope with the
`universe-zmarket-lot-ask-v3` domain. The wallet reviews the exact total; the
maker retains the ZIP-244 `SINGLE|ANYONECANPAY` signature over the lot input
and seller payout. Quantity remains an exact integer number of base units.
Token decimals never multiply or divide the total price.

It requires one lot and a full fill. Existing version 2 envelopes,
`unitPriceZatoshis` values, hashes and signatures retain their original meaning.
Partial fills, bids and auctions are not enabled by this version. Before
signing, review the whole quantity, total lot price, fees and total debit.

An order can be published while execution remains unavailable. Missing or
invalid confirmation policy blocks execution preparation and new submission;
it does not erase an accepted execution or turn an uncertain result into a
failed purchase. Reopen the same execution to inspect recovery status.

## 1. Scope and Frozen Order Kinds

ZMarket Orders v2 defines exactly 17 frozen order kinds:

- Single-item asks and offers (`item-ask`, `item-offer`, `counteroffer`)
- Criteria-based offers (`collection-offer`, `trait-offer`)
- Lot trading (`lot-ask`, `lot-bid`)
- Continuous liquidity (`continuous-ask`, `continuous-bid`)
- Auctions (`english-auction`, `dutch-auction-stepped`, `dutch-auction-smooth`)
- Aggregation and fulfillment (`bulk-manifest`, `sweep-plan`, `revocation`, `fill`, `continuation`)

## 2. Invariants

- Exact Envelopes: Maker payloads are stored untouched and signed over deterministic byte serialization.
- Two-Phase Matching: Proposals are prepared with exact dry-run simulation before settlement signatures are collected.
- Output Safety: Asset-bearing outpoints are protected against accidental consumption as miner fees.
