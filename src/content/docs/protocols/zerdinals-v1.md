---
title: "Zerdinals v1 specification"
description: "The normative specification of the Universe Zerdinals v1 inscription protocol: envelope, commitment, ownership, terminal states, and launch gates."
---

:::note[Normative source]
This page is the published copy of the normative specification maintained in the product repository (docs/protocol/ZERDINALS-V1.md at commit bd3bede4a238). Where this page and that file disagree, the product repository file is the authority. The Status line below describes the protocol release state in its own words.
:::

Status: Final draft for regtest and testnet validation. Mainnet creation stays gated until the launch checklist in this document passes.
Version: 1.0.0
Date: 2026-08-25

## 1. Overview

A Zerdinal is a digital artifact inscribed on Zcash through a pair of transparent transactions: a commit transaction and one or more reveal transactions. The content bytes live in the reveal transaction scriptSig. Ownership is bound to one transparent output and moves through ordinary transparent spends.

Universe Zerdinals v1 is a strict, integrity-hardened profile of the inscription envelope already live on Zcash mainnet since late 2025 (the ord scriptSig envelope used by the community Zerdinals ecosystem, Zordinals tooling, and Zecscriptions). Every v1 inscription is readable by existing ecosystem decoders. Every v1 inscription additionally carries a content hash commitment that generic legacy inscriptions lack.

Zerdinals are transparent. Content, ownership, and activity are public. Nothing in this protocol is shielded or private.

## 2. Network domain

1. Networks: Zcash mainnet, Zcash testnet, Zcash regtest. Assets never cross networks.
2. Value pool: the transparent pool only. Shielded pools terminate tracking (section 10).
3. Node: Zebra. Transaction validity follows current Zcash consensus. There is no protocol-level activation height for reading: the envelope is recognized wherever it appears. Creation through the Universe product follows the launch gates in section 14.
4. Transaction versions: V5 and V6 are both valid carriers. Builders use the version suggested by the active network upgrade for the target height. The consensus branch ID, version group ID, and expiry height are always derived from live chain state, never hardcoded.

## 3. Definitions

1. Content: the raw bytes being inscribed.
2. Content type: an ASCII media type string, for example image/png.
3. Piece: one 240-byte segment of content (the final piece may be shorter).
4. Commit transaction: a transparent transaction creating a P2SH output whose redeem script commits to the reveal key and the content hash.
5. Reveal transaction: a transparent transaction spending a commit output, carrying envelope pieces in its input scriptSig.
6. Genesis transaction: the first reveal transaction of an inscription.
7. Completion transaction: the reveal transaction that carries the final missing piece. For single-transaction inscriptions this is the genesis transaction.
8. Carrying output: the transparent output that currently owns the inscription.

## 4. Envelope

### 4.1 Reveal scriptSig layout

The scriptSig of reveal input 0 is push-only and contains, in order:

```text
PUSH3  0x6f 0x72 0x64              magic, ASCII "ord"
PUSHNUM totalPieces                minimal script number, 1 to 255
PUSH   contentType                 ASCII, 3 to 96 bytes, must contain "/"
repeated for each piece in this transaction, at most 4:
  PUSHNUM pieceIndex               minimal script number, descending
  PUSH    pieceBytes               240 bytes, PUSHDATA1; final piece may be shorter
PUSH   signature                   DER signature with sighash byte
PUSH   redeemScript
```

Minimal script number encoding: 0 is OP_0, 1 through 16 are OP_1 through OP_16, 17 through 255 are a single-byte push. Values above 255 are invalid in v1 (this deliberately matches the piece-count ceiling of deployed ecosystem decoders).

Piece indexes descend. The first piece pushed in the genesis transaction has index totalPieces minus 1. Index 0 is the final piece of the content. Reassembly places index totalPieces minus 1 first and index 0 last.

Every reveal transaction in a multi-transaction chain repeats the full header (magic, totalPieces, contentType). Parsers must also accept legacy continuations that omit the header.

### 4.2 Redeem script and the v1 content commitment

```text
0x21 <33-byte compressed pubkey>
OP_CHECKSIGVERIFY
0x20 <32-byte commitment C>
OP_DROP
OP_DROP repeated N times, N = 3 + 2 * piecesInThisTransaction
OP_1
```

The commitment is:

