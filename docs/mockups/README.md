# Home page mockups

**Current: `home-03.html`.** `home-02.html` is kept unchanged as the record of what was
committed at `92ea29a` and referenced by the presentation spec. Do not edit it.

Both are mockups, not the build: fonts are not self-hosted, the logo is a text stand-in, and
the copy below the hero is Claude-written and unconfirmed.

---

## Before you open either of them

**Windows reduced-motion will hide the entire design, and it cost a session to work out.**
Settings → Accessibility → Visual effects → Animation effects. Phil's machine has it off,
which means:

- `home-02` looks *half* alive — its CSS animations stop, but its two `setInterval` loops
  don't check the media query, so text still swaps and lines still strike out with no easing.
  That is a bug in home-02, not a feature.
- `home-03` goes properly still, because the JS honours the setting too. Press **Start
  motion**, bottom right, to override the OS setting and see the design.

`home-03` has two buttons. **Start/Stop motion** is real and required (see WCAG note below).
**Invert** is mockup furniture for checking the dark state and is not part of the design.

---

## What home-03 changed, and why

Reviewed 2026-08-12 against the §10 conformance checklist in the brand spec and the §8
stopping rules in the presentation spec. Everything below was a failure against one of those,
or a plain bug.

### Conformance

| Was | Now | Rule |
|---|---|---|
| `nav a:hover` changed colour | only the rule appears | brand §8.4 — "never colour shift" |
| `.rogue` used `width:100vw` | `width:100%` | it is a direct child of `body`; 100vw was scrollbar-width too wide and sat ~7px off centre |
| band durations 34s / 78s | 31s / 71s | presentation §4 rule 4 wants co-prime; 34 and 78 share a factor of 2 |
| `.band.loud` defined, never used | deleted | dead CSS |

### Accessibility

**`prefers-reduced-motion` was not honoured.** The media query only ever killed CSS animation
and transition. Both `setInterval` loops kept running, so the page carried on mutating itself.
Presentation §8 claims "all information survives `prefers-reduced-motion: reduce`" and that was
false. One `paused` flag now guards both loops, and the stopped state renders the deletion
*resolved* rather than frozen on its first frame — the sequence means nothing until you can see
what survived it.

**No pause control existed, which fails WCAG 2.2.2 (Pause, Stop, Hide).** Auto-updating content
running longer than five seconds alongside other content needs an on-page mechanism to stop it;
an OS setting the visitor cannot argue with is not that. Hence the Start/Stop button. The
reduced-motion CSS is scoped to `html:not([data-motion])` so the button overrides in both
directions.

**Screen readers got the marquees 16 times over.** `fill()` duplicates every list so the -50%
translate loops seamlessly, and nothing was hidden. Marquee runs and the refrain cycler are now
`aria-hidden`, with one clean copy of the motto, the crawls and all five refrain lines in
`.sr-only` text. Department crawls are hidden outright — presentation §4 rule 2 says ambient
motion carries no information, so they have no business in a link's accessible name.

**No focus styles anywhere.** Added `:focus-visible` as a 1px rule, which is what §8.4 already
sanctions for hover.

### Bugs

**The second band showed a visible gap above ~1550px.** A `-50%` marquee is only seamless when
one copy already fills the track. Six copies of "Free people upwards" is roughly 1550px and
`.band` is full viewport width, so any window wider than that watched the seam arrive. `fill()`
now grows to `max(track, screen.width)` before doubling, so resizing cannot open a seam. The
loop is counted rather than `while` because `offsetWidth` reads 0 on a hidden track and an
uncapped loop on that hangs the tab.

**The refrain clipped its longest line.** `.refrain` was `height:2.6em; overflow:hidden`, and
the `2.6em` resolved against the body's 17px rather than the 21px inside it — a ~44px slot for a
line needing ~63px. An invisible `<span class="ghost">` holding the longest line now sets the
height, so nothing clips at any width, the page never jumps when a short line cycles in, and
changing the copy resizes the slot on its own. **This bug is in home-02 as well.**

**Each refrain line appeared to print twice.** The blackout was a CSS animation on its own
2600ms cycle while the text swap ran on a separate `setInterval`. Starting motion restarted the
animation out of phase, so a line sat across a blink. `@keyframes cut` is deleted and the
blackout now happens inside the same timer as the swap — one clock, nothing to drift.

### Reverted at Phil's instruction, 2026-08-12

- **Heading weight back to 500.** Brand spec §6.4 and the §6.3 scale table were amended the
  same day to match, so the spec and the mockup agree. 500 is now the ceiling for the whole
  site; body and mono stay 400.
- **The 0.28 opacity ghost on struck requirements back.** Kept as a *passing* state only —
  `[data-still] .req.gone{opacity:1}` restores full contrast when stopped or under
  reduced-motion, because five permanently unreadable lines is a different problem from a line
  fading as it goes.

---

## Open, needs Phil

1. **`home-03` has not been checked against WCAG 1.4.10 (reflow at 320px).** Presentation spec
   §8 now carries five WCAG lines; four of them hold in this mockup, that one is untested.
   `body{overflow-x:hidden}` will hide a failure rather than prevent it, so check with the rule
   temporarily removed.
2. **The `.deletion` heading is an inline-styled 40px sans, not the §6.3 tracked-caps H2.** The
   H2 role in the type scale is currently unused across the whole page. Design call, not a bug.

## Not verified

**Nothing in home-03 has been looked at.** The Chrome extension was not connected during this
session, so every change was reasoned from source and confirmed by Phil in the browser. Three
bugs surfaced that way. Connect the extension before the next round.
