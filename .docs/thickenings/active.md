# Thickening: semantic control families

**Started:** 2026-07-27
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

The semantic element, accessible-name, and interaction-state contract for navigation, selectable, compact, and icon controls across the four-route interface.

## Observable delta

- before: visually related controls use parallel implementations; mobile dialogue controls lose their names when visible labels hide; the dialogue scene consumes Space and Enter before focused native controls; and each Contact card nests a button inside a link.
- after: a keyboard or pointer visitor navigates and activates each control family through one truthful native element with a stable accessible name and consistent state treatment, while scene-level shortcuts yield to focused controls.

## Minimum surface

- `src/components/ui/` and the supported theme roles — establish role-named navigation, selectable, compact, and icon control presentation without weakening native button/link semantics or the surface responsibilities already accepted.
- `src/components/NavRail.tsx`, `src/components/ProjectCard.tsx`, `src/components/RPGDialogueControls.tsx`, and `src/components/RPGDialogueScene.tsx` — adopt the shared families, preserve stable names at every breakpoint, and route shortcuts around focused native controls.
- `src/pages/AboutPage.tsx` and `src/pages/ContactPage.tsx` — keep topic choices as buttons, make each Contact card one semantic external link, and compose the same selectable presentation without nested interactive content.
- The live token-resolution verifier plus `docs/DESIGN.md`, `docs/TESTING.md`, and affected portfolio vault knowledge — prove and document the complete control path.

## Verification path

- `wsd-walk --require-probe --expect "Local:"` — Vite reaches the real local entrypoint.
- In the production preview at desktop and 390-by-844 mobile viewports, traverse navigation, About topics and return control, Contact cards, project Inspect/external icon controls, and Home Transcript/Skip controls by keyboard and pointer; confirm stable accessible names, one native interactive element per control, visible current-route, active-press, and focus states, scene shortcuts that do not preempt focused controls, and no unexpected route or dialogue advancement.
- Regress Inspect exact-trigger restoration, all four routes, horizontal overflow, and browser-console output.
- Run the live token-resolution verifier, type generation, type-check, lint, and production build.

## Residual risks

- Transcript still uses its existing modal implementation until the next mapped capability. Non-invariant sequencing risk because this control capability preserves that separate behavior rather than claiming modal completeness.
- Reduced-motion behavior remains the final mapped capability. Non-invariant sequencing risk because control semantics and focus are independently observable without changing animation ownership.
- Native external-link activation opens third-party destinations. Non-invariant test-environment concern; browser acceptance verifies link semantics and new-tab attributes without depending on external network availability.

## Notes

The three explicitly routed defects are mandatory acceptance cases, not optional cleanup. The completed control inventory also requires exactly one `aria-current="page"` navigation link, project-qualified external-link names, durable text for the non-contributing project state, and explicit `type="button"` plus focus-visible treatment for selectable buttons. Do not migrate Transcript behavior or consolidate motion in this thickening.
