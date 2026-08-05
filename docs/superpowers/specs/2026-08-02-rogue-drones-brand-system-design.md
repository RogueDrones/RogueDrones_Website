# Rogue Drones — Brand System

**Date:** 2026-08-02
**Status:** Approved (design phase)
**Scope:** Brand foundation only — marks, colour, type, form, and the voice rules in §7.
**Programme:** Workstream 1 of the Rogue Drones rebuild. See `docs/REBUILD.md`. Every later
workstream — language, presentation, winning work, client data — reads from this document,
and §2 (the thesis) is the part they read most.

---

## 1. Why this exists

The business is splitting into three departments — **Websites**, **Web Applications**, **AI & Automation** — and the existing site can't carry that. The current visual language (coral accent, Bootstrap cards, drop shadows, Font Awesome icons, stock-feeling hero) says nothing about what the business is or why it's different.

This document defines the brand system every downstream decision reads from. It is deliberately written as rules, not adjectives, because rules survive into implementation.

---

## 2. Brand thesis

### 2.1 What a drone is

A drone is **anything that operates by just operating**. Not an aircraft — a category.

A website is a drone. An n8n workflow is a drone. A map that updates itself is a drone. The defining trait is not flight, it is **unattended operation**: it works whether or not anyone is watching, and it does not need to think in order to work.

The word's own history agrees. Old English `drān` is the male honeybee — named for its hum. The same root gives the sustained bagpipe drone: the tone underneath that never resolves and never stops. You stop hearing it; remove it and the whole thing collapses.

### 2.2 What rogue means

Rogue is a **position, not a personality**. Outside the boundary of conformity.

Not rebellious, not loud, not mischievous. The 1560s legal sense is the accurate one: a *masterless* thing. No lord, no parish, no place in the order of service. The agricultural sense is the useful one: a rogue is an off-type specimen — the one that deviates from the standard.

### 2.3 What Rogue Drones does

**Builds things that run on their own, from outside the conventional boundary.**

Three departments, one noun. Websites, web apps and automations are not three services — they are three kinds of drone.

This is quietly anti-hype, which is rare and worth protecting. Every competitor is selling a thing that *thinks*. Rogue Drones sells a thing that **doesn't need to** — it just runs, correctly, and you stop noticing it. That is a stronger promise to a volunteer group counting skinks than "AI-powered" will ever be.

### 2.4 The kārearea

The bird in the mark is not the product. It is the **overseer** — and specifically **not** an overseer of the drones, which is the entire point: the drones don't need supervising.

The kārearea watches the *environment*. It registers where something needs doing, acts where it needs to act, leaves a drone behind, and moves on. Attention is outward, on the terrain — never inward on the machinery.

Consequence: the brand never uses monitoring, dashboard, oversight or "we manage your systems" metaphors. Those describe watching the drones, which contradicts the thesis.

### 2.5 The name stays

"Rogue Drones" survives intact, along with the mark. The definition of *drone* above is what makes the name fit a business doing websites and automation. The site does not explain this (see §7.1) — it behaves like it.

---

## 3. The two mechanisms

Everything in this system is one of two things. Both run through colour, layout and language.

### The drone
Sustained, unvaried, repetitive, keeps going whether or not anyone is watching.

| Medium | Expression |
|---|---|
| Type | The monospace voice — every label, number, caption, piece of metadata |
| Layout | The strict grid; the unvaried spacing scale; silver hairlines |
| Prose | Repetition, refrain, flat rhythm held a beat longer than is comfortable |

### The rogue
Exactly **one** deviation per page. Never two.

| Medium | Expression |
|---|---|
| Colour | The inverted block — dark field in a light page |
| Layout | The one element that crosses the boundary line |
| Prose | The one line that leaves the register |

The one-per-page limit is a hard rule. Two deviations is a style; one deviation is an argument.

---

## 4. Logo

### 4.1 What is fixed

The kārearea, the mountain range and the wordmark `ROGUE DRONES` are **always present together**. The department name is added to this lockup.

Two states only:
- **Ink on light** — the black artwork, used on Paper and Mist surfaces
- **Paper on dark** — the reversed artwork, used on Basalt and Ink surfaces

