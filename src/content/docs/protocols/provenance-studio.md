---
title: "Provenance Studio (C2PA 2.4)"
description: "C2PA 2.4 provenance manifest verification, local trust lists, offline proof bundles, and ZPROV/1 child inscription anchoring on Zcash."
---

## Overview

Provenance Studio introduces verifiable cryptographic content provenance to Zerdinals and ZRunes based on the C2PA 2.4 standard. Creators can attach tamper-evident manifests to media, sign assertions offline or with hardware keys, and anchor provenance records permanently on the Zcash blockchain.

## Key Capabilities

### 1. C2PA 2.4 Manifest Verification
- Complete validation of C2PA manifest stores according to specification 2.4.
- Hard binding validation ensuring asset byte hash matches the manifest assertion.
- Cryptographic signature check against local trust lists.

### 2. Local Trust Lists
- Trust is established against configurable local trust anchors rather than centralized authorities.
- Signer certificates are evaluated against known issuers and digests.

### 3. ZPROV/1 Child Inscription Anchors
- On-chain child inscriptions anchor the C2PA manifest store SHA-256 digest directly to the parent Zerdinal inscription.
- Protocol prefix: `ZPROV/1`.
- Links `parentInscriptionId`, `manifestStoreSha256`, and signing parameters immutably on Zcash.

### 4. Offline Proof Bundles
- Self-contained, portable bundles containing the asset manifest store, validation report, and on-chain Zcash transaction receipt.
- Verifiable entirely offline in isolated environments without network connectivity.

### 5. Private Local Verification
- Verification happens client-side in the browser or offline verifier.
- No telemetry or external server tracking.
