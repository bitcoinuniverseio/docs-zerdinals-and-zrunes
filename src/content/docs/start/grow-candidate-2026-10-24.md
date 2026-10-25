---
title: Grow candidate, October 24
description: Local candidate changes to task search, order observation and batch recovery.
---

This is a tested implementation candidate. It has not been deployed or accepted
through a native Testnet journey. Current service availability still comes from
the product, not this page.

## Task search

The candidate search understands specific tasks such as `mint a ZRune 123:4`,
`inscribe files`, `buy ZRunes`, `show block 42` and `resume my orders`.
It offers the existing page for the task. That page reads current data and keeps
its usual review, network checks, fees and wallet approvals.

Interpretation happens on your device. No inference provider receives your
keystrokes. Unrecognised or ambiguous phrases keep ordinary search results;
this does not establish that an unindexed asset is absent.

## Saved orders

Orders saved in this browser update automatically while the page is visible.
The candidate reads up to four at once, pauses hidden pages, and stops reading
completed orders. A failed update keeps the last known state and offers refresh.
An order from another network asks you to switch before reading it.

Observation never sends a payment, signs a transaction or creates a replacement
order. Keep your private recovery link. Its fragment remains necessary to reopen
an order when the browser no longer has its saved details.

## Batch files

If one file cannot be read, readable files before and after it stay in the batch.
The failed file is named so you can choose it again. Review the final file list,
recipients and exact total before signing or paying.

## Background reliability

The candidate reduces simultaneous duplicate reads and backs off failing
notification sources independently. Existing subscription consent and event
deduplication remain in place. Broadcast still does not mean protocol acceptance.

No creation operation gains a global scan-completeness requirement. Existing
financial, ownership and asset-safe funding checks remain authoritative.
