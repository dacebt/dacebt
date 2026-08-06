# Portfolio Documentation

This is the bundle root for the portfolio's binding project documentation. The
three specifications are also living: if code and a specification disagree,
the code is wrong, and both are reconciled in the same unit of work.

- [Architecture](ARCHITECTURE.md) — Binding application boundaries, composition, source ownership, and dependency direction for the client-only portfolio.
- [Design](DESIGN.md) — Binding visual language, styling ownership, component patterns, responsive behavior, and accessibility contract for the portfolio interface.
- [Testing](TESTING.md) — Binding verification tiers, browser acceptance matrix, and completion evidence for the portfolio.
- [Direction](direction/index.md) — Persistent WSD session boundaries and direction artifacts.
- [Portfolio bundle performance](direction/2026-08-05-portfolio-bundle-performance.shape.md) — Session boundaries, cadence, and success signal for auditing and improving the portfolio production bundle.
- [Active thickening](thickenings/active.md) — Active WSD thickening for preserving the portfolio shell and providing recovery when lazy route content fails to load.

The root [CLAUDE.md](../CLAUDE.md) declares how these documents govern code.
This repository is `dacebt/dacebt`, so [README.md](../README.md) renders as
David's public GitHub profile page. It presents his professional profile and
selected projects, and is not repository orientation—repository setup,
verification, and structure are owned by the documents above. Delivery state,
tasks, working knowledge, and decisions live in the external project vault.
