---
title: "Names and Dual-Registry Architecture"
description: "Universal name resolution across ZcashMe and ZcashNames registries with confusable spoof protection."
---

<!--
IMPLEMENTATION-HANDOFF [CMO-15] CMO-A039 | 2026-09-20 | PREPARATION ONLY
Coverage: DOC-01,NAME-01. Findings: F16, N03.
Verified current behavior: This page lists both registries but does not explain the native-market
difference, authority prerequisites or network-specific signed commands.
Sources: S-APP-MARKET, S-ZKMAP, S-NAMES-MARKET, S-NAMES-REGISTRAR in
docs/implementation/core-market-overhaul-20260920/RESEARCH.md.
Prerequisites: CMO-14.
1. Document zcashnames-zns1 native list/delist/buy and registrar custody separately from zcashme-zns
resolution/registration; no unsupported purchase operation or emoji-name filter is implied.
2. Reference the pinned per-network protocol marker, exact fee/memo/key rules and proof/checkpoint/anchor
verification; describe current capability and recovery from actual released evidence only.
3. Keep ZkMap block numbers outside the Names registry, and link to the new Market Names UI and actionable
errors without publishing key material.
Verify: Existing scripts/verify-deployed-assets.mjs against the actual published origin/artifact, after
accepted release only ; Read-only public /.release and /api/ready checks; verify backend/indexer serving
revision separately ; Functional GO requires every required row PASS; final GO additionally requires
RELEASED: PUBLIC MAINNET evidence.
Assert: The overhaul is implemented, tested and publicly released through all actual services after
acceptance; a ZIP, build, merged PR, private preview or disabled feature is not public release.
Rollback/security: Keep prior immutable artifacts/config backups and compatible schema. Roll back unsafe
admission/UI in dependency order while preserving real funds, accepted operations, authoritative indexer
history and recovery.
Full cross-repository contract: docs/implementation/core-market-overhaul-20260920/WORK-PACKAGES.md.
ANNOTATED is not functional PASS. Preserve executable behavior during preparation.
-->
## Dual Registries

The Names Hub resolves labels across both major Zcash naming systems:

- `zcashme-zns`: ZcashMe Name Service
- `zcashnames-zns1`: ZcashNames Registry

They are not the same kind of integration, and the difference matters when
you use them.

`zcashnames-zns1` has a market. Names can be registered, updated, transferred,
listed for sale, delisted and bought, each as a command the owner signs with
their registry key and sends as a payment to the registrar. The Names market
shows the names currently listed, at the price their owner set.

`zcashme-zns` has registration and resolution, and no market at all. Asking it
for listings returns nothing, because it has no listings to have. That is a
true answer about the registry rather than a failure, and the page says so in
those terms.

## Why a registry can be unreadable

Both registries keep their records in the memo of a shielded note paid to
their registrar, which means the chain carries them encrypted. Reading a
registry needs that registry's viewing key, which ZCashNames publishes for
exactly this purpose: it lets anyone audit the registry without asking
permission. The key reveals what the registrar received. It confers no
ability to spend anything.

So there are two quite different reasons a registry might show you nothing,
and the interface distinguishes them:

- **The registry is empty.** Nothing is listed. You are seeing the whole
  market, and it happens to be small.
- **The registry could not be read.** No decryption capability is configured,
  so nothing has been observed. This is not an empty market, and it is not
  something retrying fixes.

A market that cannot be read says so, in those words. It is never presented
as a market with nothing in it.

There is a third state worth knowing about: a registry that is still reading
its history. Its records exist and are being caught up on, so the page may
not show every name yet, and buying stays unavailable until it finishes. A
price taken from a partial view might already have been changed by a block
nobody has read.

## What a listing is evidence of

Every name shown carries a proof that it is in the registry at a published
state root, and the page verifies that proof before showing it. If any name
on a page fails that check, the whole page is refused rather than quietly
dropping the name that failed. A page you are shown is a page that verified.

Prices are exact integers in zatoshis and are shown as they are. The page
tells you which checkpoint it was read at, and whether there are more names
than it is showing.

## Verifying it yourself

None of this asks you to take our word for it. ZCashNames publishes the
registrar's address, its viewing key, the start block and the contract on BNB
Smart Chain where each state root is anchored. With those you can scan Zcash
from the start block, decrypt every command the service has received, replay
them, compute the state root and compare it against the one on chain. If the
registrar had censored, reordered or invented an operation, your root would
differ.

Our indexer does exactly that, and its replay reproduces the anchored root.

## Buying a name

A purchase is a `BUY` command you sign with your registry key, paid to the
registrar at the listed price. Signing a registry command is a separate thing
from authorising a wallet transaction and from proving control of an address:
they are three distinct permissions and the interface keeps them apart.

Native shielded settlement for these operations is not yet available, so an
operation can be prepared and its command signed, but the payment rail that
would complete it is reported as unavailable rather than implied to work. A
prepared operation is never shown as settled.

## Security Features

- Ambiguity Detection: Alerts users when a name is claimed on multiple registries with different destination addresses.
- Homoglyph and Confusable Protection: Detects mixed-script attacks (e.g. Cyrillic letters mimicking Latin characters) to prevent spoofing.

## ZkMap block numbers are not ZNS names

A ZkMap block number such as `1500000.zkmap` is not a registry name and never
passes through the Names Hub. It is a Zerdinal inscription whose text is
exactly `<height>.zkmap`, and the block it names belongs to whoever holds the
winning inscription's output. Nothing resolves it to a destination address, no
registry can transfer or expire it, and the ambiguity and confusable checks
above do not apply: the only characters in the name are ASCII digits and the
fixed suffix. Searching a block number opens the block's district page, not a
name-resolution result. The rules are in the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/).
