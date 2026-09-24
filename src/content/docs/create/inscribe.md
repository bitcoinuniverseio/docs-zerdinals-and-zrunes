---
title: Inscribe a Zerdinal
description: The inscribe wizard, the payment that funds the whole inscription from any Zcash wallet, batch mode, and the advanced connected-wallet path.
---

**Outcome:** you will know the whole inscribe flow, what the payment or the
approval means, and how batches behave, so that when you run it nothing
surprises you.

:::caution[Availability today]
The wizard is always there, so you can prepare a draft at any time. Beside
the submit button the page says whether inscribing is open on this
deployment and what is holding it if not. Inscribing does not wait for the
record to finish reading the chain; it needs the service's own node, an
open payment or signing path, and funding proven free of assets
([why](/docs-zerdinals-and-zrunes/verify/coverage/)). Nothing below is
speculative; it describes the flow as built, and
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
- Enough ZEC for the exact quoted amount, in any wallet or exchange that
  can send transparent ZEC. Nothing needs to be connected to this site.
  [How fees work](/docs-zerdinals-and-zrunes/create/fees/).

## The default path: pay with any wallet

1. **Choose file.** The app reads the bytes, computes the SHA-256 hash, and
   detects the content type from the first bytes of the file, never from the
   extension.
2. **Preview.** Exactly what will go on chain: the content rendered as it
   will be served, the byte size, the detected content type, the content
   hash, and the piece count.
3. **Details.** Confirm the content type that decoders will serve. This
   exact ASCII string becomes part of the on-chain envelope and part of the
   content commitment.
4. **Recipient and pay.** Enter the address that will own the inscription,
   then create the payment request. The order page shows the exact
   operation, the exact price, and one unique payment address; paying it
   from any Zcash wallet or exchange is the whole authorization, and the
   server finishes the inscription on its own.
   [Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
   is the full story of that page.

## The advanced path: connected wallet

With the built-in Web Wallet connected, the page also offers the
connected-wallet path: your own wallet funds the commit and signs
every transaction itself. Its stations continue as Destination, Review, and
Sign and follow, and everything below describes that signing.

## What you are approving on the connected-wallet path

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
seed phrase. (The built-in [Web Wallet](/docs-zerdinals-and-zrunes/own/web-wallet/) keeps its own
keys encrypted in your browser and cannot sign an inscription.)

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

The studio has a batch mode for inscribing several files in one
sitting. The rules are the same as single inscribing; the batch only groups
them.

1. A batch holds up to 24 items, each under the same protocol limits.
2. **Every item is its own order.** Each valid item becomes a fully
   independent commit and reveal order. One failed item never affects the
   others.
3. One shared destination covers the batch; any item can carry its own
   override.
4. **On the payment path, one payment funds the whole batch.** The invoice
   quotes one exact total covering every item and the fan-out that funds
   them; the server then writes each item independently and no two items
   ever draw on the same output. An invalid item is named exactly and no
   invoice is created until the batch is clean, because one payment must
   never quote for items you did not review.
5. **On the connected-wallet path, one approval per item, in order.**
   Declining an item cancels only that item and the rest are unaffected.
6. **Totals up front.** The invoice, or prepare, shows the item counts,
   total network fees, and the total you spend, before anything is paid or
   signed.
7. **Manifest download.** At any point you can download a JSON manifest of
   the batch: per-item content hash, commitment, content type, byte size,
   order id, state, commit and reveal txids, inscription id, and recipient.
   The content itself is never in the manifest.
8. **Resume.** Batches are saved in your browser on this device, so closing
   the tab never loses one.

## Block numbers (ZkMap)

A block number is a Zerdinal whose text is exactly `<height>.zkmap`, and the
first eligible claim completed on chain wins that block. The rules are in the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/); this
section is the mint flow as built, at `/create/zkmap`, with the map at
`/explore/zkmap`. The page says, beside its submit button, whether minting
is open on this deployment. Minting does not wait for the map to finish
reading the chain.

### Picking blocks on the map

The map at `/explore/zkmap` shows blocks in windows of 512 (32 columns by 16
rows), one cell per height, each cell a real verdict from the indexer at its
checkpoint. The window header says which block the reading is as of, and how
many cells in the window are available and claimed. The legend is:

- **Available**: no eligible claim completed up to the checkpoint.
- **Pending**: another claim for the block is waiting to be mined. It has
  not won yet.
- **Unknown**: the map could not vouch for the height right now, usually
  because it is still reading. Unknown is never drawn as available.
- **Claimed**: a winner exists. The list under the map names it.
- **Not mined yet**: the block does not exist yet.
- **Not claimable**: the height cannot be claimed; the block page says why.

Available, Pending and Unknown cells can all be selected, and each keeps its
own label. Selecting a Pending or Unknown block proposes a claim attempt:
nothing is reserved, and another claim may win. Claimed, Not mined yet and
Not claimable cells cannot be selected. If the map cannot be read at all, the
window is drawn as unknown up to the node's current height with a small
retry line, and your selection is kept.

Click a cell to select it, or use the keyboard: the map is a grid,
arrow keys move between cells, Home and End jump to the first and last cell
of the window, and Space or Enter selects the focused cell. A "List of blocks
in this window" disclosure under the map names every cell with its status and
a Select button, for screen readers or anyone who prefers a list. Previous,
Next, Latest and a "Jump to block" field move between windows.

