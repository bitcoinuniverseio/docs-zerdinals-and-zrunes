---
title: "Shielded Metaprotocols and Privacy Architecture"
description: "Zcash private metaprotocols: ZINC-1 memos, NFPT privacy tokens, and sovereign Zones with local client viewing sessions."
---

## Protocols

### ZINC-1 Memos

Standardized encrypted memo payloads riding within Sapling and Orchard note ciphertexts.

### Non-Fungible Privacy Tokens (NFPT)

Shielded memos that label an item by its content hash. The ZINC draft that defines them treats ownership as advisory: a memo is a label, not a note-bound token, so there is no ownership proof yet. Zordinals shows NFPTs for discovery only and does not sell them in launches.

### Sovereign Zones

Decentralized naming and routing zones on Zcash with sovereign key authority.

## Client-Local Security Model

All viewing keys (UFVK / UIVK) are stored strictly in client browser memory. Trial note decryptions execute locally via client WebAssembly. Keys and unencrypted metadata are never transmitted across the network.
