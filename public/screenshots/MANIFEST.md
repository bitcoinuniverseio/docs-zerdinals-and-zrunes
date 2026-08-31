# Screenshot manifest

Every capture in this directory records how it was produced, so a stale one
can be detected and regenerated identically.

| File | Product commit | URL | Viewport | Theme | Captured | Command |
| --- | --- | --- | --- | --- | --- | --- |
| discover-1440-dark.png | 618800fbfc628a3e8a80cd8b493c2d363aa57e61 | https://zrunes.io/ | 1440x900 | dark | 2026-08-31 | Playwright chromium: goto, networkidle, 3s settle, viewport screenshot |

Regeneration: run a Playwright chromium page at the listed viewport with
`colorScheme` set to the listed theme against the listed URL, wait for
network idle plus 3 seconds, and take a viewport screenshot. Update the
product commit column from `src/data/status.json`, which
`npm run status:refresh` fills from the live product, and refresh this row.

A screenshot is stale whenever the product commit here differs from
`product.deployedCommit` in `src/data/status.json`. Recapture rather than
leaving the two disagreeing: the header navigation is visible in this
capture, so a navigation change makes the image wrong, not merely dated.
