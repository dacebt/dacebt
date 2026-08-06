---
type: shape
title: >-
  Shape: Portfolio bundle performance
description: >-
  Session boundaries, cadence, and success signal for auditing and improving the portfolio production bundle.
tags: [wsd, direction, shape, performance, bundle]
timestamp: 2026-08-05
authority: binding
status: stable
generated:
  by: ebt-wsd/okf-v0.2
  at: "2026-08-05T21:16:02Z"
---
# Shape: Portfolio bundle performance

**Declared:** 2026-08-05
**Cadence:** Loose
**Git strategy:** commit-to-main

## In scope

- Establish and record repeatable baselines for initial JavaScript composition
  and the deployed static-asset footprint.
- Reduce the initial route payload through deliberate production-bundle
  optimization rather than merely redistributing bytes or suppressing Vite's
  warning.
- Remove only the three confirmed-unreferenced public assets:
  `public/images/github-breakout.gif`, `public/images/home_screenshot.png`, and
  `public/images/logo_unsized.png`.
- Preserve the four-route application contract and verify the production
  preview at desktop and mobile widths, together with the binding static and
  production gates.
- Reconcile binding build and verification documentation and the PORT-009 vault
  record with the delivered behavior.

## Out of scope (deliberately)

- Project imagery, project data-model changes, or an Inspect layout redesign;
  those remain PORT-008 decisions.
- Visual redesign, interaction changes, portfolio copy changes, or dependency
  upgrades.
- Raising the chunk warning threshold solely to hide the current warning.
- Deployment, pushing, or remote-system inspection.

## Known risks

- Chunk splitting can make the warning disappear without reducing what a first
  visit downloads, so success must be measured at the entry path rather than by
  chunk count alone.
- Chakra and its supporting runtime dominate the shared dependency graph; route
  splitting may leave a substantial common payload even when route-local code
  is deferred correctly.
- Lazy route boundaries can regress navigation, loading behavior, or production
  hosting assumptions unless every route is exercised through the built app.

## Success signal

In the production preview, all four routes remain usable at desktop and mobile
widths while the initial route no longer loads every route's code, the measured
initial JavaScript is materially smaller than the 720.47 kB / 214.31 kB gzip
baseline, the build has a deliberate and documented chunk policy, and the
deployment output excludes the three confirmed-unreferenced assets.

## Notes

JavaScript loading and copied public assets are separate measured surfaces.
PORT-009 owns both for this session without deciding or pre-optimizing future
PORT-008 imagery.

## Related documentation

- [Architecture](../ARCHITECTURE.md) — binding runtime and route composition.
- [Testing](../TESTING.md) — binding production and browser verification.
- [Direction index](index.md) — persistent WSD direction artifacts.
