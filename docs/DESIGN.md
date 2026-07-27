---
type: specification
title: Portfolio Design
description: Binding visual language, styling ownership, component patterns, responsive behavior, and accessibility contract for the portfolio interface.
tags: [design, chakra-ui, components, accessibility]
timestamp: 2026-07-27
authority: binding
---

# Portfolio Design

This document is binding and living. **If code and this document disagree, the
code is wrong.** Visual changes amend this document and their implementation in
the same unit of work.

## Visual language

The interface presents a PlayStation-era RPG status screen:

- a dark starfield establishes depth behind the application;
- steel-blue translucent panels form the shell and content surfaces;
- teal marks navigation, focus, selection, and general interaction;
- green distinguishes dialogue and speaker treatment;
- pale foreground text carries primary content while muted blue-gray text
  carries secondary information;
- compact borders, corner brackets, layered shadows, and restrained glow create
  the panel hierarchy.

The result is an interface system, not decorative styling applied independently
by each page.

## Styling ownership

The supported styling layers are:

| Layer | Owner |
|---|---|
| Palette, semantic roles, typography, shadows, and recipes | `src/theme/` |
| Elevated surfaces and reusable controls | `src/components/ui/` |
| Feature composition and responsive arrangement | `src/components/` and `src/pages/` |
| Browser-wide scrollbar and keyframe behavior | `src/index.css` and `src/utils/` |
| Runtime canvas drawing | `Starfield` |

Feature components use named theme roles such as `bg.*`, `text.*`, `border.*`,
and `accent.*`. New palette values do not originate in page or feature
components.

Canvas color construction and visual algorithms that cannot consume Chakra
props remain named non-Chakra boundaries. Their palette maps to the same visual
roles instead of establishing an unrelated color system.

## Token contract

`src/theme/index.ts` is the thin composition root for the Chakra vocabulary.
Responsibility-focused modules own the individual token, semantic-token,
text-style, shadow, and recipe definitions that it assembles:

- color tokens describe visual roles rather than individual callers;
- the complete surface family is `surface.shell`, `surface.content`,
  `surface.supporting`, `surface.selectable`, `surface.dialogue`, and
  `surface.modal`;
- the complete panel-gradient family is `gradient.panel.subtle`,
  `gradient.panel.medium`, and `gradient.panel.strong`;
- `modal.content` is the complete supported modal shadow;
- text styles represent reusable typography roles;
- semantic tokens represent complete gradients and computed visual roles;
- recipes govern reusable Chakra component variants.

A token reference must resolve through Chakra. A token-looking fragment inside
an arbitrary or composite CSS string is not a token. Composite token-looking
strings are unsupported; a component uses a complete declared role, Chakra's
token-reference mechanism, or resolved CSS variables.

Theme entries are supported interface only when they represent an intentional
role. Components do not reference undeclared tokens, and unsupported theme
surface is removed rather than retained as speculative vocabulary.

Theme changes that affect generated Chakra typings include type generation in
the same unit of work.

## Component patterns

`GlassPanel` is the common elevated-surface primitive. It owns surface
background, border, radius, elevation, blur, gradient overlay, stacking
isolation, and optional corner accents. Callers choose the `shell`, `content`,
`supporting`, `selectable`, `dialogue`, or `modal` responsibility; they do not
choose visual elevation directly or rebuild the panel treatment. Background,
border, radius, shadow, blur, isolation, and overlay pseudo-element props are
reserved by the primitive's public contract so a caller cannot override its
chosen responsibility.

`PageLayout` owns route heading composition and the page content frame, including
the complete `gradient.pageTitle` treatment. `SelectableButton` and
`SelectableLink` are explicit native-element siblings that share the selectable
surface, layout, typography, and interaction presentation used by topic and
contact panels. Selectable actions do not route through a button-or-anchor
polymorphic abstraction. Their prop contracts expose required semantic and
accessibility native attributes, ordinary `data-*` attributes, and named size,
density, and animation inputs. Native `translate="yes|no"` is remapped through
Chakra's HTML-attribute escape. The Chakra-colliding `content` attribute,
component-owned state hooks, and owned presentation are not public.
`CompactAction` is button-only and owns the neutral, subtle, and primary
presentations used by Inspect, Back, Transcript, and Skip/Next actions. It
forwards its native button ref so feature composition and shared interaction
owners can retain exact trigger identity and focus control.
The Link recipe owns route-navigation and project icon-link presentation. The
tooltip wrapper owns supplemental tooltip behavior; a tooltip is never the sole
accessible name or state description.

