---
title: "Rights and Remix Studio"
description: "Machine-readable rights, W3C VC 2.0 license receipts, Bitstring Status List 1.0, and ZDERIV/1 remix lineage on Zcash."
---

<!-- IMPLEMENTATION-HANDOFF [DOC-001] Coverage DOC-rights-and-remix.
Verified baseline 595ebaecd5; published promises must not be mistaken for accepted behavior.
The text promises on-chain rights/derivatives and milestone escrow. Mainnet paid-license polling returns early despite qualified admission. Reconcile issuance/revocation/private holder proofs, payment settlement and commissioned delivery with RGT work packages.
1. After the matching app source work packages pass, replace examples with the tested request/response contracts, exact formats, permissions and network-specific prerequisites.
2. Keep every existing advertised capability in the acceptance inventory. Implement missing behavior; do not delete promises simply to reduce required scope. Until qualified, distinguish available behavior and pending requirements truthfully.
3. Link governing versioned specifications and testnet evidence to the exact accepted product/indexer revision. Explain revocation limits and service trust where relevant without claiming stronger guarantees.
4. Run npm run check:markdown and npm run build from this repository after implementation; targeted markdownlint passed during preparation, full build remains untested. Validate internal links and examples against real testnet API responses. Coordinate DOC-002 developer runbook changes.
No rendered prose changed in preparation. Deploy docs only with matching accepted product release; rollback documentation with that revision.
-->
## Overview

The Rights and Remix Studio provides on-chain intellectual property expressions, verifiable license issuance, and cryptographic lineage tracking for Zerdinal and ZRune creators.

## Key Capabilities

### 1. ZRIGHTS/1 Rule Manifests

- Machine-readable rights expressions defining commercial rights, modification permissions, and attribution requirements.
- Standard rule templates: Commercial Remix, Non-Commercial CC-BY, Open Source Permissive, and Custom Bilateral Agreements.
- Deterministic compilation and signing of rights manifests.

### 2. ZLICENSE/1 Verifiable Credential Receipts

- Standard W3C Verifiable Credentials 2.0 issued as proof of license acquisition.
- Fast status checking via Bitstring Status List 1.0 compression.
- Instant, cryptographic revocation or suspension by bit index without requiring individual transaction overhead.

### 3. ZDERIV/1 Remix Lineage

- Transparent parent and component attribution.
- Inscribes cryptographic provenance linking derivative creations to ancestor inputs.
- Visual lineage tree rendering showing the full generational ancestry of any asset.

### 4. Revenue Splits and Commissions

- Exact zatoshi payout rules for downstream sales and royalties.
- Multi-party commission contracts with milestone escrow release schedules.
