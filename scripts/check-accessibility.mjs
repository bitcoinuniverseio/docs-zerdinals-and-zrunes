#!/usr/bin/env node
// Accessibility gate for the built site.
//
// Runs axe with every rule enabled over every page, in both colour schemes,
// at a phone width and a desktop width, and fails on any violation. Colour
// contrast is the reason this drives a real browser rather than jsdom:
// nothing that does not paint can evaluate it.
//
// It also fails a page that scrolls sideways. A documentation page that a
// reader has to pan is broken on a phone whether or not axe has a rule for
// it, and long code samples and wide tables are exactly what a docs site is
// full of.
//
//   npm run build && npm run check:a11y
//
// Two real defects came out of writing it, both invisible to every other
// check here. Expressive Code promotes an overflowing code block into a
// landmark with no accessible name, so any page with two of them had two
// landmarks a screen reader could not tell apart; the API reference had
// four. And the table of the two ZRC-20 readings had an unnamed first
// column, which is the column holding the thing each row is about.
//
//   --base   the origin to audit (default http://localhost:4323)
//   --routes a comma separated subset, for a quick loop while fixing one page

import { createRequire } from 'node:module'
import { readdirSync } from 'node:fs'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const AXE_PATH = require.resolve('axe-core/axe.min.js')

const args = new Map()
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1])
}
const BASE = (args.get('base') ?? 'http://localhost:4323').replace(/\/$/, '')
const PREFIX = '/docs-zerdinals-and-zrunes'

// Every page the site publishes. A new page must be added here, which is the
// point: an unaudited page should be a decision rather than an oversight.
const ALL_ROUTES = [
  '/',
  '/start/what-this-is/',
  '/start/finding-your-way-around/',
  '/start/safety/',
  '/start/status/',
  '/understand/zerdinals/',
  '/understand/zrunes/',
  '/understand/zrc-20/',
  '/understand/collections/',
  '/understand/ownership-and-outputs/',
  '/understand/transparent-and-shielded/',
  '/create/pay-with-any-wallet/',
  '/create/inscribe/',
  '/create/tokens-and-collections/',
  '/create/etch-mint-transfer/',
  '/create/fees/',
  '/create/signing-availability/',
  '/own/portfolio/',
  '/own/protect/',
  '/own/recovery/',
  '/market/buying-and-selling/',
  '/verify/zordiscan/',
  '/verify/search/',
  '/verify/coverage/',
  '/verify/proof-bundles/',
  '/developers/api/',
  '/developers/architecture/',
  '/developers/order-notifications/',
  '/protocols/zerdinals-v1/',
  '/protocols/zrunes-v1/',
  '/protocols/collections-v1/',
  '/protocols/ordinality/',
  '/protocols/zmarket-orders-v1/',
  '/help/faq/',
  '/help/known-limitations/',
]

const routes =
  args.get('routes') === undefined
    ? ALL_ROUTES
    : args.get('routes').split(',').map((route) => route.trim())

// The list above is written by hand on purpose, so an unaudited page is a
// decision. It stopped being a decision once five published pages had been
// missed, so the list is now checked against what the build actually
// produced. Adding a page to the sidebar without adding it here fails.
if (args.get('routes') === undefined) {
  const built = []
  const walk = (directory, route) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(`${directory}/${entry.name}`, `${route}/${entry.name}`)
      else if (entry.name === 'index.html') built.push(`${route}/`)
    }
  }
  walk('dist', '')
  const listed = new Set(ALL_ROUTES)
  const unaudited = built.filter((route) => !listed.has(route)).sort()
  if (unaudited.length > 0) {
    console.error(
      `accessibility: ${unaudited.length} built page(s) are not in ALL_ROUTES and would go unaudited\n`,
    )
    for (const route of unaudited) console.error(`  ${route}`)
    process.exit(1)
  }
}

// 375 is the narrowest phone worth supporting; 1440 is where the sidebar,
// the table of contents and the content column all appear at once.
const WIDTHS = [375, 1440]
const SCHEMES = ['light', 'dark']

const browser = await chromium.launch()
const failures = []
let renders = 0

for (const colorScheme of SCHEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      colorScheme,
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    })
    const page = await context.newPage()
    for (const route of routes) {
      const url = `${BASE}${PREFIX}${route}`
      const response = await page.goto(url, { waitUntil: 'networkidle' })
      if (response === null || !response.ok()) {
        failures.push(`${colorScheme} ${width} ${route}: ${response?.status() ?? 'no response'}`)
        continue
      }
      await page.addScriptTag({ path: AXE_PATH })
      const result = await page.evaluate(
        async () => await window.axe.run(document, { resultTypes: ['violations'] }),
      )
      renders += 1
      for (const violation of result.violations) {
        failures.push(
          `${colorScheme} ${width} ${route}: ${violation.id} (${violation.impact}) on ${violation.nodes.length} element(s)\n      ${violation.help}`,
        )
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      // One pixel of slack for subpixel rounding, and no more.
      if (overflow > 1) {
        failures.push(`${colorScheme} ${width} ${route}: scrolls sideways by ${overflow}px`)
      }
    }
    await context.close()
  }
}

await browser.close()

if (failures.length > 0) {
  console.error(`accessibility: ${failures.length} problem(s) across ${renders} renders\n`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}

console.log(
  `accessibility: ${renders} renders audited across ${routes.length} pages, ${SCHEMES.length} colour schemes and ${WIDTHS.length} widths, no violations and no sideways scroll`,
)
