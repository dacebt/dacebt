# Capability map: Portfolio UI design-system consolidation

**Declared:** 2026-07-26
**Domain model:** none

## New conventions

- The theme composition root exposes role-named Chakra vocabulary assembled from responsibility-focused modules.
- Shared UI APIs are named for their visual or interaction role rather than for an individual feature caller.
- Browser CSS and canvas code remain explicit boundaries whose named palette and motion mappings use the same roles as the Chakra system.

## Capabilities

1. **A keyboard user opens a project’s Inspect view through theme-resolved surface and action roles, closes it, and returns to the exact trigger** — walking skeleton: one complete `/projects` path proves the consolidated theme, primitive, feature, focus, and browser-observation path composes.
2. **A visitor sees one consistent panel and typography hierarchy across all four routes** — expands the skeleton’s truthful theme and surface ownership through the shell, dialogue, project, about, contact, and modal compositions.
3. **A visitor navigates and activates actions through consistent semantic control families** — follows the shared surface roles so navigation links, selectable actions, compact actions, and icon actions no longer implement parallel interaction treatments, including accessible names for the mobile dialogue controls whose visible labels are hidden, keyboard routing that does not let the dialogue scene preempt focused native controls, and Contact cards that expose one semantic link instead of nesting a button inside a link.
4. **A keyboard user operates both Inspect and Transcript through one complete modal behavior** — extends the proven Inspect contract to both modal compositions and supplies PORT-004’s full interaction evidence.
5. **A reduced-motion visitor uses every route and overlay without nonessential animation while the standard experience retains coherent motion** — last because it crosses Chakra components, global CSS, runtime keyframes, and canvas rendering after their owners are settled.

## Order rationale

The Inspect path comes first because it crosses the most important theme, primitive, feature, and focus seams in one observable flow. Shared surfaces and controls establish ownership before the second modal adopts it; reduced motion follows once every animation owner is explicit.

## Notes

The portfolio is treated as a client-rendered web application: Vite startup plus direct browser observation of the affected route is the end-to-end proof. Token proof, documentation, and removal of replaced paths belong to the capability they support rather than becoming separate construction phases.
