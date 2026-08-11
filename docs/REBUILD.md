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
| 2 | **Language** | Purpose, vision, mission, values, motto, the words the business uses | **Closed 2026-08-11** — all in `FOUNDATIONS.md` |
| 3 | **Presentation** | Website, case studies, collateral, anything a stranger sees | **Current.** Not started |
| 4 | **Winning work** | Positioning, how clients arrive, proposals, pricing, saying no | Not started |
| 5 | **Client data** | Intake, what gets captured about a client and a project, where it lives | Not started |
| 6 | **Rogue Drones' own drones** | Applying the thesis to this organisation | **Parked** — see below |
| 7 | *Open* | Delivery, handover, ongoing support — named when they're reached | Not started |

Row 7 is deliberately vague. It gets filled in when the earlier work makes the shape of it
obvious, not before.

### Workstream 6 — parked 2026-08-05, deliberately

Raised at the end of the 2026-08-05 session and parked the same day. Phil's reason for wanting
it recorded rather than dropped: *I can't instruct other orgs to automate and level up without
doing it myself.*

**The argument so far.**

The method that makes Rogue Drones worth hiring is Phil sitting with people — slow, human,
un-automatable, and the moat. It is also the ceiling: the business stops at his available
hours. The moat and the ceiling are the same fact, and no amount of AI gets past the part that
makes him good.

Which turns the purpose back on him. If people get held at the wrong level doing work a drone
should do, the question is what is holding *him* there. He named it in the first message of
the session without calling it that — the way he captures clients, and the way he captures
client data. Workstreams 4 and 5 are not housekeeping. They are his drones.

**What is already true.** He has a fleet and has not looked at it as one: `field-log`,
`daily-planner`, `akv-close-issue`, `akv-docs-sync`, `akv-host-emails`, `plane-add-item`,
`plane-close-item`, `update-trapnz-db`, `morning`, `sidekick-selector` and others. Each was
built because something annoyed him that day. That is exactly how the GorseBusters spreadsheet
grew, and it carries the same two problems: nobody else could run it, and none of it was
chosen.

**The discipline this must start with**, from his own primer and not negotiable: question the
requirement, delete the process, simplify, accelerate, **then** automate. Automating first
builds a permanent monument to a process that should have died. There is a live risk of
cheerfully building drones for admin that ought not to exist.

**What it needs to start.** An honest inventory of a real week — the actual blocks, including
the unflattering ones. Delete first, then decide what deserves a drone.

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
- `docs/FOUNDATIONS.md` — the settled statements: purpose, vision, what the business does
  about it, language rules. Short by design. Start here.
- `docs/VISION.md` — the long vision, in Phil's words, and what does and doesn't carry down
  from it. Primary source and the reasoning behind `FOUNDATIONS.md`.
- `docs/NEXT-SESSION.md` — session handoff. Rewritten every session.
- `docs/superpowers/specs/` — one dated spec per workstream.
- `../F500 enterprises discovering AI-legible frameworks.md` — a primer from an earlier
  thinking session. Outside the repo, unversioned, and load-bearing. It contains the
  offload-and-climb thesis that turns out to be the same idea as the kārearea in §2.4.
- Everything else in the repo is the old site, which is being replaced.

---

## A constraint that shapes every workstream

Phil's own diagnosis, 2026-08-05: nothing tells him a thing is finished. Left alone he will
keep searching for the best way to do something, indefinitely, and he named it as the thing
that has held him back. It is not that the searching feels productive — he describes it as
frustrating. It is that there is no signal that says stop.

The same trait is why he can see waste in someone else's process at a glance. It is one trait,
not two, and it cannot be half-kept.

**A second cause, and it is not his.** This repo also carries two contradictory deploy paths,
`package.json` scripts pointing at files that do not exist, and three root files the build
ignores. Some of that is an abandoned search; much of it is debris left behind by the AI that
did the building. Phil is not a developer and cannot audit what he cannot read — as he put it, he does
not know to remove what he does not know to remove. Any process that has him building through
AI has to include something that cleans up after it, because he has no way to see it himself.
That is a real operational constraint on the business, not a footnote about this repo.

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
