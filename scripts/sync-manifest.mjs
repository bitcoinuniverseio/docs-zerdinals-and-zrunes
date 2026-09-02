#!/usr/bin/env node
// The documentation manifest is consumed two ways: by the platform, which
// reads it out of the repository, and by anything that only has the site,
// which has to be able to fetch it over HTTP. It lives at the repository
// root because that is where the platform looks for it, so the build copies
// it into public/ rather than keeping a second copy under version control.
// A copy would drift; this cannot.
import { copyFileSync, readFileSync } from 'node:fs';

const SOURCE = 'docs.manifest.json';
const TARGET = 'public/docs.manifest.json';

// Parse before copying: publishing a manifest that is not valid JSON would
// be worse than not publishing one.
JSON.parse(readFileSync(SOURCE, 'utf8'));
copyFileSync(SOURCE, TARGET);
console.log(`copied ${SOURCE} to ${TARGET}`);
