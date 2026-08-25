# ZRunes

ZRunes are transparent fungible assets issued through a Zcash metaprotocol.

A ZRune is etched once with a fixed name and optional mint terms (amount per mint, mint cap, and an opening and closing block window). Anyone can mint while the terms allow it. Balances attach to transparent outputs and move by output allocation in ordinary transactions.

## Facts the product shows are real chain facts

Supply, mint progress, remaining mints, holder counts, and open or closed status all come from our own Zcash node and indexer. Mint windows open and close at real block heights.

## Transparency

ZRunes use Zcash transparent outputs. Their balances and activity are public. If a ZRune-bearing output is spent with no valid transparent successor, the balance is burned by protocol rule. ZRunes are not shielded assets and are never marketed as private.
