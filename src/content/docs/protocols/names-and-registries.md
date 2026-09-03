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
