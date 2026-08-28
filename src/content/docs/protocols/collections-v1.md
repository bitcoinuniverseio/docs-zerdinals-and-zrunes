---
title: "Collections v1 specification"
description: "The normative specification of collection verification levels and the parent-by-spend membership proof."
---

:::note[Normative source]
This page is the published copy of the normative specification maintained in the product repository (docs/protocol/COLLECTIONS-V1.md at commit bd3bede4a238). Where this page and that file disagree, the product repository file is the authority. The Status line below describes the protocol release state in its own words.
:::

Status: Final draft alongside Zerdinals v1.
Date: 2026-08-25

Collections must never be arbitrary administrative groupings presented as chain fact. Every collection carries one of four verification levels, displayed everywhere the collection appears.

## 1. Collection types

### 1.1 On-chain collection (Verified)

The minimal deterministic membership model for Universe Zerdinals v1, chosen over deployment inscriptions and manifest hashes because it needs no new envelope fields and proves control cryptographically.

Parent reference by spend:

1. The collection identity is itself a Zerdinal (the parent).
2. A child joins the collection when the genesis reveal transaction of the child spends the parent's carrying output as one of its inputs (any input after input 0, which is always the commit input).
3. In such a transaction, the parent transfers to output 1, which must be a transparent non-data output. This explicit assignment overrides the default transfer rule for this transaction shape only. If output 1 is missing or not a transparent non-data output, the parent claim is void: the child has no collection, and the parent follows the default transfer rule.
4. Only the current owner of the parent output can produce this transaction, so membership is proof of creator control at inscription time. Membership is permanent and recorded at child completion.
5. The first input spending a tracked inscription output determines the parent; additional such inputs are transfers, not claims.

The indexer records: parent id, child id, membership block, and the proving transaction.

### 1.2 Legacy on-chain collection (Verified, legacy)

ZRC-721 collections are on-chain by construction: a deploy operation creates the collection key and mints reference it. Membership follows the legacy family rules recorded in the compatibility matrix. The verification level is Verified with the legacy family badge.

### 1.3 Signed curated manifest (Curated)

For legacy inscriptions with no on-chain parent mechanism (the generic ord envelope family), a creator may publish a manifest:

```text
{
  "schemaVersion": "collection-manifest-v1",
  "network": "zcash-mainnet",
  "slug": "...",
  "name": "...",
  "creatorAddress": "t1...",
  "items": [ { "inscriptionId": "<txid>i0", "contentHash": "<sha256>" } ],
  "declaredAt": <block height>
}
```

Acceptance requires all of the following, verified by the indexer before the collection is shown as Curated:

1. Signature: a secp256k1 signature over SHA-256 of the manifest serialized in RFC 8785 JSON form, verifying against the public key of creatorAddress (P2PKH only).
2. Creator evidence: creatorAddress is the genesis destination of at least 80 percent of the listed inscriptions, or the current owner of the parent-like identity the collection claims. Below that bar the manifest is rejected, not downgraded.
3. Every listed inscription exists, is complete, and its content hash matches.
4. No duplicate items, network matches, slug unique among accepted manifests.

Manifests are append-only: a new version may add items with a fresh signature but can never remove or rewrite provenance. Every accepted manifest version is retained and auditable.

### 1.4 Unverified community grouping (Unverified)

Anything else: labeled Unverified everywhere, excluded from Featured surfaces, never presented as chain fact.

## 2. Display rules

1. The verification level (Verified, Verified legacy, Curated, Unverified) is rendered with the collection name on every surface, including share cards.
2. Supply, minted count, holder count, creation block, and completion progress come only from indexed chain state.
3. No floor prices, volume, sales, or rarity scores exist anywhere in v1.
4. Administrators cannot edit membership. The only administrative action is removing an Unverified grouping that violates content policy, which is logged and audited.
