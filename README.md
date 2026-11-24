# Ruchira Patil · Engineering Portfolio

A React and Vite portfolio with Tailwind CSS, static HTML for every public route, and React hydration for interactive elements. The recruiter hub provides a short career summary, work samples, education, and résumé and contact links.

## Local setup

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

## Build and checks

```sh
npm run lint
npm run build
npm test
npx playwright install chromium
npm run test:browser
```

The static tests check generated pages, metadata, and links. Playwright checks direct navigation, responsive layouts, résumé download, diagrams, and persisted theme selection. Axe scans each public route in light and dark mode.

## Content and routing

- `src/data/profile.js` holds the verified résumé and profile links. The PDF lives in `public/`.
- `src/data/portfolio.js` holds capabilities, the timeline, case-study summaries and writing drafts.
- `src/data/personal.js` holds the About, Beyond Tech, and Vision copy.
- Add a Markdown file to `src/journal/` and register its matching slug, title, topic, and description in the `articles` list in `src/data/portfolio.js`. Start article sections with level-two headings. The renderer escapes inline HTML.
- `src/routes.js` defines public URLs and per-page metadata. Add an entry here when adding a page.
- `src/components/Architecture.tsx` contains the interactive workflow and scenario controls.
- `scripts/prerender.mjs` renders static route files, canonical tags, structured data, a sitemap, and a 404 document.

LinkedIn summaries are grounded in the supplied résumé and project brief. Workflow diagrams on employer pages are illustrative. Confirm responsibilities, technologies, and outcomes before expanding the two case studies pending review. Keep the draft labels on writing until the owner has reviewed the copy.

GitHub Actions runs checks on pull requests. The existing GitHub Pages workflow deploys from `master`. The review branch can be built and tested locally without publishing.
