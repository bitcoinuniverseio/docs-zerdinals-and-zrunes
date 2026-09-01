---
title: Search
description: One field on every page classifies what you typed and routes you to the right record, without guessing.
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
