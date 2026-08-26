# Protocol specifications, in plain language

The full specifications live in the product repository (bitcoinuniverseio/zerdinals-and-zrunes) and are the authority whenever this page and the specification disagree:

1. docs/protocol/ZERDINALS-V1.md
2. docs/protocol/ZRUNES-V1.md
3. docs/protocol/COLLECTIONS-V1.md
4. docs/protocol/ZERDINAL-ORDINALITY-DECISION.md

This page is the reader-level summary.

## Zerdinals v1

A Zerdinal is created by two kinds of transparent Zcash transactions:

1. Commit: a transaction creating a P2SH output whose redeem script commits to the reveal key and to a hash of your exact content. Because the commit address is derived from that hash, the chain commits to your content before a single content byte is broadcast.
2. Reveal: one or more transactions spending the commit output and carrying the content in their input scripts, in 240 byte pieces, up to 4 pieces per transaction and up to 255 pieces total (61,200 bytes).

The content commitment is what makes Universe v1 stricter than the legacy envelope already on Zcash: Zcash transaction ids (ZIP 244) do not cover input script data, so legacy inscription content could in principle be altered in relay without changing the txid. In v1, altered content no longer matches the commitment and the result is simply not a v1 inscription. Every v1 inscription is still readable by existing ecosystem decoders.

Ownership is the ownership of one specific transparent output. When that output is spent, the inscription moves to the first transparent non-data output of the spending transaction. Zerdinals do not number individual zatoshis; the ordinality decision document explains why that theory cannot be honest on Zcash.

Two terminal states exist, both deterministic and both displayed honestly:

1. SHIELDED_UNTRACKABLE: the carrying output was spent into a shielded pool with no transparent successor. Tracking ends permanently. No shielded owner is ever guessed, and later unshielding never resurrects tracking.
2. BURNED: the carrying output was spent with no valid successor and no shielded component (for example, all value went to fees).

## ZRunes v1

A ZRune is a transparent fungible asset. Its state machine has three operations:

1. Etch: creates the ZRune, once, with a fixed name (4 to 26 letters) and optional mint terms (amount per mint, mint cap, opening and closing block heights). Etching requires a commitment: input 0 must spend an output, confirmed at least 6 blocks earlier, that committed to a hash of the name. Observers cannot learn the name from the commitment, so a pending etch cannot be sniped from the mempool.
2. Mint: while the terms window is open and the cap is not reached, anyone can mint exactly the fixed amount per mint. Mints are counted in block order, then transaction order.
3. Transfer: balances attach to transparent outputs. A transaction spending ZRune-bearing outputs pools those balances and allocates them to outputs through edicts (compact allocation instructions in the transaction's data output), with a default rule for anything left over. Balances with no valid transparent successor are burned.

Malformed handling is deliberately strict: any rule violation produces a single Malformed ZRunestone state with fixed, deterministic effects (input balances burn, an attempted etch can still consume its name with closed terms, an attempted mint can still count against the cap). Two independent implementations must agree byte for byte; the Rust reference implementation is authoritative and the TypeScript implementation must pass every Rust-generated test vector.

The protocol also maintains a supply invariant at every block height: premine plus completed mints times amount always equals circulating plus burned. The indexer verifies this continuously.

## Collections v1

Collections are never arbitrary labels presented as chain fact. Every collection carries one of four verification levels, shown everywhere the collection appears:

1. Verified (on-chain): membership proven by parent-by-spend. The collection identity is itself a Zerdinal (the parent). A child joins by having its genesis reveal transaction spend the parent's carrying output, which only the parent's current owner can do. Membership is proof of creator control at inscription time, permanent, and recorded with the proving transaction.
2. Verified, legacy: ZRC-721 collections, which are on-chain by construction under the legacy family rules. Shown with the legacy family badge.
3. Curated: for legacy inscriptions with no on-chain parent mechanism, a creator may publish a signed manifest. It is accepted only after signature verification and creator evidence checks; manifests are append-only and every accepted version is retained.
4. Unverified: everything else. Labeled Unverified everywhere, excluded from featured surfaces, never presented as chain fact.

No floor prices, volume, sales, or rarity scores exist anywhere in v1, and administrators cannot edit membership.
