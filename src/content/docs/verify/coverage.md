---
title: What an empty result means
description: "The four situations behind an empty page, why the product never blurs them together, why creating does not wait for the chain to be read, and how each output is checked before it is spent."
---

**Outcome:** you will be able to read any empty page or missing record
correctly, and you will know why minting and inscribing keep working while
the record is still incomplete.

## Why this needs a page

The indexer reads the Zcash chain from the beginning before it can list
what is on it, and that takes time. While it does, a section with nothing in
it is not a statement that nothing exists: the records may sit in blocks it
has not reached yet. Most explorers blur this into a generic empty state.
This one never does.

## The four situations

<!-- IMPLEMENTATION-HANDOFF [REC-DOCS-01] @REC-DOCS-01-A01
Coverage: REC-READ-TRUTH, REC-EMPTY-RESULT, REC-CREATION-AVAILABILITY.
Finding: R-DOCS-01. Preparation only; rendered copy is unchanged. Functional status: NOT TESTED.
Verified source: this page explains chain reading but does not explicitly separate contiguous
scan coverage from current parser/projection replay qualification. The indexer's
protocolQualificationComplete and coverageFreshness do separate those facts.
Governing reference: index-zcash-metaprotocols at 009679b0e25a586ca64fedd9a44302244d2e2946,
src/chain/protocol-qualification.mjs and src/api/zkmap.mjs; product ZERDINALS-V1 section 14.1.
Prerequisites: REC-HEALTH-01, REC-API-01, REC-UI-01, REC-VERIFY-01.
1. In implementation, explain that an up-to-date checkpoint and a successful readiness
   response do not by themselves qualify historical protocol reads. Empty results require
   the route's complete, qualified and fresh chain context; unknown stays unknown.
2. Keep draft ZkMap observations, strict availability, and accepted claim receipts distinct.
   A missing claim during incomplete replay must never become available or a valid receipt.
   A qualified older output range may prove only that range under its recorded floor/hash.
3. Keep the existing creating, network-selector, wallet and recovery guidance. Do not add
   global replay admission gates or public header/account coverage banners. Explain delayed
   receipt verification separately from signed/submitted/confirmed order progress.
4. Reconcile the coverage field names below with the verified REC-HEALTH-01 response schema,
   and update status documentation only from time-bound evidence for the serving revision.
   Never copy an archival success or height into a current claim.
5. Verify in this documentation repository: npm test; npm run build.
   REC-VERIFY-01 must also execute the indexer tests coverage-freshness.test.mjs,
   protocol-qualification.test.mjs and zkmap-routes.test.mjs, then the real native Zcash
   Testnet product journeys. Include empty, stale, unqualified, unavailable and accepted
   outcomes, with persistence after refresh/reconnect. These tests are not executed here.
Rollback: no schema or protocol migration is authorized by this comment. Retain historical
observations and funded-order recovery; reverse any later inaccurate prose without falsifying
the recorded qualification state.Status 2026-10-09 (REC-DOCS-01 implementation): items 1 to 3 are now covered by the
rendered sections below, and the field names come from the indexer API source on branch
impl/replay-recovery-20261009. Kept open because REC-HEALTH-01 acceptance, a time-bound status
refresh for the serving revision (item 4) and the REC-VERIFY-01 indexer and native Testnet
runs (item 5) have not happened yet.
-->

1. **The chain is still being read.** The result says so where it appears,
   instead of reporting a count. Absence here means nothing at all, and no
   page turns it into a zero: a count of Zordinals, ZRunes, collections or
   activity is shown only when it can be right.
