---
title: "Names and Dual-Registry Architecture"
description: "Universal name resolution across ZcashMe and ZcashNames registries with confusable spoof protection."
---

## Dual Registries

The Names Hub resolves labels across both major Zcash naming systems:

- `zcashme-zns`: ZcashMe Name Service
- `zcashnames-zns1`: ZcashNames Registry

## Security Features

- Ambiguity Detection: Alerts users when a name is claimed on multiple registries with different destination addresses.
- Homoglyph and Confusable Protection: Detects mixed-script attacks (e.g. Cyrillic letters mimicking Latin characters) to prevent spoofing.


<!-- ZKM-D01 | ZkMap implementation preparation | 2026-09-18
After ZkMap is implemented and testnet-qualified, add a dedicated ZkMap guide and link it from explore, create and market navigation. Explain exact plain-text <height>.zkmap Zerdinal claims, including 0.zkmap, first accepted chain claim, losing duplicates, no guaranteed claim from cart selection, confirmation/indexing states and ownership through the existing Zerdinal output. Keep this distinct from ZNS/name registries. Show real selectable block squares, single mint and bulk selection with per-item fees/status, partial failure/retry, transfer/list/buy/cancel/recovery and accessible keyboard/mobile controls. Document deterministic self-hosted block-derived map previews and unknown/indexer-unavailable states. Publish only verified API names, supported wallets and live behavior; this comment is preparation, not an availability claim.
-->
