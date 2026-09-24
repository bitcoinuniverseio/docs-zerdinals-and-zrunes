---
title: "Creator Launches and Public Launchpad"
description: "Launch a Zordinal collection in three stages, see exactly what a mint costs, and read what a Verified collection proves on Zcash."
---

**You will get from this page:** how a creator launches a Zordinal
collection, what a collector pays and receives, what each collection label
proves, and what happens when something is not delivered.

:::caution[Availability today]
This page describes the launch studio with its 18% terms, native verified
collections, phase access, token campaigns and storefront sales. That
release has not yet finished its public Zcash Testnet acceptance and is not
on Zcash mainnet. The
[status page](/docs-zerdinals-and-zrunes/start/status/) is the authority on
what can complete today.
:::

## Three stages

A launch is built in one studio, in three stages. Launching costs the
creator nothing: no transaction is made until a collector mints, and each
item is inscribed by the order that buys it.

<figure class="zz-figure">
<svg viewBox="0 0 480 204" role="img" aria-labelledby="figure-stages-title" aria-describedby="figure-stages-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-stages-title">The three stages of the launch studio</title>
  <desc id="figure-stages-desc">Three panels in a row joined by arrows. Stage 1, Design: a collection or an edition, from files or layers. Stage 2, Mint settings: price, supply and sale window, allowlist and payouts. Stage 3, Preview and launch: live checks, the fee and your proceeds, then seal and publish. A note underneath says drafts save as you go and launching makes no transaction.</desc>
  <g fill="var(--zz-diagram-muted)" font-family="inherit" font-size="13" letter-spacing="1.3">
    <text x="12" y="20">STAGE 1</text>
    <text x="174" y="20">STAGE 2</text>
    <text x="336" y="20">STAGE 3</text>
  </g>
  <g fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" stroke-width="1">
    <rect x="12" y="32" width="132" height="132" />
    <rect x="174" y="32" width="132" height="132" />
    <rect x="336" y="32" width="132" height="132" />
  </g>
  <rect x="12" y="32" width="3" height="132" fill="var(--zz-diagram-move)" />
  <rect x="174" y="32" width="3" height="132" fill="var(--zz-diagram-move)" />
  <rect x="336" y="32" width="3" height="132" fill="var(--zz-diagram-shielded)" />
  <g font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">
    <text x="26" y="62">Design</text>
    <text x="188" y="62">Mint settings</text>
    <text x="350" y="62">Preview</text>
    <text x="350" y="82">and launch</text>
  </g>
  <g font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">
    <text x="26" y="96">Collection</text>
    <text x="26" y="116">or edition</text>
    <text x="26" y="136">Files or layers</text>
    <text x="188" y="96">Price, supply</text>
    <text x="188" y="116">Sale window</text>
    <text x="188" y="136">Allowlist</text>
    <text x="188" y="156">Payouts</text>
    <text x="350" y="112">Live checks</text>
    <text x="350" y="132">Fee, proceeds</text>
    <text x="350" y="152">Seal, publish</text>
  </g>
  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M146 98 H170" />
    <path d="M163 92 L171 98 L163 104" />
    <path d="M308 98 H332" />
    <path d="M325 92 L333 98 L325 104" />
  </g>
  <text x="12" y="192" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">Drafts save as you go. Launching makes no transaction.</text>
</svg>
<figcaption>Design, Mint settings, Preview and launch. You can move back to an earlier stage at any time before launching.</figcaption>
</figure>

1. **Design.** Choose what you are launching: a collection where every item
   is its own artwork, a collection with a later reveal, or an edition of
   one artwork. Upload one file per item, or compose items from layers in
   the studio.
2. **Mint settings.** Set the supply, the mint price in ZEC, the most each
   wallet may mint, the start and end of the sale, an optional allowlist
   phase before the public mint, and how the proceeds are split. A
   collection (not an edition) can also be made a Verified on-chain
   collection here.
3. **Preview and launch.** The studio runs the same checks the server will
   run, names any problem next to its field, and shows the platform share
   and your proceeds per item. Launching seals the terms: from then on they
   cannot change for anyone who buys under them.

