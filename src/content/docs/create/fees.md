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

<!-- IMPLEMENTATION-HANDOFF [WP-DOCS-02]
Dependencies: WP-LAUNCH, WP-MARKET, WP-UI.
1. Document 1500 basis points (15%) on realized primary launch-sale proceeds only after sealed integer-zatoshi allocation and receipt verification pass. State rounding, refund, free-mint and partial-delivery behavior from that verified contract.
2. Keep the existing fixed creation service fee, network fee, postage and any secondary-market fee on separate review lines; the 15% rule must not silently replace them or apply to secondary sales.
3. Compare examples with backend/src/payment/launch-quote.spec.ts and backend/src/creator-launches/allocation.service.spec.ts in zerdinals-and-zrunes; require gross = commission + creator proceeds for the realized sales allocation.
4. Publish only after functional TESTNET settlement and UI review evidence; no mainnet transactions.
-->

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
wallet signs. Any ZEC the operation does not use is returned to your
recipient address, so overpaying an invoice costs nothing but the wait for
its return.

## The launch commission on primary sales

A Creator Launchpad primary sale carries one platform commission: **15% of
the realized primary-sale proceeds**, which is 1,500 basis points of the
gross for the serials actually delivered. It comes out of the sale, so the
buyer pays the price the launch asked and the creator receives the rest.

| A 1 ZEC sale | Amount |
| --- | --- |
| Buyer pays | 1 ZEC |
| Platform commission, 15% | 0.15 ZEC |
| Creator proceeds | 0.85 ZEC |

The commission is computed in whole zatoshis per sealed order, as the
integer floor of the gross multiplied by 1,500 and divided by 10,000. The
creator receives the remainder, so the commission and the creator proceeds
always add back to the gross exactly.

- A free mint has a gross of zero, so it carries no commission and no
  platform output at all. The fixed service fee and the network fees are
  still paid, and once every item has been delivered the launch is recorded
  as settled with no settlement transaction, because nothing is owed.
- Commission is taken only on delivered items. Items that are not delivered
  are refunded in full and carry no commission.

This commission is separate from every other cost on this page. The fixed
0.003 ZEC creation service fee, the network fees under ZIP 317, and the
carrying value that rides on each asset output stay their own lines on the
invoice and are unchanged by it. It never applies to a secondary sale; the
market's own terms are described in
[Buying and selling](/docs-zerdinals-and-zrunes/market/buying-and-selling/).

A paid launch settled exactly this way on public Zcash Testnet on 18
September 2026: two items at 100,000 zatoshis sold for 200,000 zatoshis, of
which 30,000 zatoshis went to the platform and 170,000 zatoshis to the
creator, which is the integer floor of 200,000 times 1,500 divided by 10,000.
The free-launch journey is recorded in the same acceptance record, with its
Testnet run in progress. Undelivered items are covered by deterministic
tests only, because that campaign had no way to force a delivery to fail.
None of this is deployed on Zcash mainnet.

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

- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
- [Etch, mint, transfer ZRunes](/docs-zerdinals-and-zrunes/create/etch-mint-transfer/)
