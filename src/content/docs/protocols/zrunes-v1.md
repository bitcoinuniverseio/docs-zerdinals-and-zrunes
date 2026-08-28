---
title: "ZRunes v1 specification"
description: "The normative specification of the ZRunes fungible-asset metaprotocol: carrier, operations, malformed handling, invariants, and the release procedure."
---

:::note[Normative source]
This page is the published copy of the normative specification maintained in the product repository (docs/protocol/ZRUNES-V1.md at commit bd3bede4a238). Where this page and that file disagree, the product repository file is the authority. The Status line below describes the protocol release state in its own words.
:::

Status: Final draft for regtest and testnet validation. Mainnet activation happens only through the release procedure in section 15.
Version: 1.0.0
Date: 2026-08-25

## 1. Overview

ZRunes is a fungible-asset metaprotocol native to Zcash transparent transactions. A ZRune is etched once, optionally minted under published terms, and transferred by allocating balances to transaction outputs. All state derives deterministically from confirmed Zcash blocks.

ZRunes borrows concepts from Bitcoin Runes (etching, terms, edicts, output allocation, strict malformed-message handling) but is a new protocol defined entirely by this document against Zcash consensus, Zcash transaction formats, Zcash fees, and Zebra mempool policy. It is not Bitcoin Runes on another chain.

ZRunes are transparent. Balances and activity are public. Nothing in this protocol is shielded or private.

## 2. Carrier

A ZRunestone is carried in exactly one OP_RETURN output of a transparent Zcash transaction:

```text
scriptPubKey = OP_RETURN (0x6a) OP_14 (0x5e) <data pushes>
```

1. OP_14 immediately after OP_RETURN is the protocol marker. It cannot collide with Bitcoin Runes (a different chain), with the ord scriptSig envelope (a different location), with ZINC (shielded memos), or with known plain OP_RETURN uses on Zcash, which do not begin with OP_14.
2. The payload is the in-order concatenation of all data pushes after the marker. Only ordinary data pushes (direct pushes and PUSHDATA1) are valid after the marker; any other opcode there makes the ZRunestone malformed.
3. Zebra relay policy caps the whole script at 83 bytes and allows one data output per transaction. The maximum payload is therefore 79 bytes (script: 1 byte OP_RETURN, 1 byte OP_14, 2 bytes PUSHDATA1 header, 79 bytes data). Encoders must verify the encoded script fits before signing; the product refuses payloads the network will not relay.
4. The output value must be zero.
5. A transaction contains at most one ZRunestone by construction (network policy rejects a second data output). If a block ever contains a transaction with two OP_14 data outputs (mined nonstandard), the ZRunestone is malformed.

## 3. Integer encoding

All quantities are unsigned LEB128 varints decoding to at most 128 bits:

1. Each byte contributes 7 low bits, least significant group first; the high bit signals continuation.
2. Maximum length 19 bytes. An 18-byte prefix followed by a byte with a set continuation bit, a 19th byte contributing bits beyond 128, or truncation mid-varint is malformed.
3. Encodings must be shortest form. A varint with a redundant trailing zero group (final byte 0x00 with a preceding continuation) is malformed.
4. Implementations hold values as Rust u128 or JavaScript BigInt. APIs expose them as decimal strings. IEEE floats are never used.

## 4. Payload structure

The payload is a sequence of varints forming tag and value pairs, followed optionally by the edict body:

1. Read a tag varint, then its value varint(s). Repeat.
2. Tag 0 (BODY) has no value and switches the remainder of the payload to edicts (section 7).
3. A payload ending mid-pair is malformed.
4. Duplicate tags: for scalar tags, a repeated tag is malformed. This is stricter than Bitcoin Runes and removes a parser-divergence class.
5. Unknown even tags are malformed (they may carry meaning a v1 parser cannot see). Unknown odd tags are ignored (forward-compatible annotations). This mirrors the proven Runes upgrade discipline.

### Tags