A selection can also be typed: heights and inclusive ranges separated by
commas, spaces or new lines (`0, 7, 100-124`, lower height first). A
selection holds up to 1,000 blocks, persists in your browser across windows
and reloads, and feeds the mint page. Typed heights are added as requested;
whether each one can be attempted is decided by the mint page's
preflight. If the map refreshes and a selected block has been claimed by
someone else, it leaves your selection and the page tells you which ones.

The map cell is a claim status only. It is not the district picture, which
is a separate deterministic drawing of the block's transactions shown on the
block page and on the cards.

### Minting

The mint page at `/create/zkmap` has three stations.

1. **Blocks.** The selection from the map, from the URL
   (`/create/zkmap?heights=...`), or typed here. The first 24 are checked
   as soon as they are listed. Blocks known to be lost (claimed, not mined
   yet, not claimable) are listed with one button to remove them, and
   nothing is sent until they are gone. Blocks with no known status, or with
   another claim pending, can go ahead: the page says that nothing is
   reserved and another claim may win. If the check itself fails, the page
   says so and you can still continue on the same terms.
2. **Recipient and payment.** One transparent address receives every name,
   one inscription each. The same two paths as any inscription apply: pay
   with any wallet, or sign with a connected wallet.
3. **Pay** or **Sign.** One name is a single mint. Two to 24 names are one
   batch request. More than 24 are split by the page into visibly numbered
   chunks of up to 24, each its own request and its own funding, so a
   selection of 1,000 blocks is 42 chunks paid or signed one after another.

On the pay-with-any-wallet path, each chunk produces one invoice: a temporary
payment address and an exact amount, itemized like every other invoice with
the network fees for each inscription plus the same fixed service fee of
0.003 ZEC per invoice as every other creation on this site
([fees](/docs-zerdinals-and-zrunes/create/fees/)). Send the ZEC from any
wallet or exchange. When the payment confirms, the service rechecks every
name and inscribes to your recipient unless a name is by then known to be
claimed; an unknown status does not hold the payment up, and the chain
decides. If a name is known to be claimed by someone else before the payment
is executed, the unspent payment is refunded to the verified payer. Creating
the invoice opens its order page, where payment, delivery and the claim
outcome of each name are followed.

On the connected-wallet path, each chunk is prepared as one order per name,
funded disjointly from the connected address. The page shows the exact miner
fees and postage from the templates, then a per-item list: each name with
its state (Ready to sign, Signing, Signed and broadcast; claim pending) and
its own Sign button, taken in order. A name that is known to be claimed by
then is reported in place and never signed. Declining one name in the wallet cancels
only that name; the others are unaffected. A prepared or signed item has an
Order link to its own order page.

### What success means

Every name is decided on chain, not by the page. A mint order and its claim
have separate outcomes:

- **Pending verification**: the inscription is broadcast or confirming;
  nobody has decided yet. Every mint is an attempt, and its outcome arrives
  later, from the chain.
- **Claim accepted**: the indexer confirmed this inscription won its block.
  The item links to the block page at `/zkmap/<height>`.
- **Lost to an earlier claim**: the inscription completed, but another claim
  for the same block completed earlier in chain order. The inscription was
  still made and is yours; it is an ordinary Zerdinal. The item links to the
  winning claim.
- **Not a valid claim**, **Undone by a reorg**, **Claim status unknown**:
  named as such, with the reason where the indexer gives one.

Only "Claim accepted" beside a complete order is a won block. A complete
order whose claim lost is shown as a loss, never as a success. Availability
on the map is an observation at the indexer's checkpoint, not a reservation,
and nothing here promises that a mint will win.

### Recovery

Orders and batches are saved in this browser under Create, so a reload or a
wallet interruption resumes where it left off and nothing is minted twice.
For an invoice, reopen the order page (the Open the order link, or the saved
order under Create); it shows the payment state, the delivered inscriptions,
and a "Block numbers" section with the accepted, pending and not-won count and
one outcome per name. For a connected-wallet mint, each name's Order link
opens its own order. The claim outcomes are read from the indexer on their
own cadence, separately from the order state, and a refresh that fails shows
the last known outcome rather than a guess.

## What can go wrong, and how to recover

| Situation | What happens | What to do |
| --- | --- | --- |
| You never pay the request | Nothing happens; the request expires on its own | Create a new one whenever you like |
| You decline the signature | Nothing was signed or broadcast; the order is cancelled | Start again whenever you like |
| The tab closes after you pay or approve | The inscription finishes without you | Open your recovery link, or reopen Inscribe, to see where it got to |
| The tab closes before you pay or approve | Orders and batches persist in this browser | Reopen Inscribe and resume; nothing is rebuilt in the page |
| What is broadcast is not what you approved | The order stops rather than continuing | Nothing further is submitted; the page says what landed on chain |
| The indexer is briefly unreachable | The flow pauses on live evidence rather than proceeding blind | Wait for the notice to clear, or use Retry now |

[Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
covers the outage model in full.

## How to verify success

Search your new inscription id, or the destination address, in Scan.
The artifact page shows the genesis transaction, the sequence number, the
content served from chain data, and the owner output. Every fact on it is
checkable against a Zcash node.

## Related

- [Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
- [Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
- [Zerdinals v1 specification](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/)
