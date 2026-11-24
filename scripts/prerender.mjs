import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { render, routes, siteUrl } from '../node_modules/.cache/portfolio-static/entry-static.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const structuredData = {
  '@context': 'https://schema.org', '@type': 'Person', name: 'Ruchira Patil',
  jobTitle: 'Senior Software Engineer', url: siteUrl,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Northeastern University' },
  sameAs: ['https://github.com/Ruchi2729'],
}

for (const route of [...routes, { path: '/404/', title: 'Page not found', description: 'Return to Ruchira Patil’s portfolio.' }]) {
  const home = route.path === '/'
  const missing = route.path === '/404/'
  const title = escape(home ? route.title : `${route.title} | Ruchira Patil`)
  const description = escape(route.description)
  const url = `${siteUrl}${route.path}`
  const metadata = [
    `<meta name="description" content="${description}">`,
    missing ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${url}">`,
    home ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : '',
  ].join('\n    ')
  const html = template.replace(/<title>.*?<\/title>/, () => `<title>${title}</title>\n    ${metadata}`)
    .replace('<div id="root"></div>', () => `<div id="root">${render(route.path)}</div>`)
  const file = missing ? 'dist/404.html' : join('dist', route.path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(({ path }) => `<url><loc>${siteUrl}${path}</loc></url>`).join('')}</urlset>\n`)
