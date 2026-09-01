---
title: Frequently asked questions
description: "Direct answers on permanence, accidental loss, privacy, why two explorers disagree about the same token, fees, reorganizations, keyboard access, and which wallets work."
---

**You will get from this page:** the short answers, each linking to the page
that carries the full one.

## Is my content actually on chain?

Yes. The content bytes live in the reveal transaction scripts on the Zcash
chain, in 240-byte pieces. Reconstructing your content needs only a Zcash
node; no Universe server has to exist for your inscription to survive.

Universe Zerdinals v1 adds a commitment: the commit transaction's address is
derived from a hash of your exact content and content type. The chain
committed to your content before any content byte was broadcast, and
anything that does not match that commitment is not your inscription. You
can verify the commitment yourself with a node and
[the specification](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/).

## How do people accidentally destroy an inscription?

By spending it as ordinary money. An inscription is attached to one
specific transparent output, and a wallet that does not know about
inscriptions can spend that output as a fee or as change. Nothing warns
you, and nothing undoes it.

Two habits avoid it: keep artifact addresses separate from spending
addresses, and never spend from those keys with a wallet that is not
inscription-aware. The full routine, including the per-output verdict that
fails closed, is in
[Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/) and
[Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/).

## Can one output hold more than one inscription?

Yes, and on this chain it is common; outputs carrying hundreds of
inscriptions exist. An output is spent whole, so spending it moves
everything on it at once. Check what an output actually carries before
spending it.
[Ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/).

## Why do two explorers give different numbers for the same token?

Because they read the same blocks under different rules, and both are being
honest about what they computed. ZRC-20 was defined by its implementations,
and the implementations differ. This product computes both readings, shows
them side by side, and names the reading behind every figure.
[ZRC-20, and its two readings](/docs-zerdinals-and-zrunes/understand/zrc-20/).

## Can my inscription or ZRune be private?

No. Zerdinals and ZRunes use transparent Zcash transactions; content,
addresses, balances, and activity are publicly visible, forever. Shielding
does not make an asset private; it destroys its tracking (a Zerdinal
becomes permanently untrackable, a ZRune balance is burned by rule).
[Transparent and shielded](/docs-zerdinals-and-zrunes/understand/transparent-and-shielded/).

## Why does the site say the chain is still being read?

Everything shown comes from Universe-operated nodes reading the chain from
the beginning. Until the read is complete, the product cannot distinguish
"does not exist" from "not yet reached", so it tells you which situation
you are in and shows the blocks read against the chain length. While that
is the case, no page reports totals, and creating and transferring are
gated on the same evidence.
[What an empty result means](/docs-zerdinals-and-zrunes/verify/coverage/).

## What happens if the site cannot reach the indexer?

The page tells you once, keeps what it can still show labeled as last
known, retries on its own with increasing patience, and fills itself back
in when the service answers. Nothing on chain is affected; an outage delays
what can be shown and changes nothing about what you own.
[Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/).

## What happens in a chain reorganization?

The indexer journals every event with its block height and hash and
recomputes deterministically from the surviving chain. Sequence numbers are
stable only after confirmation depth, which is why fresh inscriptions
display their provisional nature. A reorganization deeper than the
supported automatic bound stops the indexer for operator repair rather than
serving wrong data.

## What fees will I pay?

Zcash conventional fees under ZIP 317: 5,000 zatoshis per logical action,
computed from the actual shape of each transaction. A simple send is 2
actions; a full 4-piece reveal is about 8; a typical ZRune mint is about 4
to 5. The complete fee display appears before you sign anything.
[Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/).

## Is the product usable with a keyboard or a screen reader?

Yes. The interface works with keyboard navigation (including a
skip-to-content link), announces status and progress changes to screen
readers, and disables animation when your system asks for reduced motion.

## Which wallets work?

None yet for signing: wallet signing is gated and production writes are
disabled, which the product states wherever it applies. Reading is open to
everyone without a wallet, and any transparent address can be inspected
read-only.
[Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
explains the gate;
[Current status](/docs-zerdinals-and-zrunes/start/status/) is the authority
on the current state.
