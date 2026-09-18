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


<!-- IMPLEMENTATION-HANDOFF [ZKM-D01] | 2026-09-18 | PREPARATION ONLY
Prerequisites: ZKM-I01..I08, ZKM-B01..B08, ZKM-F01..F16 and ZKM-T01; SPEC.md R01..R26. Coverage IDs: ZKM-D01-PUBLIC, ZKM-D01-LINKS, ZKM-D01-TRUTH.
1. Add proposed src/content/docs/protocols/zkmap.md after implementation; explain exact ASCII <height>.zkmap, exact text/plain, verified complete UZRD1-v1 only, target height strictly below completion height, earliest completion order (height, transaction index, inscription index), genesis target and proposed replay floor 0. Distinguish ZNS, losing duplicates, burn/shielded non-remint, reorg and current carrier ownership.
2. Update create/inscribe.md, market/buying-and-selling.md, verify/search.md and own/portfolio.md plus actual navigation configuration with implemented routes and real screenshots. Cover single mint, max24 batch requests, max1000 campaign selection, per-item costs/status, recovery and accessible selectable map versus deterministic transaction-byte treemap artwork.
3. From this docs repository run existing npm test, npm run build, npm run check:external-links and npm run check:a11y after content changes and toolchain setup. Check package.json first if baseline changes. These commands were inspected, not executed in preparation. Funded ZkMap testnet scenarios are future ZKM-T01 work, not docs-script coverage.
4. Accept ZKM-D01-PUBLIC/LINKS/TRUTH only when links/examples match exact released APIs, keyboard/mobile screenshots and all required actual Testnet PASS evidence exist. Publish no availability or successful-mint promise before PASS and release; preserve original inscription bytes and honest unknown states.
-->
