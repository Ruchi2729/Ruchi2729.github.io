# Ruchira Patil · Personal Portfolio

A concise one-page portfolio built with React, Vite, and Tailwind CSS. The site includes a single editorial hero image, an introduction, and contact links.

## Local preview

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run build
npm test
npx playwright install chromium
npm run test:browser
```

The build writes a prerendered homepage, a 404 page, and a sitemap to `dist/`. The static tests check metadata, assets, and links. Playwright checks navigation, the résumé download, the hero image, mobile layout, and accessibility.

Homepage content lives in `src/App.jsx`. The hero image and résumé are in `public/`.
