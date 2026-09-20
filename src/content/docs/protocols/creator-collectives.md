---
title: "Creator Collectives"
description: "Multi-party creator collectives, capability-based governance, threshold voting, and multi-party PCZT payout coordination on Zcash."
---

<!-- IMPLEMENTATION-HANDOFF [DOC-001] Coverage DOC-creator-collectives.
Verified baseline 595ebaecd5; published promises must not be mistaken for accepted behavior.
The text promises ZCOLL on-chain registry, quorum variants and PCZT. Actual implementation has fixed thresholds, incomplete non-payout executors and no concrete browser signing adapter. Reconcile roles, transaction format and durable payout/rotation recovery with COL work packages.
1. After the matching app source work packages pass, replace examples with the tested request/response contracts, exact formats, permissions and network-specific prerequisites.
2. Keep every existing advertised capability in the acceptance inventory. Implement missing behavior; do not delete promises simply to reduce required scope. Until qualified, distinguish available behavior and pending requirements truthfully.
3. Link governing versioned specifications and testnet evidence to the exact accepted product/indexer revision. Explain revocation limits and service trust where relevant without claiming stronger guarantees.
4. Run npm run check:markdown and npm run build from this repository after implementation; targeted markdownlint passed during preparation, full build remains untested. Validate internal links and examples against real testnet API responses. Coordinate DOC-002 developer runbook changes.
No rendered prose changed in preparation. Deploy docs only with matching accepted product release; rollback documentation with that revision.
-->
## Overview

Creator Collectives provides decentralized collaborative governance, shared asset curation, and trust-minimized revenue splitting for creative teams on Zcash.

## Key Capabilities

### 1. Collective Architecture (ZCOLL/1)

- On-chain collective registry defining members, split shares, and governance parameters.
- Capability-based roles: Admin, Creator, Curator, and Member with distinct operational privileges.

### 2. Proposal and Threshold Governance

- Member proposals for treasury payouts, policy updates, member additions, and asset sales.
- Configurable approval rules including absolute majority, supermajority, and minimum quorum requirements.
- Cryptographically signed member ballots recorded transparently.

### 3. Multi-Party PCZT Coordination

- Complex multi-recipient payouts are orchestrated through Partially Created Zcash Transactions (PCZT).
- Collects member signatures asynchronously without requiring trusted intermediary custody.
- Transactions broadcast only after the requisite cryptographic threshold is achieved.

### 4. Exact Zatoshi Conservation

- Split calculations enforce exact integer arithmetic in zatoshis.
- Zero rounding leaks, ensuring that sum of outputs matches allocated inputs exactly minus the standard network fee.
