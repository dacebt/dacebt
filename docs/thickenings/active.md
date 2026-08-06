---
type: thickening
title: >-
  Thickening: Route-local production loading
description: >-
  Active WSD thickening for loading only shared and current-route JavaScript on a fresh portfolio visit.
tags: [wsd, thickening, active, performance, bundle]
timestamp: 2026-08-05
authority: binding
status: stable
generated:
  by: ebt-wsd/okf-v0.2
  at: "2026-08-05T22:12:45Z"
---
# Thickening: Route-local production loading

**Started:** 2026-08-05
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

Production route-loading boundary and its repeatable bundle evidence.

## Observable delta

- **Before:** every page and its content are eagerly compiled into one 720.47 kB
  JavaScript entry chunk, so a fresh visit loads code for all four routes.
- **After:** a fresh visit loads the shared shell and current route, each other
  route is delivered when navigated to, and all four routes retain their existing
  production behavior.

## Minimum surface

- `src/App.tsx` — route-loading boundaries.
- `src/components/AppShell.tsx` — shell-owned accessible route-loading presentation around the Outlet.
- Production bundle audit tooling and its supported package entrypoint — prove
  route-local chunks exist and report every direct-route payload repeatably.
- `docs/ARCHITECTURE.md` and `docs/TESTING.md` — bind the delivered loading
  boundary and its verification contract.
- Local WSD bundle probe configuration — invoke the supported audit through the
  skeleton walker with a capability-specific expected result.
- Production-preview browser verification — exercise `/`, `/projects`, `/about`,
  and `/contact` at desktop and mobile widths.

## Verification path

`wsd-walk --config .wsd/bundle.json --require-probe --expect "route-local production chunks verified"`
invokes the supported production-bundle audit and walks only when the fresh
build proves route-local delivery, keeps the Home combined graph at or below
200,000 gzip bytes, keeps every other combined route graph below the original
214,305-byte gzip baseline, and keeps every combined route graph below the
original 720,471-byte raw baseline. For each route, the verifier conservatively
measures the static entry closure plus the complete route-owned reachable chunk
graph. This conservative traversal is independently rooted at every chunk in
the static entry closure and at the selected route entry; it does not depend on
the route chunk importing back to the entry. It follows both static imports and
nested dynamic imports, rejecting any other page module anywhere in that
route-owned graph while excluding only dynamic edges from the actual sole entry
chunk to one of the four recognized route-entry chunk filenames as router
boundaries. Static imports are always traversed, and every other route-reachable
dynamic descendant is followed and budgeted, including non-route dynamic edges
from the entry chunk and dynamic edges from other chunks in its static closure.
The budgets apply to the deduplicated combined graph. The resulting production
preview is the evidence
for actual fresh-route loading and runtime navigation across all four routes at
desktop and mobile widths, including direct route entry and in-app navigation.

## Residual risks

- **Non-invariant:** Chakra and React remain shared runtime weight, so total
  JavaScript may not fall by the same amount as the initial route payload.
- **Non-invariant:** browser caching can conceal route fetches; the repeatable
  build graph is the authoritative loading-boundary evidence.
- **Non-invariant:** copied public-asset hygiene remains the separate next
  capability declared by the session shape and does not alter route chunking.

## Notes

Silencing Vite's warning through a higher threshold or byte-neutral manual
chunking does not satisfy this thickening. The audit must measure the entry
closure and each conservative combined route graph, print every measurement,
and fail when every route becomes eager again, any other page appears anywhere
in a route-owned reachable graph, or a combined route graph breaches its raw or
gzip budget. It does not claim to model arbitrary runtime loading exactly;
production-preview browser observation owns that evidence.

## Context

- [Portfolio bundle performance shape](../direction/2026-08-05-portfolio-bundle-performance.shape.md) — governs this thickening's scope, cadence, and success signal.
- [Architecture](../ARCHITECTURE.md) — binding runtime and route composition.
- [Testing](../TESTING.md) — binding production and browser verification.
