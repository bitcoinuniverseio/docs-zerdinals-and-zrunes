---
title: Public HTTP API
description: "The read-only HTTP surface behind the product, with routes, pagination, integer encoding, tested examples, and the checkpoint and coverage that ride on every response."
---

**You will get from this page:** every publicly reachable route, the
conventions shared by all of them, and examples you can run as they stand.

## The surface

The product's indexer publishes a read-only HTTP API through the product
domain:

```text
https://zrunes.io/idx/zcash-metaprotocols
```

- **Network:** Zcash mainnet.
- **Authentication:** none. Everything public is public for everyone.
- **Methods:** GET and HEAD only. Anything else answers 405.
- **Format:** JSON. Inscription content is served as its original bytes with
  its inscribed content type.
- **Stability:** every response carries `schemaVersion` (currently
  `zcash-metaprotocols-api-v1`). Fields are added compatibly; nothing is
  removed or retyped within a schema version.
- **Support boundary:** routes listed on this page are the supported public
  surface. Anything not listed here answers 404 through the public prefix
  and is not a contract.

## Conventions on every response

1. **Exact integers travel as strings.** Heights, amounts, supplies, and
   counters that can exceed safe float range are decimal strings, for
   example `"height": "3463723"`. Parse them as arbitrary-precision
   integers, never as floating point.
2. **Coverage rides along.** List and status responses carry `checkpoint`
   (the indexed block height and hash) and `coverage` (`scannedHeight`,
   `networkHeight`, `blocksBehindNetwork`, `chainComplete`), so a consumer can
   always tell whether an empty result means "does not exist" or "not yet
   read". `blocksBehindNetwork` is never negative: a scan briefly ahead of a
   cached node reading reports zero blocks behind.
   [Why that matters](/docs-zerdinals-and-zrunes/verify/coverage/).
3. **Cursor pagination.** List responses include `next_cursor` (opaque
   string, or absent at the end). Pass it back as `?cursor=` with the same
   `limit` to continue. Cursors are stable across the reorg-safe depth.
   `limit` is capped at 200: a larger value is clamped rather than
   rejected, so always read the length of `items` instead of assuming you
   received what you asked for.
4. **Errors carry the same envelope.** A failing response is the standard
   object with an added `error` string, so `schemaVersion`, `checkpoint`,
   and `coverage` are available even when the request failed. There is no
   separate error format to parse.

## Routes

| Route | Returns |
| --- | --- |
| `GET /status` | Indexer state: checkpoint, coverage, mempool state, and the `zrunes` activation block |
| `GET /inscriptions` | Inscriptions, newest or oldest first (`order`, `limit`, `cursor`, plus kind and media filters) |
| `GET /inscriptions/{id}` | One inscription by id (`txid` + `i` + index), with provenance and state |
| `GET /inscriptions/{id}/content` | The inscribed bytes, served with the inscribed content type |
| `GET /blocks/{height}` | A block's protocol events |
| `GET /transactions/{txid}` | A transaction's protocol reading |
| `GET /addresses/{address}/inscriptions` | Inscriptions held by an address, each against its outpoint |
| `GET /addresses/{address}/zrunes` | ZRune balances held by an address |
| `GET /addresses/{address}/utxos` | The address's transparent outputs |
| `GET /zrunes` | All etched ZRunes |
| `GET /zrunes/{idOrName}` | One ZRune by name (spacers ignored) or id |
| `GET /zrunes/{idOrName}/holders` | Holder balances |
| `GET /zrunes/{idOrName}/activity` | Etch, mint, and transfer events |
| `GET /collections` | Collections with their verification levels |
| `GET /collections/{parentId}/items` | A collection's members with their proofs |
| `GET /activity` | Recent protocol events across the chain |
| `GET /search` | Identifier classification, as used by the product's search |

## Examples

Indexer status, including ZRunes activation:

```bash
curl -s https://zrunes.io/idx/zcash-metaprotocols/status
```

Expected shape (values will have moved with the chain):

```json
{
  "schemaVersion": "zcash-metaprotocols-api-v1",
  "network": "mainnet",
  "checkpoint": { "height": "3463723", "hash": "00000000001ff2d8..." },
  "coverage": {
    "scannedHeight": "3463723",
    "networkHeight": "3463723",
    "blocksBehindNetwork": "0",
    "chainComplete": true
  },
  "state": "ok",
  "zrunes": { "activationHeight": "3470000", "active": false }
}
```

The two newest inscriptions, then the next page:

```bash
curl -s "https://zrunes.io/idx/zcash-metaprotocols/inscriptions?order=newest&limit=2"
```

```bash
curl -s "https://zrunes.io/idx/zcash-metaprotocols/inscriptions?order=newest&limit=2&cursor=CURSOR_FROM_PREVIOUS_RESPONSE"
```

The same call in TypeScript, keeping exact integers exact:

```ts
const response = await fetch(
  'https://zrunes.io/idx/zcash-metaprotocols/inscriptions?order=newest&limit=2'
);
if (!response.ok) throw new Error(`indexer answered ${response.status}`);
const page = await response.json();

for (const inscription of page.items) {
  // Heights are decimal strings; convert with BigInt, never Number.
  const height = BigInt(inscription.genesis_height);
  console.log(`No. ${inscription.sequence} at height ${height}`);
}
// page.next_cursor continues the listing when present.
```

## Errors

| Status | Meaning |
| --- | --- |
| 400 | A query parameter failed validation, for example `error: "invalid cursor"` |
| 404 | The record does not exist within read coverage, and also the answer for a malformed path segment: an unreadable id is reported as not found rather than as a distinct validation failure |
| 405 | Method other than GET or HEAD |
| 429 | Per-client rate limit; back off and retry with delay |
| 503 | The indexer is unavailable; retry with backoff |

Two behaviors worth coding against rather than discovering:

1. **A 404 does not mean the identifier was wrong.** `GET /inscriptions/NOT-AN-ID`
   and a well-formed id that has never existed both answer 404 with an
   `error` string. Validate identifiers on your side if you need to tell a
   typo from an absence.
2. **An address with nothing recorded answers 200, not 404.** The address
   routes return the envelope with `items: []`, so an empty list is the
   normal answer for an address this chain has never seen.

Always read `coverage` before treating a 404 or an empty list as proof of
absence.

## Rate limits and caching

Per-client rate limits protect shared infrastructure; a 429 answers with
retry guidance. Immutable records (an inscription's content, a confirmed
block's events) are served with long cache lifetimes; status and lists are
short-lived. Respect the response cache headers rather than re-fetching
immutable content.

## Rendering inscribed content safely

Inscribed bytes are arbitrary user content. If you render them, do what the
product does: serve them from an isolated origin or with a strict Content
Security Policy, never inline on your application origin, and never execute
inscribed HTML or SVG scripts in a privileged context.

## Versioning and deprecation

The schema version only changes with a breaking change, and the previous
version keeps working through a published migration window. Watch
`schemaVersion` in any stored responses, and pin your consumer to the
version it was written against.

## Related

- [Architecture](/docs-zerdinals-and-zrunes/developers/architecture/)
- [Protocol specifications](/docs-zerdinals-and-zrunes/protocols/zerdinals-v1/)
