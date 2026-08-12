# Next session — start here

**Last session:** 2026-08-12
**Branch:** `docs/brand-system` — **dirty.** Two amended specs and two new files in
`docs/mockups/` are uncommitted. Commit them one decision at a time, as with the last three.
**Programme:** a ground-up rebuild of Rogue Drones, not a website rebuild. Rescoped 2026-08-05.

---

## Say this to start

> Read `docs/REBUILD.md`, `docs/FOUNDATIONS.md`, `docs/NEXT-SESSION.md` and
> `docs/superpowers/specs/2026-08-12-rogue-drones-presentation-design.md`.
> Workstream 3 has a written spec awaiting Phil's review. The home page is mocked up.

If you want to do something else instead, say which workstream — the docs are structured so
any of them can be picked up cold.

---

## Where the programme is

| # | Workstream | Status |
|---|---|---|
| 1 | Identity — marks, colour, type, form | Spec approved. Phil's review still owed |
| 2 | Language — purpose, vision, mission, values, motto | **Closed 2026-08-11** |
| 3 | Presentation — website, case studies, collateral | **Current.** Spec written 2026-08-12, review owed. Home mockup built, nothing built for real yet |
| 4 | Winning work — positioning, proposals, pricing | Not started |
| 5 | Client data — intake, what gets captured, where it lives | Not started |
| 6 | Rogue Drones' own drones | Parked 2026-08-05, argument in `REBUILD.md` |
| 7 | *Open* | Named when reached |

---

## What is settled

`docs/FOUNDATIONS.md` is the authority and is short — read it in full before writing any copy.
Purpose, vision, mission, capacity, who it's for, values, language rules, motto, and as of
2026-08-11 the headline. In brief:

- **Purpose:** *People think they are being productive.* Stands alone.
- **Vision:** a world where humans understand their place. Long account in `docs/VISION.md`,
  Phil's words verbatim, and the reference for what his voice sounds like unperformed.
- **Mission:** *Every mission levels up the operator we named.* Internal. Falsifiable at both
  ends — operator named at scoping, levelled by close.
- **The operator:** the person who runs it after Phil leaves. A role, not a name.
- **Headline:** *Hand over the drone work. Do the part only you can do.*
- **Motto:** *Always on a mission.* Standing line: *Built to keep running.*
- **Capacity:** the size of Phil's hours, for now. Reviewed 2027-08-11, or early if he turns
  down work he wanted twice in a quarter.
- **Values:** four, each with its price named. Nobody becomes idle through something we built.
  Delete it before you build it. No mission starts without an operator. Leave nothing the
  operator cannot run.
- **Language rules:** three. Drone work is possessive. A mission is a job. No minions.

The five questions the last handoff listed as undecided are all decided, in the presentation
spec §2: the current site is replaced entirely, the framework is Astro, the map is dead on
every page, the home page leads with the method, and the dead GitHub Pages path is deleted
when the new site ships.

---

## What happened on 2026-08-12

Three commits, then an unreviewed working session on top of them.

- `1b2906f` settled the headline and retired *stop doing the drone work*.
- `92ea29a` added `docs/mockups/home-02.html`, the moving home page.
- `ce1f988` wrote the presentation spec and opened workstream 3.

Then the specs and the mockup were reviewed against their own checklists. Eight failures came
out of it, mostly accessibility and motion, and `home-03.html` was built as the fix.
**`docs/mockups/README.md` is the full account and is where to start on any mockup work.**
Two spec amendments came out of the same pass, both at Phil's instruction:

- Brand spec §6.4 and the §6.3 scale table now set headings at weight **500**, not 400. 500
  is the ceiling for the whole site; body and mono stay 400.
- Presentation spec §8 gained **five WCAG 2.1 AA lines** — 2.2.2 pause, 1.4.3 contrast, 2.4.7
  focus visible, 2.1.1 keyboard, 1.4.10 reflow. The stopping-rule count went from eleven to
  sixteen. Neither checklist had mentioned accessibility at all, which is how a page with six
  auto-running animations and no pause control got as far as it did.

Presentation spec §4 now names `home-03.html` as the motion specification. `home-02.html` is
superseded and kept unedited as the record — do not build from it.

---

## Next move

**Phil's review of the presentation spec.** It is written and unreviewed, and it is a four-page
site's worth of decisions. Nothing should be built before he has argued with it.

After that, the build is blocked in one direction only. The home page can be built now: it
leads with the method, shows no client work, and its content is settled. The three department
pages cannot, because they are where the work goes and none of it exists yet. If time is short,
build the home page in Astro and leave the department pages stubbed.

---

## Open, and owed

1. **Client naming permissions.** No record exists of which clients may be shown or named. It
   is a phone call, it has a lead time, and it blocks all three department pages. Presentation
   spec §9 says start it now. Known clients: AKV, GorseBusters, Mobility Vehicles Dunedin
   (Matt Burns), Stephanie Postles, Anna-Rose / Rosina And The Weavers, John Carpenter.
2. **Project names and screenshots** for Web Applications and AI & Automation. Phil holds the
   material. The three websites are self-evident; the other two departments are not.
3. **Logo as SVG.** Only PNGs exist and brand spec §4.2 requires SVG. The designer holds the
   department lockups and the banner variant and is swamped; her artwork wins over the spec.
   The build can proceed on PNG at 2× and swap later. It cannot ship on it.
4. **Phil's review of the identity spec.** Three items were decided without him and still
   stand: `--slate-dark` as a seventh token, form field borders using `--slate` not `--silver`,
   and all of §8. Add *minions* to the §7.2 banned list at the same time.
5. **`home-03` is unverified against WCAG 1.4.10** — reflow at 320px. `body{overflow-x:hidden}`
   will hide a failure rather than prevent one, so test with that rule temporarily removed.
6. **Whether the close-out procedure carries a "who levelled up" field.** Cheaper to answer
   now that presentation §6 asks every project to name its operator. Belongs to workstream 5.

---

## Three things about how to work here

**Specs must be finishable.** Nothing tells Phil when a thing is done; left alone he will keep
searching for the best way indefinitely, and he named it as the thing that has held him back.
Write rules that can be satisfied, not principles that can always be pursued further.

**Clean up after the AI.** Phil is not a developer and cannot audit what he cannot read. Debris
left by AI-assisted building is invisible to him by construction. *Leave nothing the operator
cannot run* is a value and it applies to Rogue Drones' own work first.

**Connect the Chrome extension before touching a mockup.** On 2026-08-12 it was not connected,
so every change to `home-03` was reasoned from source and Phil found the failures himself in
the browser — three rounds of it. Worse, his machine has **reduced-motion enabled**, so an
animated page looks dead or half-broken to him and he will reasonably report that as a bug in
the code. Say so up front and give him an on-page control to override it.

---

## How the last sessions went, for calibration

Phil's own lines beat everything generated for him, without exception so far. Two drafting
attempts were rejected on 2026-08-11 for "barking" — short declarative, full stop, short
declarative — which is a real constraint on his voice rather than a preference. Offer
candidates with the reasoning attached so he can argue with the reasoning rather than the words.

On 2026-08-12 the same pattern held on design rather than copy: he reverted two of the changes
made on spec-conformance grounds, and both reversions were right. When he overrules a rule, the
rule is what changes — §6.4 was amended to follow his eye, not the other way round.