```text
C = SHA-256( "UZRD1" || contentType || 0x00 || content )
```

where contentType is the exact ASCII bytes pushed in the envelope and content is the fully reassembled byte sequence.

Because the P2SH address is the hash of the redeem script, the commit transaction commits to the content before any content bytes touch the chain. This closes the malleability gap in the generic legacy envelope, where scriptSig data is excluded from the ZIP 244 transaction id and is not covered by any signature, so relayed content could in principle be altered before confirmation without changing the txid. In v1, altered content no longer matches C and the result is not a valid v1 inscription.

Detection rule: an inscription is Universe Zerdinals v1 if and only if every reveal input in its chain has a redeem script of the exact shape above and the reassembled content satisfies the commitment. Otherwise it is indexed as the legacy family.

Standardness: the redeem script is a nonstandard P2SH script with exactly one signature operation, which Zcash mempool policy accepts (the limit is 15). The scriptSig is push-only. Total scriptSig size stays far below the 1650-byte standardness limit at 4 pieces per transaction.

### 4.3 Limits

1. totalPieces: 1 to 255.
2. Maximum content size: 61,200 bytes (255 pieces of 240 bytes).
3. Pieces per reveal transaction: 1 to 4.
4. Content type: 3 to 96 bytes, printable ASCII, exactly the bytes that decoders will serve; it must contain a slash.
5. Empty content is invalid. Content of zero bytes must not be inscribed.

### 4.4 Multi-transaction chaining

When totalPieces exceeds 4, content spans multiple reveal transactions:

1. The genesis reveal spends the first commit output and carries pieces totalPieces-1 down through totalPieces-4.
2. Each continuation reveal spends output 0 of the previous reveal transaction and carries the next pieces in descending order.
3. The chain ends with the completion transaction carrying piece 0.
4. Every reveal in the chain uses a redeem script committing to the same C. The product pre-derives all P2SH addresses and pre-signs the chain before broadcasting the first commit.

## 5. Transaction structure

### 5.1 Commit transaction

1. Inputs: any wallet-selected transparent inputs that are not asset-bearing.
2. Output: one P2SH output paying the commit address, funded with the exact amount the reveal chain needs (reveal fees plus postage plus continuation funding), plus optional change to the inscriber.
3. Fees: the ZIP 317 conventional fee computed from actual transaction shape.

### 5.2 Reveal transaction

1. Input 0: the commit output (genesis) or output 0 of the previous reveal (continuation).
2. Output 0 of a non-completion reveal: the continuation funding output, paying the next reveal's P2SH commit address for chains, owned by the inscription flow.
3. Output 0 of the completion transaction: the destination output. It pays the recipient address and becomes the genesis carrying output of the inscription.
4. Postage: the destination output value is at least 546 zatoshis, default 546.
5. Fees: ZIP 317 conventional fee. Note that the large scriptSig raises the transparent input size term, so a full 4-piece reveal costs about 8 logical actions.
6. Signature hashing: ZIP 244. For a P2SH input, the script code is the previous output script.

### 5.3 Recipients

Valid destinations are transparent P2PKH and P2SH addresses, and Unified Addresses that contain a transparent receiver (the transparent receiver is extracted and paid). Shielded-only recipients are invalid and must be rejected before any transaction is built.

## 6. Identity

1. Inscription id: the genesis transaction id in display order, followed by the literal suffix i0. One inscription per genesis transaction in v1.
2. Sequence number: assigned by the indexer over completed inscriptions, ordered by completion block height, then transaction index within the block. Sequence numbers are stable only after confirmation and may shift during reorgs until finality depth (section 12).
3. Content hash: SHA-256 of the reassembled content bytes, exposed by the indexer alongside the commitment C.

## 7. Validity and malformed data

An envelope candidate is any transparent input whose scriptSig begins with PUSH3 "ord". For a candidate, each of the following makes the inscription invalid (indexed as malformed, never rendered as content):

1. totalPieces missing, zero, or above 255.
2. contentType missing, outside 3 to 96 bytes, not ASCII, or without a slash.
3. A piece index outside 0 to totalPieces-1, a duplicate index, or a non-descending sequence within one transaction.
4. A piece push larger than 240 bytes, or a non-final piece smaller than 240 bytes.
5. More than 4 pieces in one transaction.
6. A chain that never completes: pieces remain missing after the continuation walk ends. Incomplete inscriptions are indexed as incomplete and their partial content is never served as if complete.
7. For the v1 badge only: a redeem script deviating from section 4.2 or a failed commitment check demotes the inscription to the legacy family; it does not invalidate it.

