# Rogue Drones — Presentation

**Workstream:** 3 of 7. See `docs/REBUILD.md` for the programme.
**Started:** 2026-08-12
**Status:** Written. Awaiting Phil's review.
**Reads from:** `docs/FOUNDATIONS.md` (what the business may claim),
`superpowers/specs/2026-08-02-rogue-drones-brand-system-design.md` (how a page must look and
how a sentence must behave).

---

## 1. What this covers

Four pages: a home page and one page per department — Websites, Web Applications, AI &
Automation. The build tooling under them, the motion that runs on them, and the copy rules
they are written to.

The current site is **replaced, not maintained**. Nothing in it survives except the domain.

### Out of scope, deliberately

- Case study long-form writing. This spec says where case studies sit and what shape they
  take. It does not write them.
- Client naming permissions. Owed, and it is a phone call rather than a design decision. See §9.
- Anything past the four pages — no blog, no careers page, no pricing page. Adding a fifth
  page is a decision recorded in this file, not a judgement call made during the build.
- Workstreams 4 and 5. How clients arrive and what is captured about them are separate specs,
  and the site is not to grow an intake system in the meantime.

---

## 2. What was settled before this spec, and where

Nothing below is reopened here.

| Decision | Where it was settled |
|---|---|
| Home leads with the method; the work lives on department pages | Phil, 2026-08-12 |
| Headline: *Hand over the drone work. Do the part only you can do.* | `FOUNDATIONS.md` |
| Standing line: *Built to keep running.* | Brand spec §7.4 |
| No map of project locations, on any page | Phil, 2026-08-12 |
| Framework: Astro | Phil, 2026-08-12 |
| Palette, type, form, the two mechanisms, the voice rules | Brand spec §§3, 5–8 |
| Purpose, mission, values, motto, language rules | `FOUNDATIONS.md` |

The map decision is worth restating because it was nearly reversed twice. **A map showing
where projects are is dead.** A screenshot of a GIS application is not a map of work, it is a
picture of the product, and it belongs on the Web Applications page like any other screenshot.

---

## 3. Architecture

**Astro, static output, no client framework.** Four routes, one shared layout, one stylesheet.
Deployed to Cloudflare Pages, which is already serving the domain.

Chosen over Eleventy and over hand-written HTML on one criterion, from value four — *leave
nothing the operator cannot run*. Hand-written HTML means a nav change in four files and rots
at the fifth page. Eleventy is lighter but the asset pipeline for self-hosted fonts is
hand-rolled, and hand-rolled pipelines are exactly the debris this programme exists to stop
producing. Astro's is boring and documented.

### Fonts

IBM Plex Sans and IBM Plex Mono, **self-hosted, woff2 only, latin subset**, per brand spec §10.
No third-party CDN is loaded by any page, for any reason.

**Two weights exist on this site: 400 and 500.** Nothing heavier (§6.4), and no third weight is
to be added. If a design problem seems to need one, it needs a size change or a colour change
instead.

### Contact

**One route: a `mailto:` link in the footer of every page. No form.**

A form needs a Worker, a spam story, credentials in the build, and a dashboard someone has to
remember exists. That is four things the operator cannot run, to replace one thing that has
never broken. The cost is real and accepted: a `mailto:` gets harvested by scrapers, and there
is no record of an enquiry other than the inbox. Revisit in workstream 5, where intake is the
actual subject, not before.

### What gets deleted from this repo when the new site ships

Not optional, and not left for later — this is the same debris `REBUILD.md` names as an
operational constraint on the business.

- `.github/workflows/deploy.yml` — the dead GitHub Pages path
- root `CNAME` — belongs to that dead path
- root `_headers`, `robots.txt`, `sitemap.xml` — the build writes its own; these ship nowhere
- `build-optimized.js`, `static-index.html`, `css/`, `js/`, `images/` — the old site
- `package.json` scripts `build:basic` and `deploy:worker`, which point at files that do not
  exist

---

## 4. Motion — an addition to brand spec §8.4

This is the substantive new rule in this spec, and it came from Phil naming helsing.ai as the
standard: nothing static, everything moving.

### Why this is not a contradiction of §8.4

§8.4 governs **interaction** motion — what happens when a user does something. It is
deliberately austere and it stays exactly as written: 200ms state changes, hover is inversion
or a rule appearing, never scale, never lift, never colour shift.

It says nothing about **ambient** motion, the motion that runs whether or not anyone is there.
That silence is a gap rather than a prohibition, and §3 fills it: the drone is *"sustained,
unvaried, repetitive, keeps going whether or not anyone is watching."* That is a description of
continuous motion. A site that never stops moving is the identity expressed in time instead of
in space.

