---
title: "ZMarket Orders v2 specification"
description: "The normative specification of ZMarket Orders v2: covering 17 frozen order kinds, English and Dutch auctions, criteria offers, and companion policy leases."
---

The signed-order protocol for Zcash metaprotocols version 2.

## Implementation status

The September 2026 repair candidate adds recovery for transparent Zerdinals
single-item asks. It remains unreleased and has not completed the required
native wallet, node and indexer campaign. The order kinds below describe the
protocol vocabulary; they do not establish that every kind can be traded.

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
