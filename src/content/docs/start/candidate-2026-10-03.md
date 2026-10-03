---
title: October 3 implementation candidate
description: Implemented contracts, safe recovery and the remaining release requirements.
---

This describes application source revision `2c7dd1f5f4a31010448f853b9406b3a811c29fbf`
and indexer revision `824b4340a29fdae558c1881fbb026e1ba34b1945`. It is an
implementation candidate, **not a deployed release or Mainnet GO**. The application
revision is pinned below in the source reference; recorded September journeys do
not qualify these changed artifacts. Accounting source checkpoint
`9eb38be49271c024b6790163fd890ef252821463` is retained in this revision.

## Read, prepare, then review

Draft editing, mint and inscription routes, and existing-order recovery remain
discoverable when a read service fails. Each submission still needs its own
network, recipient, ownership, protocol, input-safety, fee and signature checks.
An unavailable reader cannot prove a name is free or an output is safe to spend.

The serving identity binds the selected network to independently observed node
genesis and the backend release. A missing, stale or conflicting identity holds
new submissions. Indexed asset composition and native spend eligibility are
separate checks: a clean classification alone is not permission to spend.

## Confirmed transparent accounting

The accounting page reads a watched transparent address or the connected account.
Received, spent and net flows retain exact integer values. It accepts at most
three pages per batch, offers Pause and Continue, and discards late responses after
an account or network switch.

Rows remain visibly partial until every height window and transaction offset
belongs to the same active snapshot. Export is disabled while partial, unresolved
or invalidated by a reorg. Restart obtains a new snapshot; reload also restarts,
because paging checkpoints are held only in the mounted view.

A complete paged CSV includes schema version, address, network, genesis,
checkpoint, read time and assembly digest before the exact displayed event rows.
This includes empty snapshots. Cost basis, realized profit, tax interpretation and
fee valuation remain unavailable. The record is not a tax calculation.

## Recovery preserves the original request

Payment and supported market requests retain their original identity and terms.
Status-only recovery can reconcile an uncertain acknowledgement without creating
a changed request. Submission is not proof of protocol acceptance. Keep the saved
request and signed transaction bytes until terminal evidence resolves the outcome.

Output split plans remain unsigned, unbroadcast plans. A missing PCZT export or
signer capability is reported as unavailable; raw transaction bytes are not a
replacement PCZT. Shielded Bitcoin and ZSA routes retain their profile, provider
and consensus holds. A feature flag does not qualify issuance or signing.

## Names and domain authority

`zcashnames` and `zcashme` require separate qualified readers and protocol versions.
An ordinary registry reader cannot establish ZNS authority. Unsupported registry
contracts return a typed unavailable result rather than an empty registry.
Pass check-in and credential issuance are actual mutations and retain proof and
approval requirements. Mainnet custody and rights-worker qualification remain held.

## What remains before release

Component tests and isolated database checks establish bounded contracts, not
native execution. Complete native Testnet and Bitcoin Signet journeys, restart,
reorg and ambiguity recovery, approved browser checks, unchanged bundle budgets,
serving artifact identity and the coordinated release gates remain required.
No deployment, production trust change or release acceptance is reported here.

CI run 37113834588 for this source passed all ten jobs, including backend,
required database regressions, frontend and approved-runner visual fixtures.
The bundle passes unchanged size limits. Visual product gates passed 625 cases
with three exclusions; screenshot comparisons passed 196 with four mobile
project exclusions. These fixture checks are not real-service performance or
native functional acceptance. Complete native journeys remain zero and release
approval remains held; newer source needs its own qualification.

Source: [application checkpoint](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/tree/2c7dd1f5f4a31010448f853b9406b3a811c29fbf).
