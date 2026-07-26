---
type: specification
title: Portfolio Testing
description: Binding verification tiers, browser acceptance matrix, and completion evidence for the portfolio.
tags: [testing, verification, browser, accessibility]
timestamp: 2026-07-25
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
| 1. Static | `npm run type-check`, `npm run lint` | TypeScript contracts, unused code, hook rules, lint policy |
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
results. The production build already performs this step.

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
- Escape close behavior for overlays;
- modal content scrolling;
- route changes and active navigation state;
- visible focus treatment;
- absence of unexpected horizontal page scrolling.

A production-relevant visual walk uses `npm run preview` after a successful
build. Development-server evidence is sufficient for a bounded implementation
walk when production bundling is not part of the changed surface.

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
