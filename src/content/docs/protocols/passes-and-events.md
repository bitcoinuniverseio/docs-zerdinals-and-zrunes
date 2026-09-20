---
title: "Passes and Events"
description: "Verifiable event passes, W3C VC 2.0 credentials, rotating anti-replay QR presentations, and offline door check-in on Zcash."
---

<!-- IMPLEMENTATION-HANDOFF [DOC-001] Coverage DOC-passes-and-events.
Verified baseline 595ebaecd5; published promises must not be mistaken for accepted behavior.
The text promises VC/SD-JWT and offline PWA; the issuer currently rejects mainnet. Reconcile signing custody, supported credential/presentation formats, paid claim, gate time enforcement, offline replay and post-event reconciliation with PAS work packages.
1. After the matching app source work packages pass, replace examples with the tested request/response contracts, exact formats, permissions and network-specific prerequisites.
2. Keep every existing advertised capability in the acceptance inventory. Implement missing behavior; do not delete promises simply to reduce required scope. Until qualified, distinguish available behavior and pending requirements truthfully.
3. Link governing versioned specifications and testnet evidence to the exact accepted product/indexer revision. Explain revocation limits and service trust where relevant without claiming stronger guarantees.
4. Run npm run check:markdown and npm run build from this repository after implementation; targeted markdownlint passed during preparation, full build remains untested. Validate internal links and examples against real testnet API responses. Coordinate DOC-002 developer runbook changes.
No rendered prose changed in preparation. Deploy docs only with matching accepted product release; rollback documentation with that revision.
-->
## Overview

Passes and Events enables creators and event organizers to issue cryptographically verifiable access passes, event tickets, and membership credentials anchored to Zcash metaprotocols.

## Key Capabilities

### 1. Cryptographic Passes (ZPASS/1)

- Standard W3C Verifiable Credentials 2.0 and SD-JWT (Selective Disclosure JWT) issuance.
- Rich metadata: event date, venue, tier, access rights, and transferability rules.
- Real-time validity tracking via Bitstring Status List 1.0.

### 2. Anti-Replay Rotating QR Presentations

- Secure time-based dynamic QR presentation codes.
- TOTP and HMAC cryptographic rotation prevents screenshot sharing, credential cloning, and replay attacks.
- Nonce single-use tracking ensures each scanned code is validated only once.

### 3. Offline Door Verifier PWA

- Standalone, progressive web app operating entirely offline at venue gates.
- Preloaded verifier policies and compressed status lists allow instant gate validation without active internet connectivity.
- Offline check-in log records with conflict resolution and post-event synchronization.

### 4. Event Capacity and Tiers

- Tiered ticketing structures with exact capacity limits.
- On-chain transparency of ticket supplies with optional shielded privacy for attendee identities.
