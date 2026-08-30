---
title: Pay with any wallet
description: Create an inscription, etch or mint with one exact ZEC payment from any Zcash wallet or exchange. No connection, no extension, no signature in the browser.
---

**Outcome:** you will know exactly how a payment-funded order works, what
you are trusting and for how long, and what happens to every zatoshi you
send, including the ones you did not need to.

## The whole flow, in one paragraph

You configure the operation, paste the address that should receive the
result, and review the exact operation and exact price. The page then shows
one unique Zcash payment address with a QR code. You send that exact amount
from anywhere that can send transparent ZEC: Universe Wallet, Zashi, YWallet,
another wallet, an exchange withdrawal, a shielded wallet paying a
transparent address. Then you can close the page. The server detects the
payment, waits for confirmation, writes the operation onto the chain, and
delivers the result to your recipient address, along with any ZEC the
operation did not use.

No wallet connection is required. No browser extension, no account, no login,
no seed phrase, and no signature is ever asked of your browser.

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
under Zcash's fee rules, not estimated.

## What you are trusting, stated plainly

Between your payment and the finished operation, the service controls the
ZEC you sent. This is temporary custody and we do not pretend otherwise:
you send ZEC to a temporary payment address created for this order, and the
service uses that ZEC only to complete this operation or return it to your
recipient address.

The custody is engineered to be as small as it can be:

- one key and one address per order, never pooled with anyone else's money;
- execution starts automatically once your payment confirms;
- an order that cannot proceed refunds automatically;
- the signing key lives in an isolated service that will only ever sign the
  exact operation your order sealed, or a refund to your recipient.

## Underpaid, overpaid, late

- **Underpaid:** the order waits and states exactly how much has confirmed
  and how much is still needed. Send the difference to the same address.
  Sending in several transactions is fine; the requirement is restated
  precisely if extra payment inputs change the fee.
- **Overpaid:** the surplus is returned to your recipient address with the
  operation itself. Overpayment is not revenue and is never kept.
- **After expiry, after cancellation, or after completion:** money arriving
  on the order's address is refunded to your recipient address. An expired
  or finished order never executes again.

## If the operation cannot proceed

If the operation cannot safely proceed after payment, your ZEC is returned
to the recipient address minus the necessary refund network fee. That is
the whole policy. There is no service deduction, and refunds go to the
recipient address you supplied, never to a guessed sender: payments can come
from exchanges and shielded wallets, where the sending address is not a
place money can safely return to.

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
should stay private; what the operation itself writes is public by nature.
