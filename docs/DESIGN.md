---
type: specification
title: Portfolio Design
description: Binding visual language, styling ownership, component patterns, responsive behavior, and accessibility contract for the portfolio interface.
tags: [design, chakra-ui, components, accessibility]
timestamp: 2026-08-01
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
  `surface.supporting`, `surface.selectable`, and `surface.modal`;
- the complete panel-gradient family is `gradient.panel.subtle`,
  `gradient.panel.medium`, and `gradient.panel.strong`;
- compact dialogue entries use the feature-owned `dialogueEntry.surface.*`,
  `dialogueEntry.depth.*`, `dialogueEntry.edge`, and `dialogueEntry.*` shadow
  roles rather than a shared panel surface;
- project-card internals use the exact `projectCard.control`,
  `projectCard.chip`, `projectCard.divider`, and `projectCard.chipBorder`
  roles plus `gradient.projectCard.primary`;
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
`supporting`, `selectable`, or `modal` responsibility; they do not
choose visual elevation directly or rebuild the panel treatment. Background,
border, radius, shadow, blur, isolation, and overlay pseudo-element props are
reserved by the primitive's public contract so a caller cannot override its
chosen responsibility.
Compact dialogue entries are feature-owned composition that consumes the named
`dialogueEntry` roles without routing through `GlassPanel`.

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
presentations used by Inspect and Back. It forwards its native button ref so
feature composition and shared interaction owners can retain exact trigger
identity and focus control.
Project cards compose the selectable `GlassPanel` without corner accents or a
page-wide fixed height. Their Header Utility presents a teal `Personal project`
eyebrow only for personal work, the project title, negative-only
contribution state, and a 42px icon-only GitHub action in a divided header. Its
internal composition uses the `projectCardEyebrow`, `projectCardTitle`,
`projectCardSummary`, `projectCardChip`, and `projectCardAction` text roles,
1rem card padding, and a 0.75rem vertical rhythm. The card is an `article`
containing a semantic `header`, `h3`, and `footer`; its technology chips form a
labelled `group` named `Featured technologies`. It ends in paired 42px actions
where the gradient-backed primary
`Inspect project` control takes the remaining width and the raised, bordered
configured destination keeps its natural width; both labels remain on one line.
The project grid uses content-bounded auto-fill tracks that target a 300px
minimum when the container permits and shrink to the available width on
narrower mobile viewports. Under that constraint, the footer wraps the
configured destination below Inspect rather than overflowing; at card widths of
300px or more, the actions retain the prototype's paired row. Incomplete final
rows retain the same track width as preceding rows. Each grid row is
content-sized by its tallest card; sibling cards stretch to that row height and
their actions align at the bottom. `GlassPanel` remains the sole owner of the
outer surface and depth; feature hover may transform the card but cannot replace
that primitive-owned depth.
The Link recipe owns route navigation, the `projectIcon` GitHub header action,
and the `projectAction` bordered secondary destination. The tooltip wrapper
owns supplemental tooltip behavior; a tooltip is never the sole accessible
name or state description.

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

The project Inspect flow composes its feature-owned content inside `ModalShell`.
The Projects route owns the selected project and exact Inspect trigger; each
card passes the activated button back to that owner, and closing Inspect restores
focus to that exact control.

The Home and About dialogue flow is a compact, cumulative conversation log:

- only reached messages render, and each completed entry remains visible in
  full while the current entry streams below it;
- each entry shows a borderless, aspect-ratio-preserving portrait in a dedicated
  left rail with a speaker-colored divider, plus a visible speaker name and a
  distinct current-message marker or treatment;
- David uses teal speaker and edge treatment while every other speaker uses
  green treatment; the current entry retains the raised steel-blue dialogue
  surface established for the compact log;
- short histories occupy the available route-content height and align to its
  bottom through minimum-height and flex-end composition;
- long histories grow through the existing `AppShell` route scroller, whose
  top remains reachable; the dialogue does not introduce a nested scroller;
- appending a message does not change the route scroller's position, move
  keyboard focus, or otherwise force the visitor to follow the new entry;
- a polite live region outside the streaming text announces an appended entry
  exactly once, so character-by-character rendering is never announced;
- the original progression remains intact: the active entry streams, then the
  next message appends automatically after the route-specific delay;
- clicking the scene or pressing Space or Enter retains the original optional
  skip-or-advance behavior without being required for progression.

The dialogue log does not expose a Transcript modal, message count, progress
indicator, dialogue action controls, or `T` shortcut. Space and Enter scene
shortcuts yield when the event target is an interactive or editable control. The
About scene retains its visible Back action, browser-back behavior, and Escape
return to topic selection.

Navigation and external links use semantic anchors. Actions use semantic
buttons with `type="button"`. Selectable buttons preserve the native `disabled`
attribute and behavior. Each Contact card is one external anchor with no nested
interactive descendant and uses `target="_blank"` with
`rel="noopener noreferrer"`. Project GitHub icons are decorative and their
anchors use project-qualified accessible names. Repeated Inspect and configured
destination controls retain their visible label at the start of a
project-qualified accessible name. Exactly one visible navigation link
identifies the current route with `aria-current="page"`.

Dialogue does not render Skip, Next, or Complete controls. Its optional Space
and Enter acceleration preserves native behavior
when focus is inside a button, anchor, form control, summary, or editable region.
Non-contributing project state is written as durable `Not contributing` text;
contributing projects do not render a positive state.

## Typography and geometry

Theme text styles define typography roles. Route headings use `pageTitle` and
`pageSubtitle`; content and selectable panels use `panelTitle`,
`supportingText`, and `selectableLabel`; modal composition uses `modalTitle`,
`sectionLabel`, and `modalBody`. Project cards use the exact prototype-specific
`projectCardEyebrow`, `projectCardTitle`, `projectCardSummary`,
`projectCardChip`, and `projectCardAction` roles rather than shared panel or
supporting-text approximations. Dialogue and compact metadata retain their
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
- dialogue renders the current message in full immediately, suppresses its
  entry and cursor animation, disables timed automatic progression, and retains
  the original click/Space/Enter manual advance without moving the route viewport;
- the canvas draws one static atmosphere and does not schedule an animation
  frame loop.

Without the reduced preference, existing animation names, dialogue typewriter
timing, compact message-entry treatment, and canvas motion remain active.

Interactive surfaces expose visible hover and keyboard-focus states. Modals,
dialogue scenes, navigation, project inspection, and external links remain
operable from the keyboard. Keyboard focus uses the shared focus-visible
treatment rather than applying focus decoration to pointer focus.

## See also

- [Documentation index](index.md) — bundle root for the binding project documents
- [Architecture](ARCHITECTURE.md) — component boundaries and source ownership
- [Testing](TESTING.md) — browser evidence for responsive and interactive behavior
