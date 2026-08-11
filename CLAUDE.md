# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: this repo hosts a rebuild of the whole organisation

Read `docs/REBUILD.md` first. As of 2026-08-05 this is no longer a website rebuild — it is a
ground-up rebuild of Rogue Drones covering identity, language, presentation, how clients are
won, and how client data is captured. The website is one workstream of five.

**Identity and language are both settled** (2026-08-05 and 2026-08-11). The website is the
current workstream. `docs/FOUNDATIONS.md` is complete and is the authority on what the
business is allowed to say about itself — read it before writing any copy.

Consequence for anyone working here: **most of what lands in `docs/` has nothing to do with
the code in this repo.** That is deliberate — it is the only version-controlled home
available and specs need history more than a tidy path. The directory name is historical.

The approved identity spec is
`docs/superpowers/specs/2026-08-02-rogue-drones-brand-system-design.md`. Its §10 conformance
checklist is the acceptance test for any new UI. Everything ships on the `docs/brand-system`
branch.

The current site is being replaced, not maintained. Do not fix things in it. The replacement
is scoped as a home page plus one page per department (Websites, Web Applications, AI &
Automation), and that spec has not been written yet.

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

## Deployment — Cloudflare Pages is live (resolved 2026-08-05)

Two deploy paths exist in the repo. **Cloudflare Pages is the one actually serving
roguedrones.co.nz.** Evidence:

- Apex and `www` both resolve to Cloudflare (`172.67.144.33`, `104.21.55.23`)
- The CSP served on `https://roguedrones.co.nz` is byte-for-byte the string inside
  `createHeadersFile()` in `build-optimized.js`, including `*.philhardman.workers.dev`.
  GitHub Pages ignores `_headers`, so it cannot be the origin.

`.github/workflows/deploy.yml` (push to `master` → GitHub Pages) and the root `CNAME` are
dead weight. Delete them during the rebuild rather than leaving a second path that looks live.

## Conventions

- Branch for changes; `master` is the deploy trigger for the GitHub Pages path.
- The brand spec's conformance checklist (§10) is the acceptance test for any new UI.
