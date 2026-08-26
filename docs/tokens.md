# ZRC-20 tokens

ZRC-20 is the token standard carried inside legacy Zerdinals inscriptions. A token is deployed, minted, and moved by writing small JSON documents into Zcash transactions. Nothing about it is a separate chain, a bridge, or a wrapper: every balance is reconstructable from Zcash blocks alone.

Open **Tokens** in the navigation to browse every deployed ticker, or search a ticker in ZordiScan.

## What a token page shows you

1. **Max supply and per-mint limit**, as the deploy declared them.
2. **Minted**, as an exact percentage of the whole supply.
3. **Circulating, burned, and shielded**, kept apart rather than summed.
4. **Holders**, and the balance each one holds.
5. **Origin**: the deploy transaction, the deploy inscription, the block, and the deployer address.
6. **Activity**: mints, transfers, burns, and the operations that did not count.

## Why some figures come with a second opinion

Two independent readers project ZRC-20 from the same Zcash blocks, and they do not always agree. Where they differ, one of them will tell you a token has 435 holders and the other will tell you it has 408. Both are reading the same chain. They disagree about the rules, not about the blocks.

Most explorers pick one reader and print its number without saying so. This one prints both.

Every figure names the reading it came from. Every row in the token list says whether the two readers agree about that token. On a token's page, a table shows both readings side by side with the differing rows marked, and neither column is presented as the answer.

The two readings differ in two places that can be settled from a transaction:

| | Ticker rule | Mint amount rule |
|---|---|---|
| **zord** | lowercased, 4 to 5 bytes | a mint may claim up to the per-mint limit |
| **zecscriptions** | lowercased, any length | a mint must claim exactly the limit |

That is enough to change real numbers. A partial mint counts under one reading and not under the other, so supply, holders, and mint progress can all move. A ticker longer than five bytes exists under one reading and does not exist at all under the other.

You can switch the reading at the top of the Tokens page and on any token page. Switching it changes which operations counted, so what you see changes with it.

## Differences nobody here has decided

Some documented differences cannot be settled without inventing a fact, so they are not applied at all. They are listed on each token page, with the reason. Two of them:

1. One reader's version 2 protocol requires a mint to pay three specific outputs. No activation height for that version is on record, so applying the rule would mean guessing when it started. Neither reading applies it.
2. A transfer settled into the shielded pool is a permanent burn in one accounting. Rather than choosing, shielded amounts are counted in their own column beside burned, so either accounting can be worked out exactly from what is shown.

## Operations that did not count

Not every ZRC-20 document in a block does something. A mint after the supply ran out, a transfer larger than the balance behind it, a second deploy of a ticker that already exists: these are written to the chain, and they change nothing.

Most explorers simply omit them, which leaves you with a transaction that appears to have vanished. Turn on **Include operations that did not count** in a token's activity, and each one says plainly why it did not: the whole supply had already been minted, the holder did not have enough available balance, the ticker was already deployed.

## Available and committed balances

A transfer happens in two steps. First you inscribe the transfer, which sets the amount aside. Then you spend that inscription's output, which delivers it.

Between the two steps the amount is **committed**: it is still yours, but it is not available to move again. A holder's balance is shown split, so an attempted transfer that fails for insufficient balance has a visible explanation rather than a mysterious one.

## Reading numbers correctly while the chain is being read

The explorer only knows about blocks it has read. Whenever the scan is incomplete, an empty result says so rather than reporting nothing found, and the figures shown are the figures from the blocks read so far. An absence is never presented as proof that something does not exist.

## Related

1. [What Zerdinals are](zerdinals.md)
2. [ZordiScan](zordiscan.md)
3. [Privacy on Zcash, honestly](privacy.md)
