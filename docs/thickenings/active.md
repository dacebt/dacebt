---
type: thickening
title: >-
  Thickening: Deployment asset hygiene
description: >-
  Active WSD thickening for excluding confirmed-unreferenced public assets from production output.
tags: [wsd, thickening, active, performance, assets]
timestamp: 2026-08-05
authority: binding
status: stable
generated:
  by: ebt-wsd/okf-v0.2
  at: "2026-08-06T00:45:00Z"
---
# Thickening: Deployment asset hygiene

**Started:** 2026-08-05
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

Copied public-asset footprint and its repeatable production-output evidence.

## Observable delta

- **Before:** every production build copies three unreferenced files totaling
  4,342,780 bytes into `dist/images/`.
- **After:** the production output excludes those three files while the existing
  application assets and four-route behavior remain unchanged.

## Minimum surface

- Remove only `public/images/github-breakout.gif`,
  `public/images/home_screenshot.png`, and `public/images/logo_unsized.png`.
- Add a supported deployment-asset audit that builds into an isolated temporary
  output directory and rejects any reappearance of those paths.
- Wire the audit through `package.json`, binding testing documentation, and a
  local capability-specific WSD probe.

## Verification path

`wsd-walk --config .wsd/deployment-assets.json --require-probe --expect
"deployment asset hygiene verified"` invokes the supported deployment audit.
The audit performs a fresh Vite production build in an isolated temporary
directory, proves the three source assets are absent, proves the three copied
output paths are absent, reports the resulting output size, and cleans up its
temporary output on both success and failure. The normal static, bundle, and
production gates remain cumulative. After a successful normal production build,
Playwright exercises direct entry and in-application navigation across all four
routes at desktop and 390-by-844 mobile viewports. That walk confirms retained
`avatar.png`, `narrator.png`, and `wife.png` requests succeed and confirms no
request targets any of the three removed public paths.

## Residual risks

- **Non-invariant:** the repository-root `github-breakout.gif` produced by the
  profile workflow is a separate artifact and is not removed by this thickening.
- **Non-invariant:** unrelated current public assets remain copied exactly as
  before; this is not a general asset-pruning pass.
- **Non-invariant:** PORT-008 imagery and project-card decisions remain out of
  scope.

## Notes

Repository search confirms no application or documentation reference resolves
to these three `public/images/` paths. The README uses a remote profile GIF, and
the profile workflow writes a repository-root GIF; neither refers to the public
copy removed here.

## Context

- [Portfolio bundle performance shape](../direction/2026-08-05-portfolio-bundle-performance.shape.md) — governs this thickening's scope, cadence, and success signal.
- [Testing](../TESTING.md) — binding production verification.
