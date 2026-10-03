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

## Later revision evidence and pending checks

The earlier completed CI and browser results above remain historical evidence
for their original revision. Application revision
`06db5f497683d422ab209c6d6f86cb3d1a64862f` has separate results from
[main CI run 37120717526](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37120717526):
backend passed 4270 tests with 58 existing skips, across 380 passing and 10
skipped suites. The mandatory seven-suite SQL gate passed 50 tests with zero
skips. Frontend passed 3641 of 3642 tests across 328 suites, with one failure;
visual checks were skipped. The other seven jobs passed. This run did not pass
all application gates.

The frontend failure asserted original invoice submission before its asynchronous
request fingerprint completed. Test-only correction
`694b6b7f8e1a4719d5fd19ce9f441f22725bfceb` waits for the original dispatch while
preserving the zero-value composition and admission assertions. Fresh CI for
that correction remains pending in this evidence record; a component result
cannot replace the failed full-run result.

[Offline PCZT run 37120680194](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37120680194)
for the exact application revision above passed 11 Rust tests and seven actual
CLI cases with zero skips. This qualifies the tested offline codec and CLI
contracts only. Wallet acceptance and native acceptance remain false, with zero
complete native journeys. Later optional adapter work and browser draft recovery
source checkpoint `b75bcae8` require their own fresh fleet evidence. No browser
execution or success for those later changes is claimed here.

Indexer documentation checkpoint
`6c2ba3947e61a215b853a0cf62d5669250b386aa` changes documentation only over runtime
`824b4340a29fdae558c1881fbb026e1ba34b1945`. The runtime's previously accepted
five-job run, 911 full tests and 39 mandatory SQL tests with zero skips, remains
historical evidence for that runtime. Documentation changes do not resolve the
held independent name-reader contract or the governing non-value-output rule.
No historical protocol state or qualification is substituted by this update.

Release remains held. These results authorize no merge, deployment, production
migration or public release. Native Testnet and Bitcoin Signet qualification,
real-service wallet journeys and pending approved browser gates remain open.
