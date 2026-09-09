import { cp } from 'node:fs/promises';

// A new delivery path also invalidates cached worker response policies. Keep
// the original bundle available for documents opened before this release.
const directory = 'pagefind-selfhosted-v1';
const original = "bundlePath: import.meta.env.BASE_URL.replace(/\\/$/, '') + '/pagefind/'";

export default function versionSearch() {
  let transformed = false;
  return {
    name: 'version-self-hosted-search',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({ vite: { plugins: [{
          name: 'version-starlight-search-bundle',
          enforce: 'pre',
          transform(source, id) {
            if (!id.replaceAll('\\', '/').split('?')[0].endsWith('/@astrojs/starlight/components/Search.astro')) return;
            if (!source.includes(original)) return;
            if (source.split(original).length !== 2) throw new Error('Unexpected Starlight search bundle reference');
            transformed = true;
            return source.replace(original, original.replace('/pagefind/', `/${directory}/`));
          },
        }] } });
      },
      'astro:build:done': async ({ dir }) => {
        if (!transformed) throw new Error('Starlight search path was not versioned; review the upstream component');
        await cp(new URL('pagefind/', dir), new URL(directory + '/', dir), { recursive: true, errorOnExist: true, force: false });
      },
    },
  };
}