### The ambient rules

1. **Ambient motion never reacts to the user.** No scroll triggers, no parallax, no
   mouse-following, no reveal-on-enter. If it starts when you arrive at it, it is not ambient
   and it does not belong.
2. **Ambient motion carries no information.** Anything a visitor needs must survive the motion
   being switched off. This is what makes rule 6 safe.
3. **Monochrome only.** Ambient elements use `--silver`, `--slate` and the surface tokens.
   Colour on this site still comes only from screenshots of the work (§5).
4. **Every ambient element loops with no visible seam**, and durations across a page are
   co-prime so the composite pattern never repeats. A visible restart is the whole effect
   collapsing.
5. **Maximum four ambient system _types_ per page.** The four that exist are: the drifting
   grid, the endless band, the cycling text element, the self-running sequence. Types, not
   instances — two bands and a row of crawls are one type used three times, which is repetition
   and therefore the point. A fifth *type* is a carnival and the page stops reading as cold.
   The home page uses all four and has no room for another.
6. **`prefers-reduced-motion: reduce` disables all of it**, per §8.4, and disables rather than
   shortens.

### The deviation rule, inverted

Brand spec §3 requires exactly one deviation per page. On a page where everything drones,
**the deviation is the element that stops.**

The one still element per page is the inverted full-bleed block. It does not move, it does not
animate on entry, and it is the only element that crosses the page margins — so it satisfies §3
by both available definitions at once.

### Reference implementation

`docs/mockups/home-02.html` is the working demonstration, committed at `92ea29a`. It is a
mockup and not the build: fonts are not self-hosted in it, the logo is a text stand-in, and
its copy below the hero is Claude-written. **The motion in it is the specification.** Where
this document and that file disagree about motion, the file is right and this document should
be corrected.

---

## 5. The home page

Leads with the method. Shows no client work — that is what the department pages are for.

| # | Section | What it is | Ambient type |
|---|---|---|---|
| 1 | Header | Mark, three department links. Sticky. | — |
| 2 | Hero | Label, h1, sub, and the refrain beneath | cycling text |
| 3 | Band | *Always on a mission*, endless | band |
| 4 | The deletion | Value 2 behaving, not explained | self-running sequence |
| 5 | Band | *Free people upwards*, endless, opposite direction | band |
| 6 | **The deviation** | Inverted, full-bleed, **still** | **none, by rule** |
| 7 | Departments | Three rows, no counts | band |
| 8 | Foot | Mark, standing line, contact | — |

The drifting grid runs fixed behind all of it, which is why the page moves even in the rows
with no type of their own. Four types total — grid, band, cycling text, self-running sequence —
which is the §4 rule 5 limit exactly, and the reason nothing further can be added to this page
without something coming off it.

### The hero

> **Hand over the drone work.**
> Do the part only you can do.

Four words at full size. The h1 does not carry the service list — the nav states the three
departments and §7 states them again with the crawls, and a third statement in the hero is the
weakest of the three.

### The deletion

Six plausible requirements strike through one at a time until one survives, then it resets and
does it again. Heading is value 2 verbatim: *Delete it before you build it.*

This replaces a five-step numbered method row that was in the first mockup and was cut. That
row was a consultancy process diagram: it **explained** the method, which §7.1 rule 2 forbids.
The deletion **performs** it. Nobody is told how the work goes; they watch it happen.

**Banned from this page permanently:** numbered process steps, and any monitoring or telemetry
strip. The latter broke brand spec §10 outright — *no monitoring, dashboard or oversight
metaphors* — and it is recorded here because it looked plausible enough to be built once.

### The departments section

Three rows, big type, one crawl per row saying **what happens**, per §7.1 rule 3.

**No counts.** Not "03 built", not project totals, not years in business. A number next to a
department invites the reader to find it small, and it is the sort of thing that has to be
maintained forever once added.

---

## 6. The department pages

Three pages, one shape. Where the work and all of the colour on this site live.

| # | Section | Notes |
|---|---|---|
| 1 | Header | shared |
| 2 | Hero | statement, per §7 below |
| 3 | The work | 2–4 projects. **All page colour is here.** |
| 4 | **The deviation** | one, still, inverted |
| 5 | What we will not do | the page's refusal, per §7.1 rule 4 |
| 6 | Foot | shared |

### Per project

A screenshot, a name, one paragraph, and one line naming **who runs it now**. That last line is
not decoration: the mission is *every mission levels up the operator we named*, and a project
that cannot name its operator is a project that fails the mission's own test. It is also the
cheapest possible case study and it can be written without asking anyone's permission.