2. **No records yet.** Shown only once the whole chain has been read and
   replayed under the current rules
   ([what that takes](#read-is-not-the-same-as-qualified)). This is a real,
   checkable statement that nothing of that kind exists.
3. **Indexer unreachable.** The service could not be reached, so nothing
   can be said either way. Nothing is hidden or lost.
   [The outage model](/docs-zerdinals-and-zrunes/own/recovery/).
4. **Data is stale.** The last known values are still shown, labeled, with
   the time they were last confirmed.

There is no site-wide reading badge in the header or the account panel. The
answer sits on the result it applies to, and the network selector and wallet
controls stay where they always were.

## Read is not the same as qualified

Two different facts sit behind every answer, and an empty result needs both:

- **Scanned:** the indexer has stored every block from the first one it is
  required to read up to its current checkpoint.
- **Qualified:** the exact indexer release that is serving you replayed
  those blocks itself, without a gap, under the exact rules and settings it
  runs now.

On mainnet the required start is block 0, the first block of the chain. The
record is qualified only when all seven readings below were replayed from
block 0 to the exact current checkpoint, block hash included:

| Reading | Rule set |
| --- | --- |
| Zordinals | `universe-zerdinals-v1` |
| Collections | `collections-v1` |
| ZRunes | `zrunes-v1` (no ZRune can exist before block 3,470,000) |
| ZRC-721 | `zrc721-v1` |
| ZRC-20, zord reading | `zord` |
| ZRC-20, Zecscriptions reading | `zecscriptions` |
| ZkMap | `zkmap-v1` |

A replay that started late stays unqualified, however far it gets. Catching
up to the newest block extends it forward; it never fills in the blocks it
skipped at the start. A new indexer release whose reading code or settings
changed also starts unqualified, and has to replay from block 0 again.

:::note[Signals that are not qualification]
Each of these can be true while the record is still unqualified:

- the checkpoint has reached the newest block on the network;
- `https://zrunes.io/api/ready` answers that the service is up;
- the scanner reports the block range as complete;
- a code comment, a release note or an older test report says the release
  passed.

Only the indexer's own `protocolQualified` answer, for the release that is
serving, settles it.
:::

### Strict and draft answers

Most answers are **strict**: they are given only from qualified, current
history. When that history is missing, a strict answer does not guess. It
returns a typed **unavailable** answer that names the reason, for example
`replay_incomplete`, and the product shows that the record cannot answer yet.
An unavailable answer is never an empty list and never "nothing here".

A few views, such as the ZkMap block map, can also be read as a **draft**.
A draft shows what the service can already see: a block claimed under a
checkpoint the node confirms, a claim waiting in the mempool, and otherwise
unknown. A draft never marks a block free to claim and never stands in for an
accepted claim receipt. Only a strict answer can do that.

Qualification does not decide whether you can create. Inscribing, etching,
minting and ZkMap claims keep the rules in the next section; a receipt that
needs qualified history arrives once the record can vouch for it.

## Creating does not wait for the reading

Reading the record and writing to the chain are separate jobs. An
inscription, a batch, a ZRune etch or mint and a ZkMap claim are built from
the service's own Zcash node, not from how far the record has read. Each one
checks only what that transaction needs:

- the node is on the right network and reports a usable chain height;
- the node publishes the rules the next block is signed under;
- for ZRunes, the node's height has reached the activation block;
- the path you chose is open: your connected wallet release, or the
  service's own signer and payment watcher;
- every coin it spends is proven free of assets, one output at a time.

While the record is incomplete, a result you create may take a while to appear
on its pages. That is the reading, not the order. Sending, listing and buying
still wait for the full record, because they move assets the record has to
see first.

## Every output is checked on its own

Spending an output that carries an inscription or a ZRune as a fee destroys
it, so nothing is spent until that output is proven clean. The proof is per
output, not a wait for the whole chain:

- the record has read the block that created it and found nothing on it; or
- the service's node traces where the coins came from and every step is
  plain ZEC, back to newly mined coins or a shielded balance.

An output that cannot be proven either way is **unchecked**, never clear, and
is left untouched. An output the record lists an asset on is never spent as
a fee. [Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/).

### If your payment waits for proof

Coins sent from a shielded balance are proven as soon as they confirm. Coins
that went through many transparent hops may have to wait for the record.

- **Paying an invoice:** the order stays at its confirming step, and its
  status carries a note that the deposit is waiting for proof. Nothing is
  spent or refunded while it waits, and the order continues by itself once
  the deposit is proven.
- **Connected wallet:** if the address holds enough ZEC but not enough of it
  is proven yet, the answer says exactly that (`FUNDING_UNPROVEN`) rather
  than calling it a shortfall.

Either way, the quickest fix is to send the ZEC from a shielded balance.

## How to check coverage yourself

How far the record has read is public:

```text
https://zrunes.io/idx/zcash-metaprotocols/status
```

| Field | What it tells you |
| --- | --- |
| `coverage.scannedHeight`, `coverage.networkHeight` | How far the scan has reached, and the network's height |
| `coverage.scanComplete` | Every block from the required start to the checkpoint is stored |
| `coverage.protocolQualified` | All seven readings were replayed by this release from the required start to this checkpoint |
| `coverage.freshness` | The verdict in one word: `ok`, or the reason it is not, such as `replay_incomplete` or `indexer_lag` |
| `coverage.chainComplete` | `true` only when the scan is complete, the replay is qualified and the checkpoint is current |

An empty result is a fact only while `chainComplete` is `true`.
[The status page](/docs-zerdinals-and-zrunes/start/status/) records the
last verified values.

### How this behavior is tested

Functional tests run on the public Zcash Testnet, with real wallets, real
transactions and the same indexer rules. Bitcoin Signet cannot be used for
these flows: it runs Bitcoin's consensus rules, not Zcash's, so it cannot
carry a Zcash transaction or the readings built on one. Signet is used only
for flows that are actually Bitcoin flows. Crash and chain reorganization
cases are rehearsed separately on a private test chain and reported
separately.

## Related

- [Scan](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
- [Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
