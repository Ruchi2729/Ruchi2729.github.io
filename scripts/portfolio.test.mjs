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
      const { pathname } = new URL(href, siteUrl)
      const file = pathname.endsWith('/') ? join('dist', pathname, 'index.html') : join('dist', pathname)
      assert.ok((await stat(file)).isFile(), `${path} links to ${href}`)
    }
  }
})

test('homepage includes a single hero image and working section links', async () => {
  const html = await readFile('dist/index.html', 'utf8')
  assert.equal([...html.matchAll(/<img[ >]/g)].length, 1)
  assert.ok(html.includes('src="/engineering-workspace.jpg"'))
  for (const [, anchor] of html.matchAll(/href="\/?#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${anchor}"`), anchor)
  }
})

test('missing pages carry a noindex directive', async () => {
  const html = await readFile('dist/404.html', 'utf8')
  assert.match(html, /name="robots" content="noindex"/)
  assert.match(html, /Page not found/)
})
