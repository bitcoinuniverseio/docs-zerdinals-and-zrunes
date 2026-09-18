---
title: Collections
description: "Four verification levels, one on-chain membership proof carried by a spend, and what the product refuses to invent when a collection cannot prove its own membership."
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
   the legacy family rules, shown with the legacy family badge. These have
   their own section on the Collections page and their own rules, described
   below.
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

Collections v1 pages carry no floor prices, volume, sales, or rarity
scores, and creator identity, descriptions, artwork, and popularity are
never fabricated. If a fact is on a collection page, it is either a chain
fact or an accepted, signed manifest fact, and the page says which. Where a
ZRC-721 collection has a market page, its floor, listed count and volume
are this market's own open listings and confirmed settlements, labelled as
such; rarity scores exist nowhere.

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

## ZRC-721 collections

The other family with real collections on this chain works differently, and
the difference matters enough to state plainly.

A ZRC-721 collection begins with a **deploy** operation that names a
collection and a supply. Every **mint** afterwards references that
collection and claims an id. There is no parent to spend, so membership is
the reference rather than a spend, and the rules that decide whether an
operation counted are strict:

- the collection name, trimmed, is 1 to 64 UTF-8 bytes, and its lower-cased
  form is the collection key; the first deploy of a key wins and later
  deploys of it are rejected
- the supply is a whole number from 1 to 10,000,000
- the collection has to have been deployed already when the mint was applied
- the id has to be a whole number below the declared supply
- the id must not already be taken by an earlier accepted mint
- the reveal has to have a transparent output, so there is somebody to credit

A mint that fails any of those is inscribed on the chain, cost a fee, and
holds nothing.

### What an NFT is here

An accepted mint inscription is the item. The reader records which
collection and id that inscription proved, and everything else about the
item, who holds it, where it sits, whether it is still observable, is the
inscription's own state. There is no transfer operation to send an item;
it moves when the inscription moves, through the ordinary Send flow or a
market sale. An item whose carrying output was spent into a shielded
transaction is no longer observable and names no holder; one spent with no
transparent successor is burned. Both are terminal, and both are different
from a rejected mint, which never held an item at all.

### Where to find them

- `/explore/nfts` lists every ZRC-721 collection the reader has accepted,
  with search over the collection name, sorting by deploy order, minted
  count or name, and true page counts.
- `/nfts/:key` is a collection: its supply and minted count, its items in
  pages, its rejected operations by reason, and its activity, which
  includes deploys, mints and rejections as well as the transfers, burns
  and shielding of accepted items. Older `/collections/zrc-721/:key`
  links still open it.
- `/nfts/:key/:tokenId` is one item: the mint inscription, the holder and
  carrying output when observable, the on-chain content, its history, and
  any open listings or offers on it.
- `/market/nfts` and `/market/nfts/:collectionKey` are the market
  views; see [NFTs on the market](/docs-zerdinals-and-zrunes/market/buying-and-selling/#nfts).
- The **NFTs** tab of a portfolio lists the items an address holds, with
  the true total rather than the length of the first page.

Searching for text that is not a known artifact also offers to find NFT
collections by that name.

### Most ZGODS mints did not count

ZGODS is the only ZRC-721 collection deployed on Zcash mainnet. It declares a
supply of 10,000, and 8,503 mint inscriptions were made against it:

| Outcome | Inscriptions |
| --- | --- |
| Counted, and holds an item | 7,171 |
| Rejected: the id was already taken | 1,319 |
| Rejected: inscribed before the collection was deployed | 13 |

Those 1,332 inscriptions exist and always will. The collection page lists
them by reason, so somebody holding one can find out why it holds no item
instead of finding nothing at all. No other reader of this chain publishes
that.

### Who holds an item

An item is carried by the inscription that minted it, so it moves when that
inscription moves and the ordinary ownership rules apply to it unchanged.
The collection page reads the holder from the inscription rather than
tracking it separately, which means an item spent into a shielded pool
reports that it is no longer observable rather than naming whoever held it
last. The minter is kept in its own column, because once tracking ends the
minter is the only attribution left. A `to` address in the mint payload is
that minter attribution and nothing more: it never says who controls the
carrying output now.

### The artwork is not on the chain

A ZRC-721 deploy names its metadata by reference. For ZGODS that reference is
an IPFS address, and the images and traits it points at were never written to
Zcash. They can change, move, or stop being served without any transaction,
and no transaction proves what they currently are.

The collection page says so above everything else, shows the reference so you
can follow it yourself, and never renders it as though the chain carried it.

Where the reference is inline JSON, an IPFS address or an `https` address,
the product's own service may fetch the JSON it names, under a timeout, a
size cap and a check that the address is public, and show its name,
description and traits as text in a panel labelled **off-chain**. Images
are never proxied or mirrored, the indexer never fetches anything, and
nothing in that panel is ownership evidence or takes part in a sale. The
on-chain content of the mint inscription itself is what the item page
shows as its primary media.

### Shielded NFPT items are not ZRC-721

Non-Fungible Privacy Tokens live in the shielded pool and are a separate
family with their own rules. The NFTs category links to their public
directory so they can be found, and that is all: they carry no market
action here, because no proof of shielded settlement exists that this
market could verify. See
[shielded metaprotocols](/docs-zerdinals-and-zrunes/protocols/shielded-metaprotocols/).

## Records that point somewhere else

The same warning applies more widely than collections. **12,881 indexed
inscriptions, better than one in ten, are records naming content held
somewhere other than Zcash** rather than content written into it.

What the chain carries in those cases is the reference. The artifact page
marks them and says what the reference is, so a JSON record naming an IPFS
address is never presented as the picture it names. If you are looking at one
of these, the permanence you get is the permanence of the record, not of the
thing it points at.

## Technical detail

The parent-by-spend mechanism, manifest format, signature requirements, and
display rules are specified in
[Collections v1](/docs-zerdinals-and-zrunes/protocols/collections-v1/).

## Related

- [Zerdinals](/docs-zerdinals-and-zrunes/understand/zerdinals/)
- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Create a ZRC-721 collection or item](/docs-zerdinals-and-zrunes/create/tokens-and-collections/)
