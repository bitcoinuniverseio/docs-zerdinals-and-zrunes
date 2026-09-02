---
title: Architecture
description: "How a figure gets from a Zcash block to your screen, which component is responsible for each guarantee, and where the boundary between the indexer and the product sits."
---

**You will get from this page:** the pipeline behind the product, what each
stage guarantees, and where the public boundaries are.

## The pipeline

```text
Your browser
   |
   v
Product frontend (zrunes.io)          static, no account, no tracking
   |
   v
Product backend                       orders, fees, health, read proxying
   |
   v
Gateway                               validates and allowlists public reads
   |
   v
Indexer                               reads blocks, projects protocol state
   |
   v
Zebra node + database                 Zcash consensus and durable state
```

Every layer is operated by the same team. No third-party chain service
appears anywhere in the pipeline, not even as a fallback; this is why the
product can put "read from a node we run" behind every figure.

## What each stage guarantees

- **The Zebra node** enforces Zcash consensus. Everything downstream is a
  reading of blocks this node accepted.
- **The indexer** reads the chain from the beginning, journals every event
  with its block height and hash, recomputes deterministically through
  reorganizations, and continuously verifies protocol invariants (for
  example the ZRunes supply equation). It publishes coverage with every
  answer so absence is never confused with fact.
- **The gateway** exposes exactly the audited read surface documented in
  [Public HTTP API](/docs-zerdinals-and-zrunes/developers/api/): GET-only
  through the public prefix, every path segment validated against strict
  shapes before anything is proxied. Its private transport keeps retrying
  after a transient connection outage, while health stays degraded until the
  first-party indexer can be reached again.
- **The product backend** plans orders (inscriptions, etches, mints) as
  effects-only intents, computes ZIP 317 fees from real transaction shapes,
  and reports health honestly at `https://zrunes.io/api/ready`.
- **The product frontend** renders all of it with the honesty rules the
  documentation describes: labeled staleness, four distinct empty states,
  and no control that pretends an unavailable action can finish.

## Determinism as a design rule

Two independent implementations reading the same blocks must agree byte for
byte. The ZRunes reference implementation is authoritative and the
production implementation must pass every reference-generated test vector;
the ZRC-20 divergence between historical readers is handled by computing
both readings and naming them, never by guessing.
[Why](/docs-zerdinals-and-zrunes/understand/zrc-20/).

## Wallet boundary

Private keys never touch this pipeline. The backend prepares unsigned,
effects-only transaction intents; a wallet independently verifies every
input, output, and commitment against its own view (including the
per-output asset verdict, which fails closed) before signing locally.
Signing is currently gated:
[Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/).

## What is deliberately not public

Write endpoints, infrastructure hostnames, and operational tooling are not
part of the public surface and are not documented here. The public API page
is the complete supported contract.
