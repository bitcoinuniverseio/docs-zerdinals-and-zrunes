---
title: Transparent and shielded
description: "Zerdinals and ZRunes live entirely in the transparent pool. What an indexer can read, which operations need a transparent address, and what shielding does to an asset."
---

**You will get from this page:** which operations need a transparent address,
exactly what a reader of the chain can and cannot see, and what the shielded
pool does to an asset that enters it.

This is the page to read before any other. Almost everything that surprises
people about these assets follows from one fact: the protocols are built on
public data, so they can only be derived from public activity.

## Plain language

Zcash has two kinds of value. Transparent value works like Bitcoin:
addresses, amounts, and transactions are public. Shielded value is hidden by
cryptography, so the chain proves the money moved correctly without
revealing addresses or amounts.

Zerdinals and ZRunes use only the transparent side. Content, addresses,
balances, and activity are publicly visible, forever. Nothing in this
product makes your on-chain activity private, and nothing here is an
alternative to a shielded wallet.

## What a reader of the chain can see

Every protocol record on this site is derived from a part of the
transaction that is public by construction. Nothing is derived from a
shielded bundle, because nothing in a shielded bundle can be read without
the viewing key that only its owner holds.

<figure class="zz-figure">
<svg viewBox="0 0 480 392" role="img" aria-labelledby="figure-visibility-title" aria-describedby="figure-visibility-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-visibility-title">The readable and unreadable halves of a Zcash transaction</title>
  <desc id="figure-visibility-desc">A Zcash transaction is drawn in two panels. The left panel, transparent parts, lists input scripts which carry Zerdinal envelopes, output scripts which carry the address and value, and the OP_RETURN output which carries the ZRunestone. An arrow leads from it to the statement that every protocol record is derived from here. The right panel, shielded parts, lists the Sapling bundle, the Orchard bundle, and the Ironwood bundle. An arrow leads from it to the statement that no protocol record is ever derived from here. A note underneath records that the fee paid is public in both cases.</desc>
  <g fill="var(--zz-diagram-muted)" font-family="inherit" font-size="14" letter-spacing="1.4">
    <text x="12" y="20">TRANSPARENT PARTS</text>
    <text x="254" y="20">SHIELDED PARTS</text>
  </g>
  <g fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" stroke-width="1">
    <rect x="12" y="32" width="214" height="196" />
    <rect x="254" y="32" width="214" height="196" />
  </g>
  <rect x="12" y="32" width="3" height="196" fill="var(--zz-diagram-move)" stroke="none" />
  <rect x="254" y="32" width="3" height="196" fill="var(--zz-diagram-shielded)" stroke="none" />
  <g font-family="inherit">
    <g fill="var(--zz-diagram-ink)" font-size="17">
      <text x="30" y="66">Input scripts</text>
      <text x="30" y="128">Output scripts</text>
      <text x="30" y="190">OP_RETURN output</text>
      <text x="272" y="66">Sapling bundle</text>
      <text x="272" y="128">Orchard bundle</text>
      <text x="272" y="190">Ironwood bundle</text>
    </g>
    <g fill="var(--zz-diagram-muted)" font-size="15">
      <text x="30" y="86">carry Zerdinal envelopes</text>
      <text x="30" y="148">carry address and value</text>
      <text x="30" y="210">carries the ZRunestone</text>
      <text x="272" y="86">spends and outputs</text>
      <text x="272" y="148">actions</text>
      <text x="272" y="210">actions</text>
    </g>
  </g>
  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M119 228 V262" />
    <path d="M113 254 L119 263 L125 254" />
    <path d="M361 228 V262" />
    <path d="M355 254 L361 263 L367 254" />
  </g>
  <g fill="none" stroke-width="1">
    <rect x="12" y="266" width="214" height="66" stroke="var(--zz-diagram-move)" />
    <rect x="254" y="266" width="214" height="66" stroke="var(--zz-diagram-shielded)" />
  </g>
  <g font-family="inherit" font-size="15" fill="var(--zz-diagram-ink)">
    <text x="30" y="294">Every protocol record</text>
    <text x="30" y="315">is derived from here</text>
    <text x="272" y="294">No protocol record</text>
    <text x="272" y="315">is ever derived here</text>
  </g>
  <text x="12" y="372" font-family="inherit" font-size="15" fill="var(--zz-diagram-muted)">The fee paid is public in both cases.</text>
