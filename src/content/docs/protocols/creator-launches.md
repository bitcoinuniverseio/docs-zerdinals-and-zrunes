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

## Commission and payout

A sealed revision fixes the economics before anyone pays: the platform
commission of 15% (1,500 basis points) of the realized primary-sale gross,
the address the commission is paid to, and the split of the creator's
proceeds. The commission is computed in whole zatoshis per sealed order, as
the integer floor of the delivered gross multiplied by 1,500 and divided by
10,000; the creator payout is the remainder, so the two add back to the
gross exactly. A 1 ZEC sale pays 0.15 ZEC to the platform and 0.85 ZEC to
the creator, before the separately listed creation service fee, network
fees and carried value.

- Commission is taken on delivered serials only. Serials that are not
  delivered are refunded in full and carry no commission.
- A zero-price launch carries no commission.
- A revision sealed before these terms existed carries no commission
  evidence. The product refuses to invoice it and asks the creator to seal a
  new revision rather than inventing terms for it.
- A changed chain receipt resumes verification of the existing serial. It
  does not allocate a replacement serial and does not charge a second
  commission.

The fixed creation service fee, the network fees, the value carried with
each asset and any secondary-market terms are separate from this commission
and are unchanged by it. See
[Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/).

A paid launch settled under these rules on public Zcash Testnet on 18
September 2026: 200,000 zatoshis of sales paid 30,000 zatoshis to the
platform and 170,000 zatoshis to the creator in one settlement transaction,
and the order readback reported the same figures. The free-launch journey is
recorded in the same acceptance record, with its Testnet run in progress.
Partial delivery and its refund are covered by deterministic tests only,
because that campaign had no way to force a delivery to fail. None of this
is deployed on Zcash mainnet.

## Launch archetypes

The list below is the archetype catalogue, not a list of variants that can
be launched today. Each archetype keeps its own implementation and
qualification gate, and a launch type with no producer behind it is listed
with the capability `discovery-only` rather than as a payable launch.

What you can do with a launched asset afterwards depends on its protocol,
not on the launchpad: explore, mint, transfer, list and buy are answered per
protocol, and a capability that is unavailable names its blocker instead of
being hidden. ZRC-721 items are described in
[Collections](/docs-zerdinals-and-zrunes/understand/collections/#zrc-721-collections)
and their market actions in
[Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/#nfts).

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

<!-- IMPLEMENTATION-HANDOFF [LP-14] | DOCS/RELEASE | preparation only
Dependencies: LP-01 through LP-13. Governing sources and exact revisions: server handoff research/SOURCE-REGISTER.json.
1. Update this owning documentation with the implemented 3-step design/settings/launch journey, 18% per-mint fee and separate network costs, explicit collection verification and real wallet requirements; preserve historical 15% sealed-order explanations.
2. Document producer/manifest/receipt versions, native parent authorization and recovery, network-separated migrations, phase/refund/reveal states and actual API contracts. No claim that database sealing alone is on-chain publication or that transparent artwork is secret.
3. Cross-link the actual accepted Testnet evidence, UI/chain/indexer readback, relevant repositories and release artifacts. Do not promote old reports, annotations or unit tests into full PASS.
4. After every applicable functional row passes, integrate legitimate release PRs and deploy through ops/DEPLOYMENT.md with verified service names, backups and rollback. Public Mainnet exposure/revision/health receipts are required; Mainnet functional test transfers are not.
Tests: build this documentation with its verified package scripts where present, check links/claims against new API/schema and UI, and capture public docs route after release. Commands not yet executed are NOT TESTED.
Rollback: retain old version docs, compatible readers and paid-order recovery; disable unsafe new admission, never destroy history.
-->
