# Shape: Projects page — inspect modal redesign

**Declared:** 2026-05-03
**Cadence:** Tight (one session)
**Git strategy:** commit to main

## In scope

- Trim the resting `ProjectCard` on the Projects page to: title, short description, tech chips, link icons, single "Inspect" affordance.
- New `ProjectDetailModal` component (Portal-based, mirrors the existing `TranscriptModal` pattern) showing keyFeatures / metrics / contributions in JRPG status-screen sections.
- Wire card → modal open/close state on `ProjectsPage`.
- Preserve existing badge, hover state, accessibility (Esc + backdrop click to close).
- Reuse existing theme tokens — no new color/shadow/textStyle additions.

## Out of scope (deliberately)

- No data model changes to `src/data/projects.ts`.
- No changes to `HomePage`'s ProjectCard usage — float animation and full-info layout stay there. Only the Projects page gets the new behavior.
- No additions to `NavRail`, `PageLayout`, or `theme/index.ts` beyond what's already exposed.
- No tests added — no test framework in repo.
- No abstraction of the Portal/modal pattern across `TranscriptModal` and the new modal. One more instance is acceptable; abstraction is a future cleanup.
- No mobile-specific layout rework beyond what falls out naturally from trimming the card.

## Known risks

- `ProjectCard.tsx` is 247/300 lines today. If we keep one component serving both the trimmed Projects-page view and the full HomePage view, it grows past the cap. Likely answer: extract a `ProjectCardDetails` subcomponent (the bullet lists) or split into two card variants. Decide at thickening time.
- The modal pattern duplicates `TranscriptModal` rather than abstracting it — accepted, but increases drift surface for keyboard/scroll/z-index behavior across two modals.
- Personal badge currently sits at `position="absolute" bottom={0} left={0}` — its placement may need adjustment when the card body shrinks.

## Success signal

On the Projects page, every card shows only the trimmed resting state (title, short description, tech chips, link icons, Inspect button); clicking Inspect opens a JRPG-styled modal with that project's full features / metrics / contributions; Esc and backdrop click close it; HomePage's card usage is unaffected.

## Notes

Reusable from existing code: Portal pattern, GlassPanel elevation="strong", `bg.steelAlpha.90`, `accent.teal`, `border.inner`, `modal.content` shadow, `pageTitle`/`dialogue`/`smallText` textStyles, fadeIn 0.2s. No new tokens needed.
