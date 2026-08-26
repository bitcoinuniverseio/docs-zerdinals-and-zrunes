# ZRunes guide: etch, mint, transfer

ZRunes are transparent fungible assets on Zcash. This guide walks through the three operations. As with inscriptions, wallet connection is currently in progress; the flows below describe the product flow, and every fee is shown in full before signing.

## The limits that shape everything

| Item | Limit |
|---|---|
| Name | 4 to 26 letters, A to Z only |
| Divisibility | 0 to 18 decimal places |
| Payload | 79 bytes in the transaction's data output |
| Edicts | at most 16 per transaction |
| Data outputs | exactly one per transaction (network policy) |

Names are unique per network, forever. Spacers (displayed as bullets between letters) are display only and never affect identity: ZRUNE and Z•RUNE are the same name.

## Etch

Etching creates a ZRune. You choose:

1. The name (4 to 26 letters). If the normalized name is already taken, the etching is void.
2. Optional display fields: a symbol and spacers.
3. Divisibility (0 to 18).
4. An optional premine credited to you at etch time.
5. Optional mint terms: amount per mint, mint cap, and an opening and closing block height window. Without terms, nobody can ever mint; supply is the premine alone.

Etching is a two-step flow because of front-running protection: first a commitment transaction locks a hash of your chosen name (observers cannot read the name from it), then, after the commitment has at least 6 confirmations, the etch transaction publishes the name and terms. A pending etch cannot be sniped from the mempool.

Once etched, the terms are permanent. Nobody, including the etcher, can change the amount, cap, or window.

## Mint

While a ZRune's mint window is open (between its start and end heights) and its cap is not reached, anyone can mint:

1. Each mint creates exactly the fixed amount per mint. There are no partial mints.
2. Mints are counted in block order, then transaction order within the block. When the cap is reached, later mints simply contribute nothing.
3. The product shows real mint state from our own node and indexer: mints completed, remaining mints, percent minted, and whether the window is open right now.

## Transfer

ZRune balances attach to transparent outputs and move by output allocation:

1. Spending ZRune-bearing outputs pools all their balances in the transaction.
2. Edicts (compact instructions in the data output, at most 16) allocate amounts from the pool to specific outputs. An amount of zero means the entire remaining balance.
3. Whatever the edicts leave unallocated goes to the designated pointer output, or by default to the first transparent non-data output.
4. If no valid transparent successor exists for a balance, that balance is burned by protocol rule. Sending ZRune-bearing value entirely into a shielded pool burns the balance; ZRunes are never attributed to shielded addresses.

## Malformed transactions

The protocol has zero tolerance for ambiguous data. A transaction whose ZRune payload breaks any rule is a Malformed ZRunestone with fixed effects: the ZRune balances entering it are burned, and no edict allocates anything. The product's transaction builder refuses to construct anything the network would not relay or the protocol would treat as malformed, so this state is a hazard for hand-rolled transactions, not for product users.

## Fees

ZIP 317 conventional fees, computed from actual transaction shape. The data output adds about 3 logical actions for a full 79 byte payload, so a typical single-input mint costs roughly 4 to 5 logical actions at 5,000 zatoshis each. The full fee is displayed before you sign.
