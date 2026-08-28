# ZRunes

ZRunes are transparent fungible assets issued through a Zcash metaprotocol.

A ZRune is etched once with a fixed name and optional mint terms (amount per mint, mint cap, and an opening and closing block window). Anyone can mint while the terms allow it. Balances attach to transparent outputs and move by output allocation in ordinary transactions.

## When ZRunes open on mainnet

ZRunes activate on Zcash mainnet at **block 3,470,000**.

Before that height the protocol ignores ZRune data outputs entirely, so nothing can be etched or minted and no ZRune can exist. That is a rule of the protocol rather than a setting on our side: a node reading the chain independently reaches the same answer, and anything written into an earlier block is not a ZRune and never becomes one.

You can check the height and whether it has been reached against our own indexer, which publishes both:

```
https://zrunes.io/idx/zcash-metaprotocols/status
```

The `zrunes` block in the response carries `activationHeight` and `active`. Until `active` is true, an empty list of ZRunes means the protocol has not opened yet, not that nobody wanted one.

## Facts the product shows are real chain facts

Supply, mint progress, remaining mints, holder counts, and open or closed status all come from our own Zcash node and indexer. Mint windows open and close at real block heights.

## Transparency

ZRunes use Zcash transparent outputs. Their balances and activity are public. If a ZRune-bearing output is spent with no valid transparent successor, the balance is burned by protocol rule. ZRunes are not shielded assets and are never marketed as private.
