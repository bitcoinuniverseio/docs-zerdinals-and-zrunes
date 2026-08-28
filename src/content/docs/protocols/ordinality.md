---
title: "The ordinality decision"
description: "Why Zerdinals track transparent outputs rather than numbering individual zatoshis, in the decision record's own words."
---

:::note[Normative source]
This page is the published copy of the decision record maintained in the product repository (docs/protocol/ZERDINAL-ORDINALITY-DECISION.md at commit bd3bede4a238). Where this page and that file disagree, the product repository file is the authority. The Status line below describes the protocol release state in its own words.
:::

Status: Final for Universe Zerdinals v1
Date: 2026-08-25
Owners: Universe protocol engineering

## Question

Does the Zerdinals protocol assign serial numbers to individual zatoshis, in the way Bitcoin ordinal theory assigns serial numbers to individual satoshis?

## Decision

No. Universe Zerdinals v1 is a Zcash transparent-output inscription protocol. Ownership of a Zerdinal is ownership of one specific transparent output. No individual zatoshi is numbered or tracked. The public product name remains Zerdinals.

## Evidence reviewed

Every known Zcash inscription implementation was inspected at source level before this decision. None of them implements individual-zatoshi tracking.

1. zordinals-node-tools v1 and v2 (Zordtoshi, MIT). The theory page claims "every satoshi-like unit of ZEC inside a UTXO can be uniquely numbered". A repository-wide search shows zero implementing code: no zatoshi index, no sat ranges, no satpoint, no rarity, no first-in-first-out assignment. Identity is the genesis transaction id plus a hardcoded "i0" suffix. The claim is prose only.
2. zord (zatoshilabs, CC0-1.0). The README describes ordinal-style "zat" tracking. The code contains none of it. Ownership attribution in that indexer is the address of output zero of the reveal transaction, which is not zatoshi tracking and is not even correct sender attribution.
3. zecscriptions-minter (YoneCode). Ownership of minted ZRC-20 balances follows output zero of the reveal transaction, keyed by address, not by zatoshi and not by outpoint.
4. zinc (FungeLLC, MIT). Shielded memo protocol. Ownership is advisory and unrelated to zatoshi ordering.

Conclusion from evidence: there is no existing Zcash ordinal-theory implementation to be compatible with. Any serial-zatoshi claim we made would be a new invention, not compatibility.

## Why true zatoshi serial tracking is rejected for Zcash

Bitcoin ordinal theory depends on a closed system: every satoshi enters through a coinbase output, and every transaction maps input satoshis to output satoshis first-in-first-out, with fees flowing to the coinbase of the containing block.

Zcash breaks the closed system in ways that make the theory either undefined or dishonest:

1. Shielded pools. Value moves between the transparent pool and the Sprout, Sapling, Orchard, and Ironwood shielded pools. When value enters a shielded pool, individual unit identity is destroyed by design: shielded value is a homogeneous pool commitment, not a set of distinguishable units. When value later returns to the transparent pool there is no fact of the matter about which "zatoshi" came back. Any assignment rule would be arbitrary and unverifiable.
2. The majority of historical issuance has crossed shielded boundaries at least once. A serial numbering that survives only a subset of chain history is not a provenance system, it is a lottery over transaction shapes.
3. Funding streams and lockbox disbursements route block subsidy through consensus-defined outputs and, since NU6, into a lockbox with deferred disbursement. A coinbase-ordering theory must define ordering across these mechanisms and across their historical changes (Founders Reward, Dev Fund, NU6 lockbox, NU6.1 disbursements). Every choice would be an invention with no ecosystem agreement.
4. Zcash coinbase outputs must mature and were historically required to be shielded when spent for several protocol eras. A satoshi-style flow theory would have terminated at that boundary for a large part of the chain.

A theory that is deterministic only until the first shielded interaction, and arbitrary after it, cannot support the claim "this exact zatoshi has provenance". We refuse to make that claim.

## The model Zerdinals v1 actually uses

1. A Zerdinal is created by a commit and reveal pair of transparent transactions. The reveal transaction carries the content envelope.
2. The Zerdinal is bound at creation to one transparent output of the reveal transaction (the genesis output).
3. The current owner is the holder of the unspent transparent output that currently carries the Zerdinal, following an explicit transfer rule defined in ZERDINALS-V1.md.
4. When the carrying output is spent into a fully shielded transaction with no valid transparent successor output, the Zerdinal becomes SHIELDED_UNTRACKABLE: tracking ends deterministically, the event is recorded, and the indexer never guesses a shielded owner. The exact rule is defined in ZERDINALS-V1.md.
5. Provenance is the chain of transparent outputs from the genesis output to the current output. This chain is fully deterministic and verifiable by any independent indexer.

## What this means for product language

Allowed claims:

1. "Inscribed on Zcash in block N."
2. "Provenance: every transfer is a verifiable transparent transaction."
3. "Owned by the holder of a specific Zcash transparent output."

Forbidden claims:

1. "This specific zatoshi is number X" or any rare-sat style marketing.
2. Any implication that a Zerdinal survives shielding with tracked ownership.
3. Any implication that Zerdinals or ZRunes are shielded or private assets.

## Answers required by the project charter

1. Does the protocol assign serial numbers to individual zatoshis? No.
2. What ordering theory applies? None at the zatoshi level. Zerdinals are ordered by inscription sequence: block height, then transaction index within the block, then envelope index within the transaction.
3. How are miner fees assigned? Fees carry no inscription meaning. An inscription is never bound to fee value.
4. How are coinbase outputs ordered? Not applicable. Coinbase, funding stream, and lockbox outputs carry no inscription meaning.
5. What happens when value enters a shielded pool? If the value is the carrying output of a Zerdinal and no valid transparent successor exists, the Zerdinal becomes SHIELDED_UNTRACKABLE. Plain value movements are irrelevant to the protocol.
6. What happens when value returns from a shielded pool? Nothing. Returning value never resurrects an untrackable Zerdinal.
7. Can provenance remain deterministic? Yes, because provenance is defined over transparent outputs only, and the terminal shielded case is itself deterministic.
8. Is ownership tied to one zatoshi or one transparent output? One transparent output.
