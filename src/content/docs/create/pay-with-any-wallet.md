---
title: Pay with any wallet
description: Create an inscription, etch or mint with an exact ZEC payment from a wallet or exchange that supports the invoice destination.
---

**Outcome:** you will know exactly how a payment-funded order works, what
you are trusting and for how long, and what happens to every zatoshi you
send, including the ones you did not need to.

## The whole flow, in one paragraph

You configure the operation, paste the address that should receive the
result, and review the exact operation and exact price. The page then shows
one unique Zcash payment address with a QR code. You send that exact amount
from anywhere that can send transparent ZEC: Noir Wallet, Zodl (formerly Zashi), YWallet,
another wallet, an exchange withdrawal, a shielded wallet paying a
transparent address. Then you can close the page. The server detects the
payment, waits for confirmation, writes the operation onto the chain, and
delivers the result to your recipient address. ZEC the operation did not
use goes back to the address that paid, as described below.

Scan and copy do not require a wallet connection. Optional direct payment
opens the selected wallet's approval. Never enter a seed phrase into a
payment page; the only place on this site that takes a recovery phrase is
the [Web Wallet](/docs-zerdinals-and-zrunes/own/web-wallet/) import, which keeps it encrypted in your
own browser and cannot pay an invoice.

## Choosing a wallet

**Choose wallet** on the payment page opens the full list of Zcash wallets,
grouped by how each one pays: directly from this page, by opening the
wallet, or by scanning or copying. Choosing one only opens its payment
view. Nothing is connected, signed or sent until you approve the exact
amount and address in the wallet itself.

**Noir Wallet** is the one wallet that pays an invoice directly from this
page. It sends ordinary ZEC and asks which funds to pay from: shielded, or
transparent, which makes your sending address public. It cannot sign
Zerdinals or ZRunes transactions. The **Web Wallet** signs those, but it
does not pay invoices; use scan or copy with another wallet instead.
Universe Wallet is no longer offered. An order it already paid is still
followed to the end, and a new payment for it goes through the QR code or
the copy controls.

## Payment recovery candidate

The unreleased September 2026 repair keeps the original payment attempt
when the wallet response is lost or the account changes after sending.
Reopen the same order and check its status before considering another
payment. A wallet transaction reference is a hint for observation; only
verified payment and delivery receipts complete the order.

Noir ordinary ZEC payment uses its documented decimal amount and an explicit
funding source. Transparent funding requires a separate choice; it is not
an automatic fallback when private funds or available balance are unknown.
Ordinary payment support does not establish custom market signing.

Choose a wallet for the specific destination and operation. Nozy blocks
transparent recipients. Brave's documented shielded desktop support does
not qualify every payment or signing operation. Zodl is the renamed Zashi.
Cachet's current ZSA evidence is for testnet, not ZSA mainnet availability.
The chooser distinguishes documented support from locally qualified native
behavior. Native and browser validation of this repair remains pending.

## What can be paid for this way

- A single Zerdinal inscription.
- A batch of inscriptions, from one payment.
- A ZRune etch, including the six-confirmation commitment wait, which the
  server carries whether or not your browser is open.
- A ZRune mint.

Moving something you already own works differently on purpose. Sending a
ZRune balance or an existing Zerdinal spends outputs that only your own
wallet key can sign, and a payment can never stand in for that signature.
Those flows use the connected wallet, honestly labeled as such.

## The payment request

Every order gets its own temporary transparent address, created for that
order and never shown to anyone else or used again. The page shows:

- the exact amount, in ZEC and in zatoshis;
- the address, with one-press copy;
- a QR code of the standard payment request (ZIP-321), which most Zcash
  wallets scan directly;
- when the request expires, and what happens if you never pay: nothing.

Send the exact amount in one transaction and nothing more is asked of you.
The amount is computed from the actual transactions the operation needs
under Zcash's fee rules, not estimated, plus one fixed service fee of
0.003 ZEC (300,000 zatoshis) per invoice, itemized on the page.

## What you are trusting, stated plainly

Between your payment and the finished operation, the service controls the
ZEC you sent. This is temporary custody and we do not pretend otherwise:
you send ZEC to a temporary payment address created for this order, and the
service uses that ZEC only to complete this operation or return it to the
address that paid.

The custody is engineered to be as small as it can be:

- one key and one address per order, never pooled with anyone else's money;
- execution starts automatically once your payment confirms;
- an order that cannot proceed refunds automatically to the verified payer;
- the signing key lives in an isolated service that will only ever sign the
  exact operation your order sealed, or a refund to the payer it verified
  from your first deposit.

## Underpaid, overpaid, late

- **Underpaid:** the order waits and states exactly how much has confirmed
  and how much is still needed. Send the difference to the same address.
  Sending in several transactions is fine; the requirement is restated
  precisely if extra payment inputs change the fee.
- **Overpaid:** the surplus is returned to the address that paid.
  Overpayment is not revenue and is never kept.
- **After expiry, after cancellation, or after completion:** money arriving
  on the order's address is returned to the address that paid. An expired
  or finished order never executes again.

## If the operation cannot proceed

If the operation cannot safely proceed after payment, your ZEC is returned
to the address that funded the invoice, minus the necessary refund network
fee. There is no service deduction, and a refund is never sent to the
recipient address: the person who receives the result is not always the
person who paid.

The paying address is verified from your first deposit, and it can only be
verified when that transaction spends a single input from an ordinary
transparent address. A payment from a shielded wallet, or one that spends
several inputs, as exchange withdrawals often do, has no single provable
payer and cannot be refunded automatically.
Its ZEC is then held on the order's own address, never sent anywhere else,
and the order page says what is needed to release it. Pay from a single
transparent address if an automatic refund matters to you.

## Your recovery link

The order page's address is the way back to your order. The secret part
after the `#` never reaches any server, so only someone holding the exact
link can see the order. Save it before closing the page. The order does not
need the page: everything continues on the server, and the link shows you
where it stands whenever you return.

## Privacy

These operations are transparent Zcash transactions. The payment address,
the amount, the recipient address and the operation's content are public on
the chain, permanently. Pay from a shielded wallet if the source of funds
should stay private, knowing that such a payment cannot be refunded
automatically; what the operation itself writes is public by nature.
