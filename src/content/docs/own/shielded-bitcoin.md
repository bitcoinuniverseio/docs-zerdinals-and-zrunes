---
title: The Shielded Bitcoin wallet
description: Hold and send private bitcoin-denominated notes on Bitcoin L1. How to create a wallet, receive, pay the network fee, send, follow a transfer, back up, restore and share read-only access.
---

**Outcome:** you will know what the Shielded Bitcoin wallet does, how to use
each section, and what it cannot do yet.

Open **More > Shielded Bitcoin** (or search "bitcoin"). The wallet follows the
app's network selector:

| App network | Shielded Bitcoin network |
| --- | --- |
| Mainnet | Bitcoin mainnet |
| Testnet | Bitcoin Signet (test coins only) |
| Regtest | Lab Signet, Universe's private test chain (for Universe's own testing; not served on zrunes.io) |

:::caution[Deposits are not open yet]
Shielded Bitcoin covers private transfers inside the shielded pool. Moving
bitcoin in or out of the pool is not part of the protocol yet, so on mainnet
there is nothing to send and **Send is unavailable**. You can create a wallet
and a receive address now. Test coins on Signet and the lab chain have no
value.
:::

## Create or restore

**Backup > Create wallet** makes a new wallet in this browser,
encrypted with your password, and shows **24 backup words once**. Write them
down: they are the only way to restore the wallet on another device. **Restore
wallet** takes the 24 words and a new password. **Forget this wallet** deletes
it from this browser only.

The wallet's keys never leave the browser. The site receives only what a
transfer publishes on Bitcoin anyway.

## Receive

**Receive** shows a fresh address and its QR code each time. Every address is
different but all belong to the same wallet, so they cannot be linked to each
other from the outside. A payment becomes spendable 3 blocks after Shielded
Bitcoin accepts it.

## The network fee account

Each transfer is published in an ordinary Bitcoin transaction, which pays an
ordinary Bitcoin fee. The **Network fee account** is a separate plain bitcoin
address inside the wallet that pays those fees. Send a small amount of bitcoin
(on Signet, test coins) to it before your first transfer. Use it only for
fees.

## Send

1. Enter the recipient's Shielded Bitcoin address and the amount in sats.
2. **Review**, then confirm.
3. The wallet makes a zero-knowledge proof in your browser. The first time it
   downloads the proving key (about 270 MB, checked against its published
   hash and kept for later). Proving takes about 10 to 60 seconds.
4. It builds the Bitcoin transaction, checks it, and publishes it.

A transfer spends one or two of the payments you hold. If your balance is
spread over more than two, send to yourself first to combine them.

## Follow a transfer

Submission is not acceptance. The status moves through **In the mempool**,
**In a block**, and **Accepted**, the last one meaning Shielded Bitcoin
checked the proof and recorded the transfer. **Rejected**, **Expired** (not
mined within about 100 blocks) and **Orphaned** (its block left the chain)
return the amount to you; send again.

## Share read-only access

**Share** lets you show activity without giving spending power:

| What you share | What it shows |
| --- | --- |
| **Everything I receive** | Every payment this wallet received; not what it spent |
| **Everything I send** | What this wallet sent; not what it received |
| **One payment** | That one payment: amount, address, block |

None of them can spend. Anyone can paste what they were given into **Check
shared text** to verify it against the published history. The first two cover
your whole history, so share one payment when that is enough.

A wallet restored from an incoming view key shows **Received (view-only)**:
it cannot send and cannot see spends.

See the [protocol page](/docs-zerdinals-and-zrunes/protocols/shielded-bitcoin/)
for how it works.
