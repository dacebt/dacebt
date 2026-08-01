# Shape: Persistent portfolio dialogue log

**Declared:** 2026-07-31
**Cadence:** Loose
**Git strategy:** commit-to-main

## In scope

- Replace the single-message Home and About presentation with the approved
  compact dialogue log while preserving the existing portfolio page composition.
- Keep every reached message visible, append each new message below the last,
  bottom-pin short conversations, and leave the route viewport's scroll position
  unchanged when an overflowing conversation receives another message.
- Preserve the original automatic typewriter and timed progression while each
  newly reached message appends beneath the previous one. Preserve the original
  scene click and Space/Enter skip-or-advance behavior as optional acceleration.
- Remove Transcript, the `T` shortcut, message progress, and their dead
  modal/presentation paths from the shared dialogue subsystem.
- Preserve Home and About content, About topic selection, browser-back and Escape
  behavior, the shared JRPG visual language, reduced-motion behavior, and native
  keyboard operation.
- Reconcile the binding design and testing contracts, then verify Home and every
  About conversation at desktop and mobile widths in the running production build.

## Out of scope (deliberately)

- Changes to navigation, the application shell, player stats, page headings,
  About topic selection cards, or any non-dialogue page composition.
- Editorial changes to Home or About copy, profile facts, contact data, or the
  separate PORT-003 content review.
- Changes to Projects, project inspection, Contact, or unrelated shared controls.
- Introducing an automated test framework.

## Known risks

- Bottom-pinned flex geometry must not create an inaccessible top region once a
  long About conversation exceeds the route viewport.
- Removing Transcript while retaining automatic progression changes keyboard,
  focus, and timer behavior that previously interacted across several components.
- Static checks cannot prove scroll retention, responsive density, or visual
  fidelity; these require production-preview browser observation and David's
  visual acceptance.

## Success signal

On `/` and every `/about` topic at desktop and mobile widths, only reached
messages accumulate in the approved bottom-pinned dialogue log; dialogue action
controls are absent, automatic progression retains the original timing,
appending after overflow does not change the route viewport's scroll position,
Transcript and progress UI are absent, surrounding page layout is unchanged,
reduced motion remains operable, all required gates pass, and David accepts the
running result.

## Notes

This is one vertical capability. It needs no capability map or domain model.
Visual acceptance applies to the running application; shaping artifacts are not
production source.
