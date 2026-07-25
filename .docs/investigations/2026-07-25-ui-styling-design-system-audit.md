# Investigation Report

**Question:** "I'd like to do an audit of our current 'design system' I know there isn't one technically. I more want to look for how we have setup our UI components and styling. I want to ensure that we have a consistant pattern that we are using and we don't have a bunch of different colors defined throughout the code."

**Date:** 2026-07-25

**Scope:**
- **In scope:** The live React UI under `src/components/` and `src/pages/`; the Chakra system in `src/theme/`; global CSS and animation styling; tracked UI direction artifacts; the ignored design-system document; and focused git history for the current panel treatment.
- **Out of scope (deliberately):** Content/data quality, deployed-site behavior, external links, visual redesign decisions, and source-code changes. This is a read-only audit of the current styling system, not a redesign or implementation plan.
- **Observation:** No local Vite server was listening on ports 5173, 4173, or 3000, and repository guidance says not to start one (`CLAUDE.md:9-18`), so the composed UI was not visually exercised. Static source tracing was supplemented with a read-only Chakra `system.css(...)` runtime probe to observe how the installed styling engine resolves exact token names versus token-looking fragments embedded in composite CSS values.

---

## Summary

The project already has an informal design system: Chakra UI is configured with a custom token set, text styles, shadows, one component recipe, and shared UI primitives; ordinary component color props overwhelmingly use named theme tokens rather than scattered hex values (`src/theme/index.ts:17-455`, `src/components/ui/GlassPanel.tsx:18-85`). The color palette itself is not broadly duplicated through page code.

The system is nevertheless inconsistent at its boundaries. The theme exposes substantially more tokens than the live UI consumes, one component references a nonexistent color token, several composite shadow declarations contain token-looking text that Chakra leaves unresolved, and the load-bearing panel primitive owns raw RGBA gradients outside the theme. Buttons, modal shells, typography overrides, global CSS, and animations also use parallel styling paths rather than one consistently enforced component layer.

The resulting assessment is: **low risk of random page-level color sprawl, medium risk of token drift, and medium-to-high risk of component-pattern drift.**

---

## Current UI Styling System

### Styling layers

| Layer | Current responsibility | Evidence |
|---|---|---|
| Chakra system | Global CSS, breakpoints, spacing additions, fonts, 62 leaf color tokens, 19 shadow tokens, 25 semantic color tokens, 17 text styles, and the Link recipe | `src/theme/index.ts:4-455` |
| Shared primitives | `GlassPanel` owns surface elevation, blur, gradients, border treatment, and corner accents; `FloatingButton` builds on it; smaller UI helpers cover dialogue text and project badges | `src/components/ui/GlassPanel.tsx:18-85`, `src/components/ui/FloatingButton.tsx:17-95`, `src/components/ui/DialogueBoxContent.tsx:8-35`, `src/components/ui/ProjectCardBadge.tsx:8-31` |
| Feature components | Chakra style props compose tokens directly and frequently override primitive or text-style defaults | `src/components/NavRail.tsx:23-71`, `src/components/ProjectCard.tsx:51-280`, `src/components/DialogueBox.tsx:82-235` |
| Global stylesheet | Scrollbar styling and two keyframe definitions use Chakra CSS variables and raw dimensions | `src/index.css:1-62` |
| Runtime-injected CSS | Seven additional keyframe blocks are assembled as strings and injected by `AppShell` | `src/utils/animations.ts:1-140`, `src/components/AppShell.tsx:10-14` |
| Canvas rendering | `Starfield` owns two RGB tuples and generates alpha colors at runtime outside Chakra | `src/components/Starfield.tsx:15-31`, `src/components/Starfield.tsx:58-81` |

The styling flow is therefore centralized at the palette level but distributed at the behavior and component-pattern levels.

### Color inventory

The theme's color tree contains 62 leaf tokens. Its literal palette resolves to 13 unique solid hex values plus 41 unique RGBA values; two solid values are deliberately aliased under multiple names (`#64748B` and `#94A3B8`) (`src/theme/index.ts:42-141`). Most of the apparent size comes from hand-authored alpha ladders: 18 teal-alpha values, five green-alpha values, six white-alpha values, and seven black-alpha values (`src/theme/index.ts:65-127`).

Across live component and page files, normal `color`, `bg`, and `borderColor` props almost always reference names such as `text.primary`, `text.muted`, `accent.teal`, `border.inner`, and `bg.steel`. Representative examples span navigation, cards, dialogue controls, player stats, and both modals (`src/components/NavRail.tsx:44-63`, `src/components/ProjectCard.tsx:90-156`, `src/components/RPGDialogueControls.tsx:35-89`, `src/components/PlayerStatsCard.tsx:45-106`, `src/components/TranscriptModal.tsx:94-119`, `src/components/ProjectDetailModal.tsx:116-144`).

Raw color definitions outside the theme are limited but load-bearing:

