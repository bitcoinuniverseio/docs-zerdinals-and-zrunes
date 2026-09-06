---
title: "Passes and Events"
description: "Verifiable event passes, W3C VC 2.0 credentials, rotating anti-replay QR presentations, and offline door check-in on Zcash."
---

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
