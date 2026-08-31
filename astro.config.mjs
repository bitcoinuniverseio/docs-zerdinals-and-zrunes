// Documentation site for Zerdinals and ZRunes.
// Static build, deployed to GitHub Pages from main. Search is Pagefind,
// bundled by Starlight: local, loaded on demand, no external service.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';
import { codeBlockAccessibility } from './scripts/ec-code-block-a11y.mjs';

export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeTableScroll],
  },
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-zerdinals-and-zrunes',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      expressiveCode: { plugins: [codeBlockAccessibility()] },
      title: 'Zerdinals and ZRunes',
      description:
        'The record of what has been written into Zcash: Zerdinals inscriptions, ZRunes, ZRC-20 tokens, collections, and the ZordiScan explorer.',
      logo: { src: './public/mark.svg', alt: '' },
      favicon: '/mark.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes',
        },
      ],
      customCss: [
        '@fontsource-variable/geist',
        '@fontsource-variable/geist-mono',
        './src/styles/theme.css',
      ],
      editLink: {
        baseUrl:
          'https://github.com/bitcoinuniverseio/docs-zerdinals-and-zrunes/edit/develop/',
      },
      lastUpdated: true,
      pagination: true,
      credits: false,
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://bitcoinuniverseio.github.io/docs-zerdinals-and-zrunes/social-card.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What this is', slug: 'start/what-this-is' },
            { label: 'Safety in sixty seconds', slug: 'start/safety' },
            { label: 'Current status', slug: 'start/status' },
          ],
        },
        {
          label: 'Understand',
          items: [
            { label: 'Zerdinals', slug: 'understand/zerdinals' },
            { label: 'ZRunes', slug: 'understand/zrunes' },
            { label: 'ZRC-20, and its two readings', slug: 'understand/zrc-20' },
            { label: 'Ownership lives on outputs', slug: 'understand/ownership-and-outputs' },
            { label: 'Transparent and shielded', slug: 'understand/transparent-and-shielded' },
            { label: 'Collections', slug: 'understand/collections' },
          ],
        },
        {
          label: 'Create',
          items: [
            { label: 'Pay with any wallet', slug: 'create/pay-with-any-wallet' },
            { label: 'Inscribe a Zerdinal', slug: 'create/inscribe' },
            { label: 'Create tokens and collections', slug: 'create/tokens-and-collections' },
            { label: 'Etch, mint, transfer ZRunes', slug: 'create/etch-mint-transfer' },
            { label: 'Fees and confirmation', slug: 'create/fees' },
            { label: 'Signing availability', slug: 'create/signing-availability' },
          ],
        },
        {
          label: 'Market',
          items: [
            { label: 'Buying and selling', slug: 'market/buying-and-selling' },
          ],
        },
        {
          label: 'Own and protect',
          items: [
            { label: 'Portfolio and watchlists', slug: 'own/portfolio' },
            { label: 'Protect asset-bearing outputs', slug: 'own/protect' },
            { label: 'Interruptions and recovery', slug: 'own/recovery' },
          ],
        },
        {
          label: 'Verify',
          items: [
            { label: 'Search', slug: 'verify/search' },
            { label: 'ZordiScan', slug: 'verify/zordiscan' },
            { label: 'What an empty result means', slug: 'verify/coverage' },
            { label: 'Proof bundles', slug: 'verify/proof-bundles' },
          ],
        },
        {
          label: 'Protocols',
          items: [
            { label: 'Zerdinals v1 specification', slug: 'protocols/zerdinals-v1' },
            { label: 'ZRunes v1 specification', slug: 'protocols/zrunes-v1' },
            { label: 'Collections v1 specification', slug: 'protocols/collections-v1' },
            { label: 'The ordinality decision', slug: 'protocols/ordinality' },
            { label: 'ZMarket Orders v1 specification', slug: 'protocols/zmarket-orders-v1' },
          ],
        },
        {
          label: 'Developers',
          items: [
            { label: 'Architecture', slug: 'developers/architecture' },
            { label: 'Public HTTP API', slug: 'developers/api' },
            { label: 'Order notifications', slug: 'developers/order-notifications' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Frequently asked questions', slug: 'help/faq' },
            { label: 'Known limitations', slug: 'help/known-limitations' },
          ],
        },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
      ],
    }),
  ],
});
