---
title: "Shielded Metaprotocols and Privacy Architecture"
description: "Zcash private metaprotocols: ZINC-1 memos, NFPT privacy tokens, and sovereign Zones with local client viewing sessions."
---

## Protocols

### ZINC-1 Memos
<<<<<<< Updated upstream
Standardized encrypted memo payloads riding within Sapling and Orchard note ciphertexts.

### Non-Fungible Privacy Tokens (NFPT)
Privacy-preserving asset representations referencing immutable content hashes with zero-knowledge ownership proofs.

### Sovereign Zones
=======

Standardized encrypted memo payloads riding within Sapling and Orchard note ciphertexts.

### Non-Fungible Privacy Tokens (NFPT)

Privacy-preserving asset representations referencing immutable content hashes with zero-knowledge ownership proofs.

### Sovereign Zones

>>>>>>> Stashed changes
Decentralized naming and routing zones on Zcash with sovereign key authority.

## Client-Local Security Model

All viewing keys (UFVK / UIVK) are stored strictly in client browser memory. Trial note decryptions execute locally via client WebAssembly. Keys and unencrypted metadata are never transmitted across the network.
