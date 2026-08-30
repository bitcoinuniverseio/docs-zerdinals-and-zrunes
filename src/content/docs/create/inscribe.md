---
title: Inscribe a Zerdinal
description: The six-station inscribe wizard, the single approval that covers the whole inscription, batch mode, and exactly where the flow stops today.
---

**Outcome:** you will know the whole inscribe flow, what each approval means,
and how batches behave, so that when you run it nothing surprises you.

:::caution[Availability today]
Wallet signing is not yet available, so the wizard currently takes you
through file selection, preview, and planning, and states plainly where it
stops. Nothing below is speculative; it describes the flow as built, and
[the status page](/docs-zerdinals-and-zrunes/start/status/) is the authority
on what can complete today.
:::

## Before you begin

- Content up to 61,200 bytes. Empty files are refused; zero-byte content
  cannot be inscribed.
- A destination: a transparent Zcash address, or a Unified Address that
  contains a transparent receiver. Shielded-only recipients are rejected
  before any transaction is built, because a Zerdinal cannot be tracked into
  a shielded pool.
- Enough ZEC for the fees, which are shown in full before anything is
  signed. [How fees work](/docs-zerdinals-and-zrunes/create/fees/).

## The six stations

1. **Choose file.** The app reads the bytes, computes the SHA-256 hash, and
   detects the content type from the first bytes of the file, never from the
   extension.
2. **Preview.** Exactly what will go on chain: the content rendered as it
   will be served, the byte size, the detected content type, the content
   hash, and the piece count.
3. **Details.** Confirm the content type that decoders will serve. This
   exact ASCII string becomes part of the on-chain envelope and part of the
   content commitment.
4. **Destination.** Enter the address that will own the inscription.
5. **Review.** One screen with the full picture before anything is signed:
   the commit transaction, the reveal transaction chain, and the complete
   fee display (network fee, any service fee, total ZEC, total zatoshis, and
   a labeled fiat estimate).
6. **Sign and follow.** Approve the whole inscription once in your wallet,
   then watch the order progress through real chain states.

## What you are approving

An inscription is more than one transaction, and you approve all of them at
once.

1. The **commit** transaction creates an output whose address is derived
   from a hash of your content. The chain commits to your content before any
   content byte is broadcast.
2. The **reveal** transactions spend that output and carry your content in
   their input scripts, in 240-byte pieces, at most 4 pieces per
   transaction; larger content uses a chain of reveal transactions.

Every one of them is built and shown before you approve anything. A version
5 Zcash transaction has an id that does not depend on its signatures, so the
transaction that spends the commit can name the commit exactly, before the
commit is signed. That is what makes one approval possible where the
protocol looks like it needs several.

What you approve is the transactions themselves, not a description of them.
Your wallet rebuilds the commit address from its own key and refuses to pay
one it could not later spend, recomputes the hash of every transaction it
was handed and refuses any that does not match, and shows the exact effects.
Private keys never leave the wallet, and the web application never sees a
seed phrase.

Once you approve, the whole inscription is signed and held here. **You can
close the tab.** The reveal chain broadcasts on its own when the commit
confirms; nothing further is asked of your wallet.

## What you will see at the end

When the final reveal confirms and the indexer records the inscription, the
artifact card resolves from its content-hash placeholder into the real
content and the serial stamp is applied. From that moment the inscription
has an id (the genesis transaction id plus the suffix `i0`), a sequence
number, and an owner: the destination output you chose.

## Batch mode

The Inscribe page has a batch mode for inscribing several files in one
sitting. The rules are the same as single inscribing; the batch only groups
them.

1. A batch holds up to 24 items, each under the same protocol limits.
2. **Every item is its own order.** On prepare, each valid item becomes a
   fully independent commit and reveal order. One failed, rejected, or
   cancelled item never affects the others.
3. **Failure isolation at prepare.** An invalid item gets a typed error in
   its place in the list and no order is created for it; the valid items
   proceed, and item order is preserved.
4. One shared destination covers the batch; any item can carry its own
   override.
5. **One approval per item, in order.** Each item's whole inscription is
   approved at once, and no two items are ever funded from the same output.
   Declining an item cancels only that item and the rest are unaffected.
6. **Totals up front.** Prepare shows the item counts, total network fees,
   and the total you spend, before anything is signed.
7. **Manifest download.** At any point you can download a JSON manifest of
   the batch: per-item content hash, commitment, content type, byte size,
   order id, state, commit and reveal txids, inscription id, and recipient.
   The content itself is never in the manifest.
8. **Resume.** Batches are saved in your browser on this device, so closing
   the tab never loses one.

## What can go wrong, and how to recover

| Situation | What happens | What to do |
| --- | --- | --- |
| You decline the signature | Nothing was signed or broadcast; the order is cancelled | Start again whenever you like |
| The tab closes after you approve | The inscription finishes without you | Reopen Inscribe later to see where it got to |
| The tab closes before you approve | Orders and batches persist in this browser | Reopen Inscribe and resume; the transactions come back from the backend rather than being rebuilt |
| What is broadcast is not what you approved | The order stops rather than continuing | Nothing further is submitted; the page says what landed on chain |
| The indexer is briefly unreachable | The flow pauses on live evidence rather than proceeding blind | Wait for the notice to clear, or use Retry now |

[Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
covers the outage model in full.

## How to verify success

Search your new inscription id, or the destination address, in ZordiScan.
The artifact page shows the genesis transaction, the sequence number, the
content served from chain data, and the owner output. Every fact on it is
checkable against a Zcash node.

## Related

- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
- [Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
- [Zerdinals v1 specification](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/)
