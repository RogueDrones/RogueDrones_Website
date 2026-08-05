# The Rogue Drones rebuild

**Started:** 2026-08-02 (as a website rebuild)
**Rescoped:** 2026-08-05 (to a ground-up rebuild of the organisation)

---

## What this is

A ground-up rebuild of Rogue Drones — the identity, the language, the way clients are
found, the way their work is captured and run, and the way the organisation presents
itself. The website is one output of it, not the point of it.

The reason is simple and it is not vanity. Rogue Drones sells other organisations the
thing it does not yet have for itself: a system that runs properly without being
babysat. Tidy your own room first. An agency whose own intake is a Gmail thread and
whose own brand is a Bootstrap template has a credibility problem it will never argue
its way out of.

The scale is deliberate. There are a few clients and a few projects — few enough that
rebuilding the foundations now costs a week, and late enough that doing nothing means
carrying the mess into everything that follows.

---

## Workstreams

Each is a spec of its own. They are listed in dependency order, not priority order —
later ones read from earlier ones.

| # | Workstream | Covers | Status |
|---|---|---|---|
| 1 | **Identity** | Marks, colour, type, form, the two mechanisms | **Spec approved** — review owed |
| 2 | **Language** | Motto, naming, the words the business uses about itself | **In progress** |
| 3 | **Presentation** | Website, case studies, collateral, anything a stranger sees | Not started |
| 4 | **Winning work** | Positioning, how clients arrive, proposals, pricing, saying no | Not started |
| 5 | **Client data** | Intake, what gets captured about a client and a project, where it lives | Not started |
| 6 | *Open* | Delivery, handover, ongoing support — named when they're reached | Not started |

Row 6 is deliberately vague. It gets filled in when the earlier work makes the shape of
it obvious, not before.

Workstream 2 is not starting from nothing. §7 of the identity spec already sets the voice
rules — open on the statement, behave don't explain, say what happens not what it's built
with, the banned-word list, one rogue line per page — plus reference copy in §7.4. Language
extends that; it does not replace it.

### Why this order

Identity before language because the mechanisms (repetition, one deviation) turned out to
govern prose as much as layout. Language before presentation because the site is mostly
words. Presentation before winning work because a proposal that contradicts the site is
worse than no site. Client data last of the active four because how you capture a client
depends on what you promised them.

---

## What's locked

From the identity spec — approved, not to be relitigated casually. Full detail in
`superpowers/specs/2026-08-02-rogue-drones-brand-system-design.md`.

| Decision | Value |
|---|---|
| Name & mark | Unchanged. Kārearea + mountains + `ROGUE DRONES` |
| Structure | Three departments: Websites, Web Applications, AI & Automation |
| Palette | **Schist** — cool monochrome. No brand colour; all colour comes from the work |
| Type | **IBM Plex Sans + IBM Plex Mono**, self-hosted, nothing heavier than 500 |
| Mechanisms | *Drone* = repetition, grid, mono. *Rogue* = exactly one deviation, per page |
| Voice | Phil's own. No preamble, no corporate polish, no te reo |
| Form | Border radius 0. No shadows, no gradients, no icon font |

The thesis underneath it, which every workstream reads from: **a drone is anything that
operates by just operating**, and **rogue is a position, not a personality**. Rogue Drones
builds things that run on their own, from outside the conventional boundary.

---

## Where the work lives

Everything is in the `RogueDrones_Website` repo for now, including work that has nothing
to do with the website. That is wrong in the long run and cheap in the short run — it is
the only version-controlled home available, and specs need history more than they need a
tidy path. The directory name is historical. Revisit when workstream 5 needs somewhere to
put actual client data, which must not be in a public repo.

- `docs/REBUILD.md` — this file. Programme structure. Changes rarely.
- `docs/VISION.md` — the long vision, in Phil's words, and what does and doesn't carry down
  from it. Primary source. Read it before writing anything the business says about itself.
- `docs/NEXT-SESSION.md` — session handoff. Rewritten every session.
- `docs/superpowers/specs/` — one dated spec per workstream.
- `../F500 enterprises discovering AI-legible frameworks.md` — a primer from an earlier
  thinking session. Outside the repo, unversioned, and load-bearing. It contains the
  offload-and-climb thesis that turns out to be the same idea as the kārearea in §2.4.
- Everything else in the repo is the old site, which is being replaced.

---

## A constraint that shapes every workstream

Phil's own diagnosis, 2026-08-05: nothing tells him a thing is finished. Left alone he will
improve the same process indefinitely, and he named it as the thing that has held him back.
The evidence is in this repo — two contradictory deploy paths, `package.json` scripts pointing
at files that do not exist, three root files the build ignores. That is not neglect. It is the
residue of improvements that were never closed off.

The same trait is why he can see waste in someone else's process at a glance. It is one trait,
not two, and it cannot be half-kept.

**Consequence for this programme:** every workstream needs stopping rules, not just standards.
The brand spec already works this way and that is probably why it felt right — border radius 0,
exactly one deviation and never two, one spacing scale with no intermediate values, nothing
heavier than 500, no accent colour ever. Each of those ends an argument that would otherwise
run forever. Specs here should be written to be finishable, and a rule that can be satisfied
beats a principle that can always be pursued further.

## Known gaps

1. **Logo is PNG only.** `images/rogue_drones_black.png` and `_white.png`. The identity
   spec requires SVG for web use. Department lockups and the banner variant are with the
   graphic designer, who holds the brief and is swamped. Her artwork wins over the spec.
   The rebuild can proceed on the two existing states, but needs them as clean SVG.
2. **No project or case-study content exists.** No locations, no screenshots of the work,
   no outcomes written up, and no record of which clients can be named publicly. The
   website's home page concept depends entirely on this. It is content, not code, and
   nothing in workstream 3 can be finished without it.
3. **The identity spec is unreviewed.** Three things in it were decided without Phil and
   flagged for pushback — `--slate-dark` as a seventh token, form borders using `--slate`
   rather than `--silver`, and the whole of §8 (spacing scale, 12-column grid, motion).
