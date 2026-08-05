# Next session — start here

**Last session:** 2026-08-05
**Branch:** `docs/brand-system` (clean, everything committed)
**Programme:** a ground-up rebuild of Rogue Drones, not a website rebuild. Rescoped 2026-08-05.

---

## Say this to start

> Read `docs/REBUILD.md`, `docs/FOUNDATIONS.md` and `docs/NEXT-SESSION.md`.
> We're writing the mission.

If you want to do something else instead, say which workstream — the docs are structured so
any of them can be picked up cold.

---

## Where the programme is

| # | Workstream | Status |
|---|---|---|
| 1 | Identity — marks, colour, type, form | Spec approved. Phil's review still owed |
| 2 | Language — purpose, vision, mission, values, motto | **Current.** Purpose and vision settled |
| 3 | Presentation — website, case studies, collateral | Not started. Blocked on content |
| 4 | Winning work — positioning, proposals, pricing | Not started |
| 5 | Client data — intake, what gets captured, where it lives | Not started |
| 6 | Rogue Drones' own drones | Parked 2026-08-05, argument written up in `REBUILD.md` |
| 7 | *Open* | Named when reached |

---

## What is settled

All of it in `docs/FOUNDATIONS.md`, which is short and should be read in full. In brief:

- **Purpose:** *People think they are being productive.* Stands alone — do not add a second
  clause. Seen from both sides at once, which is what makes it a recognition rather than an
  accusation, and the only reason it can be said in public.
- **Vision:** a world where humans understand their place. Full account in `docs/VISION.md`,
  in Phil's words, verbatim. Read it before writing any copy — it is also the reference for
  what his voice sounds like when he isn't performing.
- **What the business does about it:** puts people back at their proper level. Build the drone,
  hand it the drone work, the person climbs.
- **Who it's for:** organisations that can be known. Not sector, not size — whether Phil can
  understand it and be believed. Enterprise ruled out on method, not ambition.
- **Language rules:** "drone work" is possessive, not descriptive. No minions, ever.

---

## Next move — the mission

The falsifiable one: what Rogue Drones is doing about the purpose, now, with a horizon and a
way to fail. Nothing downstream can be tested without it.

**It is blocked on one question:** the method requires Phil in the room, which is both the moat
and the ceiling. Whether Rogue Drones grows past his available hours — and if so how, given
that the un-automatable part is the part that makes it good — has not been decided.

Two half-written values already exist and should be folded in when values are done as a set:

- Free people upwards. Never lay them off, never leave them idle.
- Nobody loses a job because of something Rogue Drones built.

**The motto comes last.** This was tested on 2026-08-05 — three attempts to write it before the
purpose existed all came out as slogans with nothing underneath. Candidate phrasings already
exist in Phil's own words (*always on a mission*, *stop doing the drone work*) and are
unassessed. His lines have consistently beaten anything generated for him; start there.

---

## Open, and owed

1. **Phil's review of the identity spec.** Three items were decided without him: `--slate-dark`
   as a seventh token, form field borders using `--slate` not `--silver`, and all of §8 —
   spacing scale, 12-column grid, motion. Load-bearing rule in §8 is border radius 0, no
   shadows, no gradients, no icon font. Also add "minions" to the §7.2 banned list at review.
2. **Logo as SVG.** Only PNGs exist. Designer holds the artwork for department lockups and the
   banner variant and is swamped. Her artwork wins over the spec.
3. **No case-study content exists.** No project locations, no screenshots of the work, no
   outcomes written up, no record of which clients can be named. Workstream 3 cannot finish
   without it, and it is writing rather than code. Known clients: AKV, GorseBusters, Mobility
   Vehicles Dunedin (Matt Burns), Stephanie Postles, Anna-Rose / Rosina And The Weavers, John
   Carpenter.
4. **Website map treatment** — monochrome and abstract, or true-colour satellite as the single
   loudest thing on a silent page. Parked; a workstream 3 decision.
5. **Website framework.** Not discussed. Bias toward the least machinery that gives a shared
   layout and self-hosted fonts.
6. **Whether the current site is deleted or kept.** Phil is happy to scrap it entirely.
7. **Deployment.** Cloudflare Pages is live — confirmed 2026-08-05 by DNS and by the served
   CSP matching `createHeadersFile()`. The GitHub Pages workflow and root `CNAME` are dead and
   should be deleted during the rebuild.

---

## Two things about how to work here

Both established 2026-08-05 and both cost something when ignored.

**Specs must be finishable.** Nothing tells Phil when a thing is done; left alone he will keep
searching for the best way indefinitely, and he named it as the thing that has held him back.
Write rules that can be satisfied, not principles that can always be pursued further. The brand
spec already works this way — border radius 0, exactly one deviation and never two, one spacing
scale with no intermediate values. See `REBUILD.md`.

**Clean up after the AI.** Phil is not a developer and cannot audit what he cannot read. Debris
left behind by AI-assisted building is invisible to him by construction — this repo carries two
contradictory deploy paths and scripts pointing at files that do not exist, and most of that is
residue rather than neglect. Any build process here needs a clearing-up step.
