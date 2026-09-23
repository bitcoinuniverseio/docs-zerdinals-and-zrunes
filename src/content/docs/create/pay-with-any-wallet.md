---
title: Pay with any wallet
description: Create an inscription, batch, etch, mint or market purchase with an exact ZEC payment, from Noir Wallet in one click or from any wallet or exchange by QR code.
---

**Outcome:** you will know exactly how a payment-funded order works, what
you are trusting and for how long, and what happens to every zatoshi you
send, including the ones you did not need to.

## The whole flow, in one paragraph

You configure the operation, paste the address that should receive the
result, and review the exact operation and exact price. The page then shows
one unique Zcash payment address with a QR code. You pay that exact amount
either in one click from a connected Noir Wallet, or by scanning or copying
the request into any wallet or exchange that can send to a transparent
address. Then you can close the page. The server detects the payment, waits
for confirmation, writes the operation onto the chain, and delivers the
result to your recipient address.

## Choosing how to pay

| Wallet | How it pays an invoice |
| --- | --- |
| **Noir Wallet** (recommended) | Connect it once, then **Pay directly with Noir**. You approve the exact amount in Noir, from your shielded funds (the default) or, if you choose, your transparent funds. |
| **Web Wallet** (built into this site) | Signs Zordinals, ZRUNES and marketplace transactions, but it does not pay invoices. Use one of the other options to pay. |
| **Any other wallet or exchange** | Scan the QR code or copy the address and exact amount. No connection is needed. |

When Noir is connected on the right network, a new invoice opens with Noir
already selected. Choosing another wallet, or paying by QR code, is always
one tap away, and a payment you already started is never moved to another
wallet.

Scan and copy never require a wallet connection. Never enter a seed phrase
into a payment page; the only place on this site that takes a recovery
phrase is the [Web Wallet](/docs-zerdinals-and-zrunes/own/web-wallet/)
import, which keeps it encrypted in your own browser.

## If the wallet says no, or the page loses track

- **You decline in Noir, or close its popup.** Nothing is sent. The page
  says so and you can pay again, or pay by QR code instead.
- **The page cannot tell whether Noir sent the payment** (the connection
  dropped, the tab closed, an answer was lost). The page keeps the original
  payment attempt and says so. Check your wallet's activity. If the payment
  was sent, the order continues when it confirms. Do not pay again; use
  **Check payment again** to refresh.
- **Two tabs, one order.** Only one wallet payment can be in progress for an
  order at a time; the other tab waits.

A wallet transaction reference is only a hint the server watches for. Only
the confirmed payment on the chain moves the order forward.

## What can be paid for this way

- A single Zordinals inscription.
- A batch of inscriptions, from one payment.
- A ZRUNES etch, including the six-confirmation commitment wait, which the
  server carries whether or not your browser is open.
- A ZRUNES mint.
- A purchase from a marketplace listing, where the listing offers it.

Moving something you already own works differently on purpose. Sending a
ZRUNES balance or an existing Zordinal spends outputs that only your own
wallet key can sign, and a payment can never stand in for that signature.
Those flows use a connected signing wallet such as the Web Wallet.

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

## Private ZEC

The **Private ZEC** tab pays to a shielded receiver created for the order
instead of the transparent address. It is offered only where the private
payment service is running for that network; otherwise the tab says it is
unavailable and why, and the transparent invoice above still works from a
shielded wallet.

## What you are trusting, stated plainly

Between your payment and the finished operation, the service controls the
ZEC you sent. This is temporary custody and we do not pretend otherwise:
you send ZEC to a temporary payment address created for this order, and the
service uses that ZEC only to complete this operation or to return it to
the person who paid.

The custody is engineered to be as small as it can be:

- one key and one address per order, never pooled with anyone else's money;
- execution starts automatically once your payment confirms;
- the signing key lives in an isolated service that will only ever sign the
  exact operation your order sealed, or a return to the verified payer.

## Where unused ZEC goes

Unused ZEC and refunds go back to **the address that paid**, minus the
refund network fee. They are never sent to the recipient address by
default, and never to a guessed sender.

The server reads who paid from the first confirmed deposit:

- **Paid from one transparent address** (one input, or several inputs that
  all belong to the same address): that address is the verified payer, and
  returns go there automatically.
- **Paid from shielded funds, an exchange, or several different
  addresses:** the chain does not say who paid. The ZEC is held safely on
  the order's own address instead, and the order page offers **Request a
  refund address**: you sign a short message with a wallet you control
  (Noir Wallet or the Web Wallet) to prove the address, and the request is
  reviewed. Once it is approved, the held ZEC is returned there.

Paying from a single transparent address is the way to get automatic
returns. Paying from Noir's shielded funds keeps where the money came from
private, and returns then go through the request above.

## Underpaid, overpaid, late

- **Underpaid:** the order waits and states exactly how much has confirmed
  and how much is still needed. Send the difference to the same address.
- **Overpaid:** the surplus goes back to the verified payer as described
  above. Overpayment is not revenue and is never kept.
- **After expiry, after cancellation, or after completion:** money arriving
  on the order's address is returned the same way. An expired or finished
  order never executes again.

## If the operation cannot proceed

If the operation cannot safely proceed after payment, your ZEC is returned
to the verified payer minus the necessary refund network fee, or held on
the order's address until a refund address is approved. There is no
service deduction.

## Your recovery link

The order page's address is the way back to your order. The secret part
after the `#` never reaches any server, so only someone holding the exact
link can see the order. Save it before closing the page. The order does not
need the page: everything continues on the server, and the link shows you
where it stands whenever you return.

## Privacy

These operations are transparent Zcash transactions. The payment address,
the amount, the recipient address and the operation's content are public on
the chain, permanently. Paying from shielded funds keeps the source of the
money private; what the operation itself writes is public by nature.
