---
type: specification
title: Portfolio Testing
description: Binding verification tiers, browser acceptance matrix, and completion evidence for the portfolio.
tags: [testing, verification, browser, accessibility]
timestamp: 2026-07-27
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
expectations for all six `GlassPanel` surface responsibilities. It also resolves
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
| `/` | Dialogue renders, advances, and opens its transcript |
| `/projects` | Cards render, Inspect opens details, and the modal closes |
| `/about` | Topic selection opens a dialogue scene and returns to the topic grid |
| `/contact` | Contact actions render as usable external links |

The browser matrix includes:

- a desktop viewport with the left navigation rail;
- a mobile viewport with the bottom navigation rail;
- pointer activation;
- keyboard navigation and activation;
- focus containment through forward and reverse traversal;
- exact-trigger focus restoration after native-control opening, plus Transcript
  control focus after a T-shortcut opening;
- Escape, explicit close-control, and backdrop close paths;
- prevention of background and outside interaction while a modal is open;
- bounded modal content scrolling without moving the actual nested `AppShell`
  route scroll owner;
- current-message Transcript positioning that yields after manual scrolling;
- long-content and omitted-section project variants;
- route changes and active navigation state;
- visible focus treatment;
- one visible `aria-current="page"` route link;
- stable `Transcript` and dynamic `Skip`/`Next` names at mobile width;
- native-control Space, Enter, and T activation without scene shortcut
  double-advance;
- one native external anchor per Contact card, with no nested interactive
  descendant;
- project-qualified external icon-link names and durable non-contributing
  project text;
- absence of unexpected horizontal page scrolling.

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
