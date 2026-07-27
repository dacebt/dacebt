# Shape: Portfolio UI design-system consolidation

**Declared:** 2026-07-26
**Cadence:** Loose
**Git strategy:** commit-to-main

## In scope

- A truthful, role-based Chakra theme API whose live tokens, gradients, shadows, typography, spacing, radii, and animation references resolve through intentionally supported design-system paths.
- Shared surface, action, navigation, and modal-shell contracts used consistently by the current four-route application.
- Complete keyboard and focus behavior for the Inspect and Transcript modals, satisfying PORT-004 through the shared modal contract.
- Unified motion and reduced-motion behavior, with explicit mappings for browser CSS and canvas boundaries that cannot consume Chakra props.
- Token-resolution proof, static and production gates, independent review, and composed desktop/mobile browser evidence across `/`, `/projects`, `/about`, and `/contact`.
- Binding design documentation and vault knowledge reconciled with each capability that changes their contract.

## Out of scope (deliberately)

- Project catalog, profile copy, contact content, or GitHub profile changes tracked by PORT-001 through PORT-003.
- Project imagery and inspect-layout expansion tracked by PORT-008.
- Production bundle optimization tracked by PORT-009.
- The broader unreachable-branch cleanup tracked by PORT-005, except where a live design-system caller must change to complete an in-scope migration.
- A new visual direction or replacement of the current translucent steel-blue JRPG language.

## Known risks

- Cross-cutting migrations can leave old and new styling paths interleaved; each capability must leave its owned pattern complete and the composed application runnable.
- Chakra type generation does not detect token-looking fragments embedded in composite CSS strings, so token resolution needs direct runtime proof.
- Static gates cannot prove focus ownership, responsive composition, reduced motion, or visual consistency; browser observation and final human visual acceptance remain required.

## Success signal

At desktop and mobile viewports, all four routes visibly use the consolidated system; Inspect and Transcript are keyboard-complete; reduced motion is honored; token-resolution, type-check, lint, and production-build gates pass; independent review is clear; and David accepts the running interface.

## Notes

PORT-004 closes only after the shared modal capability supplies its acceptance evidence. Its stale opaque/no-blur criterion is reconciled to the current binding `docs/DESIGN.md` contract rather than restoring the superseded direction.
