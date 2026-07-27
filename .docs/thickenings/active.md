# Thickening: four-route panel and typography hierarchy

**Started:** 2026-07-27
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

The role-owned panel and typography hierarchy across the portfolio's responsive shell, route content, dialogue, project, and modal compositions.

## Observable delta

- before: the Inspect path proves resolved surface and text roles, but the remaining four-route composition still mixes shared primitives with caller-local panel, gradient, shadow, and typography treatments that do not express one consistent hierarchy.
- after: a visitor moving among `/`, `/projects`, `/about`, and `/contact` at desktop and mobile widths sees one coherent hierarchy of shell, content panel, selectable panel, title, supporting text, and modal content roles without changing the routes' existing interactions.

## Minimum surface

- `src/theme/` — complete the supported surface and typography roles consumed by the four-route composition and keep the composition root responsibility-focused.
- `src/components/AppShell.tsx`, `src/components/PageLayout.tsx`, `src/components/PlayerStatsCard.tsx`, and `src/components/ui/` — make the shell, route frame, navigation-adjacent panels, page headings, and reusable selectable surfaces consume those roles from their established owners.
- The home dialogue, project cards and Inspect content, About topic/scene composition, Contact content, and Transcript presentation — migrate caller-local panel and typography treatments needed for the same visible hierarchy while preserving feature-owned content and behavior.
- The live token-resolution verifier plus `docs/DESIGN.md`, `docs/TESTING.md`, and affected portfolio vault knowledge — prove and document the expanded production path.

## Verification path

- `wsd-walk --require-probe --expect "Local:"` — Vite reaches the real local entrypoint.
- In the production preview, walk `/`, `/projects`, `/about`, and `/contact` at desktop and 390-by-844 mobile viewports; observe the shell, page-title, content-panel, selectable-panel, supporting-text, dialogue, and modal hierarchy; exercise each route's existing primary interaction; and confirm readable wrapping, visible focus, no clipping or unexpected horizontal overflow, and no browser-console regressions.
- Run the live token-resolution verifier, type generation, type-check, lint, and production build.

## Residual risks

- Typography and spacing role adoption may alter line wrapping or content density at intermediate widths. Non-invariant visual-tuning risk; the browser matrix includes the responsive breakpoints and the final PORT-007 human acceptance remains authoritative.
- The dormant no-Inspect `ProjectCard` branch remains owned by PORT-005. Non-invariant cleanup concern because no composed application path reaches it.
- Control-family semantics and interaction-state convergence remain the next mapped actor capability; this thickening preserves current control behavior while consolidating the panels and text surrounding it. Non-invariant sequencing risk because that capability has its own complete observable delta and is not required to make this visual hierarchy truthful.

## Notes

Do not migrate Transcript onto `ModalShell` here; capability 4 owns its complete modal behavior. Reuse the resolved Inspect roles where their visual contract matches, and introduce a new role only when the four-route composition demonstrates a distinct responsibility.
