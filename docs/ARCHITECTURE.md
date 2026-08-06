---
type: specification
title: Portfolio Architecture
description: Binding application boundaries, composition, source ownership, and dependency direction for the client-only portfolio.
tags: [architecture, react, vite, client-only]
timestamp: 2026-07-25
authority: binding
---

# Portfolio Architecture

This document is binding and living. **If code and this document disagree, the
code is wrong.** Amend this document deliberately in the same unit of work when
the application contract changes.

## Runtime boundary

The portfolio is a client-only React application built by Vite. It has no
backend, account system, application database, API client, server-rendered
route, analytics pipeline, or runtime content service.

The browser runtime has five external boundaries:

- static assets served from `public/`;
- route history managed by `BrowserRouter`;
- canvas rendering used by the starfield;
- outbound portfolio, source-code, and social links;
- the DOM, including keyboard, pointer, focus, and viewport behavior.

Production output is a static bundle in `dist/`.

## Application composition

`src/main.tsx` mounts the application under React strict mode and the custom
Chakra `Provider`. `src/App.tsx` owns the route table. Each page module is a
`React.lazy` route boundary under its existing `BrowserRouter` path. `AppShell`
stays mounted across route changes and owns the `Suspense` loading boundary
around its `Outlet`.

| Route | Page | User surface |
|---|---|---|
| `/` | `HomePage` | Introductory dialogue |
| `/projects` | `ProjectsPage` | Project grid and project inspection |
| `/about` | `AboutPage` | Topic selection and dialogue scenes |
| `/contact` | `ContactPage` | External contact links |
| unmatched | `HomePage` | Stable fallback |

All routes render through `AppShell`. The shell owns the starfield, responsive
navigation, scrollable route outlet, route-loading presentation, and
player-stats panel. Pages own route-specific composition; the shell does not
own page content.

## Source ownership

| Path | Owns |
|---|---|
| `src/pages/` | Route-level composition and route-local state |
| `src/components/` | Reusable feature components |
| `src/components/ui/` | Smaller interface primitives |
| `src/data/` | Portfolio facts, dialogue content, project records, and contact records |
| `src/hooks/` | Reusable interaction state |
| `src/theme/` | Chakra system, tokens, text styles, shadows, recipes, and provider |
| `src/utils/` | Browser-facing animation and motion helpers |
| `src/index.css` | Minimal global browser styling |
| `public/` | Static images and icons |

Portfolio facts have one source under `src/data/`. Components render those
records and may derive presentation state from them; they do not maintain
competing copies.

## Dependency direction

Dependencies point inward toward data, interaction logic, and UI primitives:

1. `main.tsx` composes the provider and application.
2. `App.tsx` composes the shell and route pages.
3. Pages compose feature components and import portfolio data.
4. Feature components may compose UI primitives and hooks.
5. UI primitives may depend on Chakra and the theme vocabulary.
6. Data modules do not import pages or components.
7. Theme modules do not import application pages or feature components.

Reusable interaction behavior belongs in a hook when more than one component
needs the same state machine. Route-local selection state remains with its
route. No global application store is part of the architecture.

## Interface boundary

Chakra owns layout and most visual composition. Shared visual contracts are
defined in [DESIGN.md](DESIGN.md); feature components use those contracts
without creating a second theme layer.

The project has no automated test runner. Its verification boundary is defined
in [TESTING.md](TESTING.md), including the distinction between static gates,
the production-bundle audit, and composed browser evidence.

## See also

- [Documentation index](index.md) — bundle root for the binding project documents
- [Design](DESIGN.md) — interface vocabulary and component discipline
- [Testing](TESTING.md) — evidence required for changes to this architecture
