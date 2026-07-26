---
slug: jrpg-redesign
created: 2026-04-28
appetite: 10 thickenings
git_strategy: commit-per-thickening on main
status: completed
authority: historical
---

# JRPG UI Redesign

> This completed delivery shape records its bounded unit. It is not current
> design authority; [Portfolio Design](../docs/DESIGN.md) governs the interface.

## Appetite

10 thickenings. Stop at 10 regardless of remaining ideas — declare what's done and what remains.

## Problem Statement

The portfolio site's visual identity uses glassmorphism (blurred backgrounds, semi-transparent panels, soft rounded corners, glowing shadows) which reads as "modern dashboard" rather than the intended JRPG-inspired aesthetic. The dialogue system and page content are strong — the container system, borders, layout arrangement, and panel styling are the problem.

## In Scope

1. **Replace the GlassPanel container system** with JRPG-inspired opaque beveled panels — solid dark gradient backgrounds, pixel-precise multi-layer box-shadows (beveled border technique), sharp corners (2-4px border-radius max), no backdrop-filter blur.
2. **Redesign layout arrangement** — panels should feel tiled/anchored like an RPG windowed system, not floating centered cards. Edge-anchored with small fixed margins.
3. **Update NavRail** to match the new panel aesthetic.
4. **Update PlayerStatsCard** to match the new panel aesthetic.
5. **Update theme tokens** — replace steelAlpha transparency tokens with opaque gradient pairs, replace glow shadows with beveled shadow tokens, reduce border-radius values.
6. **Remove dead code** — HubPage, old AppLayout, old Navigation, HourglassGrid, SectionDock, sections/ folder, navModeContext, useNavMode hook, unused components (GlowCard, ModalBase, ResponsiveGrid, InterfaceFrameBolts, InterfaceFrameShadows). Preserve ProjectCardTechStack only if it gets wired up; otherwise remove.
7. **Preserve the 5 commented-out About topics** in src/data/about.ts — these need content written later.

## Out of Scope

- Dialogue system changes (DialogueBox, RPGDialogueScene, RPGDialogueControls, TranscriptModal, useRPGDialogue)
- Page content or data changes
- New pages (resume, etc.)
- Contact form
- SEO / meta tags
- Project card redesign (beyond inheriting new panel styles)
- Adding new features or functionality
- Writing content for the 5 incomplete About topics

## Known Risks

- **GlassPanel is used everywhere.** Changing it affects every page simultaneously. Need to update the component itself rather than replacing call sites one by one.
- **Theme token changes cascade.** Shadow and color token changes may break components that reference them directly. Run type-check after theme changes.
- **Responsive behavior.** The current layout has mobile/desktop breakpoints in NavRail and AppShell. New layout must preserve responsive behavior.
- **DialogueBox uses GlassPanel.** The dialogue boxes wrap in GlassPanel — changes must not break the dialogue aesthetic that already works well. May need a variant or the dialogue box may need its own container treatment.

## Success Signal

The site renders with opaque, beveled-border panels that evoke JRPG menu windows. No glassmorphism remains (no backdrop-filter blur, no semi-transparent panel backgrounds). Layout feels tiled/anchored rather than floating. Dead code is removed. All 4 pages render correctly with the new styling. Type-check and lint pass clean.
