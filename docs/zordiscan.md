# ZordiScan

ZordiScan is the first-party explorer for Zcash digital artifacts. It reads only from Universe-operated Zcash infrastructure.

## Search

One search field classifies what you typed and routes you to the right page:

1. Block height: any plain number.
2. Block hash or transaction id: any 64-character hex value. These two look identical, so ZordiScan offers both routes instead of guessing.
3. Transparent address: t1 (P2PKH), t3 (P2SH), or tm (testnet).
4. Unified Address: u1 prefixed. The transparent receiver inside it is what the protocols track.
5. Zerdinal inscription id: a transaction id followed by an i and a number.
6. ZRune name: uppercase letters, with or without bullet spacers (Z•RUNE finds ZRUNE), or a ZRune id in block:tx form.
7. Collection slug: lowercase kebab-case.

Classification never fabricates a result; an input that matches nothing says so.

## Three views on every detail page

1. Friendly: the human reading. What this artifact is, who owns it, what happened and when.
2. Protocol: the protocol-level facts. Envelope fields, commitments, edicts, families, states, and events, decoded and labeled.
3. Raw: the underlying data, unedited. Raw data stays available everywhere.

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

1. The chain is still being read. The status bar shows SCANNING with the blocks read, the chain length, and the percentage verified, and every empty section repeats those figures instead of reporting a count. Absence here means nothing at all.
2. No records yet. Shown only once the whole chain has been read. This is a real, checkable statement that nothing of that kind exists.
3. Indexer unreachable. The service could not be reached, so nothing can be said either way. Nothing is hidden or lost.
4. Data is stale. The last known values are still shown, labeled, with the time they were last confirmed.

The same rule governs asset safety. Universe Wallet asks the indexer whether an output carries a Zerdinal or a ZRune before it will let you spend it. Until the chain has been read in full, an output with nothing recorded against it is reported as unverified rather than clear, so a wallet refuses to spend it instead of risking an artifact it cannot yet see.
