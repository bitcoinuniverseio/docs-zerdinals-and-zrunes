---
title: Collections
description: Four verification levels, one on-chain membership proof, and what the product refuses to invent about collections.
---

**You will get from this page:** how collections work here, what "verified"
actually proves, and why some collections are labeled unverified forever.

## Plain language

A collection groups Zerdinals under one identity: an artist's series, a
project's set, a family of related pieces. The hard question is what makes
membership true. Anyone can claim any inscription belongs to any collection,
so a record that wants to be trusted has to say what each claim rests on.

## Four verification levels

Every collection carries one of four levels, shown everywhere the
collection appears:

1. **Verified (on-chain).** Membership is proven by parent-by-spend. The
   collection's identity is itself a Zerdinal, the parent. A child joins by
   having its genesis reveal transaction spend the parent's carrying output,
   which only the parent's current owner can do. Membership is proof of
   creator control at inscription time, permanent, and recorded with the
   proving transaction.
2. **Verified, legacy.** ZRC-721 collections, on-chain by construction under
   the legacy family rules, shown with the legacy family badge.
3. **Curated.** For legacy inscriptions with no on-chain parent mechanism, a
   creator may publish a signed manifest. It is accepted only after
   signature verification and creator evidence checks; manifests are
   append-only and every accepted version is retained.
4. **Unverified.** Everything else. Labeled unverified everywhere, excluded
   from featured surfaces, never presented as chain fact.

## Why it matters

On-chain membership proof is the difference between a collection and a
label. A parent-by-spend child carries a transaction anyone can check,
signed with keys only the collection's owner controlled. No administrator
can add a member, remove one, or edit the set.

## A concrete example

A creator inscribes a parent Zerdinal for the series. For each piece, the
genesis reveal transaction spends the parent's current output, which moves
the parent to output 1 of that transaction and stamps the child as a member.
An impostor cannot do this: spending the parent's output requires the
creator's keys.

## What the product refuses to invent

No floor prices, volume, sales, or rarity scores exist anywhere in
Collections v1, and creator identity, descriptions, artwork, and popularity
are never fabricated. If a fact is on a collection page, it is either a
chain fact or an accepted, signed manifest fact, and the page says which.

## Safety boundary

An unverified label is information, not an accusation: it means no proof
exists, not that the claim is false. Treat membership claims made outside
the product (in chat, in listings) with the same question this product
asks: what transaction proves it?

## Reading one

Every collection has its own page, reached from the Collections list. It
leads with the thing that defines the collection, which is the parent
inscription, and then states what is proven:

- the parent, the transaction that created it, and who holds it now, with
  the reminder that holding the parent is not authorship and can change
- how many members there are, and how many of those are complete against how
  many are still missing content the chain never carried
- the block range the members joined across
- the members themselves, shown as artifacts rather than as rows
- a membership table pairing each member with the exact transaction that
  proves it belongs

An incomplete member is shown as a member, because it is one: the chain
simply never carried all of its content. Nothing is hidden to make the
collection look tidier than it is.

The page also exports a manifest: the parent, the counts, and every member
with the height it joined at and the transaction that proves it. It is a
file you can check against a node yourself.

## Technical detail

The parent-by-spend mechanism, manifest format, signature requirements, and
display rules are specified in
[Collections v1](/docs-zerdinals-and-zrunes/protocols/collections-v1/).

## Related

- [Zerdinals](/docs-zerdinals-and-zrunes/understand/zerdinals/)
- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
