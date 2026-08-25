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

## Honesty rules

Status information (node height, indexer height, lag, mempool state) is always shown honestly; stale data is labeled STALE with the checkpoint time. Chain literals (txids, addresses, heights, hashes) render in full or with an explicit middle ellipsis plus a copy control, never truncated silently.
