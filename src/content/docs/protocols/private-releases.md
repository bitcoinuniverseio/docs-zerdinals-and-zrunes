---
title: "Private Releases"
description: "Encrypted content publishing, chunked AEAD, HPKE key wrapping to isolated device keys, and streaming decryption on Zcash."
---

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
