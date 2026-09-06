import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { withBuiltPreview } from './audit-built-site.mjs';

test('concurrent previews serve their own build and close on success and failure', async () => {
  const temporaryParent = path.resolve(tmpdir());
  const root = await mkdtemp(path.join(temporaryParent, 'docs-preview-isolation-'));
  const options = [];
  for (const marker of ['first-build', 'second-build']) {
    const project = path.join(root, marker);
    await mkdir(path.join(project, 'dist'), { recursive: true });
    await writeFile(path.join(project, 'dist', 'index.html'), marker);
    options.push({ root: project, configFile: false, logLevel: 'silent' });
  }
  const read = async (base) => {
    const response = await fetch(base, { signal: AbortSignal.timeout(5_000) });
    assert.equal(response.status, 200);
    return response.text();
  };
  let firstBase;
  let secondBase;
  try {
    await withBuiltPreview(async (first) => {
      firstBase = first;
      const expected = new Error('audit failure');
      await assert.rejects(withBuiltPreview(async (second) => {
        secondBase = second;
        assert.notEqual(first, second);
        assert.equal(await read(first), 'first-build');
        assert.equal(await read(second), 'second-build');
        throw expected;
      }, options[1]), (error) => error === expected);
      await assert.rejects(read(secondBase));
      assert.equal(await read(first), 'first-build');
    }, options[0]);
    await assert.rejects(read(firstBase));
  } finally {
    assert.equal(path.dirname(path.resolve(root)), temporaryParent);
    assert.ok(path.basename(root).startsWith('docs-preview-isolation-'));
    await rm(root, { recursive: true });
  }
});
