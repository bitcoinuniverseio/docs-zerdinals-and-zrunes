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
