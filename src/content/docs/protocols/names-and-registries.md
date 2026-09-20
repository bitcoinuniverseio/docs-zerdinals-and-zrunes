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
3. Keep ZkMap block names outside the Names registry, and link to the new Market Names UI and actionable
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

## Security Features

- Ambiguity Detection: Alerts users when a name is claimed on multiple registries with different destination addresses.
- Homoglyph and Confusable Protection: Detects mixed-script attacks (e.g. Cyrillic letters mimicking Latin characters) to prevent spoofing.

## ZkMap block names are not ZNS names

A ZkMap block name such as `1500000.zkmap` is not a registry name and never
passes through the Names Hub. It is a Zerdinal inscription whose text is
exactly `<height>.zkmap`, and the block it names belongs to whoever holds the
winning inscription's output. Nothing resolves it to a destination address, no
registry can transfer or expire it, and the ambiguity and confusable checks
above do not apply: the only characters in the name are ASCII digits and the
fixed suffix. Searching a block name opens the block's district page, not a
name-resolution result. The rules are in the
[ZkMap v1 specification](/docs-zerdinals-and-zrunes/protocols/zkmap/).
