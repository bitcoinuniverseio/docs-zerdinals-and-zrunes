---
title: Order notifications
description: Signed webhooks and server-sent event streams for order progress, with verification examples you can run as they stand.
---

**You will get from this page:** how to hear about an order's progress
without polling, how to verify that a delivery really came from this
service, and exactly what the service will and will not do with a callback
URL.

Both channels report the same thing: the order's state transitions, exactly
as the service journals them. Neither channel is load-bearing. An order
completes or fails identically whether anyone is listening, and a missed
notification is recovered by reading the order's status route.

## Webhooks

Every creation request that opens an order accepts an optional
`webhookUrl`. When it is present, the creation response carries a
`webhookSecret`, returned exactly once and never recoverable afterwards;
the service stores only what it needs to sign with, and a lost secret
means registering a fresh order.

Each state transition is delivered as one POST:

```json
{
  "schemaVersion": "order-webhook-v1",
  "orderId": "6f9d2f5a-6a51-4a5e-9a1f-3f6d2e8b7c10",
  "orderKind": "payment",
  "state": "PAID",
  "occurredAt": "2026-08-31T13:05:00.000Z",
  "attempt": 1
}
```

with the header:

```text
X-Zerdinals-Signature: sha256=<hex>
```

The hex is HMAC-SHA256 over the exact request body bytes, keyed with the
UTF-8 bytes of your `webhookSecret`. Verify it before trusting anything in
the body:

```js
import { createHmac, timingSafeEqual } from 'node:crypto'

function verify(rawBody, header, secret) {
  const expected = 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex')
  return header.length === expected.length &&
    timingSafeEqual(Buffer.from(header), Buffer.from(expected))
}
```

Delivery is at-least-once with capped retries at roughly 0s, 30s, 2m, 10m,
and 1h; a 2xx answer ends retries, and the fifth failure ends them
permanently. Answer quickly and do your work after responding; the request
times out after five seconds and follows no redirects.

### What the service will not POST to

A callback URL is a request-forgery vector, so the rules are strict and a
refused URL is a 400 with the reason stated:

- https only, on the default port 443 only, with no userinfo;
- the hostname must not be, and must not resolve to, a loopback, private,
  link-local, or unique-local address. Every DNS answer is checked at
  registration and again before every delivery.

## Server-sent events

Each order's transitions are also available as a stream, gated by the same
order capability as its status route:

```bash
curl -N -H "x-order-capability: YOUR_ORDER_CAPABILITY" \
  "https://zrunes.io/api/payment-orders/YOUR_ORDER_ID/events"
```

Inscription orders use `/api/inscriptions/YOUR_ORDER_ID/events`. The
stream first replays the order's history so far, one `transition` event
each, then delivers new transitions as they are journaled. A comment
heartbeat arrives every 25 seconds, and the stream closes itself after a
terminal state. Each event's `data` is one JSON object with `orderId`,
`orderKind`, `fromState` (null for the creation entry), `toState`,
`reason`, and `at`.

Reconnecting is always safe: the replay means a dropped connection loses
nothing.

## The TypeScript SDK

A zero-dependency typed client for the whole documented order and market
surface lives in the product repository as `packages/zerdinals-sdk`, built
against the same OpenAPI document the backend is conformance-tested
against, with one method per documented operation and a test that fails on
any drift between the two. It is not yet published to a package registry;
distribution is a release decision and this page will say so when it
changes.
