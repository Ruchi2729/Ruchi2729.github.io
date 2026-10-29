# GitHub Pages

Target: https://ruchi2729.github.io/
Repository: Ruchi2729/Ruchi2729.github.io (master)

The GitHub Actions workflow installs the locked dependencies, checks lint, builds
with Vite base `/`, and publishes `dist`. In repository Settings → Pages, choose
GitHub Actions as the source. Future pushes to master trigger deployment; it can
also be run manually from Actions.

The original site is retained at `/legacy/`, with its original assets, and remains
in the repository history. Existing root CSS, images, and README are preserved.

Local development: `npm install`, then `npm run dev`.
Production check: `npm run build`, then `npm run preview`.
