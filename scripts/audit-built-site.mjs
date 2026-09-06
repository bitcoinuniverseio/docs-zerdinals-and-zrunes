import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { preview } from 'astro';

export async function withBuiltPreview(audit, config = {}) {
  const server = await preview({
    root: process.cwd(),
    ...config,
    server: { host: '127.0.0.1', port: 0, open: false },
  });
  try {
    return await audit(`http://127.0.0.1:${server.port}`);
  } finally {
    await server.stop();
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const checker = fileURLToPath(new URL('./check-accessibility.mjs', import.meta.url));
  process.exitCode = await withBuiltPreview((base) => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [checker, '--base', base], { stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) reject(new Error(`Accessibility audit ended with ${signal}`));
      else resolve(code ?? 1);
    });
  }));
}
