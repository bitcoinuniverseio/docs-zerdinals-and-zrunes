# Inscribing a Zerdinal

The inscribe flow is one wizard with six stations. Nothing is signed and nothing touches the chain until you approve the exact transactions in your wallet. Wallet connection is currently in progress: today the wizard takes you through file selection and preview, and states plainly where it stops.

## The flow

1. Choose file. Pick the file to inscribe. The app reads the bytes, computes the SHA-256 hash, and detects the content type from the first bytes of the file, never from the file extension. Empty files are refused: zero byte content cannot be inscribed.
2. Preview. See exactly what will go on chain: the content rendered as it will be served, the byte size, the detected content type, the content hash, and the piece count.
3. Details. Confirm the content type that decoders will serve. This exact ASCII string becomes part of the on-chain envelope and part of the content commitment.
4. Destination. Enter the address that will own the inscription. Valid destinations are transparent Zcash addresses and Unified Addresses that contain a transparent receiver. Shielded-only recipients are rejected before any transaction is built, because a Zerdinal cannot be tracked into a shielded pool.
5. Review. One screen with the full picture before anything is signed: the commit transaction, the reveal transaction chain, and the complete fee display (network fee, any service fee, total ZEC, total zatoshis, and a clearly labeled fiat estimate).
6. Sign and follow. Approve the commit transaction in your wallet, then the reveal transactions, and watch the order progress through real chain states.

## Sign commit, sign reveal

An inscription is a pair of transaction kinds:

1. The commit transaction creates an output whose address is derived from a hash of your content. The chain commits to your content before any content byte is broadcast.
2. The reveal transactions spend that output and carry your content in their input scripts. Your wallet verifies the commit address against the content commitment independently, displays the exact effects, and signs locally. Private keys never leave the wallet and the web application never sees a seed phrase.

Both approvals present one visual timeline of the same order, so what you sign is what you watched being planned.

## The reveal moment

When the final reveal confirms and the indexer records the inscription, the artifact card resolves from its content-hash placeholder into the real content and the serial stamp is applied. From that moment the inscription has an id (the genesis transaction id plus the suffix i0), a sequence number, and an owner: the destination output you chose.

## Size limits

1. Content is split into 240 byte pieces.
2. At most 4 pieces travel per reveal transaction; larger content uses a chain of reveal transactions, pre-planned and pre-signed before the first broadcast.
3. Maximum content size is 61,200 bytes (255 pieces).

## Batch inscribing

The Inscribe page has a batch mode for inscribing several files in one sitting. The rules are the same as single inscribing; the batch only groups them.

1. Limits. A batch holds up to 24 items. Every item obeys the same protocol limits as a single inscription (up to 61,200 bytes, split into 240 byte pieces). Empty files are refused before prepare.
2. Every item is its own order. On prepare, each valid item becomes a fully independent commit and reveal order on the backend. One failed, rejected, or cancelled item never affects the others.
3. Failure isolation at prepare. Each item is validated independently, exactly like a single prepare. An invalid item (for example a content type outside the allowlist) gets a typed error in its place in the list and no order is created for it; the valid items proceed. Item order is preserved throughout.
4. Destinations. One shared destination address covers the batch, and any item can carry its own destination override.
5. Per-item signing. Items are signed one at a time, in order, and nothing advances until you choose to sign the next one. Declining a commit signature in the wallet cancels only that item; nothing was signed or sent for it. Declining a reveal signature leaves that item open and resumable (its commit is already on chain), and the flow moves past it until you retry.
6. Totals up front. Prepare shows the item counts (valid and invalid), the total network fees, and the total you spend, before anything is signed.
7. Manifest download. At any point you can download a JSON manifest of the batch: per-item content hash, commitment, content type, byte size, order id, state, commit and reveal txids, inscription id, and recipient. The content itself is never in the manifest.
8. Resume. Batches you prepare are saved in your browser on this device, so closing the tab never loses one; you can resume signing and watching later.

## Fees

Fees follow ZIP 317, the current Zcash fee rule: 5,000 zatoshis per logical action, computed from the actual shape of each transaction. The large reveal input raises the reveal cost (a full 4-piece reveal is about 8 logical actions). Zebra relays nothing below the conventional fee, so this is the floor, not a suggestion. Every fee is displayed in full before you sign; there are no fee surprises after approval.