`ModalShell` owns the shared portal-modal behavior while modal content remains
feature-owned:

- a fixed full-screen overlay;
- a centered panel above application content;
- labelled dialog semantics and an explicit close control whose stable
  accessible label is `Close <title>`;
- initial focus inside the dialog and final focus restored to the exact trigger;
- Tab and Shift+Tab containment for the full time the dialog is open;
- prevention of background and outside interaction;
- scroll containment that leaves the application's route scroll owner in place;
- Escape, close-control, and backdrop-close behavior;
- bounded, scrollable modal content with no panel click-through to the backdrop.

The project Inspect and dialogue Transcript flows compose their feature-owned
content inside `ModalShell`. Transcript uses the shell's body ref and scroll
intent seam to retain current-message positioning until the user scrolls, and
uses the shared footer role for its message count. Inspect and Transcript
openings from a native control restore focus to that exact control. A Transcript
opened by the T shortcut returns focus to the Transcript control.

Navigation and external links use semantic anchors. Actions use semantic
buttons with `type="button"`. Selectable buttons preserve the native `disabled`
attribute and behavior. Each Contact card is one external anchor with no nested
interactive descendant and uses `target="_blank"` with
`rel="noopener noreferrer"`. Project icon links use project-qualified
accessible names while their icons remain decorative. Exactly one visible
navigation link identifies the current route with `aria-current="page"`.

Dialogue Transcript and Skip/Next controls retain explicit `Transcript`,
`Skip`, or `Next` names when their visible labels hide at the mobile breakpoint;
their icons are decorative. The scene-level Space, Enter, and T shortcuts yield
when the event target is inside a button, anchor, input, select, textarea,
summary, or editable region, so native control activation is not duplicated.
Non-contributing project state is written as durable text; its X icon is
decorative and its tooltip is supplemental.

## Typography and geometry

Theme text styles define typography roles. Route headings use `pageTitle` and
`pageSubtitle`; content and selectable panels use `panelTitle`,
`supportingText`, and `selectableLabel`; modal composition uses `modalTitle`,
`sectionLabel`, and `modalBody`. Dialogue and compact metadata retain their
dedicated roles. A component may adjust layout geometry responsively, but it
does not silently negate the role's case, weight, spacing, or hierarchy. A
repeated override belongs in the text style or a new named role.

Chakra's spacing and breakpoint vocabulary governs general layout. Exact pixel
geometry is reserved for deliberate interface details such as portraits,
corner brackets, icon rails, and scrollbar tracks.

## Responsive contract

The application has one composed shell:

- below the `md` breakpoint, navigation is a fixed bottom rail;
- from `md` upward, navigation is a left rail;
- the route outlet remains the primary scroll container;
- page grids reduce columns as the viewport narrows;
- modal content stays inside the viewport and remains scrollable;
- interactive targets remain reachable without horizontal page scrolling.

Desktop and mobile are two arrangements of the same features, not separate
feature sets.

## Motion and interaction

Animation supports hierarchy and feedback without becoming the content.
`src/utils/animations.ts` owns every app-defined named keyframe. Components
select those behaviors and may vary duration or delay; they do not introduce
near-duplicate definitions.

The browser preference boundary in `src/utils/motion.ts` maps reduced motion
across three runtime layers:

- the global reduced-motion media query suppresses CSS animations and
  transitions, including injected keyframes, and disables smooth CSS scrolling;
- dialogue renders each message in full, disables automatic progression, and
  retains manual advance, while Transcript positioning uses immediate scrolling;
- the canvas draws one static atmosphere and does not schedule an animation
  frame loop.

Without the reduced preference, existing animation names, dialogue typewriter
and auto-advance timing, smooth Transcript positioning, and canvas motion remain
unchanged.

Interactive surfaces expose visible hover and keyboard-focus states. Modals,
dialogue controls, navigation, project inspection, and external links remain
operable from the keyboard. Keyboard focus uses the shared focus-visible
treatment rather than applying focus decoration to pointer focus.

## See also

- [Documentation index](index.md) — bundle root for the binding project documents
- [Architecture](ARCHITECTURE.md) — component boundaries and source ownership
- [Testing](TESTING.md) — browser evidence for responsive and interactive behavior
