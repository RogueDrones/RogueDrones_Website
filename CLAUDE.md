# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: full rebuild in progress

The current site is being replaced, not maintained. Before changing anything, read
`docs/superpowers/specs/2026-08-02-rogue-drones-brand-system-design.md` — the approved brand
system that the rebuild must conform to. It ships on the `docs/brand-system` branch.

The rebuild is scoped as: home page plus one page per department (Websites, Web Applications,
AI & Automation). The site architecture spec has not been written yet.

## Commands

```bash
npm ci                # install
npm run build         # node build-optimized.js -> dist/
npm run preview       # build, then serve dist/ on :3000 via wrangler
npm run dev           # serve dist/ only (stale unless you built first)
```

There are no tests — `npm test` exits 1 by design.

Two scripts in `package.json` reference files that do not exist in the repo and will fail:
`build:basic` (needs `build.js`) and `deploy:worker` (needs `contact-form-worker.js`).

## Architecture

A single-page static site with no framework and no bundler. `static-index.html` is the only
page; the build copies it to `dist/index.html`. Bootstrap 5, Font Awesome, Mapbox GL and
EmailJS are all loaded from third-party CDNs at runtime — nothing is vendored.

`build-optimized.js` is where the real architecture lives. It is not a minifier wrapper; it
generates and rewrites content, which produces three traps:

1. **`_headers`, `robots.txt` and `sitemap.xml` in the repo root are dead files.** The build
   writes its own versions into `dist/`. Editing the root copies changes nothing that ships —
   the CSP that actually deploys is the string inside `createHeadersFile()`.

2. **Mapbox CSS does not exist in `css/`.** `.mapbox-container`, the popup and control styling,
   and the coral `#ff6f61` border are prepended to every CSS file by `processCssFiles()`.
   Grepping the stylesheet for those selectors finds nothing.

3. **Secrets are substituted by string replacement.** `js/main-mapbox.js` ships with
   `YOUR_EMAILJS_*_HERE` placeholders that the build swaps for env vars. Note the Mapbox token
   at the top of that file is a hardcoded live value, not a placeholder, so the
   `MAPBOX_ACCESS_TOKEN` env var is a no-op there. Working EmailJS IDs are also committed as
   fallbacks in `build-optimized.js`. EmailJS client credentials are public by design — the
   only real protection is the domain allowlist in the EmailJS dashboard.

## Deployment is split and contradictory

Two deploy paths exist and they disagree:

- `.github/workflows/deploy.yml` builds on push to `master` and publishes to **GitHub Pages**.
  A `CNAME` file is present, which supports this being the live path.
- `package.json` and `wrangler.toml` target **Cloudflare Pages** plus a Worker, and the
  generated `_headers` and CSP reference `*.philhardman.workers.dev`.

Resolve which one is actually serving roguedrones.co.nz before touching deployment. Do not
assume; the repo does not record the answer.

## Conventions

- Branch for changes; `master` is the deploy trigger for the GitHub Pages path.
- The brand spec's conformance checklist (§10) is the acceptance test for any new UI.
