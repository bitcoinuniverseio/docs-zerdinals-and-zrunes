// Documentation site for Zordinals and ZRunes.
// Static build, served by the self-hosted product web server. Search is Pagefind,
// bundled by Starlight: local, loaded on demand, no external service.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';
import { codeBlockAccessibility } from './scripts/ec-code-block-a11y.mjs';
import versionSearch from './scripts/version-search.mjs';

/*
 * IMPLEMENTATION-HANDOFF [PRIV-12-DOC01] PREPARATION ONLY
 * STATUS 2026-09-22: the product now publishes /privacy, /cookies and /terms,
 * rendered from frontend/src/legal/legalContent.ts. Two operator facts are marked
 * pending on the pages themselves: the registered legal name and address of the
 * contracting entity, and a governing-law clause. What remains here is the
 * documentation side of that, and it is not scheduled. This comment is the record
 * of where the work lands.
 * Coverage: RELEASE-01, RELEASE-02, RELEASE-03, RELEASE-04, RELEASE-05, RELEASE-06; sources: R-GDPR, R-CRD, R-TECH.
 * Prerequisites: PRIV-01, PRIV-11. Product source register and detailed contracts: docs/implementation/privacy-us-eu-20260921/WORK-PACKAGES.md and SOURCE-REGISTER.md.
 * 1. Add discoverable privacy, cookies, terms and privacy-choice navigation pointing to the product's single approved/versioned legal source. Do not copy unapproved prose or hardcode an invented operator/contact into this documentation configuration.
 * 2. Audit actual docs storage/local Pagefind and external links independently; describe only observed processing and preserve local search and existing sidebar entries. Reuse approved current/archived links and no-JS readable legal pages.
 * 3. Run the existing package build/link checker on this pinned checkout after implementation and public link probes after the coordinated product/docs release. A successful documentation build is not evidence that consent or rights processing works.
 * 4. Rollback restores a compatible docs artifact without removing access to current rights/contact information or publishing contradictory old policies. Preserve the concurrent shared zkmap.md edit; this preparation uses an isolated worktree.
 * Do not change executable behavior in this preparation stage. ANNOTATED is not functional PASS.
 */
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeTableScroll],
  },
  site: 'https://zrunes.io',
  base: '/docs-zerdinals-and-zrunes',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      expressiveCode: { plugins: [codeBlockAccessibility()] },
      title: 'Zordinals and ZRunes',
      description:
        'The record of what has been written into Zcash: Zordinals inscriptions, ZRunes, ZRC-20 tokens, collections, and the Scan explorer.',
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
          attrs: { property: 'og:image', content: 'https://zrunes.io/docs-zerdinals-and-zrunes/social-card.png' },
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
            { label: 'Finding your way around', slug: 'start/finding-your-way-around' },
            { label: 'Safety in sixty seconds', slug: 'start/safety' },
            { label: 'Current status', slug: 'start/status' },
          ],
        },
        {
          label: 'Understand',
          items: [
            { label: 'Zordinals', slug: 'understand/zerdinals' },
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
            { label: 'Inscribe a Zordinal', slug: 'create/inscribe' },
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
            { label: 'The Web Wallet', slug: 'own/web-wallet' },
            { label: 'Send a Zordinal', slug: 'own/send-a-zerdinal' },
            { label: 'Protect asset-bearing outputs', slug: 'own/protect' },
            { label: 'Interruptions and recovery', slug: 'own/recovery' },
          ],
        },
        {
          label: 'Verify',
          items: [
            { label: 'Search', slug: 'verify/search' },
            { label: 'Scan, the explorer', slug: 'verify/zordiscan' },
            { label: 'What an empty result means', slug: 'verify/coverage' },
            { label: 'Proof bundles', slug: 'verify/proof-bundles' },
          ],
        },
        {
          label: 'Protocols',
          items: [
            { label: 'Zordinals v1 specification', slug: 'protocols/zerdinals-v1' },
            { label: 'ZRunes v1 specification', slug: 'protocols/zrunes-v1' },
            { label: 'Collections v1 specification', slug: 'protocols/collections-v1' },
            { label: 'ZkMap v1 specification', slug: 'protocols/zkmap' },
            { label: 'The ordinality decision', slug: 'protocols/ordinality' },
            { label: 'ZMarket Orders v1 specification', slug: 'protocols/zmarket-orders-v1' },
            { label: 'ZMarket Orders v2 specification', slug: 'protocols/zmarket-orders-v2' },
            { label: 'Creator Launches and Public Launchpad', slug: 'protocols/creator-launches' },
            { label: 'Shielded Metaprotocols', slug: 'protocols/shielded-metaprotocols' },
            { label: 'Names and Dual-Registry Architecture', slug: 'protocols/names-and-registries' },
            { label: 'Provenance Studio (C2PA 2.4)', slug: 'protocols/provenance-studio' },
            { label: 'Rights and Remix Studio', slug: 'protocols/rights-and-remix' },
            { label: 'Passes and Events', slug: 'protocols/passes-and-events' },
            { label: 'Private Releases', slug: 'protocols/private-releases' },
            { label: 'Creator Collectives', slug: 'protocols/creator-collectives' },
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
            { label: 'The admin area', slug: 'help/admin' },
          ],
        },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
      ],
    }),
    versionSearch(),
  ],
});
