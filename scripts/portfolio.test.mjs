import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import { routes, siteUrl } from '../src/routes.js'

test('static pages have unique routes, metadata, and one primary heading', async () => {
  assert.equal(new Set(routes.map(({ path }) => path)).size, routes.length)
  for (const { path } of routes) {
    const html = await readFile(join('dist', path, 'index.html'), 'utf8')
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${path}"`), path)
    assert.match(html, /<meta name="description" content="[^"]+"/)
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, path)
    assert.match(html, /href="#main"/)
    assert.match(html, /<main[^>]+id="main"/)
  }
})

test('internal page links and downloadable assets resolve in the static output', async () => {
  for (const { path } of routes) {
    const html = await readFile(join('dist', path, 'index.html'), 'utf8')
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const file = href.endsWith('/') ? join('dist', href, 'index.html') : join('dist', href)
      assert.ok((await stat(file)).isFile(), `${path} links to ${href}`)
    }
  }
})

test('the retired lab is excluded from the public build and sitemap', async () => {
  await assert.rejects(stat('dist/lab'), { code: 'ENOENT' })
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  assert.equal(sitemap.includes('/lab/'), false)
})

test('missing pages carry a noindex directive', async () => {
  const html = await readFile('dist/404.html', 'utf8')
  assert.match(html, /name="robots" content="noindex"/)
  assert.match(html, /Page not found/)
})
