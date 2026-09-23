---
title: Pay with any wallet
description: Create an inscription, etch or mint with an exact ZEC payment from a wallet or exchange that supports the invoice destination.
---

**Outcome:** you will know exactly how a payment-funded order works, what
you are trusting and for how long, and what happens to every zatoshi you
send, including the ones you did not need to.

<!--
IMPLEMENTATION-HANDOFF [LIVE-NOIR-D01] NW11 | F01,F07,F11,F12 | PREPARATION ONLY
Observed: this payment guide still describes recipient-directed automatic refunds,
while product refund-authority.ts binds only a proven original payer and otherwise
returns UNRESOLVED. The public guide also names Universe as a supported payer.
Sources: product82cd9295, official Noir SDK8035db61 and ZIP321; see product
docs/implementation/noir-mainnet-20260923/SOURCE_REGISTER.md.
1. After NW01/NW03, describe Noir as preferred and Web as the second connection
   choice, remove Universe from offered connection/payment instructions, and keep
   manual payment instructions without requiring a wallet connection.
2. After NW08, replace every refund/change/late-payment destination statement with
   the actual qualified policy. Clearly distinguish original payer from delivery
   recipient and disclose unresolved shielded, multi-input and exchange recovery.
3. After NW09/NW10, document only proven Private ZEC and market-invoice operations;
   keep required unfinished functionality in the release gate, not hidden by copy.
4. Publish matching user/developer docs after the accepted application release.
   Verify all links, public routes, exact amounts and mobile instructions against
   the real TESTNET journeys. Run the existing package scripts for build/link
   validation (inspect package.json first); these commands are not yet executed.
Acceptance: no claim of automatic refunds, native compatibility or public release
without matching evidence. Rollback docs with application presentation while
preserving existing recovery instructions. No prose is changed in preparation.
-->
## The whole flow, in one paragraph

You configure the operation, paste the address that should receive the
result, and review the exact operation and exact price. The page then shows
one unique Zcash payment address with a QR code. You send that exact amount
from anywhere that can send transparent ZEC: Universe Wallet, Zodl (formerly Zashi), YWallet,
another wallet, an exchange withdrawal, a shielded wallet paying a
transparent address. Then you can close the page. The server detects the
payment, waits for confirmation, writes the operation onto the chain, and
delivers the result to your recipient address, along with any ZEC the
operation did not use.

Scan and copy do not require a wallet connection. Optional direct payment
opens the selected wallet's approval. Never enter a seed phrase into a
payment page; the only place on this site that takes a recovery phrase is
the [Web Wallet](/docs-zerdinals-and-zrunes/own/web-wallet/) import, which keeps it encrypted in your
own browser and cannot pay an invoice.

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
