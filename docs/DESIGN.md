---
type: specification
title: Portfolio Design
description: Binding visual language, styling ownership, component patterns, responsive behavior, and accessibility contract for the portfolio interface.
tags: [design, chakra-ui, components, accessibility]
timestamp: 2026-07-25
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

`src/theme/index.ts` is the source of truth for the Chakra vocabulary:

- color tokens describe visual roles rather than individual callers;
- shadow tokens represent complete supported effects;
- text styles represent reusable typography roles;
- semantic tokens represent complete gradients and computed visual roles;
- recipes govern reusable Chakra component variants.

A token reference must resolve through Chakra. A token-looking fragment inside
an arbitrary CSS string is not a token. Composite CSS uses a complete declared
token, Chakra's token-reference mechanism, or resolved CSS variables.

Theme entries are supported interface only when they represent an intentional
role. Components do not reference undeclared tokens, and unsupported theme
surface is removed rather than retained as speculative vocabulary.

Theme changes that affect generated Chakra typings include type generation in
the same unit of work.

## Component patterns

`GlassPanel` is the common elevated-surface primitive. It owns surface
background, border, radius, elevation, blur, gradient overlay, stacking
isolation, and optional corner accents. Callers choose composition and
elevation; they do not rebuild the panel treatment.

`PageLayout` owns route heading composition and the page content frame.
`FloatingButton` owns the large selectable-card treatment. The tooltip wrapper
owns tooltip provider behavior. Feature components use these primitives when
their interaction matches the primitive's contract.

Portal modals share one behavioral contract even where their content differs:

- a fixed full-screen overlay;
- a centered panel above application content;
- a labelled heading and explicit close control;
- Escape and backdrop-close behavior;
- bounded, scrollable content;
- no click-through from the panel to the backdrop.

Navigation and external links use semantic link elements. Actions use semantic
buttons. A visual primitive rendered as an interactive element preserves the
native element's keyboard and disabled behavior.

## Typography and geometry

Theme text styles define typography roles. A component may adjust layout
geometry responsively, but it does not silently negate the role's case, weight,
spacing, or hierarchy. A repeated override belongs in the text style or a new
named role.

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
Keyframes and reusable motion behavior have a named shared owner. Components
select those behaviors and may vary duration or delay; they do not introduce
near-duplicate animation definitions.

Interactive surfaces expose visible hover and keyboard-focus states. Modals,
dialogue controls, navigation, project inspection, and external links remain
operable from the keyboard. External links opened in a new tab use
`rel="noopener noreferrer"`.

## See also

- [Documentation index](index.md) — bundle root for the binding project documents
- [Architecture](ARCHITECTURE.md) — component boundaries and source ownership
- [Testing](TESTING.md) — browser evidence for responsive and interactive behavior
