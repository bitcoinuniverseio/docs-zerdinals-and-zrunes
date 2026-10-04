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

## Completed exact-candidate checks at 12:43:48 UTC

Application candidate `499be6a46515f4391eca140af52430d3a61c3746` passed all ten
jobs in [main CI run 37122747236](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37122747236),
completed on October 3 at 12:43:48 UTC. These results supersede the failed
frontend gate above only for this exact later candidate; the earlier run remains
part of the evidence history.

Frontend passed 3645 tests in 329 suites with zero failures. Its unchanged
bundle limits passed: 153.8 KiB initial JavaScript, 926.4 KiB total JavaScript,
76.1 KiB CSS and 214.8 KiB engine worker against 156/927/78/230 KiB ceilings.
Backend passed 4291 tests with 58 existing skips, across 380 passing and 10
skipped suites. The separate mandatory seven-suite SQL gate passed 50 tests
with zero skips.

Approved-runner visual product gates passed 627 cases with three existing
exclusions. Both `gates` and `gates-dark` executed the new shielded draft
recovery checks using real browser WebCrypto and actual downloaded/imported
file bytes. Screenshot comparisons passed 196 cases with four existing mobile
project exclusions. No baselines, tolerances or project guards were changed.
This establishes controlled offline browser artifact recovery, not wallet,
protocol or real-service native acceptance.

[Offline PCZT run 37122728760](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37122728760)
for exact candidate `499be6a46515f4391eca140af52430d3a61c3746` independently
passed 11 Rust tests, seven actual CLI cases, two archive checks and four adapter
tests against the actual earlier `06db5f49` artifact, all with zero skips. The
original qualified artifact tuple and durable fixture remain unchanged.
New artifact `11273902401` has ZIP size 509667 bytes and SHA256
`5dfe10e37fb91c4cf490ecd3f641eac375142047a25f10436dbc1f5518c3254d`;
its binary SHA256 is
`ae40b6374d3767dc12b24ca59e098e0253f511462204c3ba1783118033d200f2`.
Codec, CLI, archive and prior-artifact adapter checks do not establish native
wallet execution.

All 53 work packages and 88 source annotations remain subject to their full
requirements; eight work packages retain unresolved external authority or
qualification prerequisites. Complete native journeys remain zero, native
acceptance is false and release approval is false. Indexer documentation
`6c2ba3947e61a215b853a0cf62d5669250b386aa` and runtime
`824b4340a29fdae558c1881fbb026e1ba34b1945` remain unchanged. Later documentation
heads record this evidence without becoming the exact fully tested application
candidate. No merge, deployment, production change or public release follows
from these successful component and fixture gates.

## Later exact-source qualification at16:10:21UTC

Application source `938dc36ec6ac0639d5979232d2e1a6c7f5314ab9` passed all ten jobs in [CI run37134657217](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37134657217) on October3. Frontend passed3656 tests across331 suites; unchanged gzip budgets passed at153.8/926.7/76.1/214.8KiB. Backend passed4320 tests with58 existing skips, across382 passing and10 skipped suites. Mandatory SQL passed50 tests in seven suites with zero skips. Approved browser product gates passed627 with three existing exclusions; screenshots passed196 with four existing mobile exclusions. No baselines, tolerances or size limits were relaxed. This supersedes the earlier SDK and bundle failures for this exact later source.