| Tag | Name         | Values | Meaning                                                          |
| --- | ------------ | ------ | ---------------------------------------------------------------- |
| 0   | BODY         | none   | edicts follow                                                    |
| 2   | FLAGS        | 1      | bit 0 ETCHING, bit 1 TERMS; any other set bit is malformed in v1 |
| 4   | NAME         | 1      | base-26 packed name (section 5)                                  |
| 6   | SPACERS      | 1      | spacer bitfield, must be below 2^25                              |
| 8   | SYMBOL       | 1      | Unicode scalar value for display                                 |
| 10  | DIVISIBILITY | 1      | 0 to 18                                                          |
| 12  | PREMINE      | 1      | units created to the etcher at etch time                         |
| 14  | AMOUNT       | 1      | units per mint                                                   |
| 16  | CAP          | 1      | maximum number of mints                                          |
| 18  | HEIGHTSTART  | 1      | first block height at which minting is valid                     |
| 20  | HEIGHTEND    | 1      | last block height at which minting is valid                      |
| 22  | POINTER      | 1      | output index receiving unallocated balance                       |
| 24  | MINT         | 2      | block height and transaction index of the ZRune to mint          |

Constraints beyond type ranges: DIVISIBILITY above 18, SYMBOL that is not a valid Unicode scalar, SPACERS at or above 2^25 or with a spacer at or beyond the last letter, POINTER or any height above 2^32-1, FLAGS without ETCHING while NAME, SPACERS, SYMBOL, DIVISIBILITY, or PREMINE is present, and AMOUNT, CAP, HEIGHTSTART, or HEIGHTEND present without the TERMS flag, are all malformed. The four terms fields are governed by the TERMS rule alone; they are never reported against the ETCHING rule.

## 5. Names

1. A name is 4 to 26 letters A through Z. Lengths 1 to 3 are reserved for future protocol revisions and are malformed in v1.
2. Wire encoding packs the name as a single integer: reading letters left to right, value = value \* 26 + letter + an offset such that the encoding is bijective (the modified base-26 used by Bitcoin Runes: A is 0, Z is 25, and each added letter shifts by one so that A, B, ..., Z, AA, AB, ... enumerate distinct integers).
3. SPACERS is a bitfield where bit i set inserts the separator character between letter i and letter i+1 for display only. Spacers never affect identity.
4. The normalized name (letters only) must be unique among all previously etched ZRunes on the network. An etching whose normalized name is already taken is void: the etching is ignored, the rest of the ZRunestone still processes.
5. Display format uses the bullet separator between letters where SPACERS bits are set.

## 6. Operations

### 6.1 Etch

An etching creates a new ZRune. FLAGS bit 0 set, NAME required. Optional: SPACERS, SYMBOL, DIVISIBILITY (default 0), PREMINE (default 0), and, when FLAGS bit 1 (TERMS) is set, AMOUNT, CAP, HEIGHTSTART, HEIGHTEND.

Etch commitment (front-running protection): the etching is valid only if input 0 of the transaction spends a P2SH output that was confirmed at least 6 blocks before the etching block and whose redeem script is exactly:

```text
0x20 <32-byte H> OP_DROP 0x21 <33-byte compressed pubkey> OP_CHECKSIG
```

with H = SHA-256("ZRN1-ETCH" || name value as 16-byte little-endian). An etching without a valid matured commitment is void. Observers cannot learn the name from the commitment, so a pending etch cannot be sniped from the mempool.

Terms semantics: minting is valid from HEIGHTSTART (or the block after etching if absent) through HEIGHTEND (or forever if absent), inclusive, for at most CAP mints of exactly AMOUNT units each. TERMS without CAP or without AMOUNT, CAP of 0, AMOUNT of 0, HEIGHTEND below HEIGHTSTART, or PREMINE plus CAP times AMOUNT overflowing u128 are malformed.

PREMINE units enter the transaction's allocation pool (section 7) in the etching transaction.

Identity: the ZRune id is ETCH_BLOCK:TX_INDEX (block height and position of the etching transaction in its block). The indexer also assigns a protocol sequence number and records the etching txid.

