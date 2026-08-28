# Frequently asked questions

## Is my content actually on chain?

Yes. The content bytes live in the reveal transaction scripts on the Zcash chain, in 240 byte pieces. Reconstructing your content needs only a Zcash node; no Universe server has to exist for your inscription to survive.

Universe Zerdinals v1 adds a commitment: the commit transaction's address is derived from a hash of your exact content and content type. This means the chain committed to your content before any content byte was broadcast, and anything that does not match that commitment is not your inscription. You can verify the commitment yourself with a node and the specification.

## How do people accidentally destroy an inscription?

By spending it as ordinary money.

An inscription is not a separate object sitting beside your coins. It is attached to one specific transparent output, and that output holds a small amount of ZEC like any other. A wallet that does not know about inscriptions sees only that small amount. If it selects that output to pay a fee or to make up change, the inscription goes to whoever receives that output, or is destroyed. Nothing warns you, and nothing undoes it.

Two habits avoid it:

1. Keep the addresses that hold artifacts separate from the addresses you spend from.
2. Do not send ordinary payments from a wallet that is not inscription aware, including a general purpose mobile wallet that happens to hold the same keys.

Before spending from an address, you can check what it holds on its ZordiScan page: inscriptions, ZRune balances, and ZRC-20 balances are all listed there.

The chain read that backs this product publishes a per-output verdict on whether an output carries an asset, and that verdict fails closed: while the chain has not been read in full, an output with no recorded asset is reported as unchecked rather than as clear, because an output created in a block nobody has read yet is indistinguishable from one that never carried anything. A wallet that consults it therefore cannot be told an unknown output is safe to spend.

## Can one output hold more than one inscription?

Yes, and on this chain it is common. Gathering many inscriptions onto a single output is ordinary practice, and today 1,581 mainnet outputs hold 26,826 inscriptions between them. One of them carries several hundred.

This matters when you spend. An output is spent whole: you cannot send part of one. If an output carries three hundred inscriptions and you spend it, all three hundred move to whoever receives it, in one transaction, whether or not you meant to move more than one. There is no way to split them apart in the same step, and nothing about the amount of ZEC on the output hints at how much is riding on it.

So before you spend, check what the output actually carries rather than what you remember putting there. The ZordiScan page for an address lists every inscription against the output holding it, and the per-output verdict this product publishes names every asset on an output rather than the first one it finds.

## Why do two explorers give different numbers for the same token?

Because they read the same blocks under different rules, and both are being honest about what they computed.

ZRC-20 was defined by its implementations rather than by a specification, and those implementations differ. One requires a ticker to be four or five bytes; the other accepts any length, so a longer ticker exists for one and does not exist at all for the other. One accepts a mint for any amount up to the per-mint limit; the other accepts only a mint for exactly the limit, so a partial mint counts once and not twice. Different operations counting means different supply, different holders, different mint progress.

Most explorers pick one set of rules and print the result without saying which. This product computes both and shows them side by side, marks the figures where they part, and names the reading every number came from. Differences that cannot be settled without inventing a fact, such as a rule whose activation height nobody recorded, are listed as undecided rather than guessed. See [ZRC-20 tokens](tokens.md).

## Can my inscription or ZRune be private?

No. Zerdinals and ZRunes use transparent Zcash transactions. Content, addresses, balances, and activity are publicly visible, forever.

Shielding does not make an asset private; it destroys its tracking. If an inscription-bearing output is spent entirely into a shielded pool, the inscription becomes permanently untrackable and is displayed that way. If ZRune-bearing value goes shielded with no transparent successor, the balance is burned by protocol rule. Nothing resurrects either outcome, including unshielding later.

If you need financial privacy on Zcash, use shielded ZEC in a shielded wallet, and keep that activity separate from your artifact activity.

## Why does the site say the chain is still being read?

Everything the product shows comes from Universe-operated Zcash nodes reading the chain from the beginning; no third-party chain service is used anywhere. Until a node has read the whole chain, we cannot tell the difference between "this does not exist" and "we have not reached the block it is in", so we say which situation you are in and show the blocks read against the chain length.

While that is the case, no page reports a count of Zerdinals, ZRunes, collections, or activity, because any such number would be wrong. Creating and transferring are gated on the same evidence.

## What happens if the site cannot reach the indexer?

The page tells you once, keeps what it can still show you, and fixes itself when the service comes back.

Reading this archive means asking our own indexer, and a service can be briefly unavailable: a restart, a maintenance window, a network hiccup between the site and the machine that holds the index. When that happens you get a single notice at the top of the page saying what is unavailable and what is not, and each affected section is marked with one line rather than repeating the same explanation. Anything already on screen stays on screen and is labelled as last known, because a page that cannot fetch a fresh copy has not lost the old one.

Nothing recorded on the chain is affected by any of this. Your artifacts, balances and transactions live in Zcash blocks; the indexer only reads them. An outage delays what we can show you and changes nothing about what you own.

The page keeps retrying on its own, less often the longer an outage lasts so it does not add load to a service already struggling, and it fills itself back in as soon as the indexer answers. You do not have to reload. If you would rather not wait, the notice carries a **Retry now** button.

While the site cannot confirm current chain data, creating, etching, minting and transferring stay unavailable rather than proceeding on stale information.

## What happens in a chain reorganization?

The indexer journals every event with its block height and hash. When the chain reorganizes, everything recomputes deterministically from the surviving chain: inscriptions in orphaned blocks revert to pending or disappear exactly as chain state dictates, and sequence numbers and ownership are recalculated. Sequence numbers are stable only after confirmation depth, which is why fresh inscriptions display their provisional nature honestly. A reorg deeper than the supported automatic bound stops the indexer for operator repair rather than serving wrong data.

## What fees will I pay?

Zcash fees under ZIP 317: 5,000 zatoshis per logical action, computed from the actual shape of each transaction. A simple send is 2 actions (10,000 zatoshis). A full 4-piece inscription reveal is about 8 actions. A typical ZRune mint is about 4 to 5 actions. The network relays nothing below this conventional fee, so it is a floor, not an estimate. The product always shows the complete fee breakdown (network fee, any service fee, totals in ZEC and zatoshis, and a labeled fiat estimate) before you sign anything.

## Is the product usable with a keyboard or a screen reader?

Yes. The interface works with keyboard navigation (including a skip-to-content link), announces status and progress changes to screen readers, and disables animation when your system asks for reduced motion.

## Which wallets work?

Wallet integration is currently in progress. Today you can inspect any transparent address read-only: its inscriptions, its ZRune balances, and its activity, through ZordiScan and the portfolio surfaces. Creating and transferring through the product flow requires the wallet integration, and the inscribe wizard says plainly where it stops today. The wallet design is fixed: private keys never leave the wallet, the backend prepares effects-only transaction intents, and the wallet independently verifies every input, output, and commitment before signing.