To create, connect a wallet that can sign messages; the Web Wallet can sign
every creator step. The signature proves you are the creator; it never
moves funds. Drafts are kept for each wallet account and network, so
switching either does not mix them up.

**Uploading many files.** Item files go up through upload sessions. One
wallet approval opens the sessions for up to 500 files at once, so a large
collection does not ask for a signature per file. Each file is at most
61,200 bytes, the most one Zordinal can carry. Progress is kept in your
browser: after a refresh, one new approval reopens the unfinished files and
each one resumes where it stopped. A file already finished is never sent
again.

## What a mint costs

The listed mint price already includes the platform share. The platform
share is **18% of each item delivered**. Everything else the collector pays,
network fees and postage, is its own line and is shown before paying.

<figure class="zz-figure">
<svg viewBox="0 0 480 214" role="img" aria-labelledby="figure-fee-title" aria-describedby="figure-fee-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-fee-title">How a 1 ZEC mint price is divided</title>
  <desc id="figure-fee-desc">A bar representing a listed mint price of 1 ZEC. The larger part, 0.82 ZEC, goes to the creator. The smaller part, 0.18 ZEC, is the platform share. Below the bar, a separate dashed box reads: network fees and postage, paid on top, shown before you pay.</desc>
  <text x="12" y="22" font-family="inherit" font-size="15" fill="var(--zz-diagram-muted)">Listed mint price: 1 ZEC</text>
  <rect x="12" y="34" width="374" height="48" fill="var(--zz-diagram-move)" />
  <rect x="386" y="34" width="82" height="48" fill="var(--zz-diagram-shielded)" />
  <g font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">
    <text x="12" y="108">Creator 0.82 ZEC</text>
    <text x="468" y="108" text-anchor="end">Platform 0.18 ZEC</text>
  </g>
  <g font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">
    <text x="12" y="128">82%</text>
    <text x="468" y="128" text-anchor="end">18%</text>
  </g>
  <rect x="12" y="148" width="456" height="52" fill="none" stroke="var(--zz-diagram-rule)" stroke-dasharray="5 4" />
  <text x="28" y="171" font-family="inherit" font-size="15" fill="var(--zz-diagram-ink)">+ Network fees and postage</text>
  <text x="28" y="190" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">Paid on top, shown before you pay</text>
</svg>
<figcaption>The platform share comes out of the mint price, not on top of it. Network fees and postage are added separately and shown at checkout.</figcaption>
</figure>

| One item at 1 ZEC | Amount |
| --- | --- |
| Collector pays the mint price | 1 ZEC |
| Platform share, 18% | 0.18 ZEC |
| Creator receives | 0.82 ZEC |
| Network fees and postage | shown at checkout, separate |

- **Per item, in whole zatoshis.** The share is worked out for each
  delivered item on its own: the item price times 18%, rounded down to the
  zatoshi. The rounding remainder stays with the creator, and the share
  and the creator amount always add back to the price exactly.
- **Nothing on undelivered items.** An item that is not delivered carries
  no share and is refunded in full to the address that paid.
- **Free mints carry no share.** A zero price has nothing to divide.
- **No separate creation fee.** Launch mints do not add the flat 0.003 ZEC
  creation service fee that other paid creation carries. The 18% share is
  the only platform charge on a launch mint.
- **Not a royalty.** The share applies to the first sale only. Later sales
  on the market follow the market's own terms, described in
  [Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/).

Network fees follow ZIP 317 and postage is the small value each item
carries on its own output. Both are explained in
[Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/).

### Launches sealed under earlier terms

Launches sealed before the 18% terms keep the terms they were sealed under:
15% of the delivered sale gross per order, plus the flat creation service
fee. Reservations, invoices and orders already made under them finish
exactly as sealed. New reservations on such a launch are refused until the
creator publishes a new revision, which seals the current terms. Old terms
are never repriced. A launch sealed before any platform share existed
cannot take a new invoice at all, even for a reservation it already holds;
it too needs a new revision.

## Collection labels

Every launch shows one of four labels. Each one says what it rests on.

