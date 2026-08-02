# Next session — start here

**Last session:** 2026-08-02
**Branch:** `docs/brand-system`
**State:** Brand system designed and committed. Site rebuild not started.

---

## Say this to start

> Read `docs/NEXT-SESSION.md` and `docs/superpowers/specs/2026-08-02-rogue-drones-brand-system-design.md`.
> We're brainstorming the site rebuild spec.

---

## What's locked

| Decision | Value |
|---|---|
| Name & logo | Unchanged. Kārearea + mountains + `ROGUE DRONES`, department name added by the designer |
| Structure | Home + one page per department: Websites, Web Applications, AI & Automation |
| Palette | **Schist** — cool monochrome. No brand colour; all colour comes from screenshots of the work |
| Type | **IBM Plex Sans + IBM Plex Mono**, self-hosted, nothing heavier than 500 |
| Mechanisms | *Drone* = repetition, grid, mono. *Rogue* = exactly one deviation per page |
| Voice | Phil's own. No preamble, no corporate polish, no te reo |
| Home gotcha | Full-bleed map as the spine — scrolls between real project sites, each landing point a case study |
| Web Apps gotcha | Before/after drag slider: raw aerial vs. classified GIS layer |
| Imagery | Screenshots of actual work. The old hero photo goes |

Everything above came out of a long conversation. Don't relitigate it — if something needs
to change, change it deliberately and update the spec.

## What's still open

1. **The map treatment.** Parked deliberately. Monochrome and abstract, or true-colour
   satellite as the single loudest thing on an otherwise silent page? This is a site decision,
   not a brand one, so it belongs in the next spec.
2. **Which host is actually live** — GitHub Pages or Cloudflare Pages. The repo contains both
   and they contradict each other. See `CLAUDE.md`. Worth checking DNS for roguedrones.co.nz
   before designing the build.
3. **Framework choice for the rebuild.** Four pages sharing a shell. Not discussed yet. Bias
   toward the least machinery that gives shared layout and self-hosted fonts.
4. **Whether v1 gets deleted or kept.** Phil said he's happy to scrap it entirely.
5. **Designer's artwork.** Department lockups, stretch/banner variant and other variations are
   with the graphic designer, who holds the brief and is currently swamped. Her artwork wins
   over anything in the spec. The rebuild can proceed with the two existing logo states.

## Review still owed

Phil hasn't marked up the brand spec yet. Three things in it were decided without him and were
flagged for pushback:

- `--slate-dark #5F6468` added as a seventh token, purely to fix an AA contrast failure for
  small secondary text
- Form field borders use `--slate`, not `--silver` — the one place the "silver is the boundary"
  rule yields to accessibility
- All of §8 (spacing scale, 12-column grid, motion) is unreviewed. The load-bearing rule is
  **border radius 0, no shadows, no gradients, no icon font**

## Next move

Brainstorm the **site rebuild spec** — architecture, page structure, the map treatment, the
build and hosting. Brand first, build second; that ordering was deliberate.
