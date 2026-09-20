---
title: "Private Releases"
description: "Encrypted content publishing, chunked AEAD, HPKE key wrapping to isolated device keys, and streaming decryption on Zcash."
---

<!-- IMPLEMENTATION-HANDOFF [DOC-001] Coverage DOC-private-releases.
Verified baseline 595ebaecd5; published promises must not be mistaken for accepted behavior.
The text promises AAD, two ciphers/KEMs, streaming and offline export. Reconcile manifest encryption suite/version, browser/backend AAD, purchase recovery, custody reachability and advertised exports with REL work packages.
1. After the matching app source work packages pass, replace examples with the tested request/response contracts, exact formats, permissions and network-specific prerequisites.
2. Keep every existing advertised capability in the acceptance inventory. Implement missing behavior; do not delete promises simply to reduce required scope. Until qualified, distinguish available behavior and pending requirements truthfully.
3. Link governing versioned specifications and testnet evidence to the exact accepted product/indexer revision. Explain revocation limits and service trust where relevant without claiming stronger guarantees.
4. Run npm run check:markdown and npm run build from this repository after implementation; targeted markdownlint passed during preparation, full build remains untested. Validate internal links and examples against real testnet API responses. Coordinate DOC-002 developer runbook changes.
No rendered prose changed in preparation. Deploy docs only with matching accepted product release; rollback documentation with that revision.
-->
## Overview

Private Releases enables creators to distribute confidential, premium, or token-gated content securely on Zcash without exposing spend keys or relying on centralized DRM servers.

## Key Capabilities

### 1. Chunked AEAD Encryption

- Media content is divided into uniform chunks and encrypted using Authenticated Encryption with Associated Data (AEAD).
- Supports AES-256-GCM and ChaCha20-Poly1305.
- Unique nonces per chunk and cryptographic Additional Authenticated Data (AAD) binding prevent chunk manipulation or reordering.

### 2. Isolated Device Keys

- Decryption keys are strictly decoupled from wallet spend keys.
- User seed phrases and transaction signing keys are never exposed to media playback environments.
- Per-device P-256 / X25519 public keys are registered for access authorization.

### 3. HPKE Key Wrapping (RFC 9180)

- Content encryption keys are wrapped directly to recipient device public keys using standard Hybrid Public Key Encryption.
- Fine-grained access control: grants can be issued or revoked on an individual basis.

### 4. Progressive In-Browser Streaming Player

- Decrypts and buffers media chunks dynamically in memory without saving unencrypted bytes to disk.
- Zero external dependencies or plugin requirements.

### 5. Offline Decryptor Packages

- Exportable, standalone decryptor packages allow offline consumption on authenticated devices.
