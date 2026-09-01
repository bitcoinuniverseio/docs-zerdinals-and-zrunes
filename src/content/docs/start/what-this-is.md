---
title: What this is
description: "A one-minute explanation of Zerdinals, ZRunes, ZRC-20, collections, and ZordiScan, who this documentation is for, and what this product deliberately refuses to do."
---

**You will get from this page:** the whole product in one minute, and where to
go next. It is written for someone who has never used an inscription product.

## The one-minute version

People write things into the Zcash blockchain: images, text, and small token
instructions. Once written, those bytes are part of the chain and survive as
long as Zcash does. [zrunes.io](https://zrunes.io) is the record of everything
written this way, read directly from a Zcash node its operators run, plus the
two things a person does with a record: check it, and add to it.

Four kinds of things live in the record:

1. **Zerdinals** are inscriptions: content written on chain through a commit
   and reveal pair of transactions. Each completed inscription gets a
   sequence number that is permanently unique.
   [About Zerdinals](/docs-zerdinals-and-zrunes/understand/zerdinals/).
2. **ZRC-20 tokens** are fungible tokens carried inside legacy inscriptions
   as small JSON documents.
   [About ZRC-20](/docs-zerdinals-and-zrunes/understand/zrc-20/).
3. **ZRunes** are fungible assets carried in transaction data outputs, with
   fixed mint terms and a mainnet activation height.
   [About ZRunes](/docs-zerdinals-and-zrunes/understand/zrunes/).
4. **Collections** group Zerdinals, with an on-chain membership proof where
   one exists and an honest label where one does not.
   [About collections](/docs-zerdinals-and-zrunes/understand/collections/).

**ZordiScan** is the explorer inside the product: blocks, transactions,
addresses, and every protocol object, each with a friendly reading, a
protocol reading, and the raw data.
[About ZordiScan](/docs-zerdinals-and-zrunes/verify/zordiscan/).

## What makes this product different

- Every figure is read from Universe-operated Zcash infrastructure. No
  third-party chain service is used anywhere, not even as a fallback.
- Where two independent rule sets disagree about ZRC-20, the product shows
  both readings and names each, rather than choosing one silently.
- Where the chain has not been read in full, the product says which blocks it
  has read rather than presenting absence as fact.
- Assets that moved into the shielded pool are shown as what they are:
  provably existing, permanently unobservable.

## Ownership, in one sentence

Owning a Zerdinal or a ZRune balance means controlling the transparent Zcash
output it sits on; it moves when that output is spent, and it can be lost the
same way, which is why
[the safety page](/docs-zerdinals-and-zrunes/start/safety/) comes next.

## Where to go next

| You want to | Go to |
| --- | --- |
| Avoid the one common way to lose an asset | [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/) |
| See what is live and what is gated today | [Current status](/docs-zerdinals-and-zrunes/start/status/) |
| Inscribe something | [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/) |
| Look up an address, block, or artifact | [Search](/docs-zerdinals-and-zrunes/verify/search/) |
| Integrate against the API | [Public HTTP API](/docs-zerdinals-and-zrunes/developers/api/) |
