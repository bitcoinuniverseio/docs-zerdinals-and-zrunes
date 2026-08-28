# ZordiScan

ZordiScan is the first-party explorer for Zcash digital artifacts. It reads only from Universe-operated Zcash infrastructure.

## Search

Search is available from every page. Press the slash key, or use the search field in the header,
or open the menu on a phone. One field classifies what you typed and routes you to the right
page:

1. Block height: any plain number.
2. Block hash or transaction id: any 64-character hex value. These two look identical, so ZordiScan offers both routes instead of guessing.
3. Transparent address: t1 (P2PKH), t3 (P2SH), or tm (testnet).
4. Unified Address: u1 prefixed. The transparent receiver inside it is what the protocols track.
5. Zerdinal inscription id: a transaction id followed by an i and a number.
6. ZRune name: uppercase letters, with or without bullet spacers (Z•RUNE finds ZRUNE), or a ZRune id in block:tx form.
7. Collection slug: lowercase kebab-case.
8. Token ticker: short uppercase letters. A ticker and a ZRune name share the same alphabet, so ZERO could be either. ZordiScan says so and offers both routes rather than guessing; pressing Open takes you to the token, where nearly all of this chain's token activity lives.

Classification never fabricates a result; an input that matches nothing says so, and it says what
it checked for so you can spot a missing or extra character.

The classification is shown while you type, before anything opens. That matters most for the two
ambiguous shapes above: paste a 64-character hex value and the box tells you it is the shape of
both a transaction id and a block hash, and offers both, rather than picking one and taking you
somewhere you did not ask for.

## Finding artifacts among the bookkeeping

Most of what is written to this chain is token bookkeeping: ZRC-20 deploys, mints, and transfers, all of them small JSON documents. In an unfiltered feed they bury the images and the writing.

Discover therefore shows **artifacts** by default and lets you switch to token operations or to everything. The split is taken from what the protocol parsers actually found in each inscription, not from its media type, because a token operation and a piece of writing are both plain text on the wire. A second filter narrows by media: image, text, HTML, JSON, video, audio, or 3D.

Discover lists the newest inscriptions first. When a filter returns nothing, it says the filter is why rather than implying the chain holds nothing.

## Three views on every detail page

1. Friendly: the human reading. What this artifact is, who owns it, what happened and when.
2. Protocol: the protocol-level facts. Envelope fields, commitments, edicts, families, states, and events, decoded and labeled.
3. Raw: the underlying data, unedited. Raw data stays available everywhere.

## Getting around

The header carries four destinations, named for what you came to do:

| Destination | What is there |
| --- | --- |
| Discover | The archive: the newest artwork, the full record, and the way into collections and activity |
| Tokens | ZRC-20 supply, mint progress, holders and activity, under both readings |
| Create | Inscribe a Zerdinal, etch a ZRune, mint a ZRune |
| Scan | ZordiScan: blocks, transactions and addresses straight from the node |

Portfolio and the wallet control sit on the right. Collections, Activity, ZRunes and the
explanation page are in the footer of every page and on Discover itself. On a phone the menu
control opens all of them on one screen; nothing is reachable on a desktop that is not reachable
on a phone.

## What changed since you were last here

Discover reports the number of numbered inscriptions that arrived since your previous visit, and a
list of the artifacts you opened most recently.

Both are stored in your browser on this device, like watchlists, with no server component and no
account. The visit mark holds one number, the highest inscription sequence this device has seen.
The recent list holds up to twelve public inscription ids.

The count only appears when there are two real readings to subtract. A first visit is told nothing
rather than being told that nothing happened, and a sequence that moved backwards, which means a
reindex rather than news, is reported as nothing at all.

## Watchlists

You can watch a ZRune, a collection, a transparent address, or a single Zerdinal from its page. What that means, exactly:

1. Watchlists are stored in your browser on this device. There is no server component and no account; nothing about your watchlist leaves your machine.
2. A watched item stores only a public identifier (the ZRune name, collection slug, address, or inscription id) plus a snapshot of public indexer counters from your last visit. Never balances, never keys.
3. The Activity page compares the current chain data against your last-visit snapshot and reports real deltas: supply minted and holder count changes for a ZRune, member count for a collection, inscriptions held at an address, and state or owner changes for a Zerdinal. If nothing changed, it says nothing changed.
4. Removing the item, or clearing the browser's storage, removes the watchlist. There is no copy anywhere else.

## Share cards

A Zerdinal detail page can export a share card: a 1200 by 630 PNG drawn entirely in your browser, with no external calls. The card contains only public chain facts: the content preview, the name or short id, the serial number, the collection if any, the genesis block height, the content type, and the ZordiScan link. Never wallet balances and never anything private, because the card is built from the same public indexer data anyone can read.

## Honesty rules

Status information (node height, indexer height, lag, mempool state) is always shown honestly; stale data is labeled STALE with the checkpoint time. Chain literals (txids, addresses, heights, hashes) render in full or with an explicit middle ellipsis plus a copy control, never truncated silently.

## What an empty result means

A Zcash node has to read the chain from the beginning before anything on it can be indexed, and that takes time. While it is doing so, a section with nothing in it is not a statement that nothing exists: the artifacts may sit in blocks the node has not reached.

The product distinguishes these cases and never blurs them:

1. The chain is still being read. The status tape shows READING THE CHAIN with the blocks read, the chain length, and how much of it the scan covers, and every empty section repeats those figures instead of reporting a count. Absence here means nothing at all.
2. No records yet. Shown only once the whole chain has been read. This is a real, checkable statement that nothing of that kind exists.
3. Indexer unreachable. The service could not be reached, so nothing can be said either way. Nothing is hidden or lost.
4. Data is stale. The last known values are still shown, labeled, with the time they were last confirmed.

The same rule governs asset safety. Universe Wallet asks the indexer whether an output carries a Zerdinal or a ZRune before it will let you spend it. Until the chain has been read in full, an output with nothing recorded against it is reported as unverified rather than clear, so a wallet refuses to spend it instead of risking an artifact it cannot yet see.
