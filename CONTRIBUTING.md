# Contributing

Thank you for improving this documentation. Everything here is buildable and
checkable locally, and a pull request that passes the checks below will be
reviewed quickly.

## Local preview

```bash
npm ci
npm run dev
```

The site serves at `http://localhost:4321/docs-zerdinals-and-zrunes/`.
`npm run build && npm run preview` serves the exact production build.

## Where content lives

One Markdown source builds both the GitHub view and the website:

- `src/content/docs/` holds every article, grouped by the sidebar sections
  (`start`, `understand`, `create`, `own`, `verify`, `protocols`,
  `developers`, `help`).
- `src/data/status.json` holds every volatile availability fact. Change
  status here, never in prose. `npm run status:refresh` updates it from the
  live product's public endpoints.
- `public/screenshots/` holds product captures; see
  [the manifest](public/screenshots/MANIFEST.md) for how each was produced.
- The protocol pages under `src/content/docs/protocols/` are published
  copies of the product repository's normative files. Fix protocol content
  upstream, not here.

## Writing rules

1. Plain, specific, confident. State the risk before the action. Say
   "unknown" rather than guessing.
2. Every availability claim defers to the status page. Never describe
   planned behavior as live.
3. No marketing language. The copy guard rejects a list of phrases
   (`npm run check:copy`), the long dash character (U+2014), and one banned
   word; write around them rather than tricking the guard.
4. Task guides need: outcome, before-you-begin, steps, what can go wrong,
   how to recover, how to verify. Concept pages need: plain-language
   explanation, why it matters, a concrete example, the safety boundary,
   technical detail, and a specification link.
5. Nothing private: no internal hostnames, IPs, ports, credentials, or
   operational tooling. `npm run check:public-safety` enforces the obvious
   cases; think before adding anything infrastructure-shaped.
6. Every image needs real alt text and a manifest entry recording commit,
   viewport, theme, command, and date.

## Checks

```bash
npm test
```

runs the copy guard, public-safety scan, status-data validation, and
Markdown lint. `npm run build` additionally validates every internal link
and anchor, and `npm run check:external-links` checks outbound links against
the built site.

## Pull requests

- One focused change per pull request, with the reasoning in the
  description.
- Fill in the template, including which pages you verified in the local
  preview.
- CI must pass; a screenshot change must explain how it was regenerated.