</svg>
<figcaption>An indexer reads the transparent parts of a transaction and nothing else. A shielded bundle is not partially readable; it is not readable.</figcaption>
</figure>

| Part of a transaction | Readable | What is derived from it |
| --- | --- | --- |
| Input scripts | Yes | Zerdinal envelopes: content type, content pieces, and the v1 commitment |
| Output scripts | Yes | the owning address, the value, and which output an asset moves to |
| The `OP_RETURN` data output | Yes | the ZRunestone: etch, mint, and transfer instructions |
| Sapling spends and outputs | No | nothing |
| Orchard actions | No | nothing |
| Ironwood actions | No | nothing |
| The fee | Yes, always | fee reporting, for shielded and transparent transactions alike |

The fee row is not a rounding error, and it is the one thing people
consistently get wrong. A shielded Zcash transaction hides its sender, its
recipient, the amount transferred, and its memo. It does not hide the fee it
paid, because the fee is the value left over in the transparent transaction
value pool, and every term of that sum is public.

Shielded memo protocols do exist on Zcash. ZINC is one. They are not read
here, because reading them would require holding other people's viewing
keys. They are accounted for in one way only: the ZRunes marker was chosen
so that it cannot collide with them.

## Which operations need a transparent address

| Operation | Transparent address required | Why |
| --- | --- | --- |
| Receiving an inscription | Yes, the destination | the Zerdinal attaches to a transparent output |
| Inscribing a Zerdinal | Yes, the destination | as above |
| Etching, minting, or transferring a ZRune | Yes | ZRunes exist only on transparent outputs |
| Minting a ZRC-20 token | Yes | a mint with no transparent recipient is rejected outright |
| Transferring a ZRC-20 balance | Yes | a transfer inscription with no transparent holder is rejected outright |
| Holding any asset here | Yes | ownership is control of one transparent output |
| Paying for an order | No | funds may arrive from anywhere, including a shielded wallet or an exchange |

The last row is the only genuine exception, and it is a useful one. Only the
destination has to be transparent. Where you pay from is your business, and
paying from a shielded wallet is a reasonable choice if the source of your
funds matters to you. See
[Pay with any wallet](/docs-zerdinals-and-zrunes/create/pay-with-any-wallet/).

### Which addresses are accepted

| Address form | Usual prefix | Accepted as a destination |
| --- | --- | --- |
| Transparent, pay to public key hash | `t1` | Yes |
| Transparent, pay to script hash | `t3` | Yes |
| Unified address containing a transparent receiver | `u1` | Yes, once the transparent receiver has been extracted and verified |
| Unified address with no transparent receiver | `u1` | No |
| Shielded Sapling address | `zs1` | No |

A shielded-only recipient is rejected before any transaction is built,
rather than accepted and then failing on the chain. The check is not a
pattern match on the text: a transparent address is decoded with
Base58Check, verified against the network's own P2PKH and P2SH version
bytes, and required to carry a payload of exactly twenty-two bytes. A
unified address is decoded in full, through Bech32m, F4Jumble, and the
receiver list, because a receiver set is jumbled precisely so that a
partially checked string cannot be altered quietly. Anything that fails a
rule is rejected rather than repaired.

## What happens when an asset-bearing output is spent

Three outcomes, decided by the transaction itself. There is no discretion
anywhere in this: two independent indexers reach the same answer for every
transaction.

