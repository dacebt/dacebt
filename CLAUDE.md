# David Colon Portfolio

A client-only portfolio for David Colon, built with React, TypeScript, Vite,
Chakra UI, and React Router. Static portfolio content is presented through a
PlayStation-era RPG interface with dialogue scenes, project inspection, contact
links, and responsive navigation.

## Canonical docs

**If code and these documents disagree, the code is wrong.** Fix the code in
the document's favor, or deliberately amend the affected document in the same
unit of work.

| Doc | Authority | Covers |
|---|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | binding and living | Runtime boundaries, application composition, source ownership, dependency direction |
| [docs/DESIGN.md](docs/DESIGN.md) | binding and living | Visual language, design tokens, component patterns, responsive behavior, accessibility |
| [docs/TESTING.md](docs/TESTING.md) | binding and living | Verification tiers, browser acceptance, and completion evidence |

[docs/index.md](docs/index.md) is the bundle root. Delivery state, tasks,
working knowledge, and decisions live in the external project vault.

## Invariant floor

1. The application is a client-only static site; content does not depend on a
   backend, account, database, or runtime API.
2. Portfolio facts live in `src/data/`; rendering components do not maintain
   competing copies.
3. Shared visual decisions belong to the Chakra theme or a named UI primitive;
   feature components compose those decisions rather than creating parallel
   styling systems.
4. The four public routes remain usable across desktop and mobile layouts, with
   keyboard-operable interactive surfaces.

## Documentation discipline

`docs/` is a linked OKF bundle. Every non-reserved Markdown document carries
frontmatter with `type`, `title`, `description`, `tags`, `timestamp`, and
`authority`. [docs/index.md](docs/index.md) lists every document using its own
description. Documents use relative Markdown links, and every document has both
an inbound link from the index and an outbound link.

## Decisions

Consequential choices are recorded in the external project vault, resolved
through the installed vault tooling rather than an assumed filesystem path.
Repository documents hold the *what*; vault decisions hold the *why*. If the
vault is unavailable, surface the decision to David instead of inventing an
in-repository location.
