---
title: "ZRunes v1 specification"
description: "The normative specification of the ZRunes fungible-asset metaprotocol: carrier, operations, malformed handling, invariants, the release procedure, and a non-normative note on telling ZRunes v1 apart from other payloads on Zcash."
---

:::note[Normative source]
This page is the published copy of the normative specification maintained in the product repository (docs/protocol/ZRUNES-V1.md at commit b38c406620e3). Where this page and that file disagree, the product repository file is the authority. The Status line below describes the protocol release state in its own words.
:::

Status: Final draft for regtest and testnet validation. Mainnet activation happens only through the release procedure in section 16. Section 17 is a non-normative note on protocol identity.
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
| Mainnet | 3,470,000                                                                                                                  |

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

### 16.1 Mainnet activation record (2026-09-09)

- Activation height: 3,470,000. The indexer configuration key is `ZRUNES_ACTIVATION_HEIGHT=3470000`. The height has passed and the indexer reports the protocol active.
- Frozen specification: this document at commit `0d9e0897909a603b483874a70cb5aad8b9e6dceb` (2026-08-26), the last commit that touched it before this record. Blob sha256 `3e6fa0a0402b24dff80c12a5286d4247ed790e0509f420231e673d9ff045664d`, from `git show 0d9e0897909a603b483874a70cb5aad8b9e6dceb:docs/protocol/ZRUNES-V1.md | sha256sum`. This record changes the activation row and adds this subsection; the normative sections are unchanged.
- Reference implementation: `index-zcash-metaprotocols` commit `a0b555f9f60edf84b42329a2bf7f56246ad26c12` on `main`.
- Golden-vector hash: `918e03eb776028dd1da336bc3dbfc22ce479e84c63d54fabd5cfbf786eedce80`, over the committed `test-vectors` tree of that commit. Recipe, run in the reference implementation repository: list `git ls-tree -r --name-only a0b555f9f60edf84b42329a2bf7f56246ad26c12 -- test-vectors`, sort the paths, build the JSON array `[[path, sha256 hex of the blob bytes], ...]` in that order, and take the sha256 of that JSON text (`JSON.stringify`, no whitespace). The blob bytes come from `git cat-file blob <commit>:<path>` so the value does not depend on a checkout's line endings. As one command:

  ```bash
  node -e 'const {createHash:h}=require("node:crypto"),{execFileSync:x}=require("node:child_process"),c="a0b555f9f60edf84b42329a2bf7f56246ad26c12";const e=x("git",["ls-tree","-r","--name-only",c,"--","test-vectors"]).toString().split("\n").filter(Boolean).sort().map(n=>[n,h("sha256").update(x("git",["cat-file","blob",c+":"+n])).digest("hex")]);console.log(h("sha256").update(JSON.stringify(e)).digest("hex"))'
  ```

- Step 4 of the procedure was not run on a public testnet before mainnet activation: no Zcash testnet node existed in the estate. What was run instead is the regtest walletless campaign (`scripts/e2e-service-invoice.mjs`), whose bound evidence manifest is what the service execution authorization for the mainnet deployment is generated from. The testing policy accepts a workflow proven end to end on a test network as the release evidence; the testnet row above remains the testnet activation height for when a testnet node exists.

## 17. Protocol identity (non-normative)

Nothing in this section changes any rule above. It exists because the name ZRunes is used by more than one project on Zcash, and readers reasonably ask why a confirmed transaction that a website presents as a ZRune does not appear in this product.

### 17.1 Five separate facts

A token claim is usually made as if these were one fact. They are five, and each can be true without the next:

1. A Zcash transaction is confirmed.
2. It carries an OP_RETURN payload.
3. The payload is recognizable under some protocol's rules.
4. Those rules accept it as a valid etching or a successful mint.
5. A ledger credits a balance that can be spent.

This document defines facts 3 to 5 for ZRunes v1 and for nothing else. Confirmation is a fact about Zcash. Whether some other ruleset accepts some other payload is a question for whoever publishes that ruleset.

### 17.2 ZRunes v1 versus OP_13 payloads

| What | ZRunes v1 | Bitcoin ord 0.29.0 | OP_13 payloads seen on Zcash |
| --- | --- | --- | --- |
| Chain | Zcash | Bitcoin | Zcash |
| Marker | OP_RETURN OP_14, hex `6a5e` | OP_RETURN OP_13, hex `6a5d` | OP_RETURN OP_13, hex `6a5d` |
| Mint encoding | one MINT tag 24 followed by block and transaction index (section 4) | tag 20 repeated once per id component | one tag 20 pair, then the index and a trailing `0` |
| Name encoding | bijective base 26, section 5 | bijective base 26 | integers that do not decode to the names displayed for them |
| Etch admission | matured six-block P2SH commitment, section 6.1 | no commitment of this kind | not established |
| Activation | fixed per network, section 12 | not applicable | not applicable |

Sections 2 and 12 therefore make an OP_13 output absent to this protocol. That is a property of the marker, not a judgement about the bytes: this product holds no ruleset for them and makes no claim, in either direction, about whether their own protocol accepts them.

The Bitcoin column is the ord reference implementation at commit `7e37a3bd3391044b39f5f11f20dfdb8b3764cd0e` (version 0.29.0), files `runestone.rs`, `message.rs`, `tag.rs` and `rune.rs`. It is quoted for comparison. It is not a Zcash ruleset and does not become one by being ported.

### 17.3 What was observed, and when

On 2026-09-21, 113 transactions published by a third-party site using the name ZRunes were read from a Universe-owned Zcash Mainnet node with genesis verification, and 13 of their blocks were checked by reproducing transaction-order Merkle roots. Of those, 103 carried an OP_13 output and 10 carried no OP_RETURN at all; every OP_13 carrier confirmed below this protocol's activation height of 3,470,000. In each of the 11 OP_13 etch payloads the name integer decoded to a different name than the one displayed for it, and each of the 92 OP_13 mint payloads held `[20, height, index, 0]`.

These are observations of bytes on a dated read, not a census of anyone's history and not a verdict on anyone's ruleset. Names shown by a website are claims made by that website, not wire values.

### 17.4 The diagnostic contract

The indexer reports OP_13 outputs on its transaction route as an optional `carrier_observations` array under the contract `foreign-carrier-observation-v1`. It reports the marker, the output index, bounded raw bytes, a parse status and `v1Eligibility: not_v1_carrier`.

It is a reader over bytes already in hand. It creates no balance, holder, supply figure or spendability receipt, opens no extra node call, writes nothing, and reads no third-party feed. A syntactic decode is not ledger acceptance. Its limits are fixed constants and it reports when it reaches one rather than shortening what it returns. An indexer that omits the field has not checked; that is not the same as having checked and found none.
