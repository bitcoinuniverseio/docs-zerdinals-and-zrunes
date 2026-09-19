---
title: Search
description: "One field on every page classifies what you typed and routes you to the right record without guessing, names any ambiguity it finds, and says when it cannot decide."
---

**Outcome:** you will be able to get from any identifier (an address, a
txid, a ZRune name, an inscription id) to its record in one step, and know
what the classifier does with ambiguous input.

## How to search

Press the slash key on any page, use the search field in the header, or
open the menu on a phone. One field classifies what you typed and routes
you:

1. **Block height:** any plain number.
2. **Block hash or transaction id:** any 64-character hex value. These two
   look identical, so the product offers both routes instead of guessing.
3. **Transparent address:** `t1` (P2PKH), `t3` (P2SH), or `tm` (testnet).
4. **Unified Address:** `u1` prefixed. The transparent receiver inside it
   is what the protocols track.
5. **Zerdinal inscription id:** a transaction id followed by `i` and a
   number.
6. **ZRune name:** uppercase letters, with or without bullet spacers
   (`Z•RUNE` finds `ZRUNE`), or a ZRune id in `block:tx` form.
7. **Collection slug:** lowercase kebab-case.
8. **Token ticker:** short uppercase letters.
9. **ZkMap block name:** a plain height followed by `.zkmap`, such as
   `1500000.zkmap` or `0.zkmap`. No leading zeros.

## Block names

Searching `<height>.zkmap` opens the block's district page at
`/zkmap/<height>`, which shows the block name's status (available, claimed,
not mined yet, not claimable, or unknown), the winning inscription and the
address holding it, the block it was claimed in, the district picture, and
the indexer checkpoint the reading is as of. A block name never routes
through name resolution; it is not a registry name.

A plain number is classified as a block height and offers both routes: the
block in Scan first, then its block name at `/zkmap/<height>`. A
`.zkmap` name offers the same two routes with the block name first. The
block page in Scan also links to the block's name, and the map at
`/explore/zkmap` lists every block in its window with a link to its
district page. The rules are in the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/).

## Ambiguity is named, not guessed

The classification is shown while you type, before anything opens. Paste a
64-character hex value and the box tells you it has the shape of both a
transaction id and a block hash, and offers both routes. A ticker and a
ZRune name share the same alphabet, so `ZERO` could be either; the product
says so and offers both, with the token route first, because nearly all of
this chain's token activity lives there.

Classification never fabricates a result. An input that matches nothing
says so, and says what it checked for, so you can spot a missing or extra
character.

## Recent searches

Recent searches are stored in your browser on this device, like
watchlists, with no server component. Clearing browser data clears them.

## What can go wrong

| Situation | What it means | What to do |
| --- | --- | --- |
| "Matches nothing" for a value you know exists | A typo, or the record is in an unread block | Recheck the characters; check coverage on the status page |
| A ticker search lands on an empty token | The ticker exists under one ZRC-20 reading only | Switch the reading on the Tokens page |

## Related

- [Scan](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [What an empty result means](/docs-zerdinals-and-zrunes/verify/coverage/)
