# Screenshot manifest

Every capture in this directory records how it was produced, so a stale one
can be detected and regenerated identically.

| File | Product commit | URL | Viewport | Theme | Captured | Command |
| --- | --- | --- | --- | --- | --- | --- |
| discover-1440-dark.png | bd3bede4a2384f5b0780c41420e23eb07d09a61b | https://zrunes.io/ | 1440x900 | dark | 2026-08-28 | Playwright chromium: goto, networkidle, 2.5s settle, viewport screenshot |

Regeneration: run a Playwright chromium page at the listed viewport with
`colorScheme` set to the listed theme against the listed URL, wait for
network idle plus 2.5 seconds, and take a viewport screenshot. Update the
product commit column from the deployment record on the
[status page](../../src/content/docs/start/status.mdx) and refresh this row.
