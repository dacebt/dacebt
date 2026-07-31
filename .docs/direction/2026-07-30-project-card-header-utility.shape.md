# Shape: Project card Header Utility redesign

**Declared:** 2026-07-30
**Cadence:** Loose
**Git strategy:** commit-to-main

## In scope

- Replace `ProjectCard`'s two unreachable presentation paths with one explicit
  `/projects` card contract centered on the existing Inspect flow.
- Implement the approved compact Header Utility hierarchy: project identity and
  icon-only GitHub action in the header, concise summary and technology metadata
  in the body, and Inspect plus one configured text-labelled destination in the
  footer.
- Add an explicit per-project destination configuration so labels such as
  `Open App`, `Play`, and `Visit Site` express intent without guessing from a URL.
- Render contribution state only when `currentlyContributing` is false; never
  render a positive `Active` state.
- Preserve card depth through the shared selectable `GlassPanel` surface while
  removing card corner marks and forced floating behavior. Content determines
  each grid row's height, and cards within that row stretch to match its tallest
  card; there is no page-wide fixed card height.
- Preserve Inspect modal ownership, keyboard behavior, and exact-trigger focus
  restoration; reconcile the binding design contract and PORT-005 task record
  with the delivered behavior.

## Out of scope (deliberately)

- Project imagery or a broader Inspect modal layout rework, which belongs to
  PORT-008.
- Project catalog, profile, About, contact, or GitHub profile content changes.
- Production bundle analysis or optimization, which belongs to PORT-009.
- A replacement of the portfolio's translucent steel-blue JRPG visual language
  or a parallel card-only styling system.
- Live external-destination verification without separate authorization.

## Known risks

- The 13 project records have zero, one, and several links; destination
  configuration must remain explicit and render cleanly when absent.
- Moving GitHub into the header and tightening card height must remain usable at
  mobile widths without crowding titles, metadata, or keyboard focus.
- Feature-level hover styling can flatten the shared selectable surface if it
  replaces rather than preserves the primitive's owned elevation.

## Success signal

On `/projects` at desktop and mobile widths, every card uses the accepted compact
Header Utility hierarchy with preserved panel depth, an icon-only GitHub action
when configured, an intent-labelled destination when configured, no positive
contribution label, and a working Inspect flow that closes and restores focus to
the exact trigger; token verification, type-check, lint, and production build
all pass, and David accepts the running result.

## Notes

This is one vertical capability and needs no capability map or domain model.
The current binding design system remains the styling authority.
