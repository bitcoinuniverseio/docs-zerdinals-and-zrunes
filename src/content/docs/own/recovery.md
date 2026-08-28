---
title: Interruptions and recovery
description: The one coherent model for outages, stale data, reorganizations, and resuming interrupted orders.
---

**Outcome:** you will know what every interruption means, what is at risk in
each one (usually nothing), and how to resume.

## The first thing to know

Nothing recorded on the chain is affected by any outage of this product.
Your artifacts, balances, and transactions live in Zcash blocks; the
indexer only reads them. An outage delays what the product can show you and
changes nothing about what you own.

## When the site cannot reach the indexer

The page tells you once, keeps what it can still show, and fixes itself
when the service comes back:

- One notice at the top says what is unavailable and what is not; each
  affected section is marked with one line rather than repeating the
  explanation.
- Anything already on screen stays on screen, labeled as last known.
- The page retries on its own, less often the longer an outage lasts so it
  does not add load to a struggling service, and fills itself back in when
  the indexer answers. You do not have to reload. The notice carries a
  **Retry now** button if you would rather not wait.
- While the site cannot confirm current chain data, creating, etching,
  minting, and transferring stay unavailable rather than proceeding on
  stale information.

## When data is stale

Status information (node height, indexer height, lag, mempool state) is
always shown honestly. Stale data is labeled STALE with the time it was
last confirmed, and last-known values stay visible rather than vanishing.

## When the chain reorganizes

The indexer journals every event with its block height and hash. When the
chain reorganizes, everything recomputes deterministically from the
surviving chain: inscriptions in orphaned blocks revert to pending or
disappear exactly as chain state dictates, and sequence numbers and
ownership are recalculated. A reorganization deeper than the supported
automatic bound stops the indexer for operator repair rather than serving
wrong data.

This is why sequence numbers are stable only after confirmation depth, and
why fresh inscriptions display their provisional nature.

## Resuming interrupted orders

Inscribe orders and batches persist in your browser on this device:

- **Declined commit:** nothing was signed or broadcast; the order is
  cancelled cleanly.
- **Declined or interrupted reveal:** the commit is already on chain; the
  order stays open and resumable from its timeline.
- **Closed tab:** reopen Inscribe; prepared orders and batches are still
  there.

Each order's timeline shows real chain states, so on resume you see exactly
where it stopped and what the next approval is.

## How to verify after any interruption

1. Check [the status page](/docs-zerdinals-and-zrunes/start/status/) or the
   product's own status tape for coverage and freshness.
2. Search the relevant txid or address in ZordiScan; the chain record is
   the authority, and it was never at risk.

## Related

- [What an empty result means](/docs-zerdinals-and-zrunes/verify/coverage/)
- [Inscribe a Zerdinal](/docs-zerdinals-and-zrunes/create/inscribe/)