- `GlassPanel` defines three multi-stop RGBA gradients directly in its elevation configuration, so the visual identity of every major surface is not fully represented by theme tokens (`src/components/ui/GlassPanel.tsx:18-37`). `AppShell` alone uses this primitive for desktop navigation, mobile navigation, main content, and footer (`src/components/AppShell.tsx:44-108`).
- `DialogueBox` defines its portrait shadow with raw white/black RGBA values instead of the available shadow/token system (`src/components/DialogueBox.tsx:163-203`).
- `Starfield` duplicates the teal RGB value `[91, 192, 190]` and adds a separate pale-star RGB value `[200, 215, 230]` in canvas code (`src/components/Starfield.tsx:15-29`).
- `PageLayout` correctly uses Chakra CSS variables rather than new color literals, but it reconstructs a gradient that already exists as `gradient.pageTitle` in the theme (`src/components/PageLayout.tsx:23-33`, `src/theme/index.ts:277-279`).

There is one nonexistent component token reference: `ProjectCard` uses `accent.tealAlpha.90`, but the teal-alpha scale jumps from 80 to 100 (`src/components/ProjectCard.tsx:184-198`, `src/theme/index.ts:65-84`). That branch is currently dormant because the only caller always supplies `onInspect`, while the invalid reference is under `!onInspect` (`src/pages/ProjectsPage.tsx:21-28`, `src/components/ProjectCard.tsx:167-215`). It is latent styling drift rather than a visible defect on the currently reachable Projects page.

The theme also contains an invalid internal reference: `glowCard.greenHover` uses `accent.greenAlpha.15`, which is not declared (`src/theme/index.ts:85-91`, `src/theme/index.ts:209-215`). No live component references that shadow, so this is dead configuration rather than a current rendered defect.

### Token resolution defects

Several declarations look tokenized but are not valid Chakra token usage:

- `DialogueBoxContent` embeds `black.alpha.80` and `accent.greenAlpha.30` inside a raw `textShadow` string (`src/components/ui/DialogueBoxContent.tsx:10-18`).
- `ContactPage` embeds `black.alpha.50` inside another raw `textShadow` string even though `buttonLabel` already defines a CSS-variable-based text shadow (`src/pages/ContactPage.tsx:67-75`, `src/theme/index.ts:329-338`).
- `ProjectDetailModal` combines two token names in one comma-separated `boxShadow` string (`src/components/ProjectDetailModal.tsx:97-112`).
- The theme global background uses `colors.bg.dark`, while Chakra style properties resolve the declared token as `bg.dark` (`src/theme/index.ts:4-15`, `src/theme/index.ts:42-45`).

The installed Chakra runtime confirms the distinction: a focused `system.css(...)` probe resolved `boxShadow: "modal.content"` to `var(--chakra-shadows-modal-content)`, but left `boxShadow: "modal.content, glow.teal.medium"` and `textShadow: "0 2px 8px black.alpha.80"` unchanged. A second probe left global `background: "colors.bg.dark"` unchanged while resolving `background: "bg.dark"` to `var(--chakra-colors-bg-dark)`. These strings therefore bypass the token resolver; the token-like fragments are emitted as raw CSS rather than substituted values.

### Surface and component composition

`GlassPanel` is the strongest consistent component pattern. It centralizes the surface background, border, radius, elevation shadow, blur, stacking context, gradient overlay, and optional corner accents (`src/components/ui/GlassPanel.tsx:39-85`). It is reused by the app shell, dialogue box, project card, both modal contents, and `FloatingButton` (`src/components/AppShell.tsx:49-108`, `src/components/DialogueBox.tsx:125-142`, `src/components/ProjectCard.tsx:51-76`, `src/components/TranscriptModal.tsx:77-93`, `src/components/ProjectDetailModal.tsx:97-115`, `src/components/ui/FloatingButton.tsx:43-80`).

Buttons do not have an equivalent governing pattern:

- Large topic/contact actions use `FloatingButton` (`src/pages/AboutPage.tsx:105-141`, `src/pages/ContactPage.tsx:27-80`).
- Dialogue controls and About's back action independently repeat Chakra `Button` styling with the same teal background, border, radius, hover, and transition treatment (`src/components/RPGDialogueControls.tsx:35-89`, `src/pages/AboutPage.tsx:56-77`).
- Project inspection uses a `Box as="button"` with another inline treatment (`src/components/ProjectCard.tsx:217-249`).
- Icon links use the theme recipe's `iconSmall` variant, but the `nav` and `icon` Link variants are not referenced by the live source (`src/theme/link.ts:11-68`, `src/components/ProjectCard.tsx:261-275`).
- `NavRail` manually recreates an icon-link treatment instead of using the existing Link recipe (`src/components/NavRail.tsx:35-68`).

Modal shells are intentionally duplicated and have already drifted. `TranscriptModal` and `ProjectDetailModal` share the same Portal/backdrop/fixed-panel/header/close/scrollbar structure (`src/components/TranscriptModal.tsx:62-188`, `src/components/ProjectDetailModal.tsx:82-173`), but only the project modal adds backdrop blur, corner accents, a stronger border, and a composite modal/glow shadow (`src/components/ProjectDetailModal.tsx:84-112`). The shape artifact explicitly accepted this duplication when the project modal was introduced (`.docs/direction/2026-05-03-projects-page-inspect-modal.shape.md:18-27`).