These two files are not two assets. They are **the two states of one system**, and they are the reason the inversion mechanism (§3) costs nothing.

### 4.2 Rules

1. **Never recoloured.** Not silver, not tinted, not at reduced opacity. Black or white.
2. **Never re-typeset.** The wordmark is artwork, not live text. Do not attempt to reproduce it in IBM Plex or any other face. Always use the supplied asset.
3. **Never separated.** Bird, mountains and wordmark do not appear independently. There is no bird-only favicon variant unless the designer supplies one as a defined lockup.
4. **Clear space** on all sides is equal to the cap height of the `R` in `ROGUE`.
5. **Minimum width** 140px on screen. Below that the mountain detail fills in and the bird disappears.
6. **Format:** SVG for all web use. PNG only as fallback for contexts that cannot take SVG.

### 4.3 Owned by the designer

The department lockups, the stretch/banner variant, and any further variations are with the graphic designer and she holds the brief. This document does not specify their construction — only how they are used once supplied. Where this spec and her artwork disagree, her artwork wins.

---

## 5. Colour — "Schist"

Cool neutral. Mineral, high country. No colour is added by the brand; **all colour on screen comes from the work itself** — screenshots of apps, maps and GIS layers.

### 5.1 Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F2F3F4` | Primary page surface |
| `--mist` | `#E4E6E8` | Secondary surface, subtle blocking |
| `--silver` | `#B8BCC0` | **Boundaries only** — rules, borders, container edges, grid lines |
| `--slate` | `#6E7378` | Metadata, captions, de-emphasised text ≥19px, form field borders |
| `--slate-dark` | `#5F6468` | Secondary text below 19px (see §5.4) |
| `--basalt` | `#1C1F22` | Body text |
| `--ink` | `#0C0E10` | Headings, inverted surfaces, the logo |

### 5.2 Why cool, not warm

Two reasons, in order of weight:

1. **Silver only exists in a cool palette.** Placed next to warm neutrals, silver reads as bronze or champagne. Black, white and silver is the stated brand constraint; a warm palette makes the third term impossible.
2. **The imagery is cool.** Screenshots of satellite imagery, terrain, maps and GIS layers are overwhelmingly blue-green. A cool field lets them sit *in* the page. Pure `#FFFFFF` fights them — every screenshot reads as pasted on — and large fields of `#FFF` against `#000` cause visible halation on real monitors.

`#F2F3F4` still reads as white. The black logo artwork still reads as pure black on it.

### 5.3 The two colour mechanisms

**Silver is the boundary.** Every rule, border, container edge and grid line on the site is `--silver`. Nothing else. This gives silver an actual job rather than being decorative grey, and it means the boundary is always visible — which matters, because the brand is about being outside it.

**Inversion is the accent.** The element outside the boundary does not get a colour. It flips: `--ink` field, `--paper` text. No accent colour exists in this system, and none is to be introduced. If a future need appears to demand one, the correct answer is almost always inversion.

### 5.4 Accessibility

Measured contrast ratios on `--paper`:

| Pair | Ratio | Verdict |
|---|---|---|
| `--ink` on `--paper` | 17.4:1 | Passes AAA |
| `--basalt` on `--paper` | 14.9:1 | Passes AAA |
| `--slate` on `--paper` | 4.31:1 | **Fails AA for normal text.** Large text (≥19px) and non-text UI only |
| `--slate-dark` on `--paper` | 5.37:1 | Passes AA at all sizes |
| `--silver` on `--paper` | 1.72:1 | **Non-text only.** Never text |
| `--silver` on `--ink` | 10.1:1 | Passes AAA |

Two rules follow, and both are easy to get wrong:

- **`--slate-dark` exists solely to fix the small-text case.** It is not a palette change; it is the working value for secondary text below 19px. Use `--slate` above that size.
- **Form field borders use `--slate`, not `--silver`.** Silver hairlines are decorative and exempt from the 3:1 non-text requirement; an input border is a meaningful UI boundary and is not. This is the one place the "silver is the boundary" rule yields to accessibility.

---

## 6. Typography

### 6.1 Faces

