# Zerdinals

Zerdinals are digital artifacts inscribed through Zcash transparent transactions.

An inscription writes your content (an image, text, JSON, or other supported types) into the Zcash chain through a commit and reveal pair of transactions. The content lives on chain. Ownership is the ownership of one specific transparent output, and it moves with ordinary Zcash transactions you sign in your wallet.

## Its number

Every completed inscription is given a number in the order the chain completed it, and that number
is how the product names it: **No. 087871**. Most inscriptions carry no title, so the number is the
thing that is genuinely unique about one. There is exactly one No. 87871 and there always will be.

## What you can rely on

1. Content is on chain. Reconstructing it needs only a Zcash node.
2. Provenance is a verifiable chain of transparent transactions from the genesis inscription to the current owner. Every artifact page shows that chain in full: where it was inscribed, every hand it has passed through, and the transaction behind each step.
3. Universe Zerdinals v1 inscriptions carry a content commitment in the commit transaction, so the content you approved is the content that exists.

## What to know before inscribing

1. Zerdinals use transparent Zcash data. Addresses, content, and activity are publicly visible forever.
2. Sending an inscription-bearing output entirely into a shielded pool ends protocol tracking permanently. The product marks such artifacts as untrackable and never guesses a shielded owner.
3. Fees follow the current Zcash fee rule (ZIP 317) and are always shown in full before you sign.
