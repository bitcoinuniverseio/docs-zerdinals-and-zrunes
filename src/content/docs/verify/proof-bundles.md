---
title: Proof bundles
description: Download one file per artifact and verify it against your own node, without trusting this site for any step of the check.
---

**Outcome:** you will be able to take one file from an artifact's page and
prove, against a Zcash node you run yourself, that the artifact is exactly
what this site says it is.

## What a proof bundle is

One JSON file per inscription, downloadable from the artifact's page. It
contains:

1. The record: id, content type, content hash, completion height, and the
   current owner output as this indexer reads them.
2. The raw bytes of every transaction the record rests on: the inscription's
   envelope chain and every transfer since, each with the block that holds
   it. Where a size bound cuts the bytes off, the bundle says so per
   transaction and names the txid so your node can supply them.
3. The content reconstruction order: which transaction carries which piece.
4. Both ZRC-20 readings where the artifact carries a token operation,
   including rejected readings. A rejection is part of the record.
5. The indexer's current state commitment, so the bundle is anchored to a
   named checkpoint.

## How to verify one

You need a Zcash node you trust (your own Zebra with its RPC reachable) and
the verification tool from the open indexer repository:

```bash
node scripts/verify-proof-bundle.mjs bundle.json --zebra http://127.0.0.1:8232
```

The tool checks three things, and every check draws its facts from your
node rather than from this site:

1. Every transaction in the bundle matches your node byte for byte and sits
   in the block the bundle names.
2. The content hash reproduces from the envelope chain your node serves,
   re-parsed and re-assembled locally.
3. Every ownership event sits at the height the bundle states.

A check that cannot be completed fails rather than being skipped, because
verification that skips is agreement, not verification. The tool exits
zero only when every check passed.

## What this does and does not prove

It proves the artifact's bytes, its provenance chain, and its protocol
readings are real chain facts. It does not prove anything about market
prices, listings, or any figure this site derives from its own order data;
those are labeled as derived data wherever they appear and are outside the
chain record by design.