### 6.2 Mint

A ZRunestone with tag MINT referencing an existing ZRune id mints AMOUNT units into the allocation pool if the terms window is open (HEIGHTSTART <= block <= HEIGHTEND) and fewer than CAP mints have occurred. Mints are counted in block order, transaction order. A mint that misses the window or the cap simply contributes nothing (it is not malformed). A MINT referencing a nonexistent id contributes nothing.

### 6.3 Transfer

Any transaction spending ZRune-bearing outputs moves balances:

1. All ZRune balances of all spent inputs enter the transaction's allocation pool, together with premine or minted amounts from this ZRunestone.
2. Edicts (section 7) allocate from the pool to outputs.
3. Remaining unallocated balance goes to the POINTER output if present, otherwise to the first transparent non-data output. If the designated output does not exist or no such output exists, the remainder is burned.
4. A transaction that spends ZRune-bearing inputs and carries no ZRunestone at all transfers all input balances to its first transparent non-data output; with no such output, they are burned.

### 6.4 Burn

Allocating to the data output itself (the OP_RETURN output index) burns the allocated amount explicitly. Burned amounts are tracked per ZRune.

## 7. Edicts

After tag BODY, the remainder of the payload is a sequence of edicts, each four varints:

```text
blockDelta, txField, amount, outputIndex
```

1. Edicts are delta-encoded over sorted ZRune ids: blockDelta adds to the previous edict's block (starting at 0); when blockDelta is nonzero, txField is the absolute transaction index; when blockDelta is zero, txField adds to the previous transaction index. Ids must be strictly ascending; a violation is malformed.
2. The id 0:0 refers to the ZRune being etched in this transaction (valid only in an etching).
3. amount 0 means the entire remaining pool balance of that ZRune.
4. outputIndex must be at most the number of transaction outputs minus 1; anything larger is malformed. Allocating to a non-transparent-value output other than the data output is a burn.
5. An edict for a ZRune with no pool balance allocates nothing.
6. At most 16 edicts per ZRunestone; more is malformed.
7. A truncated edict group is malformed.
8. Both halves of a decoded edict id are bounded below 2^32, like every other index in the limits table. A delta that carries the block or the transaction index to 2^32 or beyond, or that overflows, is malformed. The bound is checked on the decoded id, so it fires before strict ascent, before the 0:0 rule, and before the output index check.

## 8. Malformed ZRunestones

The single malformed state is named Malformed ZRunestone. Every rule above that says malformed produces it. Effects, applied deterministically:

1. All ZRune balances entering the transaction from its inputs are burned.
2. An attempted etching in a Malformed ZRunestone still consumes the name if a valid matured commitment exists: the ZRune is created with zero premine and permanently closed terms. This removes any incentive to probe parsers with deliberately ambiguous etchings.
3. An attempted mint in a Malformed ZRunestone counts against the cap and the minted amount is burned.
4. No edict allocates anything.

There is no parser discretion anywhere: two independent implementations must agree byte for byte on validity and effects. The Rust reference implementation is authoritative; the TypeScript implementation must pass every Rust-generated vector.

## 9. Supply accounting

For every ZRune, at every height:

```text
premine + mints_completed * amount == circulating + burned
```

where circulating is the sum of all output-held balances. The indexer verifies this invariant continuously and halts write readiness on violation. All arithmetic is checked u128; overflow anywhere is malformed.

## 10. Shielding rule

ZRunes exist only on transparent outputs. If value moves into a shielded pool, no ZRune moves with it: rule 6.3 already covers every spend shape, and a transaction whose only value successors are shielded burns its input balances. ZRunes are never attributed to shielded addresses and are never advertised as private. Product copy states: ZRunes use Zcash transparent outputs. Their balances and activity are public.

## 11. Fees

ZIP 317 conventional fees, computed from actual transaction shape. The data output contributes its serialized size to the transparent output term (about 3 logical actions for a full 79-byte payload), so a typical single-input mint costs 5,000 times roughly 4 to 5 logical actions.