<figure class="zz-figure">
<svg viewBox="0 0 480 400" role="img" aria-labelledby="figure-outcomes-title" aria-describedby="figure-outcomes-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="figure-outcomes-title">The three outcomes when an asset-bearing output is spent</title>
  <desc id="figure-outcomes-desc">A decision flow. An asset-bearing output is spent. First question: does the spending transaction have a transparent output that is not an OP_RETURN? If yes, the asset moves to the first such output. If no, second question: does the transaction have a shielded bundle? If yes, the asset becomes shielded and untrackable and tracking ends permanently. If no, the asset is burned and the record ends there. Both of the second and third outcomes are terminal and permanent.</desc>
  <rect x="12" y="8" width="456" height="44" fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" />
  <text x="30" y="36" font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">An asset-bearing output is spent</text>
  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M146 52 V74" />
    <path d="M140 66 L146 75 L152 66" />
  </g>

  <rect x="12" y="78" width="268" height="70" fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" />
  <g font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">
    <text x="30" y="108">A transparent output</text>
    <text x="30" y="130">that is not an OP_RETURN?</text>
  </g>
  <g stroke="var(--zz-diagram-move)" stroke-width="1.5" fill="none">
    <path d="M280 113 H296" />
    <path d="M289 107 L298 113 L289 119" />
  </g>
  <text x="290" y="72" text-anchor="middle" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">yes</text>
  <rect x="300" y="78" width="168" height="70" fill="none" stroke="var(--zz-diagram-move)" />
  <text x="316" y="108" font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">It moves</text>
  <text x="316" y="130" font-family="inherit" font-size="15" fill="var(--zz-diagram-muted)">to the first one</text>

  <g stroke="var(--zz-diagram-rule)" stroke-width="1.5" fill="none">
    <path d="M146 148 V174" />
    <path d="M140 166 L146 175 L152 166" />
  </g>
  <text x="156" y="167" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">no</text>

  <rect x="12" y="178" width="268" height="70" fill="var(--zz-diagram-panel)" stroke="var(--zz-diagram-rule)" />
  <g font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">
    <text x="30" y="208">A Sapling, Orchard or</text>
    <text x="30" y="230">Ironwood bundle?</text>
  </g>
  <g stroke="var(--zz-diagram-shielded)" stroke-width="1.5" fill="none">
    <path d="M280 213 H296" />
    <path d="M289 207 L298 213 L289 219" />
  </g>
  <text x="290" y="172" text-anchor="middle" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">yes</text>
  <rect x="300" y="178" width="168" height="70" fill="none" stroke="var(--zz-diagram-shielded)" />
  <text x="316" y="208" font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">Shielded,</text>
  <text x="316" y="230" font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">untrackable</text>

  <g stroke="var(--zz-diagram-burn)" stroke-width="1.5" fill="none">
    <path d="M146 248 V313 H296" />
    <path d="M289 307 L298 313 L289 319" />
  </g>
  <text x="156" y="267" font-family="inherit" font-size="14" fill="var(--zz-diagram-muted)">no</text>
  <rect x="300" y="278" width="168" height="70" fill="none" stroke="var(--zz-diagram-burn)" />
  <text x="316" y="308" font-family="inherit" font-size="17" fill="var(--zz-diagram-ink)">Burned</text>
  <text x="316" y="330" font-family="inherit" font-size="15" fill="var(--zz-diagram-muted)">the record ends here</text>

  <text x="12" y="382" font-family="inherit" font-size="15" fill="var(--zz-diagram-muted)">The lower two outcomes are terminal and permanent.</text>
</svg>
<figcaption>The order of the questions is the whole rule. A transparent successor wins: shielded bundles in the same transaction are irrelevant if one exists.</figcaption>
</figure>

Read the first question carefully, because it is the one that protects you.
A transaction can carry a shielded bundle and still move an asset normally.
Shielding only ends tracking when the transaction leaves the asset with
nowhere transparent to go.

## What shielding does to an asset

Shielding does not make an asset private. It ends its trackability.

- If an inscription-bearing output is spent with no transparent successor
  and the transaction has a shielded component, the inscription enters the
  terminal state **shielded, untrackable**. It provably existed, its
  provenance up to that transaction remains verifiable, and no owner can
  ever be named again. The product displays this state plainly, with its own
  colour and its own broken-outline chip, and never guesses a shielded owner.
