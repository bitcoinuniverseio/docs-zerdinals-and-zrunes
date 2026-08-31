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

The accessibility gate needs the built site, so it is separate:

```bash
npm run build
npx astro preview --port 4323 &
npm run check:a11y
```

It runs axe with every rule enabled over every page, in both colour schemes,
at 375 and 1440, and fails on any violation. It also fails a page that
scrolls sideways, because a page a reader has to pan on a phone is broken
whether or not axe has a rule for it, and wide tables and long code samples
are what a documentation site is full of.

**A new page has to be added to the route list in
`scripts/check-accessibility.mjs`.** That is deliberate: a page nobody audits
should be a decision rather than an oversight.

## Pull requests

- One focused change per pull request, with the reasoning in the
  description.
- Fill in the template, including which pages you verified in the local
  preview.
- CI must pass; a screenshot change must explain how it was regenerated.

Product screenshot baselines are generated only by the product repository's
`visual-baselines` workflow on its pinned Linux renderer. A maintainer can
limit a refresh with the Playwright title-pattern input. The resulting commit
still has to pass the complete product CI suite before it can merge; a targeted
refresh changes how the approved images are produced, not what the release
gate checks.