### Typography and spacing

Text styles are used, but feature components routinely override them:

- `PageLayout` applies `pageTitle` and then overrides its letter spacing and text transform (`src/components/PageLayout.tsx:23-33`, `src/theme/index.ts:349-357`).
- `ProjectDetailModal` applies `pageTitle` and replaces its responsive font sizes (`src/components/ProjectDetailModal.tsx:125-131`).
- `ProjectCard` applies `projectTitle` and repeats its bold weight; its detail rows apply `smallText` and then replace line height and repeat font size (`src/components/ProjectCard.tsx:90-99`, `src/components/ProjectCard.tsx:167-213`, `src/theme/index.ts:400-406`, `src/theme/index.ts:417-422`).

Six of the 17 text styles have no live reference: `heading`, `subtitle`, `body`, `navItem`, `navItemActive`, and `smallTextBold` (`src/theme/index.ts:303-328`, `src/theme/index.ts:367-384`, `src/theme/index.ts:424-429`). The live UI uses the Chakra default spacing scale heavily, while the custom `spacing.container.*` and `spacing.sidebar.*` tokens are not referenced (`src/theme/index.ts:26-38`). Component-specific pixel dimensions are common for panels, portraits, controls, and modal scrollbars (`src/components/NavRail.tsx:44-46`, `src/components/DialogueBox.tsx:19-25`, `src/components/ProjectDetailModal.tsx:105-107`, `src/components/ProjectDetailModal.tsx:152-165`).

---

## Conventions Catalog

The live conventions are:

1. **Use Chakra style props for local composition.** Components generally do not use CSS modules, styled-components, or inline hex colors.
2. **Use role-like color names directly in components.** `text.*`, `bg.*`, `border.*`, and `accent.*` form the practical component API.
3. **Use `GlassPanel` for any elevated JRPG surface.** This is the most consistently applied abstraction.
4. **Use text styles as starting presets, not strict contracts.** Overrides are common and sometimes negate properties encoded by the preset.
5. **Use Chakra's default spacing/radius vocabulary alongside raw pixel geometry.** The custom theme does not currently govern spacing or radii in practice.
6. **Use three animation sources.** `src/index.css`, runtime injection from `src/utils/animations.ts`, and component-local animation strings all remain active.

These conventions are recognizable, but only the color-role naming and `GlassPanel` reuse are consistently enforced across the UI.

---

## Absences

- There is no live, tracked design-system reference. `docs/DESIGN_SYSTEM.md` claims all tokens, colors, typography, shadows, and animations are centralized, but `/docs` is ignored (`docs/DESIGN_SYSTEM.md:1-11`, `.gitignore:26`). It also documents older panel, border, and muted-text values that differ from live source (`docs/DESIGN_SYSTEM.md:17-39`, `docs/DESIGN_SYSTEM.md:69-80`, `src/theme/index.ts:42-58`, `src/theme/index.ts:99-105`).
- There is no token-validity check for string-valued Chakra props. TypeScript permits the nonexistent `accent.tealAlpha.90` and the unresolved composite CSS strings.
- There is no shared modal-shell pattern despite two structurally parallel modal implementations.
- There is no shared compact-button pattern despite repeated button styling across About, dialogue controls, and project inspection.
- There is no component workbench or visual-regression surface in the package scripts; the available scripts are development, build, Chakra type generation, type-check, lint, and preview (`package.json:6-13`).

---

## Risk Inventory

1. **Theme edits have a wider apparent surface than the rendered UI.** Most semantic tokens, several shadow families, six text styles, two custom spacing groups, and two Link variants are unused. Dead definitions make it difficult to distinguish supported design-system API from historical residue (`src/theme/index.ts:142-302`, `src/theme/index.ts:303-455`, `src/theme/link.ts:11-68`).
2. **Dormant component paths contain unresolved styling.** `ProjectCard` retains a full-detail branch that no current caller reaches, and that branch contains the nonexistent teal-alpha token (`src/components/ProjectCard.tsx:167-215`, `src/pages/ProjectsPage.tsx:21-28`).
3. **Composite token strings silently bypass Chakra resolution.** The code reads as though it uses centralized values while the styling engine emits the strings unchanged. This affects dialogue text shadows, contact text shadows, the project modal shadow, and the global page background.
4. **The panel contract has conflicting authorities.** The tracked JRPG redesign artifact requires opaque panels and no backdrop blur (`.direction/jrpg-redesign.shape.md:14-24`, `.direction/jrpg-redesign.shape.md:46-48`), while live `GlassPanel` deliberately uses semi-transparent backgrounds and 6–14px backdrop blur (`src/theme/index.ts:46-54`, `src/components/ui/GlassPanel.tsx:18-35`, `src/components/ui/GlassPanel.tsx:48-64`). Git history shows this was an intentional later restoration in commit `9305f43`, not an accidental partial migration, but the tracked direction artifact was not reconciled.
5. **A global visual change requires edits in several styling systems.** Theme tokens, `GlassPanel` literals, global CSS, injected animation strings, feature-level props, and canvas colors are all potential sources of visual behavior.
