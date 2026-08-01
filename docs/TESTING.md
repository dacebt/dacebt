---
type: specification
title: Portfolio Testing
description: Binding verification tiers, browser acceptance matrix, and completion evidence for the portfolio.
tags: [testing, verification, browser, accessibility]
timestamp: 2026-08-01
authority: binding
---

# Portfolio Testing

This document is binding and living. **If code and this document disagree, the
code is wrong.** Verification requirements change deliberately with the
application and its available test infrastructure.

## Evidence tiers

Evidence is cumulative. A higher tier does not replace a lower one.

| Tier | Evidence | Defends |
|---|---|---|
| 1. Static | `npm run verify:tokens`, `npm run type-check`, `npm run lint` | Resolved theme roles, TypeScript contracts, unused code, hook rules, lint policy |
| 2. Production | `npm run build` | Chakra type generation, TypeScript build, Vite production bundling |
| 3. Composed browser | Running application at desktop and mobile viewports | Routing, layout, rendered styling, keyboard and pointer interaction |
| 4. Human visual | Deliberate inspection of the rendered interface | Visual hierarchy, density, rhythm, legibility, and aesthetic fit |

The repository has no automated unit, component, browser, or accessibility test
runner. Static gates therefore do not prove rendered behavior.

## Project entrypoints

The package scripts are the supported executable interface:

| Command | Role |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run typegen` | Generate Chakra theme typings |
| `npm run verify:tokens` | Prove generated theme declarations and runtime style resolution |
| `npm run type-check` | Run TypeScript without emitting output |
| `npm run lint` | Run ESLint |
| `npm run build` | Generate theme typings, compile TypeScript, and build with Vite |
| `npm run preview` | Serve the production bundle locally |

`npm run dev` is a valid project entrypoint and may be started when composed
browser evidence is required. A process started for verification is stopped
when the walk is complete.

## Required gates

All source-code changes pass:

```bash
npm run type-check
npm run lint
```

Changes to the runtime, theme, dependencies, build configuration, or generated
theme contract also pass:

```bash
npm run build
```

Theme vocabulary changes include `npm run typegen` before evaluating TypeScript
results. They also include:

```bash
npm run verify:tokens
```

Token proof inspects both generated declarations and style resolution. It
requires complete theme roles to resolve through nested Chakra CSS variables
and rejects unresolved brace or token fragments. Its production path includes
independent exact background, gradient, shadow, blur, and modal-frame
expectations for all five `GlassPanel` surface responsibilities. It also resolves
every supported typography role through a live exported style object where one
exists, plus the page-title gradient, selectable-panel presentation, and shared
modal presentation. This proof is cumulative with type generation,
type-checking, linting, and the production build; none of those gates substitutes
for another. The production build already performs type generation. Composed
reachability and semantics remain owned by the production-preview Playwright
matrix.

Documentation-only changes verify document links, named paths, and repository
state. Static code gates are run when the documentation makes claims about
their present result.

## Browser acceptance

User-visible changes exercise every affected route. Cross-cutting shell, theme,
or shared-component changes exercise all four:

| Route | Minimum observation |
|---|---|
| `/` | Dialogue renders only reached entries and advances automatically on its original timing |
| `/projects` | Cards render, Inspect opens details, and the modal closes |
| `/about` | Every topic opens the shared persistent dialogue log and returns to the topic grid |
| `/contact` | Contact actions render as usable external links |

The browser matrix includes:

- a desktop viewport with the left navigation rail;
- a mobile viewport with the bottom navigation rail;
- pointer activation;
- keyboard navigation and activation;
- Inspect focus containment through forward and reverse traversal;
- exact-trigger focus restoration after native-control Inspect opening;
- Inspect Escape, explicit close-control, and backdrop close paths;
- prevention of background and outside interaction while Inspect is open;
- bounded Inspect content scrolling without moving the actual nested `AppShell`
  route scroll owner;
- long-content and omitted-section project variants;
- route changes and active navigation state;
- visible focus treatment;
- one visible `aria-current="page"` route link;
- absence of the prototype's Skip, Next, and Complete production controls;
- scene-level Space and Enter acceleration without duplicate activation inside
  native controls;
- one native external anchor per Contact card, with no nested interactive
  descendant;
- project-qualified external icon-link names and durable non-contributing
  project text;
- reduced-motion suppression of computed CSS animations and transitions,
  immediately readable manually advanced dialogue, no dialogue cursor or entry
  animation, no route-scroll movement, and a static canvas with no continuous
  frame loop;
- representative standard-preference animation names and timing, dialogue
  streaming and compact entry treatment, and canvas movement;
- absence of unexpected horizontal page scrolling.

Dialogue acceptance exercises `/` and every About topic at a desktop viewport
and at exactly 390-by-844 mobile. The evidence demonstrates all of the following:

- the DOM contains only reached messages; completed entries remain in full and
  the active entry appears below them;
- standard motion streams the active entry and appends exactly one next entry
  automatically after the original route-specific delay;
- clicking the scene or pressing Space or Enter completes the active stream or
  advances immediately, while waiting requires no visitor action;
- short histories are bottom-pinned within the available route-content height;
- after a long history overflows, the existing `AppShell` route scroller remains
  the sole scroll owner and its top remains reachable;
- the route owner's exact `scrollTop` immediately before and after an
  overflowing append is identical, and focus remains unchanged;
- each appended entry produces exactly one polite announcement from outside the
  streaming text, without character-by-character announcements;
- speaker names remain visible, David retains teal treatment, other speakers
  retain green treatment, and the active entry remains visually identifiable;
- Transcript UI, the `T` shortcut, message count, progress indication, and the
  prototype's action controls are absent;
- reduced motion reveals each active entry immediately, suppresses dialogue
  cursor, entry animation, and timed advance, and preserves manual one-entry
  scene advance;
- About Back, browser-back, and Escape return behavior remain operable; and
- neither desktop nor mobile introduces horizontal overflow.

Human visual acceptance compares the running dialogue surface with
`prototypes/chat-interface.html` while confirming that the surrounding Home and
About page composition is unchanged. The prototype's wrapper, specimen
scroller, all prototype controls, diagnostic copy, shortened messages, and raw
palette are not production requirements.

Shared shell, theme, and modal work observes the affected flow at both viewport
arrangements and then checks `/`, `/about`, and `/contact` for regressions in
addition to `/projects`. A production-relevant visual walk uses
`npm run preview` after a successful build. Development-server evidence is
sufficient for a bounded implementation walk when production bundling is not
part of the changed surface.

Browser evidence records observable interaction and layout behavior. Human
visual acceptance remains a separate evidence tier and is never inferred from
browser automation or static gates.

## Completion evidence

A completed unit records:

- the commands run and their outcomes;
- the routes and viewports exercised;
- the interactions observed;
- any acceptance that still requires human visual judgment;
- environmental failures separately from product failures.

An unavailable browser walk is missing evidence, not a passing result. A
generated bundle is not proof that the interface behaves correctly.

## See also

- [Documentation index](index.md) — bundle root for the binding project documents
- [Architecture](ARCHITECTURE.md) — runtime and source boundaries under test
- [Design](DESIGN.md) — responsive, visual, and interaction contracts
