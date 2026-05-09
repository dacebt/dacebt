# Thickening: trim resting ProjectCard (subtractive)

**Started:** 2026-05-05
**Git strategy:** commit to main (inherited from shape)
**Cadence:** Tight (one-session appetite)

## Dimension

Resting render of `ProjectCard` on the Projects page. T1 added the modal that shows project detail; this thickening removes the now-duplicated detail from the resting card so detail lives only in the modal.

## Observable delta

After this thickening, the running system behaves differently on `/projects`:
- before: each card shows title, short description, tech chips, bullet lists (features ⭐ / metrics 📊 / contributions 🤝), link icons, and Inspect button.
- after: each card shows title, short description, tech chips, link icons, and Inspect button only. The bullet lists are gone from the resting render. The modal continues to show them when Inspect is clicked.

## Minimum surface

- `src/components/ProjectCard.tsx` — gate the bullet-list rendering block (currently lines ~165-211, the `<Flex flexDirection="column">` containing the keyFeatures / metrics / contributions `.map`s) so it renders only when `onInspect` is NOT provided. Concretely: wrap the existing block in `{!onInspect && ( ... )}`. No prop additions, no other structural change. The card's hover, badge, animation, link icons, Inspect button, and tech chips are untouched.

That's it — one file, one conditional wrap.

## Verification path

Dev server assumed running. Orchestrator (not the worker) will:

1. Load `http://localhost:5173/projects` — confirm cards render the trimmed resting state (title / desc / chips / links / Inspect). No bullet text visible.
2. Click Inspect on a card — confirm modal opens with the project's bullets in FEATURES / METRICS / CONTRIBUTIONS sections.
3. Press Esc — confirm modal closes; cards remain trimmed.
4. `npm run type-check` and `npm run lint` pass.

## Residual risks

- Visual rhythm of the grid changes — cards become significantly shorter. Grid may feel sparse or off-balance. If so, address as a follow-up (spacing/density tweak), not in this thickening.
- The `!onInspect` gate couples two concerns (behavior wiring + render). Acceptable because ProjectCard has only one consumer; if a divergent case arises later, introduce an explicit prop.
- Focus-return on modal close still unaddressed (carried from T1). Not addressed this session.
- Some bullet-content was carrying useful at-a-glance metrics (e.g., "$10m in seed funding" on Decent App). Hiding it behind a click changes scannability. Accepted per shape — the modal is the deliberate inspect surface.

## Notes

- Worker should NOT remove the bullet-rendering JSX — only wrap it in the `{!onInspect && ( ... )}` conditional. Keeping the JSX intact preserves the rendering for any future caller that doesn't pass `onInspect`.
- Final ProjectCard.tsx line count should drop slightly (a few lines added for the conditional, wrapping a chunk that already exists).
- No new tokens, no new files, no theme changes.
- Do not add tests.
