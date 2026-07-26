# David Colon Portfolio

A client-only portfolio built with React, TypeScript, Vite, Chakra UI, and React
Router. It presents David Colon's work and background through a responsive
PlayStation-era RPG interface.

![Portfolio home page](public/images/home_screenshot.png)

## Run locally

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

The development server prints its local URL. A production build and local
preview use:

```bash
npm run build
npm run preview
```

## Routes

| Route | Surface |
|---|---|
| `/` | Introductory dialogue |
| `/projects` | Project cards and inspection modal |
| `/about` | Topic-driven dialogue scenes |
| `/contact` | External contact links |

## Verification

```bash
npm run type-check
npm run lint
npm run build
```

The complete verification posture, including browser acceptance, is defined in
[Testing](docs/TESTING.md).

## Documentation

[Portfolio Documentation](docs/index.md) is the project documentation root.
The binding application structure is defined in
[Architecture](docs/ARCHITECTURE.md), and the binding interface contract is
defined in [Design](docs/DESIGN.md).

[CLAUDE.md](CLAUDE.md) declares repository authority. `AGENTS.md` imports that
router for agent runtimes that load `AGENTS.md`.
