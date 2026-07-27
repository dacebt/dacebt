# Thickening: coherent reduced-motion experience

**Started:** 2026-07-27
**Git strategy:** commit-to-main
**Cadence:** Loose

## Dimension

The reduced-motion contract across CSS and injected keyframes, component transitions, dialogue timing, smooth scrolling, and the canvas atmosphere.

## Observable delta

- before: floating surfaces and star positions sample the preference, but component transitions, modal/scene fades, cursor and advance animations, typewriter timing, smooth Transcript positioning, and a continuously scheduled canvas loop remain active or independently owned.
- after: a visitor requesting reduced motion sees complete, usable route and overlay content without nonessential movement, while the standard preference retains the current motion hierarchy.

## Minimum surface

- `src/utils/motion.ts`, `src/utils/animations.ts`, and `src/index.css` — keep one small preference boundary, one named keyframe owner, and one browser-CSS reduction mapping that covers live component animations and transitions.
- `src/components/Starfield.tsx` — render a static atmosphere instead of scheduling a continuous reduced-motion loop.
- `src/hooks/useRPGDialogue.ts`, `src/components/DialogueBox.tsx`, and `src/components/TranscriptModal.tsx` only where required — present dialogue text and Transcript positioning without animated timing under the reduced preference while preserving the standard interaction.
- Existing component callers — adopt the shared boundary only where global CSS cannot express the behavior; do not redesign animation APIs or visual styling.
- `docs/DESIGN.md`, `docs/TESTING.md`, and affected portfolio vault knowledge — document the explicit CSS, JavaScript, and canvas mappings and their browser evidence.

## Verification path

- `wsd-walk --require-probe --expect "Local:"` — Vite reaches the real local entrypoint.
- In the production preview, use Playwright's `reducedMotion: "reduce"` at desktop and 390-by-844 mobile viewports. Traverse all four routes and both overlays; confirm nonessential CSS animation/transition is suppressed, dialogue text is immediately readable without automatic motion, Transcript positioning is not smooth, the canvas remains visually static, interaction and focus contracts still work, and there is no horizontal overflow or browser-console output.
- Repeat representative route, dialogue, selectable-control, canvas, and modal observations with `reducedMotion: "no-preference"`; confirm the standard animation names/timing and dialogue progression remain present.
- Run the live token-resolution verifier, type generation, type-check, lint, and production build.
- Receive explicit human acceptance of the running desktop and mobile interface before closing `PORT-007`.

## Residual risks

- Browser automation can prove computed motion state and stable rendered output, but not whether the retained standard motion feels coherent. Invariant verification gap: final human visual acceptance remains required.
- Operating-system preference changes during an already-open page may exercise a different lifecycle than preference-at-load. Non-invariant browser condition; support live changes only if the existing shared boundary can do so without widening the capability.

## Notes

Keep this as a finite mapping change. Do not introduce an animation framework, timing registry, observer service, test framework, or structural verifier. Move the two remaining global keyframes into the existing shared owner only if that removes a live parallel path. Functional focus, navigation, and manual dialogue controls must remain unchanged.
