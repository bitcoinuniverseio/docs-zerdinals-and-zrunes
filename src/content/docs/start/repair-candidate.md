---
title: Repair candidate status
description: What the local reliability repairs establish, and what still needs verification.
---

The repair candidate assessed on September 5, 2026 is **not ready for release**. These notes describe local development work. They do not report a deployment or certify current production behavior.

## What changed in the candidate

Database registration and migration handling now share a single schema definition. Local migration replay, database rollback and application restart checks pass. Readiness checks require the expected database schema and preserve incomplete or unknown chain coverage. A node at the current tip is not proof that every historical asset has been scanned.

The candidate hardens payment attempts around order ownership, repeat-request identity and transactional state. Creator identity challenges also have focused cryptographic and persistent replay checks, with the genuine wallet journey still unverified. A routing provider's success is not proof that the order received its required ZEC. Existing paid orders need a recoverable continuation path even when new admissions close.

The backend and first-party indexer use coherent network-specific defaults while preserving explicit operator configuration. Selecting mainnet does not qualify signing, activate a protocol or authorize accepting money.

## What remains unverified

Complete creator minting, shielded payments and creation, marketplace execution and history, registry proofs, and the experimental asset lab still need their actual authorization, transaction and persistence evidence. The complete set of user journeys, responsive layouts, wallet rejection and reload/recovery states has not been verified for this candidate.

Marketplace reads now filter joined current revisions before pagination and refuse incomplete current-order state; these database tests do not prove a trade executed. Local database and focused code tests are useful evidence for individual repairs. They do not replace real payment, chain confirmation, ownership, delivery or wallet verification.

No release-ready or end-to-end completion claim is made. Dated information on [Current status](../status) remains historical evidence until independently refreshed; it is not qualification for this candidate.
