---
title: Zerdinals
description: What a Zerdinal inscription is, what its number means, what you can rely on, and what to know before inscribing.
---

**You will get from this page:** what a Zerdinal is, what is actually
guaranteed about one, and the boundaries to know before you hold or make one.

## Plain language

Zerdinals are digital artifacts inscribed through Zcash transparent
transactions. An inscription writes your content (an image, text, JSON, or
other supported types) into the Zcash chain through a commit and reveal pair
of transactions. The content lives on chain. Ownership is the ownership of
one specific transparent output, and it moves with ordinary Zcash
transactions signed in a wallet.

## Its number

Every completed inscription is given a number in the order the chain
completed it, and that number is how the product names it: **No. 087871**.
Most inscriptions carry no title, so the number is the thing that is
genuinely unique about one. There is exactly one No. 87871 and there always
will be.

## Why it matters

An inscription is the most durable kind of publication most people will ever
make: reconstructing the content needs only a Zcash node, and no company,
server, or website has to survive for it to exist. The trade is permanence in
both directions; nothing published this way can be unpublished.

## What you can rely on

1. **Content is on chain.** The bytes live in reveal transaction scripts, in
   240-byte pieces. No Universe server has to exist for an inscription to
   survive.
2. **Provenance is verifiable.** Ownership is a chain of transparent
   transactions from the genesis inscription to the current owner. Every
   artifact page shows that chain in full: where it was inscribed, every hand
   it passed through, and the transaction behind each step.
3. **Universe v1 inscriptions carry a content commitment.** The commit
   transaction's address is derived from a hash of the exact content and
   content type, so the chain committed to your content before any content
   byte was broadcast. Anything that does not match the commitment is simply
   not your inscription, and you can verify this yourself with a node and
   [the specification](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/).

## Safety boundary

1. Zerdinals use transparent Zcash data. Addresses, content, and activity
   are publicly visible forever.
2. Ownership lives on an output that ordinary wallets can spend by accident.
   [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/) covers
   the two habits that prevent it.
3. Sending an inscription-bearing output entirely into a shielded pool ends
   protocol tracking permanently. The product marks such artifacts as
   untrackable and never guesses a shielded owner.

## Technical detail

A Zerdinal is created by a commit transaction (a P2SH output whose redeem
script commits to the reveal key and a hash of the content) and one or more
reveal transactions carrying the content in their input scripts, up to 4
pieces of 240 bytes per transaction and up to 255 pieces total (61,200
bytes). When the carrying output is spent, the inscription moves to the
first transparent non-data output of the spending transaction.

Zerdinals deliberately do not number individual zatoshis.
[The ordinality decision](/docs-zerdinals-and-zrunes/protocols/ordinality/)
explains why that theory cannot be honest on Zcash.

## Related

- [Normative specification: Zerdinals v1](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/)
- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/)