| Role | Face | Source |
|---|---|---|
| Sans | **IBM Plex Sans** — 400, 500 | OFL, self-hosted |
| Mono | **IBM Plex Mono** — 400 | OFL, self-hosted |

Chosen over Geist (reads as a dev-tool brand) and Inter/JetBrains (safe, unmemorable). Plex has enough spine to survive a palette this quiet, and its engineering association is the right adjacent read for a business whose promise is *it just runs*.

**Self-hosted, not CDN.** Subset to Latin, `woff2`, `font-display: swap`. The current site loads four separate third-party CDNs; the rebuild loads none.

### 6.2 Two voices, no third

**Sans** carries headings and prose. **Mono** carries every label, number, caption, section marker and piece of metadata.

The mono is not decoration. It is the machine register — the drone note (§3) — and it gives the page a second voice without spending a single colour. No serif. A serif buys editorial warmth, and warmth is not this brand.

### 6.3 Scale

| Role | Size | Line height | Tracking | Weight | Case |
|---|---|---|---|---|---|
| Display | `clamp(2.25rem, 5vw, 4rem)` | 1.05 | −0.02em | 400 | sentence |
| H1 | `clamp(1.75rem, 3.2vw, 2.75rem)` | 1.10 | −0.018em | 400 | sentence |
| H2 (tracked caps) | 0.8125rem / 13px | 1.4 | 0.2em | 500 | UPPER |
| H3 | 1.25rem / 20px | 1.3 | −0.01em | 400 | sentence |
| Body | 1.0625rem / 17px | 1.62 | 0 | 400 | sentence |
| Body small | 0.9375rem / 15px | 1.55 | 0 | 400 | sentence |
| Mono label | 0.6875rem / 11px | 1.4 | 0.16em | 400 | UPPER |
| Mono body | 0.75rem / 12px | 1.7 | 0 | 400 | sentence |

**Measure:** body copy is capped at `46ch`. Long enough to read, short enough to stay quiet.

### 6.4 Weight discipline

**Nothing on the site is bold except the wordmark, and the wordmark is artwork.**

Headings are weight 400. 500 is permitted only for tracked caps at 13px, where the letterforms need it to hold. 600 and 700 do not exist in this system. This is where "confident and quiet" is actually won or lost — the temptation to bold a heading will recur, and the answer is space, not weight.

### 6.5 Tracked caps carry the logo's voice

Section headings are set the way `ROGUE DRONES` is set: uppercase, wide tracking, modest weight. The lockup stops being a badge in the corner and becomes how the site speaks. Wide-tracked caps are hard to read at length, which is a feature — it enforces short headings.

---

## 7. Voice

The brand voice is **Phil's voice**. For a business this size that is the only sustainable option: he is the one who will be writing it in two years.

### 7.1 Rules

1. **Open on the statement.** No warm-up line, no preamble. This is a layout rule before it is a copy rule. The current hero — *"Mapping the Future / Affordable, reliable tech solutions for everyone"* — is exactly the warm-up being banned. It says nothing.
2. **Behave, don't explain.** The site never lectures the reader about what a drone is. The definition in §2 informs every decision and appears in no sentence.
3. **Say what happens, not what it's built with.** This is how one voice serves both grassroots conservation groups and technical audiences without code-switching. *"Record a sighting on your phone with no signal"* works for a volunteer and a developer. *"Offline-first PWA with local persistence"* works for one.
4. **The site is allowed to say no.** Stating plainly what won't be built, or when someone doesn't need Rogue Drones, is worth more than any testimonial. Almost no agency site does this.
5. **Both things, flat.** Commercial viability and conservation impact, neither subordinate. Never the charity cuddle, never the enterprise pitch. Case studies carry outcome *and* practicality: what it cost, who runs it now, what happens when Rogue Drones isn't there.
6. **Dry humour is fine. Earnestness is fine. Corporate polish is not.**
7. **No te reo Māori.** Not as flourish, not as garnish. `Kārearea` is used because it is the bird's name, which is a different thing.

### 7.2 Banned outright

> cutting-edge · solutions · streamline · empower · democratise · passionate about · leverage · seamless · best-in-class · transform your workflow

Most of these are in the current site copy.

