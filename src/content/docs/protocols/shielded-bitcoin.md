---
title: "Shielded Bitcoin (profile universe-sb-v1)"
description: "Private bitcoin-denominated transfers published on Bitcoin L1: how the allocinit Shielded Bitcoin transfer protocol is built here, what this profile fixes, and what it does not provide."
---

:::note[Normative source]
This page summarizes the profile maintained in the product repository at
`packages/shielded-bitcoin/PROFILE.md`, together with its frozen artifacts in
`packages/shielded-bitcoin/profile/universe-sb-v1/`. Where this page and those
files disagree, the product repository is the authority.
:::

Shielded Bitcoin is the transfer protocol described in the alloc init
paper *Shielded Bitcoin: Private Transfers on the Bitcoin L1* (September 24,
2026). Value is held as encrypted notes; a transfer publishes nullifiers for
the notes it spends, new encrypted notes, and a zero-knowledge proof, inside
one Bitcoin transaction. Bitcoin only orders these envelopes. Every indexer
that replays accepted envelopes in block order arrives at the same note tree,
nullifier set and root history.

## What a transfer hides and what it shows

| Hidden | Public |
| --- | --- |
| Amounts | That a transfer happened, and when |
| Sender and recipient | 2 inputs and 2 outputs (every transfer has this shape) |
| Which earlier notes were spent | The anchor height the proof used |
| | The Bitcoin fee and the transaction that carried the envelope |

## This profile

The paper leaves the concrete encodings, curves, hashes, circuit and setup to
a deployment profile. **universe-sb-v1** is Universe's profile. The paper's
authors had not published one when it was frozen, so it is a separate
network: envelopes carry the header `btc 01 01 55`, where the last byte marks
this profile.

- **Proof:** Groth16 on BN254, one circuit for 2 inputs and 2 outputs
  (465,875 constraints). Envelope size: 604 bytes, published in one
  OP_RETURN output.
- **Keys:** one 32-byte wallet seed; the paper's HKDF-SHA256 key tree
  separates spending, nullifier, incoming-view and outgoing-view keys. The
  circuit derives the nullifier key and the receiving key from the spending
  key itself.
- **Addresses:** diversified Baby Jubjub keys, bech32m `sbtc1...` (mainnet),
  `tsbtc1...` (Signet), `lsbtc1...` (Universe lab Signet).
- **Notes:** value, 11-byte diversifier and a random seed, encrypted with a
  committing Poseidon construction the circuit checks.
- **Replay rules:** anchors from the last 100 blocks (at least 1 block deep),
  checks in the paper's order (parse, anchor, nullifiers, proof), and no
  partial effect from a rejected envelope.
- **Setup:** phase 1 is the public Perpetual Powers of Tau ceremony (80
  contributions). Phase 2 has three contributions and a random beacon: the
  hash of Bitcoin block 968457, named before it was mined. The proving key is
  pinned by SHA-256 and checked by the wallet before use.

## Networks

| Network | Starts at block | Initial notes |
| --- | --- | --- |
| Mainnet | 968457 | none |
| Signet | 323550 | 1,000,000 test sats held by Universe for testing |
| Lab Signet (Universe's private test chain) | 8006 | 1,000,000 test sats held by Universe for testing |

Test notes on Signet and the lab chain are declared by Universe for testing.
They are not backed by bitcoin and cannot be redeemed.

## What it does not do yet

**There is no way to move bitcoin into or out of Shielded Bitcoin.** The
paper covers transfers only: deposits (peg-in) and withdrawals (peg-out)
belong to a separate design the authors describe as future work. On mainnet
the note tree therefore starts empty and stays empty until a peg-in exists.
The mainnet transfer layer runs (replay, roots and the wallet), and it would
accept transfers of notes if any existed.

Other limits to know:

- Phase 2 has one operator. A value-bearing mainnet deployment should first
  add independent phase-2 contributors, which produces a new profile.
- A wallet that does not replay the chain itself trusts the indexer's roots
  and paths only as far as a proof allows: a wrong path fails proving, a
  wrong root fails replay.
- Network-level metadata (who broadcast a transaction, fee patterns, timing)
  is outside the proof.

See the [Shielded Bitcoin wallet guide](/docs-zerdinals-and-zrunes/own/shielded-bitcoin/)
for using it.
