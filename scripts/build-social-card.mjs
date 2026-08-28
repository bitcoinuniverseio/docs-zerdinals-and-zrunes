#!/usr/bin/env node
// Builds public/social-card.png, the 1200x630 image link previews show.
//
// Generated rather than drawn by hand so it always uses the real wordmark,
// palette, and display face. It deliberately carries no chain count: social
// cards are cached by every platform that scrapes them, so a number baked in
// would be stale within an hour.
//
// Playwright is not a dependency of this repository; run the script from the
// product checkout's frontend directory, which has it:
//
//   cd ../zerdinals-and-zrunes/frontend
//   node ../../docs-zerdinals-and-zrunes/docs-zerdinals-and-zrunes/scripts/build-social-card.mjs
//
// then review and commit the changed PNG here.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(resolve(process.cwd(), 'package.json'));
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const fontData = readFileSync(resolve(root, 'src/fonts/archivo-expanded-latin.woff2')).toString('base64');
const uiFont = readFileSync(
  resolve(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Archivo Expanded';font-weight:400 900;src:url(data:font/woff2;base64,${fontData}) format('woff2-variations')}
@font-face{font-family:'Geist';font-weight:100 900;src:url(data:font/woff2;base64,${uiFont}) format('woff2-variations')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0B0D10;color:#F4F6F9;font-family:'Geist',sans-serif;overflow:hidden}
.mark{position:absolute;top:0;left:0;right:0;height:10px;background:#D8F252}
.pad{padding:76px 80px;height:100%;display:flex;flex-direction:column;justify-content:space-between}
.lock{display:flex;align-items:center;gap:16px}
.lock svg{width:44px;height:44px}
.name{font-family:'Archivo Expanded';font-weight:800;font-size:27px;letter-spacing:.04em;text-transform:uppercase}
.name em{font-style:normal;font-weight:500;color:#7C8695}
h1{font-family:'Archivo Expanded';font-weight:800;font-size:88px;line-height:.92;letter-spacing:-.02em;text-transform:uppercase}
h1 span{color:#D8F252}
p{margin-top:26px;font-size:25px;line-height:1.4;color:#A7B0BE;max-width:30ch}
.foot{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid #242932;padding-top:22px;font-size:19px;color:#7C8695}
.foot b{font-weight:500;color:#A7B0BE}
</style></head><body><div class="mark"></div><div class="pad">
<div class="lock">
  <svg viewBox="0 0 32 32"><path d="M4 4h24L4 28Z" fill="#F4F6F9"/><rect x="4" y="4" width="24" height="24" fill="none" stroke="#F4F6F9" stroke-width="2.5"/><path d="M29 3 3 29" stroke="#D8F252" stroke-width="3.5"/></svg>
  <span class="name">Zerdinals <em>/ ZRunes</em></span>
</div>
<div><h1>Read the<br><span>documentation</span></h1>
<p>Understand, create, own, and verify Zcash digital artifacts. Every claim checkable against the chain.</p></div>
<div class="foot"><span><b>zrunes.io</b></span><span>Public documentation</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const buffer = await page.screenshot({ type: 'png' });
await browser.close();

const out = resolve(root, 'public', 'social-card.png');
writeFileSync(out, buffer);
console.log(`social-card.png: ${buffer.byteLength} bytes`);