**Maximum four projects per page.** More is a portfolio, and a portfolio needs maintaining.

### The three pages and what goes on them

- **Websites** — three sites, all live: `gorsebusters.org`, `rosinaandtheweavers.com`,
  `stephaniepostles.com`.
- **Web Applications** — two GIS projects. Names and screenshots owed (§9).
- **AI & Automation** — the automation builds, including the AKV trap-management workflow.
  Names and screenshots owed (§9).

Approved copy already exists for Web Applications, brand spec §7.4, confirmed by Phil
2026-08-12:

> Most of the tools a conservation group needs already exist. They're priced for a council.
> We build the version you can actually run — your data, your infrastructure, no per-seat fee.
> Once it's up, it doesn't need us.

---

## 7. Copy rules for this workstream

Brand spec §7 governs how a sentence behaves. `FOUNDATIONS.md` governs what may be claimed.
Three further rules were derived on 2026-08-12 from the four lines Phil confirmed or wrote, and
they are what killed the original hero.

1. **A page opens on the reader's world, never on Rogue Drones.** The business appears in
   sentence two or later, or not at all. Every confirmed line does this: *most of the tools
   already exist*, *most people need three pages and a contact form*, *it runs while you're
   asleep*. The withdrawn hero opened on a service list, which is what was wrong with it.
2. **One unglamorous concrete per line.** A council. Three pages and a contact form. A
   volunteer who moved to Australia. Never an adjective doing that job.
3. **Never two short declaratives in a row.** Two of Claude's drafts were rejected for
   "barking" on 2026-08-11, and it is a constraint on Phil's voice rather than a preference.
   Join beats with a comma, or vary the lengths.

**The home page is the exception to rule 1, and only the home page.** It leads with the method,
so its h1 is an instruction rather than a diagnosis. The diagnosis lines belong on department
pages, where a specific situation is being addressed.

### Words already spoken for

*Run* and *running* belong to the refrain and the standing line. A third use elsewhere reads as
a slip rather than as repetition. *Level up* belongs to the mission. Do not add a third home
for either.

### On generated copy

Every line in brand spec §7.3 and §7.4 was Claude-written on 2026-08-02, before purpose,
mission, values and motto existed. Four were put to Phil on 2026-08-12; three survived and one
was struck. That ratio is the expected one. Copy in this workstream is written by Phil, or it
is a candidate with its reasoning attached so he can argue with the reasoning rather than the
words.

---

## 8. When this is finished

`REBUILD.md` requires stopping rules rather than standards, because nothing else tells Phil a
thing is done. **The site is finished when every line below is true on all four pages.** Not
when it feels right.

- [ ] Brand spec §10 conformance checklist passes, all fourteen lines, on all four pages
- [ ] Exactly four pages exist
- [ ] Each page uses at most four ambient system types, and its single deviation is the still
      element in the run of the page
- [ ] No ambient element reacts to the user in any way
- [ ] All information survives `prefers-reduced-motion: reduce`
- [ ] Two font weights are loaded, 400 and 500, self-hosted, woff2, no CDN request on any page
- [ ] Each department page shows at most four projects, each naming who runs it now
- [ ] No page shows a count, a metric, or a number that has to be maintained
- [ ] One contact route exists across the whole site
- [ ] Every file listed in §3 as deleted is gone from the repo
- [ ] The site builds and deploys to Cloudflare Pages with no second deploy path present

Eleven lines, each either true or false by looking. When they are all true, the workstream
closes and presentation is not reopened for taste.

---

## 9. Owed, and who owes it

1. **Logo as SVG.** Only PNGs exist and brand spec §4.2 rule 6 requires SVG. The designer holds
   the department lockups and the banner variant and her artwork wins over the spec. The build
   can proceed on PNG at 2× and swap later; it cannot ship on it.
2. **Client naming permissions.** No record exists of which clients may be named or shown. This
   is a phone call, it has a lead time, and it blocks §6 rather than this spec. Start it now.
3. **Web Applications and AI & Automation project names and screenshots.** Phil holds the
   material; the three websites are self-evident and the other two departments are not.
4. **Phil's review of the identity spec.** Still outstanding from 2026-08-02. Three items were
   decided without him — `--slate-dark` as a seventh token, form field borders using `--slate`,
   and all of §8. Add *minions* to the §7.2 banned list at the same time.
5. **Whether the close-out procedure carries a "who levelled up" field.** §6 now asks every
   project to name its operator, which makes this cheaper to answer than it was on 2026-08-11.
   Belongs to workstream 5.
