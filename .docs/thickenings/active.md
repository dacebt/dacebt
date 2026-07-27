# Thickening: shared Inspect and Transcript modal behavior

**Started:** 2026-07-27
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

The complete modal interaction contract shared by the project Inspect view and dialogue Transcript.

## Observable delta

- before: Inspect uses the accessible `ModalShell`, while Transcript separately implements its own portal, backdrop, Escape listener, close control, and scrolling without dialog semantics, focus containment, background blocking, or focus restoration.
- after: both features compose the same modal behavior while retaining their own content and Transcript's current-message scrolling.

## Minimum surface

- `src/components/ui/ModalShell.tsx` and `src/components/ui/modal-shell-styles.ts` — expose only the small composition seams both modal contents need while keeping portal, dialog semantics, focus, outside interaction, scroll prevention, close paths, and bounded body ownership centralized.
- `src/components/TranscriptModal.tsx` — replace the parallel modal shell with `ModalShell`; retain transcript message rendering, current-message scrolling, user-scroll detection, and message-count content.
- `src/components/RPGDialogueScene.tsx` and `src/components/RPGDialogueControls.tsx` only if needed to restore focus to the Transcript control through its existing forwarded native button ref.
- `docs/DESIGN.md`, `docs/TESTING.md`, and affected portfolio vault knowledge — describe the one live modal contract and its browser evidence.

## Verification path

- `wsd-walk --require-probe --expect "Local:"` — Vite reaches the real local entrypoint.
- In the production preview at desktop and 390-by-844 mobile viewports, open Inspect and Transcript by pointer and keyboard; verify labelled dialog semantics, initial focus, forward and reverse focus containment, blocked background focus/scroll, bounded internal scrolling, and Escape, close-control, and backdrop dismissal.
- Verify Inspect returns focus to the exact originating card control and Transcript returns focus to its control; preserve Transcript current-message positioning and manual-scroll behavior.
- Regress long and omitted project sections, every route, horizontal overflow, dialogue advancement, and browser-console output.
- Run the unchanged live token-resolution verifier, type generation, type-check, lint, and production build.

## Residual risks

- Reduced-motion behavior remains the final mapped capability. Non-invariant sequencing risk because this thickening preserves the existing animation behavior while consolidating modal ownership.
- `PORT-004` contains superseded opaque/no-blur language. Binding `docs/DESIGN.md` remains authoritative; this thickening closes the interaction defects without restoring obsolete visual direction.

## Notes

Keep feature content feature-owned. Do not introduce a general overlay framework, a second verifier, or reduced-motion changes in this thickening. The intended implementation is Transcript composing the already-proven `ModalShell`, plus only the smallest props required for its footer, scrolling, and focus return.
