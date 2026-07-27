# Thickening: Inspect interaction contract

**Started:** 2026-07-26
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

The theme-resolved surface, action, and focus contract for the project Inspect interaction.

## Observable delta

- before: Inspect opens a visually styled portal that leaves focus outside the modal, permits background interaction, does not restore the exact trigger, and emits unresolved composite theme values.
- after: a keyboard user opens a labelled, modal Inspect view through supported theme roles, remains contained within it without moving the route scroll owner, closes through every supported path, and returns focus to the exact Inspect trigger.

## Minimum surface

- `src/theme/` — responsibility-focused composition and complete surface, action, and modal roles used by this flow.
- `src/components/ui/GlassPanel.tsx` — consume declared surface roles without changing its established external contract.
- `src/components/ui/` — role-named compact-action and modal-shell primitives with native semantics and explicit focus ownership.
- `src/components/ProjectCard.tsx`, `src/pages/ProjectsPage.tsx`, and `src/components/ProjectDetailModal.tsx` — carry the exact trigger through the controlled Inspect flow and compose project content inside the shared modal behavior.
- A durable token-resolution verifier and package entrypoint covering the live Inspect theme path.
- `docs/DESIGN.md`, `docs/TESTING.md`, and the affected portfolio vault knowledge — reconcile the implemented surface, modal, focus, and verification contracts.

## Verification path

- `wsd-walk --require-probe --expect "Local:"` — Vite reaches its real local entrypoint.
- In the running `/projects` route at desktop and mobile viewports: focus a specific Inspect control; open a labelled modal with focus inside; cycle Tab and Shift+Tab without escape; confirm background controls and the route scroll owner do not move; close by Escape, close control, and backdrop; and confirm focus returns to the exact original trigger.
- Exercise long and omitted project sections, modal scrolling, visible focus, horizontal overflow, and a regression observation of `/`, `/about`, and `/contact`.
- Run the token-resolution verifier, type generation, type-check, lint, and production build.

## Residual risks

- Resolving the currently inert composite shadow may change the modal’s visible depth. Non-invariant visual-tuning risk; the running diff requires explicit visual observation before acceptance.
- Chakra’s portal and scroll-lock behavior may interact with the application’s nested route scroll container. Non-invariant integration risk; the browser walk must observe the actual `AppShell` scroll owner rather than infer from body locking.
- The dormant no-Inspect ProjectCard branch remains owned by PORT-005. Non-invariant cleanup concern because no composed application path reaches it.

## Notes

Inspect is the feature’s walking-skeleton path. Transcript remains isolated on its existing implementation until mapped capability 4 adopts the proven modal contract; that capability is the declared removal point for the migration boundary. The current binding translucent-panel direction wins over PORT-004’s stale opaque/no-blur wording.
