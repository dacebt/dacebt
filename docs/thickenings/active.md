---
type: thickening
title: >-
  Thickening: Lazy route failure recovery
description: >-
  Active WSD thickening for preserving the portfolio shell and providing recovery when lazy route content fails to load.
tags: [wsd, thickening, active, routing, recovery]
timestamp: 2026-08-05
authority: binding
status: stable
generated:
  by: ebt-wsd/okf-v0.2
  at: "2026-08-06T01:21:37Z"
---
# Thickening: Lazy route failure recovery

**Started:** 2026-08-05
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

Failure recovery at the lazy route-content boundary.

## Observable delta

- **Before:** a rejected lazy page import escapes `Suspense` and can unmount the
  application instead of leaving a usable portfolio shell.
- **After:** failed route content is replaced by a generic recovery panel inside
  the main surface; navigation and player stats remain available, navigation to
  another pathname clears the failure, and reload retries the same pathname.

## Minimum surface

- A route-content error boundary and project-native failure presentation.
- `src/components/AppShell.tsx` — boundary ownership, pathname reset, and the
  corrected `text.muted` loading role.
- `docs/ARCHITECTURE.md` and `docs/TESTING.md` — bind failure recovery, its
  production-browser proof, and current exact bundle measurements.
- Production-preview Playwright evidence for rejected route chunks at desktop
  and 390-by-844 mobile widths.

## Verification path

After a successful `npm run build`, production Playwright aborts one
`ProjectsPage-*.js` request and observes the recovery alert, reload action,
mounted navigation, and mounted player stats. Navigating to an unblocked route
must clear the alert and render that route; a separate one-shot abort followed
by Reload page must render Projects on the same pathname. The normal all-route
desktop/mobile matrix, cumulative static and production gates, and
`wsd-walk --config .wsd/bundle.json --require-probe --expect "route-local
production chunks verified"` remain required.

## Residual risks

- **Non-invariant:** the generic boundary intentionally does not distinguish a
  chunk request rejection from another route-render exception.
- **Non-invariant:** the client-only site adds no failure telemetry or automatic
  retry loop; recovery remains explicit through navigation or reload.

## Notes

The boundary wraps only route content inside the existing main `GlassPanel`.
It does not own or remount `AppShell`, the router, navigation, player stats, or
the starfield, and it never exposes raw exception text.

## Context

- [Portfolio bundle performance shape](../direction/2026-08-05-portfolio-bundle-performance.shape.md) — governs the corrective scope, cadence, and direct-to-main strategy.
- [Architecture](../ARCHITECTURE.md) — binding route and shell ownership.
- [Testing](../TESTING.md) — binding production and browser evidence.
