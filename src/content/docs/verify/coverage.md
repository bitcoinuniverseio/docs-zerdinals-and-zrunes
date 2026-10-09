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
the recorded qualification state.
-->

1. **The chain is still being read.** The result says so where it appears,
   instead of reporting a count. Absence here means nothing at all, and no
   page turns it into a zero: a count of Zordinals, ZRunes, collections or
   activity is shown only when it can be right.
2. **No records yet.** Shown only once the whole chain has been read. This
   is a real, checkable statement that nothing of that kind exists.
3. **Indexer unreachable.** The service could not be reached, so nothing
   can be said either way. Nothing is hidden or lost.
   [The outage model](/docs-zerdinals-and-zrunes/own/recovery/).
4. **Data is stale.** The last known values are still shown, labeled, with
   the time they were last confirmed.

There is no site-wide reading badge in the header or the account panel. The
answer sits on the result it applies to, and the network selector and wallet
controls stay where they always were.

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

`coverage.scannedHeight`, `coverage.networkHeight`, and
`coverage.chainComplete` answer the question directly.
[The status page](/docs-zerdinals-and-zrunes/start/status/) records the
last verified values.

## Related

- [Scan](/docs-zerdinals-and-zrunes/verify/zordiscan/)
- [Signing availability](/docs-zerdinals-and-zrunes/create/signing-availability/)
- [Interruptions and recovery](/docs-zerdinals-and-zrunes/own/recovery/)