### 7.3 Rogue and droning prose

The two mechanisms (§3) apply to writing.

**Droning prose** uses repetition as structure. The refrain enacts the claim instead of describing it:

> It runs while you're asleep. It runs when the funding round falls over. It runs when the volunteer who set it up moves to Australia. It runs when we stop answering emails. It runs.
>
> That's the whole pitch. Your data, your infrastructure, no per-seat fee, no renewal you forgot about.

**Rogue prose** is one line per page that leaves the register:

> Most people asking for a website need three pages and a contact form. If that's you, we'll tell you that, and it'll cost you what three pages and a contact form should cost.

One per page. The same discipline as the visual deviation.

### 7.4 Approved reference copy

**Hero**
> Websites, web apps and automations for people the big vendors don't bother with.
> Built in Dunedin. Built to keep running without us.

**Web Applications**
> Most of the tools a conservation group needs already exist. They're priced for a council.
> We build the version you can actually run — your data, your infrastructure, no per-seat fee. Once it's up, it doesn't need us.

---

## 8. Space, grid and form

Derived from the mechanisms rather than discussed separately; recorded here so the build has no gaps.

### 8.1 Spacing scale

`8 · 16 · 24 · 40 · 64 · 104 · 168` (px)

One scale, unvaried, no intermediate values. The monotony is the drone. Values below 8px are permitted only for optical corrections in the logo lockup.

### 8.2 Grid

- 12 columns, 24px gutter
- Content max-width **1200px**; text blocks capped at `46ch` regardless of column span
- Page margin: 24px mobile, 40px tablet, 64px desktop
- Column boundaries are a real thing on this site — the deviating element (§3) is defined by crossing one

### 8.3 Form

- **Border radius: 0.** Nothing is rounded. Not buttons, not inputs, not images, not cards. This is a hard rule and it is what stops the site drifting back toward the Bootstrap look it's replacing.
- **No shadows.** No elevation, no glow, no blur. Depth is expressed by inversion, never by shadow.
- **No gradients.** Flat surfaces only.
- **Hairlines are 1px `--silver`,** and never doubled — adjacent bordered elements collapse to a shared rule.
- **No icon font.** Font Awesome is removed. Where an icon is genuinely required it is an inline SVG at 1px stroke in `--slate`.

### 8.4 Motion

- Duration 200ms for state changes, 400ms for anything that moves more than 100px
- Easing `cubic-bezier(0.2, 0, 0, 1)` — decelerating, never bouncing
- **Hover is inversion or a rule appearing.** Never scale, never lift, never colour shift.
- All motion respects `prefers-reduced-motion: reduce`, which disables transitions entirely rather than shortening them

---

## 9. Out of scope

This spec covers the brand foundation only. The following are deliberately excluded and belong to the presentation workstream (3):

- Site architecture — home plus one page per department
- The map treatment on the home page (parked by agreement; monochrome vs. true-colour is unresolved and is a site decision, not a brand one)
- The before/after GIS reveal on the Web Applications page
- Build tooling, hosting and the unresolved GitHub Pages / Cloudflare Pages split in the current repo
- Contact form handling
- Content and case study writing beyond the reference copy in §7.4

---

## 10. Conformance checklist

A page conforms to this brand system if every line is true:

- [ ] No colour appears on the page except inside screenshots of the work
- [ ] Exactly one deviation — inverted block, boundary crossing, or off-register line. Not zero. Not two.
- [ ] Every rule, border and grid line is `--silver`, except form field borders, which are `--slate`
- [ ] No text is set in `--silver`
- [ ] No type is heavier than 500 except the logo artwork, which is not type
- [ ] Every label, number, caption and piece of metadata is IBM Plex Mono
- [ ] Border radius is 0 everywhere; no shadows; no gradients
- [ ] The logo is black or white, intact, and not re-typeset
- [ ] Body copy sits within 46ch
- [ ] Opening copy is a statement, not a warm-up
- [ ] No word from the §7.2 banned list appears
- [ ] Nothing on the page explains what a drone is
- [ ] No monitoring, dashboard or oversight metaphors
- [ ] Fonts are self-hosted; no third-party CDN is loaded