## 12. Activation

| Network | Activation height                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| Regtest | 1                                                                                                                          |
| Testnet | 4,150,000                                                                                                                  |
| Mainnet | a future block height published with the final specification hash, reference implementation commit, and golden-vector hash |

Before its activation height on a network, OP_14 data outputs are ignored by the state engine. No historical OP_RETURN data is ever retroactively interpreted as ZRunes.

## 13. Limits summary

| Item                                                                 | Limit                                     |
| -------------------------------------------------------------------- | ----------------------------------------- |
| Payload                                                              | 79 bytes                                  |
| Integer                                                              | u128, LEB128, max 19 bytes, shortest form |
| Name                                                                 | 4 to 26 letters                           |
| Spacers                                                              | below 2^25, within name length            |
| Divisibility                                                         | 0 to 18                                   |
| Edicts                                                               | 16                                        |
| Heights, pointer, transaction indexes (MINT and edict), output index | below 2^32                                |
| Data outputs per transaction                                         | 1                                         |

## 14. Reference implementations

1. rust/zrunes-codec: authoritative encoder, decoder, and state transition engine, with property tests, fuzzing, and the golden-vector generator.
2. TypeScript decoder in the indexer and product, validated against every Rust-generated vector in CI.
3. Golden vectors live in test-vectors/zrunes and cover: round trips, every malformed class, boundary integers, edict delta encoding, allocation and pointer semantics, mint windows and caps, etch commitments, and burn paths.

## 15. Resolved interpretations (normative)

The authoritative Rust implementation (rust/zrunes-codec in index-zcash-metaprotocols) records 30 numbered interpretation decisions in its DECISIONS.md. All of them are normative for v1. The most consequential:

1. An empty payload (bare OP_RETURN OP_14) is a valid, empty ZRunestone whose only effect is the default transfer rule.
2. MINT is one tag followed by two value varints; a second MINT tag is a duplicate and malformed. Unknown odd tags consume exactly one value each and may repeat.
3. TERMS without ETCHING, any terms field without TERMS, and ETCHING without NAME are malformed. FLAGS of zero alone is legal.
4. The first edict may carry any id; strict ascent applies from the second edict. An edict id of 0:0 in a ZRunestone without the ETCHING flag is malformed. When an etching is present but void at the state level, a 0:0 edict is valid and allocates nothing.
5. An edict amount above the remaining pool balance allocates the entire remaining balance.
6. POINTER is not range-checked at decode time; a pointer at a nonexistent output or at the data output burns the remainder.
7. The default mint window opens at the block after etching, computed in 64-bit arithmetic.
8. A malformed etching consumes its name only when the NAME tag parsed fully with a valid length and the matured commitment exists and the name is free. A malformed mint counts against the cap only when it would have succeeded on a valid ZRunestone.
9. Deterministic encoding emits fields in ascending tag order, omits zero-valued SPACERS, DIVISIBILITY, and PREMINE, and uses a direct push up to 75 bytes and PUSHDATA1 for 76 to 79.
10. Payloads above 79 bytes in mined nonstandard transactions decode normally; the cap binds encoders and relay policy, not interpretation.
11. Truncation is named by the reader that was active when the payload ran out, not by where the payload ends relative to a varint boundary: inside a tag varint it is a truncated varint, at or inside the value varint of a tag and value pair it is a truncated pair, and anywhere inside an edict quad it is a truncated edict. A varint that is present but non-shortest or overflowing keeps its own reason wherever it appears.
12. Both halves of a decoded edict id are bounded below 2^32, checked before strict ascent, before the 0:0 rule, and before the output index check.

## 16. Mainnet release procedure

1. Specification frozen and hashed.
2. Reference implementation commit and vector hashes published.
3. Public review window on the published specification.
4. Testnet activation with the full product flow proven end to end.
5. Independent or differential parser parity demonstrated with zero disagreements over the vector corpus and over all testnet activity.
6. Mainnet activation height published in advance; the state engine ships with the height before the height passes.
