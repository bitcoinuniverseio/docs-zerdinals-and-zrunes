---
title: "Provenance Studio (C2PA 2.4)"
description: "C2PA 2.4 provenance manifest verification, local trust lists, offline proof bundles, and ZPROV/1 child inscription anchoring on Zcash."
---

<!-- IMPLEMENTATION-HANDOFF [DOC-001] Coverage DOC-provenance-studio.
Verified baseline 595ebaecd5; published promises must not be mistaken for accepted behavior.
The text promises local/offline verification and hardware/offline signing while current create flow posts signing data to the backend and has a DTO mismatch. Reconcile browser bytes, signed asset validation, actor binding, anchor prepare/sign/confirm and portable verification with PRV work packages.
1. After the matching app source work packages pass, replace examples with the tested request/response contracts, exact formats, permissions and network-specific prerequisites.
2. Keep every existing advertised capability in the acceptance inventory. Implement missing behavior; do not delete promises simply to reduce required scope. Until qualified, distinguish available behavior and pending requirements truthfully.
3. Link governing versioned specifications and testnet evidence to the exact accepted product/indexer revision. Explain revocation limits and service trust where relevant without claiming stronger guarantees.
4. Run npm run check:markdown and npm run build from this repository after implementation; targeted markdownlint passed during preparation, full build remains untested. Validate internal links and examples against real testnet API responses. Coordinate DOC-002 developer runbook changes.
No rendered prose changed in preparation. Deploy docs only with matching accepted product release; rollback documentation with that revision.
-->
## Overview

Provenance Studio introduces verifiable cryptographic content provenance to Zordinals and ZRUNES based on the C2PA 2.4 standard. Creators can attach tamper-evident manifests to media, sign assertions offline or with hardware keys, and anchor provenance records permanently on the Zcash blockchain.

## Key Capabilities

### 1. C2PA 2.4 Manifest Verification

- Complete validation of C2PA manifest stores according to specification 2.4.
- Hard binding validation ensuring asset byte hash matches the manifest assertion.
- Cryptographic signature check against local trust lists.

### 2. Local Trust Lists

- Trust is established against configurable local trust anchors rather than centralized authorities.
- Signer certificates are evaluated against known issuers and digests.

### 3. ZPROV/1 Child Inscription Anchors

- On-chain child inscriptions anchor the C2PA manifest store SHA-256 digest directly to the parent Zordinal inscription.
- Protocol prefix: `ZPROV/1`.
- Links `parentInscriptionId`, `manifestStoreSha256`, and signing parameters immutably on Zcash.

### 4. Offline Proof Bundles

- Self-contained, portable bundles containing the asset manifest store, validation report, and on-chain Zcash transaction receipt.
- Verifiable entirely offline in isolated environments without network connectivity.

### 5. Private Local Verification

- Verification happens client-side in the browser or offline verifier.
- No telemetry or external server tracking.
