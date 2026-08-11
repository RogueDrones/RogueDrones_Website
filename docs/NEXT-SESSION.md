# Next session — start here

**Last session:** 2026-08-11
**Branch:** `docs/brand-system` (clean, everything committed)
**Programme:** a ground-up rebuild of Rogue Drones, not a website rebuild. Rescoped 2026-08-05.

---

## Say this to start

> Read `docs/REBUILD.md`, `docs/FOUNDATIONS.md` and `docs/NEXT-SESSION.md`.
> Workstream 2 is closed. We're on presentation.

If you want to do something else instead, say which workstream — the docs are structured so
any of them can be picked up cold.

---

## Where the programme is

| # | Workstream | Status |
|---|---|---|
| 1 | Identity — marks, colour, type, form | Spec approved. Phil's review still owed |
| 2 | Language — purpose, vision, mission, values, motto | **Closed 2026-08-11** |
| 3 | Presentation — website, case studies, collateral | **Current.** Not started |
| 4 | Winning work — positioning, proposals, pricing | Not started |
| 5 | Client data — intake, what gets captured, where it lives | Not started |
| 6 | Rogue Drones' own drones | Parked 2026-08-05, argument in `REBUILD.md` |
| 7 | *Open* | Named when reached |

---

## What is settled

All of it in `docs/FOUNDATIONS.md`, which is short and should be read in full before writing
anything. It is now complete — purpose, vision, what the business does, mission, capacity,
who it's for, values, language rules, motto. In brief:

- **Purpose:** *People think they are being productive.* Stands alone.
- **Vision:** a world where humans understand their place. Long account in `docs/VISION.md`,
  Phil's words verbatim, and the reference for what his voice sounds like unperformed.
- **Mission:** *Every mission levels up the operator we named.* Internal. Falsifiable at both
  ends — operator named at scoping, levelled by close.
- **The operator:** the person who runs it after Phil leaves. A role, not a name. New noun as
  of 2026-08-11 and useful well beyond the mission statement.
- **Motto:** *Always on a mission.* Two further lines keep proposed roles — *stop doing the
  drone work* as the philosophy, *free people upwards* aimed at organisations.
- **Capacity:** the size of Phil's hours, for now. Reviewed 2027-08-11, or early if he turns
  down work he wanted twice in a quarter.
- **Values:** four, each with its price named. Nobody becomes idle through something we built.
  Delete it before you build it. No mission starts without an operator. Leave nothing the
  operator cannot run.
- **Language rules:** three. Drone work is possessive. A mission is a job. No minions.

---

## Next move — workstream 3, presentation

Scoped in `CLAUDE.md` as a home page plus one page per department (Websites, Web Applications,
AI & Automation). That spec does not exist yet.

Five things are undecided and at least the first two should be settled before any spec is
written:

1. **Whether the current site is deleted or kept.** Phil is happy to scrap it entirely.
2. **Framework.** Never discussed. Bias toward the least machinery that gives a shared layout
   and self-hosted fonts.
3. **Map treatment** — monochrome and abstract, or true-colour satellite as the single loudest
   thing on a silent page.
4. **What the home page is actually made of**, given the content position below.
5. **Deployment tidy-up.** Cloudflare Pages is live, confirmed 2026-08-05 by DNS and by the
   served CSP matching `createHeadersFile()`. The GitHub Pages workflow and root `CNAME` are
   dead and should be deleted during the rebuild, not left as a second path that looks live.

---

## Open, and owed

1. **Phil's review of the identity spec.** Three items were decided without him: `--slate-dark`
   as a seventh token, form field borders using `--slate` not `--silver`, and all of §8 —
   spacing scale, 12-column grid, motion. Load-bearing rule in §8 is border radius 0, no
   shadows, no gradients, no icon font. Also add "minions" to the §7.2 banned list at review.
2. **Logo as SVG.** Only PNGs exist. Designer holds the artwork for department lockups and the
   banner variant and is swamped. Her artwork wins over the spec.
3. **Case-study content — position noted, do not relitigate.** No project locations, no
   screenshots, no outcomes written up, no record of which clients can be named. Known clients:
   AKV, GorseBusters, Mobility Vehicles Dunedin (Matt Burns), Stephanie Postles, Anna-Rose /
   Rosina And The Weavers, John Carpenter. Claude's position on 2026-08-11 was that this is a
   decaying asset and the only gap that gets more expensive by being left. **Phil disagrees and
   asked for it to be picked up when workstream 3 reaches it, saying he may have something.**
   Ask him before assuming the gap is real.
4. **Whether the close-out procedure carries a "who levelled up" field.** The mission dropped
   its publication clause deliberately. Nothing currently forces an engagement to be written
   up. Open, and tied to item 3.

---

## Two things about how to work here

Both established 2026-08-05 and both cost something when ignored.

**Specs must be finishable.** Nothing tells Phil when a thing is done; left alone he will keep
searching for the best way indefinitely, and he named it as the thing that has held him back.
Write rules that can be satisfied, not principles that can always be pursued further. This is
also why `FOUNDATIONS.md` now ends with a note rather than a to-do list — a new "not written
yet" section appearing there is a signal the search has restarted.

**Clean up after the AI.** Phil is not a developer and cannot audit what he cannot read. Debris
left behind by AI-assisted building is invisible to him by construction — this repo carries two
contradictory deploy paths and scripts pointing at files that do not exist, and most of that is
residue rather than neglect. As of 2026-08-11 this is no longer just an observation: *leave
nothing the operator cannot run* is a value, and it applies to Rogue Drones' own work first.

---

## How the last session went, for calibration

Phil's own lines beat everything generated for him, again and without exception. The mission
took four rounds and landed on his word (*operator*); the motto turned out to have been written
months ago and only needed recognising. Two separate drafting attempts by Claude were rejected
for "barking" — short declarative, full stop, short declarative — which is worth remembering as
a real constraint on his voice rather than a preference. Offer candidates, expect them to be
rewritten, and put the reasoning next to each one so he can argue with the reasoning rather
than the words.
