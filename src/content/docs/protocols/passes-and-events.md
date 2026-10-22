---
title: "Passes and Events"
description: "Pass availability, saved records, signed presentations and the limits of current door verification."
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
## Current availability

Pass issuance is not available on Mainnet yet. Browse existing passes and events;
a connected wallet does not enable issuance. The site checks pass availability
before offering a claim, presentation or issuer action. Unknown, stale or
unavailable status asks you to retry without requesting a signature.

On a supported test network, only the actions the service explicitly supports
are offered. Priced passes still have no wallet purchase flow. Saved definitions
and public issuer records remain readable when issuance is unavailable. Existing
check-in history has its own authorized read path.

The implemented format is `passes-v1`, with server-signed credentials and
short-lived presentations bound to a holder and door. Online admission checks
use the service response. This is not evidence of a native Testnet acceptance
journey, offline door support, or a VC 2.0 credential implementation.

## Planned capabilities

The following capabilities remain requirements for future qualification. They
are not promises of functionality currently available on Mainnet.

### Passes and events

Passes and Events enables creators and event organizers to issue cryptographically verifiable access passes, event tickets, and membership credentials anchored to Zcash metaprotocols.

### Qualification inventory

#### 1. Cryptographic Passes (ZPASS/1)

- Standard W3C Verifiable Credentials 2.0 and SD-JWT (Selective Disclosure JWT) issuance.
- Rich metadata: event date, venue, tier, access rights, and transferability rules.
- Real-time validity tracking via Bitstring Status List 1.0.

#### 2. Anti-Replay Rotating QR Presentations

- Secure time-based dynamic QR presentation codes.
- TOTP and HMAC cryptographic rotation prevents screenshot sharing, credential cloning, and replay attacks.
- Nonce single-use tracking ensures each scanned code is validated only once.

#### 3. Offline Door Verifier PWA

- Standalone, progressive web app operating entirely offline at venue gates.
- Preloaded verifier policies and compressed status lists allow instant gate validation without active internet connectivity.
- Offline check-in log records with conflict resolution and post-event synchronization.

#### 4. Event Capacity and Tiers

- Tiered ticketing structures with exact capacity limits.
- On-chain transparency of ticket supplies with optional shielded privacy for attendee identities.
