#!/usr/bin/env node
// llms.txt is the machine-readable index of this site, so a page missing from
// it is a page no model reading the index knows exists. Six were missing when
// this check was written, all of them added to the sidebar later than the
// index. The sidebar is the list of pages the site actually publishes, so the
// two are compared against each other rather than maintained in parallel.
import { readFileSync } from 'node:fs';

const SITE = 'https://bitcoinuniverseio.github.io/docs-zerdinals-and-zrunes';

const config = readFileSync('astro.config.mjs', 'utf8');
const llms = readFileSync('public/llms.txt', 'utf8');

const slugs = [...config.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
if (slugs.length === 0) {
  console.error('check-llms: found no sidebar slugs, the config format must have changed');
  process.exit(1);
}

// Each entry is a Markdown link ending in a trailing slash and a bracket, so
// the slug is everything between the site root and that closing "/)".
const linked = new Set(
  [...llms.matchAll(new RegExp(`${SITE}/([^)\\s]+)/\\)`, 'g'))].map((match) => match[1]),
);

const failures = [];
for (const slug of slugs) if (!linked.has(slug)) failures.push(`missing from llms.txt: ${slug}`);
const known = new Set(slugs);
for (const slug of linked) if (!known.has(slug)) failures.push(`not a published page: ${slug}`);

if (failures.length > 0) {
  console.error(`llms.txt does not match the sidebar, ${failures.length} finding(s)\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`llms.txt lists all ${slugs.length} sidebar pages, with no entry for a page that does not exist`);
