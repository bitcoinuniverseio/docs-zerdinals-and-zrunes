---
title: "Creator Collectives"
description: "Multi-party creator collectives, capability-based governance, threshold voting, and multi-party PCZT payout coordination on Zcash."
---

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
