---
title: Fees and confirmation
description: "ZIP 317 conventional fees, what each operation costs in logical actions, what confirmation means for each flow, and why a fee stays public even on a shielded transaction."
---

**Outcome:** you will be able to predict the fee for any operation before
the product shows it, and know why the shown fee is a floor rather than an
estimate.

## The fee rule

Zcash fees follow ZIP 317, the network's conventional fee rule: **5,000
zatoshis per logical action**, computed from the actual shape of each
transaction. The network relays nothing below this fee, so it is a floor,
not a suggestion, and there is no fee market to time.

Typical shapes:

| Operation | Logical actions | Conventional fee |
| --- | --- | --- |
| Simple send | 2 | 10,000 zatoshis |
| ZRune mint (single input) | about 4 to 5 | 20,000 to 25,000 zatoshis |
| Full 4-piece inscription reveal | about 8 | 40,000 zatoshis |

The large reveal input raises the reveal cost; a ZRune data output adds
about 3 logical actions for a full 79-byte payload.

## What the product shows before you pay or sign

Every flow shows the complete fee display before anything is paid or
signed: the network fee, the value that carries the asset, the total in ZEC
and in zatoshis. There are no fee surprises after approval, because the
transactions are fully planned before the first payment or signature.

On the payment path, the invoice amount is exactly these figures added up:
the carrying value, the commit fee, the reveal fees, for a batch the
fan-out fee that splits one payment per item, and one fixed service fee of
**0.003 ZEC (300,000 zatoshis)** per invoice. The service fee is the same
for a single inscription, a batch, an etch or a mint, it is shown as its
own line on the invoice, and it never applies to a transfer, which your own
wallet signs, or to a launch mint, which carries the platform share below
instead. Any ZEC the operation does not use goes back to the address
that paid, never to the recipient address by default
([where unused ZEC goes](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/#where-unused-zec-goes)),
so overpaying an invoice costs nothing but the wait for its return.

## The platform share on launch mints

A Creator Launchpad mint carries one platform charge: an **18% platform
share of each item delivered**, included in the listed mint price. The
buyer pays the price the launch asked, and the creator receives the rest.

| One item at 1 ZEC | Amount |
| --- | --- |
| Buyer pays the mint price | 1 ZEC |
| Platform share, 18% | 0.18 ZEC |
| Creator proceeds | 0.82 ZEC |

The share is computed in whole zatoshis for each delivered item on its own,
as the integer floor of the item price multiplied by 1,800 and divided by
10,000. The creator receives the remainder, so the share and the creator
proceeds always add back to the price exactly.

- Launch mints do not carry the fixed 0.003 ZEC creation service fee. The
  network fees and the carrying value of each item remain their own lines
  on the invoice.
- A free mint has nothing to divide, so it carries no share and no
  platform output at all. Once every item has been delivered the launch is
  recorded as settled with no settlement transaction, because nothing is
  owed.
- The share is taken only on delivered items. Items that are not delivered
  are refunded in full to the address that paid and carry no share.
- The share applies to the first sale only. It never applies to a
  secondary sale; the market's own terms are described in
  [Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/).

Launches sealed before these terms keep the terms they were sealed under: a
15% commission computed once per sealed order on the delivered gross, plus
the fixed creation service fee. Paid orders under them settle exactly as
sealed; new sales on such a launch need a new revision, which seals the
current terms. A paid launch settled under those earlier terms on public
Zcash Testnet on 18 September 2026: 200,000 zatoshis of sales paid 30,000
zatoshis to the platform and 170,000 zatoshis to the creator. The 18% terms
were accepted on public Zcash Testnet on 24 September 2026; the
[status page](/docs-zerdinals-and-zrunes/start/status/) shows what is
available on each network today. The whole launch journey is described in
[Creator Launches and Public Launchpad](/docs-zerdinals-and-zrunes/protocols/creator-launches/).

## Confirmation

A transaction is final when it is mined into a block; deeper confirmation
makes reorganization vanishingly unlikely. Two places where confirmation
depth matters in these protocols:

1. **Etch commitments** must be at least 6 blocks old before the etch that
   uses them is valid.
2. **Sequence numbers** for fresh inscriptions are stable only after
   confirmation depth; a just-confirmed inscription displays its
   provisional nature honestly.

The product tracks orders through real chain states, so you watch the
commit confirm, then each reveal, rather than a spinner.

## What can go wrong

| Situation | What happens | What to do |
| --- | --- | --- |
| The fee display shows more than you expected | The transaction shape (pieces, inputs, data output) drives the count | Check the piece count in Preview; smaller content costs less |
| A chain reorganization touches your transaction | The indexer recomputes deterministically from the surviving chain | Wait for the order timeline to settle; nothing needs your action |

## Related

- [Inscribe a Zordinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Etch, mint, transfer ZRunes](/docs-zerdinals-and-zrunes/create/etch-mint-transfer/)