| Label | What it proves |
| --- | --- |
| **Verified collection** | Each item is a native on-chain member of the collection. The item's own genesis transaction spends the collection parent, and the indexer proves that spend with a membership receipt anyone can check. |
| **Verification pending** | The launch is sealed as a Verified collection, but no item's membership receipt has been proven yet. Sealed terms are a promise, not evidence. |
| **ZRC-721 collection (legacy)** | A ZRC-721 collection under the legacy family rules. Membership follows those rules, not a parent spend. See [ZRC-721 collections](/docs-zerdinals-and-zrunes/understand/collections/#zrc-721-collections). |
| **Unverified collection** | A grouping by this launch only. Nothing on chain ties the items together. |

Unverified is not an accusation; it means no chain proof exists. The four
verification levels are described in
[Collections](/docs-zerdinals-and-zrunes/understand/collections/).

## How a Verified collection mints

A native collection has a parent: one Zordinal that stands for the
collection. An item becomes a member when its genesis transaction spends the
parent and hands it straight back. For a launch to mint members while you
are offline, the parent has to sit with a key that can sign for it at mint
time.

<figure class="zz-figure">
<svg viewBox="0 0 480 262" role="img" aria-labelledby="figure-parent-title" aria-describedby="figure-parent-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-parent-title">One item's genesis transaction in a Verified collection</title>
  <desc id="figure-parent-desc">A transaction with two inputs and two outputs. Input 0 is the item's commit. Input 1 is the collection parent, held by the parent key. Output 0 carries the new item towards the buyer. Output 1 returns the collection parent to the same parent key with the same value. A note says the membership receipt checks exactly this shape.</desc>
  <g fill="var(--zz-diagram-muted)" font-family="inherit" font-size="13" letter-spacing="1.3">
    <text x="12" y="20">INPUTS</text>
    <text x="282" y="20">OUTPUTS</text>
  </g>
  <rect x="190" y="32" width="100" height="172" fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" />
  <text x="240" y="112" text-anchor="middle" font-family="inherit" font-size="15" fill="var(--zz-diagram-ink)">Genesis</text>
  <text x="240" y="132" text-anchor="middle" font-family="inherit" font-size="15" fill="var(--zz-diagram-ink)">transaction</text>
  <g fill="none" stroke-width="1">
    <rect x="12" y="44" width="160" height="58" stroke="var(--zz-diagram-rule)" />
    <rect x="12" y="134" width="160" height="58" stroke="var(--zz-diagram-shielded)" />
    <rect x="308" y="44" width="160" height="58" stroke="var(--zz-diagram-move)" />
    <rect x="308" y="134" width="160" height="58" stroke="var(--zz-diagram-shielded)" />
  </g>
  <g font-family="inherit" font-size="15" fill="var(--zz-diagram-ink)">
    <text x="24" y="68">0 · Item commit</text>
    <text x="24" y="158">1 · The parent</text>
    <text x="320" y="68">0 · The new item</text>
    <text x="320" y="158">1 · Parent back</text>
  </g>
  <g font-family="inherit" font-size="13" fill="var(--zz-diagram-muted)">
    <text x="24" y="88">paid by your mint</text>
    <text x="24" y="178">held by the parent key</text>
    <text x="320" y="88">towards the buyer</text>
    <text x="320" y="178">same key, same value</text>
  </g>
  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M172 73 H188" />
    <path d="M172 163 H188" />
    <path d="M290 73 H306" />
    <path d="M290 163 H306" />
  </g>
  <text x="12" y="236" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">The indexer's membership receipt checks exactly this shape.</text>
</svg>
<figcaption>The parent is spent at input 1 and returned at output 1 in the same transaction, so it never leaves the parent key. The item itself completes at output 0.</figcaption>
</figure>

**Delegated parent custody, said plainly.** When you choose a Verified
collection, you delegate the parent to a dedicated parent key held by the
platform's isolated signer. You either send an existing parent to that key
from your own wallet or create a new parent there, and you add a small
reserve that pays for its eventual return. While it is delegated:

- the signer can spend the parent only inside an item's genesis
  transaction that returns it to the same key with the same value, or to
  send it back to the recovery address you named;
- the parent's value never pays fees, and you set the most members it may
  mint;
- you can ask for the parent back at any time the collection is not in the
  middle of a mint, and it goes only to your recovery address.

This is custody, not a fully self-held setup. Delegating is its own step,
signed by the creator's wallet. If you would rather keep the parent in your
own wallet, launch as an Unverified collection.

**In the studio.** Tick **Verified on-chain collection** in Mint settings,
then name an existing parent or ask for a new one, and the recovery address
it returns to. The studio shows who holds the parent before you sign. When
you launch, it shows the parent key address to send the parent to and
waits until the parent has arrived before the launch completes. The owner
page of a live launch has **Return parent to me**. A Verified launch reads
**Verification pending** until the first member's membership is proven.
The label on a launch always reflects its sealed terms and chain evidence,
never a request.

Each item counts as delivered for a Verified collection only when both its
delivery and its membership receipt match the sealed terms. If membership
cannot be proven after an item is inscribed, the buyer still owns the item;
the order is held for review rather than refunded. Returning the parent
waits while an invoice of the collection is still open or a paid order has
not yet planned its items. A paid order that has not started minting when
the parent is gone anyway cannot mint a member any more, so its payment
goes back to the address that paid instead of waiting.

## Who can mint in each phase

A launch sells in phases, each with its own window, price and most per
wallet. Each phase also has one access mode. The server decides access
when it takes a reservation, against its own clock and the chain, so a
browser countdown or a copied page cannot bypass it. A phase whose access
cannot be checked is refused with a reason; it is never opened to everyone
instead.

| Access mode | Who can mint |
| --- | --- |
| **Public** | anyone |
| **Allowlist** | listed addresses, each up to its own allocation |
| **Holders** | addresses that hold an asset the creator names |
| **Signed code** | anyone presenting a code the creator signed |

**Allowlists.** In the studio, an allowlist phase before the public mint
takes the Merkle root of your list. On the project's phases page, while a
revision is not yet sealed, you can instead paste or load the list itself
as lines of `address` or `address,allocation`: invalid lines, repeats and
conflicting allocations are shown for you to fix before anything is sent,
and the page then shows the list's root and count. Once a revision is
sealed its list is fixed; a new revision can carry a new one. You can
download your list at any time. The sealed terms carry only the root, and
each collector receives only the proof for their own address and
allocation, so the whole list is never published.

**Holders.** A holder phase admits a minting address that holds one of:

- at least a number of Zordinals that are native members of a collection
  (named by its parent inscription);
- at least a number of items of a ZRC-721 collection (named by its
  collection key);
- at least an amount of one ZRune (named by its id).

The check reads what rides on the minting address's own unspent outputs,
as indexed up to a block that the platform's own node confirms. A ZRC-20
balance cannot be used: it is an account total with no output that
carries it, so it cannot be tied to such a block. If the evidence cannot
be read, the reservation is refused as unavailable, not as "you do not
hold it". Public and allowlist phases never wait on this.

**Signed codes.** For a signed-code phase, the creator signs access codes
on the project's phases page. Each code is a message your wallet signs, never a
transaction, and no server call is needed to make one. A code can be
limited to one minting address, and it admits one reservation or, when you
set a total quantity, reservations up to that total. It is shared as one
line starting with `zlac1.`; the collector pastes it on the mint page, and
the server checks the creator's signature and counts its use when the
collector reserves. An unpaid reservation that expires gives its quantity
back. A new revision has new phases, so codes signed for an earlier
revision do not work in it.

Holder and signed-code phases are added from the project's phases page
before its revision is sealed; the three-stage studio itself sets the
allowlist and public phases.

## Editions and reveals

**Editions.** A launch can sell numbered editions of one artwork instead of
a set of different items. An open edition has no fixed supply; a limited
edition stops at the number you set. Either way the sale window bounds it:
minting closes when the window ends, whatever the count.

**Delayed reveal.** You can publish item names and traits after the mint.
When the launch is sealed you commit to the reveal; publishing later must
match that commitment exactly, so the names and traits cannot be swapped.
The artwork is not hidden: an inscribed item's bytes are public on chain
from the moment it is minted, and a reveal only publishes the presentation
and metadata.

## Pause, resume and new revisions

You can pause a live launch and resume it. Pausing stops new reservations;
orders already paid continue to delivery or refund. To change anything a
buyer relies on, such as the price, the supply or the artwork, create a new
revision. A new revision is sealed on its own and never alters one that has
already sold. A new revision of a collection can take over items of the
earlier one that were never reserved; an item that was ever held or sold
stays with the revision that sold it.

## What a collector sees

A collector connects a wallet that can sign for the minting address,
reserves, and pays one invoice. Before paying they see the mint price, the
platform share included in it, the creator's part, the network fees and
postage, the total, the recipient and the refund rule.

- **Web Wallet.** It signs the reservation and the invoice request, but it
  does not pay invoices. Pay the invoice from any Zcash wallet with its QR
  code or payment link.
- **Noir.** A connected Noir wallet can pay the invoice directly.
- **Any other Zcash wallet** pays by QR code or payment link. The invoice
  needs no connected wallet to be paid.

On a signed-code phase the mint page asks for the code before you reserve.
On a holder phase it shows what you were found to hold and at which block.

<figure class="zz-figure">
<svg viewBox="0 0 480 150" role="img" aria-labelledby="figure-mint-title" aria-describedby="figure-mint-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-mint-title">The steps a collector sees during a mint</title>
  <desc id="figure-mint-desc">Six steps in two rows. Reserved, invoice, payment seen. Then payment confirmed, inscribing, delivered. After delivery the creator is paid and the order is complete. Any item not delivered is refunded in full to the address that paid.</desc>
  <g fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" stroke-width="1">
    <rect x="12" y="12" width="140" height="40" />
    <rect x="170" y="12" width="140" height="40" />
    <rect x="328" y="12" width="140" height="40" />
    <rect x="12" y="72" width="140" height="40" />
    <rect x="170" y="72" width="140" height="40" />
  </g>
  <rect x="328" y="72" width="140" height="40" fill="none" stroke="var(--zz-diagram-move)" stroke-width="1.5" />
  <g font-family="inherit" font-size="14" fill="var(--zz-diagram-ink)">
    <text x="24" y="37">1 · Reserved</text>
    <text x="182" y="37">2 · Invoice</text>
    <text x="340" y="37">3 · Payment seen</text>
    <text x="24" y="97">4 · Confirmed</text>
    <text x="182" y="97">5 · Inscribing</text>
    <text x="340" y="97">6 · Delivered</text>
  </g>
  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M152 32 H168" />
    <path d="M310 32 H326" />
    <path d="M152 92 H168" />
    <path d="M310 92 H326" />
  </g>
  <text x="12" y="138" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">Then the creator is paid. Anything not delivered is refunded in full.</text>
</svg>
<figcaption>The order page follows the real chain states. A refund or a hold is shown as its own state, never as progress towards delivery.</figcaption>
</figure>

**Refunds.** Any item that is not delivered is refunded in full to the
address that paid, with no platform share taken. An invoice that expires
unpaid charges nothing. If the paying address cannot be established, the
refund is held with its funds preserved until it can be resolved; it is
never sent to a guessed address. A changed chain receipt after a
reorganization resumes checking the same item; it does not allocate a
replacement or charge twice.

**Large items.** An item larger than 960 bytes does not fit in one reveal
transaction, so it is inscribed across several; the largest item, 61,200
bytes, needs 64. The Zordinal is complete, and the item counts as
delivered, on the reveal that carries its last piece. Earlier builds looked
for delivery on the first reveal, so such orders stayed waiting; this
release checks the completing reveal.

## Launch types

A launch type can take payment only when a qualified producer and its
delivery checks exist for it. A type without one is listed as discovery
only and refused when its terms are sealed; it is never sold through
another type's producer in its place.

| Launch type | Today |
| --- | --- |
| One-of-one, fixed collection, delayed reveal | payable mints |
| Limited edition | payable mints, up to the edition size |
| Open edition | payable mints inside a sale window that has an end |
| Mint on demand | sold exactly like an open edition, inside a sale window that has an end |
| ZRC-721 collection campaign | payable mints of one accepted ZRC-721 collection, with the legacy label |
| ZRC-20 deploy-and-mint campaign | payable mints of one deployed ZRC-20 token, described below |
| ZRune campaign | payable public mints of one etched ZRune, once ZRunes are active on the network, described below |
| Pre-inscribed inventory | sold as market listings the creator signs, under market terms |
| Airdrop | not a sale: the creator's wallet signs each transfer |
| NFPT drop | discovery only |

**NFPT drops stay discovery only.** An NFPT drop is shielded. There is no
qualified authority that can create one and prove its delivery, so an NFPT
launch cannot be sealed or sold.

What you can do with an item afterwards depends on its protocol, not on the
launchpad: explore, transfer, list and buy are answered per protocol, and a
capability that is unavailable names its blocker. ZRC-721 items are
described in
[Collections](/docs-zerdinals-and-zrunes/understand/collections/#zrc-721-collections)
and their market actions in
[Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/#nfts).

## Token campaigns

A token campaign sells mints of a token that already exists. The creator
never uploads bytes for it: the platform writes each mint from the token's
indexed record. Each sold mint is its own item under the same 18% terms,
and a mint the protocol does not count is refunded whole.

**ZRC-20 deploy-and-mint campaign.** The creator names a ZRC-20 deploy, the
reading its mints are sold under (`zord` or `zecscriptions`) and the
amount each mint credits. The amount must be one the reading credits: at
most the deploy's per-mint limit under `zord`, exactly that limit under
`zecscriptions`. The campaign seals only when all of its mints fit in the
supply that reading still has, and each reservation checks the remaining
supply again, counting this campaign's mints not yet credited. If the
reading cannot answer at that moment, the reservation goes ahead: indexing
never blocks a mint. A mint counts as delivered only when the chosen
reading credits the sealed amount to the buyer, in the block the
inscription landed in. If the reading rejects the mint, for example
because another minter used up the supply first, the item is refunded
whole with no platform share.

**ZRune campaign.** The creator sells public mints of a ZRune they etched:
the etching transaction must have paid the creator's own address. The
ZRune's mint terms must be open: it has a per-mint amount and a cap, fewer
than the cap have been minted, and its mint window has not ended. Each item
is one mint transaction, paid from the buyer's order, that gives the buyer
the ZRune's per-mint amount. The public cap is shared with everyone else on
the network, so the launch sells at most its own supply, never more than
the mints left when it was sealed, and checks the live record again when
the invoice is made. ZRune campaigns can be sold only once ZRunes are
active on the network; before that they are discovery only. A mint counts
as delivered only when the indexer's allocation receipt for that
transaction shows the units at the buyer's output. A mint the chain counted
for nothing is refunded whole with no platform share.

## Inventory and airdrops

**Pre-inscribed inventory.** The creator registers Zordinals they already
hold and lists each one through the market with a listing their wallet
signs. Buyers purchase through the market. Nothing is minted, so the 18%
launch share does not apply: each sale pays the market fee sealed into its
listing.

**Airdrops.** An airdrop gives registered inventory away. The creator
enters the recipients, one item each; the platform prepares the transfers
in chunks, and the creator's wallet signs each one. There is no payment and
no platform fee: the creator's wallet pays each transfer's network fee. A
campaign can be paused and resumed, and every recipient shows its status.

## Storefronts and embeds

A creator's storefront, and the storefront widget embedded on another
site, list the creator's collections that are minting now, with each one's
current phase, its price per item, the platform share included in it and
what the creator receives. An embedded widget opens the mint page in a new
tab. Minting from there opens the same mint page with the same
server quote: the 18% share and every amount are exactly what the
collection page shows. When the invoice is created, it is credited to the
storefront you came from, which counts it in that storefront's analytics.
Crediting never
changes the price and pays the storefront nothing. If the credit cannot be
recorded, the invoice still stands at the same price.

## Earlier Testnet evidence

A paid launch settled under the earlier 15% terms on public Zcash Testnet on
18 September 2026: 200,000 zatoshis of sales paid 30,000 zatoshis to the
platform and 170,000 zatoshis to the creator in one settlement transaction.
That record covers those terms only. The launch release this page
describes, with its 18% terms, Verified collections, phase access, token
campaigns and storefront sales, has its own Testnet acceptance still to
complete, and none of it is deployed on Zcash mainnet.

## Related

- [Fees and confirmation](/docs-zerdinals-and-zrunes/create/fees/)
- [Collections](/docs-zerdinals-and-zrunes/understand/collections/)
- [Collections v1 specification](/docs-zerdinals-and-zrunes/protocols/collections-v1/)
- [Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/)
