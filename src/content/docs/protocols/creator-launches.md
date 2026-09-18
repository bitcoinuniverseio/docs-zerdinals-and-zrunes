---
title: "Creator Launches and Public Launchpad"
description: "Creator Launch Studio concepts, launch variants and receipt requirements for original-inscription delivery on Zcash."
---

## Overview

The Creator Launchpad binds a reservation to sealed creator, recipient and
payment terms. Payment-funded launches use the service's isolated signer
while executing the paid operation.

<!-- IMPLEMENTATION-HANDOFF [WP-DOCS-01]
Dependencies: WP-LAUNCH, WP-UI.
1. Reconcile existing prep/creator-mainnet-20260918 and origin/docs/nft-integration-20260918 content with the implementation actually selected; do not create parallel launch or NFT guides.
2. After qualification, document the 15% commission on realized primary-sale proceeds, sealed terms, creator payout, unsuccessful delivery refunds and reorg recovery. Creation service charges, network costs and secondary-market charges remain separate.
3. Distinguish supported launch variants from concepts. Link per-protocol explore, mint, transfer, list and buy capabilities; unavailable capabilities must name the blocker.
4. Public release gate: functional Zcash TESTNET launch, delivery, commission, payout/refund and recovery evidence with WP-LAUNCH and WP-UI. No mainnet transactions or claims of deployed availability from source alone.
-->

## Receipt and settlement status

The September 2026 repair candidate is unreleased. It binds each
original-inscription serial to its own child order, recipient and historical
delivery receipt. Identical content does not make two serials interchangeable.

The order view separates payment received, serial delivery and settlement.
Delayed indexing keeps a serial pending. A changed chain receipt resumes
verification of the existing serial; it does not allocate a replacement.
Creator payout uses the sealed delivered allocation. A refund allocation
does not mean a refund has been paid. Refunds remain held when safe failure
evidence or the original authorized destination cannot be established.

Native wallet, node, indexer and browser validation remains required. The
variants below retain separate implementation and qualification gates.

## Launch archetypes

- Fixed Collection Drops
- 1-of-1 Inscription Releases
- Open Editions (Time-Gated Dynamic Supply)
- Limited Edition Sets
- Mint on Demand
- Pre-Inscribed Inventory Fulfillments
- Delayed Fair Reveals (Block-Hash Seeded Provenance)
- ZRC-20 Deploy and Mint Campaigns
- ZRC-721 Collection Launches
- ZRune Etch Campaigns
- Batch Merkle Airdrops
- Non-Fungible Privacy Token (NFPT) Drops
