---
title: The Web Wallet
description: A wallet built into the site with no extension to install. Its keys are created in your browser and kept there, encrypted; it shows its address and balance and asks you to review supported transactions before signing.
---

**Outcome:** you will know what the Web Wallet is, what it holds, what it
can and cannot do, and how to keep it safe.

## What it is

Open **Connect a wallet** and the first entry is **Web Wallet: built into
this browser**. Nothing to install. It creates a Zcash transparent account
in your browser and keeps the keys there.

```text
Create Web Wallet ..... new 24-word recovery phrase, shown once
Import Web Wallet ..... restore one you already have (12 to 24 words)
Connect Web Wallet .... use it as the connected address
View Balance .......... the ZEC its address holds, from the node
Show recovery phrase .. asks for the password, then shows the words
Remove Wallet ......... deletes the browser copy, after a confirmation
```

On a phone, open **More** in the bottom bar: its **Wallet** group opens
Connect a wallet, and once the Web Wallet is connected it shows the
address, **View balance**, **Manage wallet** and **Disconnect**. A phone
cannot install an extension, which is exactly why this wallet is built in.

## Signing and availability

The selected network, the wallet version served by the site and the readiness
of the node and indexer determine which actions are offered. A connected
address alone does not mean that an operation is ready.

| Operation | Availability |
| --- | --- |
| Connect, restore after reload and read a classified transparent balance | Available when the wallet and balance service can answer. |
| Zerdinal inscription or transfer; ZRune deploy, mint or transfer | Supported signing versions open a review and ask for your wallet password. The app must also report the operation ready. |
| Market listing and purchase with the Web Wallet | Test-network signing is under qualification. Mainnet marketplace signing remains unavailable. |
| Direct service-invoice payment or a standalone ZEC send | Unavailable in the Web Wallet. |

Before approving, check the selected network, asset, quantity, recipient,
amount and fees. A wrong password signs nothing; you can correct it or cancel.
Disconnecting or changing wallets invalidates an open review. An unavailable
node, indexer or unverified asset state must leave the operation unavailable.

Test-network marketplace support is not a claim that the deployed marketplace
is ready for real funds. The extension wallet's test results do not establish
the Web Wallet's readiness. Cancelling a listing on this marketplace cannot
revoke copies of a listing signature already shared with someone else.

## Where the keys live

- The recovery phrase is generated from your browser's own random source
  and shown once, in the browser, during setup. Setup does not complete
  until you confirm you have written it down.
- What is stored is the phrase's entropy, encrypted with AES-256-GCM under
  a key derived from your wallet password (PBKDF2, 600,000 rounds). It sits
  in the browser's IndexedDB. The address and public key sit beside it in
  the clear; they are public.
- Nothing secret is ever sent to this site's servers, the indexer, or
  anywhere else. Reading a balance uses only the public address.
- The password is asked for to show the recovery phrase or approve a supported
  signature. Connecting and reading the balance never ask for it.

## Keep it safe

1. **Write down the 24 words**, in order, and keep them offline. They are
   the wallet. A lost password, a cleared browser, a reinstalled machine:
   the words restore the wallet anywhere.
2. **Choose a real password.** It cannot be reset. Without it the browser
   copy is unreadable and you restore from the words.
3. **Import only into a browser you trust.** Importing a phrase puts its
   keys in that browser. Never type your phrase anywhere else on this site,
   and never into a page that asks for it outside the Web Wallet's own
   import form.
4. **Shorter phrases restore, with a warning.** A 12-word phrase carries
   128 bits of entropy; new Web Wallets get 256. ZIP 315 recommends the
   latter, and the import says so.

## Removing it

**Remove Wallet** asks you to confirm, naming the address. It deletes the
encrypted vault and the wallet record from this browser and ends its
session. It does not touch any funds: the same wallet restores anywhere
from its recovery phrase. Orders, watched addresses and other wallets are
untouched. One Web Wallet exists per network; to use a different phrase,
remove the current one first.

## Reading the balance

**View Balance** opens a page that reads the address's unspent outputs
from the configured node and the indexer's verdict on each. It shows:

- the total tracked, and how much of it is clean and spendable;
- how much sits on outputs that carry a Zerdinal or ZRune (spending one
  moves the asset with it);
- how much sits on outputs the indexer has not scanned yet;
- the node height and block hash the figures are true at, and when they
  were read.

A balance the service could not read is shown as unavailable, never as
zero. A real zero says so, with the height it was true at.