- If ZRune-bearing value goes shielded with no transparent successor, the
  balance is **burned by protocol rule**. It does not wait in the shielded
  pool; it is gone.
- A ZRC-20 amount settled into a shielded transaction is counted in its own
  **shielded** bucket, kept apart from circulating and burned, so that
  either accounting can be derived exactly rather than one being chosen for
  you. The supply identity the indexer enforces is
  `minted = circulating + burned + shielded`.

Unshielding later does not undo any of it. Tracking that has ended stays
ended, and returning value never resurrects an untrackable Zerdinal.

## What you will and will not see

This is the part most Zcash explorers get wrong, so it is worth being
precise about what the product does instead.

- **The artifact is not hidden and not deleted.** An untrackable Zerdinal
  keeps its page. That page shows the complete provenance chain, then the
  shielding transaction, then the terminal state. It is a fact with a
  transaction behind it, not a gap.
- **No owner is shown, and none is guessed.** There is no "unknown holder"
  placeholder standing in for a real address.
- **A transparent address page covers transparent activity only**, and says
  so on the page rather than implying it is a complete picture of that
  person's holdings.
- **A shielded or unified address is answered honestly, not with an error.**
  Ask the public API about one and it replies successfully, reports the
  address as not publicly observable, returns no balance, no outputs and no
  transaction history, and states that this activity cannot be observed
  without viewing keys. An empty answer that means "not observable" is never
  dressed up as an answer that means "nothing here".
- **An empty result during a scan means "not found yet", never "does not
  exist".** Every response carries how far the chain has been read. See
  [What an empty result means](/docs-zerdinals-and-zrunes/verify/coverage/).

## How often this actually happens

Often enough that it is not a footnote. In the indexer's compatibility
measurement of 30 August 2026, taken at scanned height 3,465,610, 15,388 of
the 112,814 indexed inscriptions were already in the shielded terminal
state. That is roughly one in seven.

Those figures are a single dated measurement rather than a live counter.
The current numbers are the ones the explorer and the public API report,
and both publish the height they were read at.

## A concrete example

An owner spends the output carrying inscription No. 087871 into a shielded
pool, leaving no transparent output behind. From that block on, the
artifact's page shows its complete history, then the shielding transaction,
then the state **shielded, untrackable**. If someone later unshields the
same amount of ZEC, nothing connects it to the inscription; the protocol
never re-attaches tracking, and neither does the product.

## Safety boundary

If you need financial privacy on Zcash, use shielded ZEC through a shielded
wallet, and keep that activity separate from your artifact activity. Do not
shield an asset-bearing output expecting to get the asset back.

Two habits follow from everything above:

1. Keep artifact addresses separate from spending addresses, so an ordinary
   payment can never select an asset-bearing output as change.
2. Check what an output carries before you spend it. One output can carry
   hundreds of inscriptions, and they all move together.

## Technical detail

The exact conditions distinguishing a move, a burn, and a shielded terminal
state are normative:
[Zerdinals v1](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/) defines
`SHIELDED_UNTRACKABLE` and `BURNED`;
[ZRunes v1](/docs-zerdinals-and-zrunes/protocols/zrunes-v1/) defines when a
balance burns. Both are deterministic: two independent indexers reach the
same answer for every transaction.

The reasoning for building on transparent data in the first place, including
why per-unit tracking of the kind used on Bitcoin cannot be made
deterministic on Zcash, is set out in
[The ordinality decision](/docs-zerdinals-and-zrunes/protocols/ordinality/).

## Related

- [Ownership lives on outputs](/docs-zerdinals-and-zrunes/understand/ownership-and-outputs/)
- [Safety in sixty seconds](/docs-zerdinals-and-zrunes/start/safety/)
- [Protect asset-bearing outputs](/docs-zerdinals-and-zrunes/own/protect/)
- [Public HTTP API](/docs-zerdinals-and-zrunes/developers/api/)
