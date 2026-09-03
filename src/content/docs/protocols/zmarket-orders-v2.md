---
title: "ZMarket Orders v2 specification"
description: "The normative specification of ZMarket Orders v2: covering 17 frozen order kinds, English and Dutch auctions, criteria offers, and companion policy leases."
---

The signed-order protocol for Zcash metaprotocols version 2.

## 1. Scope and Frozen Order Kinds

ZMarket Orders v2 defines exactly 17 frozen order kinds:
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
