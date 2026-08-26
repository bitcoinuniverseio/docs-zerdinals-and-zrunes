# Frequently asked questions

## Is my content actually on chain?

Yes. The content bytes live in the reveal transaction scripts on the Zcash chain, in 240 byte pieces. Reconstructing your content needs only a Zcash node; no Universe server has to exist for your inscription to survive.

Universe Zerdinals v1 adds a commitment: the commit transaction's address is derived from a hash of your exact content and content type. This means the chain committed to your content before any content byte was broadcast, and anything that does not match that commitment is not your inscription. You can verify the commitment yourself with a node and the specification.

## Can my inscription or ZRune be private?

No. Zerdinals and ZRunes use transparent Zcash transactions. Content, addresses, balances, and activity are publicly visible, forever.

Shielding does not make an asset private; it destroys its tracking. If an inscription-bearing output is spent entirely into a shielded pool, the inscription becomes permanently untrackable and is displayed that way. If ZRune-bearing value goes shielded with no transparent successor, the balance is burned by protocol rule. Nothing resurrects either outcome, including unshielding later.

If you need financial privacy on Zcash, use shielded ZEC in a shielded wallet, and keep that activity separate from your artifact activity.

## Why does the site say the chain is still being read?

Everything the product shows comes from Universe-operated Zcash nodes reading the chain from the beginning; no third-party chain service is used anywhere. Until a node has read the whole chain, we cannot tell the difference between "this does not exist" and "we have not reached the block it is in", so we say which situation you are in and show the blocks read against the chain length.

While that is the case, no page reports a count of Zerdinals, ZRunes, collections, or activity, because any such number would be wrong. Creating and transferring are gated on the same evidence.

## What happens in a chain reorganization?

The indexer journals every event with its block height and hash. When the chain reorganizes, everything recomputes deterministically from the surviving chain: inscriptions in orphaned blocks revert to pending or disappear exactly as chain state dictates, and sequence numbers and ownership are recalculated. Sequence numbers are stable only after confirmation depth, which is why fresh inscriptions display their provisional nature honestly. A reorg deeper than the supported automatic bound stops the indexer for operator repair rather than serving wrong data.

## What fees will I pay?

Zcash fees under ZIP 317: 5,000 zatoshis per logical action, computed from the actual shape of each transaction. A simple send is 2 actions (10,000 zatoshis). A full 4-piece inscription reveal is about 8 actions. A typical ZRune mint is about 4 to 5 actions. The network relays nothing below this conventional fee, so it is a floor, not an estimate. The product always shows the complete fee breakdown (network fee, any service fee, totals in ZEC and zatoshis, and a labeled fiat estimate) before you sign anything.

## Is the product usable with a keyboard or a screen reader?

Yes. The interface works with keyboard navigation (including a skip-to-content link), announces status and progress changes to screen readers, and disables animation when your system asks for reduced motion.

## Which wallets work?

Wallet integration is currently in progress. Today you can inspect any transparent address read-only: its inscriptions, its ZRune balances, and its activity, through ZordiScan and the portfolio surfaces. Creating and transferring through the product flow requires the wallet integration, and the inscribe wizard says plainly where it stops today. The wallet design is fixed: private keys never leave the wallet, the backend prepares effects-only transaction intents, and the wallet independently verifies every input, output, and commitment before signing.