Indexer source `116835af376efc82e41df8af974c558806c83f29` separately passed all five jobs in [CI run37125857030](https://github.com/bitcoinuniverseio/index-zcash-metaprotocols/actions/runs/37125857030), including931 full tests and39 mandatory SQL tests with zero skips. Corrected non-value-output rules remain staged; the frozen default parser and historical protocol state remain unchanged.

The offline local-viewing component at `d2ef878fc92d2f60023cf6a8915ae860530cd211` passed13 native Rust tests with zero ignored and four mandatory actual WebAssembly tests in [run37133998668](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37133998668). Independently verified artifact11278400447 binds source, official cohort, resolved lock, compiler receipts and the698866-byte binary SHA256 `488cdb75311b72568f91174f8fbd3dc286d202cbb4bafe33cd36721cbe9f4151`. It qualifies bounded observation and public block-commitment checks. Product distribution notices, browser privacy and checkpoint/reorg lifecycle, spend knowledge and native received-note journeys remain separate requirements.

The dedicated experimental ZSA run37133211693 verifies its own Regtest genesis and activation, then passes three native issuance/transfer/burn/persistence scenarios and persisted-head agreement. Its three-party scenario fails with a node crash. It does not qualify public Zcash Testnet or Mainnet. The original Shielded Bitcoin Signet profile and live node genesis/activation match; that alone does not establish wallet ownership, hosted proving resources or transfer/replay acceptance.

Later candidate `012ee73984cb7d790ebdc513bc092b5c61586744` retains the qualified component evidence and adds bounded crash diagnostics. It is distinct from the exact all-ten-job application source above. All53 work packages and88 annotations retain their operation-specific acceptance requirements. Complete native public-network journeys remain zero and public release remains false. Component, isolated database and browser fixture results do not establish GO.

## Later verified component evidence and remaining holds

Application source `2cb4b13de1d913761166e99bbb90df376e28e4f8` completed
[CI run 37148647216](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37148647216).
Frontend passed 3,691 tests across 335 files. Approved browser product gates passed
627 cases with three historical exclusions; screenshot comparisons passed 196
with four historical mobile exclusions. Gzip results remained 153.8/926.7/76.1/214.8
KiB against unchanged 156/927/78/230 ceilings. Backend, signer, Shielded Bitcoin,
SDK and protocol jobs were skipped through verified unchanged-source reuse from
`938dc36ec6ac0639d5979232d2e1a6c7f5314ab9`, run 37134657217. They did not rerun
or acquire new native acceptance.

The separate isolated viewing campaign at
`c8491a1aa11524aec87161957bc61f8763463808` passed all five actual browser
component cases in
[run 37150072001](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37150072001),
with zero skips, retries or flaky results. Result artifact 11284220051 binds the
exact source and report. It checks the official-generated public-fixture
ciphertext codec, worker privacy/forget and isolated provider cleanup. Fixture
session reorg controls and the separately parsed public block do not prove that
the encrypted transactions were included in a real block, or that a native
received-note lifecycle completed. Earlier attempts remain failed: run
37149729760 lacked transaction package declarations; run 37150019017 failed its
declaration artifact restore-path check. Neither executed the browser cases.

The independently verified `5fa4ea928044eed7064c098853e4db76a06fb232` viewing
component has a local private review package of 458 files, including all 440
unchanged original notice files totaling 15,342,809 bytes. Source, lock,
compiler, inventory and original-source review bindings accompany the exact
698,866-byte WASM. The project owner's private-wrapper distribution decision
is recorded separately from generated integrity checks; no new upstream license
grant or reproducible-build claim is made. The viewing consumer profile remains
held, its production allowlist empty and its pages unmounted.

The owner recovery record reports one actual Zallet identity creation, followed
by interrupted initialization. No mnemonic or payer was created. Recovery is
continuing under the same owner with the original database preserved; this is
not wallet or lifecycle acceptance. Regtest qualification source `465b3ade`
is prepared but has not executed.

Complete native public-network journeys remain zero, native wallet acceptance
and public release remain false. These later component results preserve the
historical failures above; they do not authorize a deployment or enable a held
product consumer.

The later application candidate `714217c0c588d41f4569d244d4c3e67736432734`
passed all ten fresh jobs in [CI run 37159569483](https://github.com/bitcoinuniverseio/zerdinals-and-zrunes/actions/runs/37159569483).
No dependency job was reused or skipped. Backend results include 4,320 passing
tests with 58 existing skips and all 50 mandatory SQL checks without skips;
frontend results include 3,691 passing tests. Product browser checks passed 627
cases with three historical exclusions, and visual checks passed 196 with four
mobile exclusions. This is component and integration evidence; complete native
public-network journeys remain zero and public release remains false.

Actual resource probes found that the existing approved-fleet Docker daemon
does not enforce the requested container limits. Read-only inspection found
delegated user-service controllers; a separate tiny service probe exposed a
reader-lifetime race before kernel evidence could be admitted. Its failed owner
is preserved while a bounded handshake and explicit reconciliation are prepared.
On the separate Testnet host, seedless Zallet preflight refused before creating
a container or invoking the native command. The original interrupted databases
and wallet identity remain preserved. Neither result qualifies a payer or
changes the public-release decision.

The later seedless native Zallet migration completed on the exact reconciled
Testnet container without retry or altered fsync. Actual kernel limits, normal
exit, closed journals, native Testnet/version metadata, integrity and all required
tables were verified. The 667,648-byte empty template has SHA256
`bb3b83eee8b5bb90834b32e0f46b5c55ca0f2f098f393ae653913a3a2e9766d4`;
every required private key, account, address and note count is zero. This
qualifies the empty-schema component. The supported native encryption step
also passed using the existing identity in one copy beneath the original custody
owner. Native recipient equality, actual kernel limits, closed journals, integrity
and Testnet/version metadata were verified, with seed and account tables empty.
The original identity, backups and both interrupted databases remain preserved. No seed, payer or complete
public Testnet/Signet journey is qualified; public release remains false.

The original identity also has a protected off-host ciphertext whose actual
reopen and decrypt reproduced the original bytes. That component does not
qualify mnemonic, native wallet or Windows disaster recovery. A read-only backup
catalog query lists two original Windows workspace snapshots, with no Windows
profile root listed; recovery of the original Signet key remains unproven.

Later owned user-service probe37164859628 verified both requested memory caps
(4 and 5 GiB), zero swap, 128 processes and two CPUs from the actual kernels.
The prior failed service remains preserved. The existing fleet Docker daemon
still lacks enforced limits; isolated daemon, UID mapping and finite persistent
storage qualification remain required before the original Regtest campaign.

The first supported native Testnet seed generation subsequently passed once.
Protected receipt `f283415ee1b738a51c4b2a21fc1b0e51e0a2852818f56563df71b29077306653`
records one encrypted, unconfirmed mnemonic, zero accounts, actual kernel limits,
integrity and closed journals. The new owned database changed while the original
failed database metadata, identity and backups remained unchanged. Account
creation and funding remain held until durable backup and native wallet restore
qualify. Complete native public-network journeys remain zero; release remains false.

Application CI run37166448626 at `8e4f990783b2fddef334c48f4028dec79abe6c36`
passed five fresh jobs and reused five dependency suites whose Git trees were
independently verified against the fully fresh714 revision. Independent review
SHA256 is `3a24de95e59d617e32b13266c35c844a26a188ea30bfd9ca56218d92d6b036b1`.
This is component evidence and does not qualify public-network acceptance.

The separate supported export of the same existing native Testnet seed succeeded
once. Protected receipt `7b3166a672e6e54fbdb5a4a882e90521ae8ce1fc18e4c647d0107e6c92589bf5`
records actual kernel enforcement and encrypted ciphertext. The wallet database
payload hash before and after is identical; only the permitted ctime metadata
change occurred. The original failed database metadata, identity, backups and
prior export histories remain preserved. No plaintext mnemonic was read.
Offhost ciphertext recovery, full wallet backup and native restore must still
qualify before backup confirmation, account creation or funding.

Application CI run37171213462 at `f3126469d598d828a6ba6493568d4ced7b2c9096`
passed five fresh jobs and reused five exact714 source trees. Independent review
SHA256 is `a87729c2c616d93d06d64268cbf4680dc5afdbd7a3cc2c9ea1c0a1bef656037d`.
This does not claim fresh full CI for later qualification-source revisions.
Read-only publisher diagnosis37174112239 verified the retained service failed
with exit1 and empty cgroup, preserving four earlier services. Private diagnostic
files were locally absent; the diagnostic does not qualify signed publisher
metadata, native fixture tools or a new daemon. Complete native public-network
journeys remain zero and public release remains false.