Parsers must impose hard resource bounds: maximum scriptSig bytes 1650, maximum chain length 64 transactions, maximum reassembled size 61,200 bytes, no recursion, no unbounded allocation. Malformed chain data must never crash the indexer.

## 8. Ownership

1. At completion, the inscription is owned by output 0 of the completion transaction.
2. When the carrying output is spent, the inscription moves to the first output of the spending transaction that is a transparent, non-data (not OP_RETURN) output. Output order is index order.
3. If the spending transaction has no such output, tracking terminates (section 10).
4. An address owns an inscription while it controls the carrying output. Balance-style attribution is never used.

## 9. Transfer

A transfer is an ordinary transparent transaction spending the carrying output. Wallet rules:

1. The carrying output must be spent as input, and the intended recipient must be output 0 (or the first non-data transparent output).
2. Asset-safe coin selection must never select a carrying output for fees or plain value sends.
3. The approval screen must state which Zerdinals move and to whom.

## 10. Terminal states

When the carrying output is spent and rule 8.2 finds no successor output:

1. If the spending transaction has any shielded component (Sapling, Orchard, or Ironwood bundles), the state is SHIELDED_UNTRACKABLE. Protocol tracking ends permanently. No shielded owner is ever guessed, and later unshielding never resurrects tracking.
2. Otherwise the state is BURNED (for example, all value went to fees or to a data output).

Both states are terminal, deterministic, recorded with the terminating transaction id, and displayed honestly.

## 11. Fees

All fees follow the current revision of ZIP 317: 5,000 zatoshis per logical action with two grace actions, where transparent contributions are ceil(input bytes / 150) and ceil(output bytes / 34), plus shielded action counts including Ironwood actions. The product always displays network fee, any service fee, total ZEC, total zatoshis, and a clearly labeled fiat estimate. Zebra relays nothing below the conventional fee, so the conventional fee is the floor, not a suggestion.

## 12. Reorg behavior

1. The indexer journals every applied event with block height and hash and can roll back to a common ancestor within the supported reorg bound.
2. Inscriptions in orphaned blocks revert to pending or disappear exactly as chain state dictates.
3. Sequence numbers and ownership recompute deterministically from the surviving chain.
4. A reorg deeper than the automatic bound latches write readiness off until operator repair.

## 13. Wallet requirements

1. Private keys never leave the wallet. The web application never sees a seed phrase or key.
2. The backend prepares effects-only transaction intents (PCZT preferred). The wallet independently parses, verifies every input and output, verifies the commit address against C, displays exact effects, and signs locally.
3. Commit and reveal approvals present one visual timeline of the same order.
4. Signed transactions are persisted before first broadcast, and rebroadcast only after checking current chain and mempool state.

## 14. Launch gates for mainnet creation

Mainnet creation stays disabled until all of the following hold:

1. Golden vectors pass: encoder and decoder round-trip every fixture in test-vectors/zerdinals, including the legacy mainnet vectors.
2. Regtest end-to-end: commit, reveal, multi-transaction chain, transfer, burn, shielding termination, and reorg tests pass against Zebra regtest.
3. Testnet end-to-end: at least one complete inscription and transfer through the real product flow with a real wallet on Zcash testnet, confirmed and indexed.
4. Recovery proven: orders resume correctly after process restart at every state machine stage.
5. The indexer is at chain tip with hash agreement against Zebra, and readiness is green.
6. Security review of parser bounds, sandboxed rendering, and wallet approval flows is complete.

## 15. Relationship to legacy inscriptions

The indexer reads the legacy family (generic ord scriptSig envelopes without the v1 commitment, including Zecscriptions single-piece envelopes, ZRC-20 and ZRC-721 payloads, and IPFS pointer records) exactly as deployed decoders do, with the documented decoder defects corrected (piece counts above 255 are still treated as invalid for ecosystem compatibility, missing pieces are never silently zero-filled, and content is never served incomplete). Legacy assets keep their protocol-family badge and are read-only in the product. The product creates only Universe Zerdinals v1.
