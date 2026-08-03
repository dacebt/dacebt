# Senior Full Stack Developer | AI Systems & Developer Tooling

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://davidacolon.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/david-a-colon/)
[![X](https://img.shields.io/badge/X-Follow-111111?logo=x)](https://x.com/epicbadtiming)

I'm a Senior Full Stack Developer focused on AI development systems, developer
tooling, and polished product experiences. I build both the infrastructure that
helps coding agents work reliably and the applications produced with those
workflows.

After a decade in professional kitchens, I made the leap into software
development and never looked back. That background still shapes how I work:
care about the whole service, stay sharp under pressure, and keep refining the
craft.

**What I work on:**

- Agentic development infrastructure: plugins, orchestration, project memory,
  quality gates, and observability
- Full-stack products across React, TypeScript, Cloudflare, Go, Python, and
  Solidity
- Local-first tools that make complex systems easier to understand and operate
- Playful interfaces with a strong product point of view

![GitHub Breakout Game](https://raw.githubusercontent.com/dacebt/dacebt/breakout-output/github-breakout.gif)

*Generated daily with [gh-brickbreak](https://github.com/dacebt/gh-brickbreak).*

---

## Notable Projects

### EBT Plugins

A marketplace of five independently installable plugins for Claude Code and
Codex. Together they provide a build discipline, durable project memory,
reusable investigation and review workflows, session orchestration, and live
status tooling for agentic software development.

**Tech:** Claude Code, Codex CLI, SKILL.md, plugin manifests, Markdown,
pre-commit hooks

**Features:** Walking Skeleton Development with separate implementation,
adversarial review, and quality-gate roles; an external project brain for tasks,
decisions, linked knowledge, journals, and handoffs; project-agnostic skills for
investigation, review, prompt authoring, memory hygiene, and documentation;
parallel Claude Code and Codex workflows

### Agent Beacon

[![GitHub](https://img.shields.io/badge/GitHub-View_repository-181717?logo=github)](https://github.com/dacebt/agent-beacon)

A local status display for AI coding sessions that shows whether each session is
working, idle, waiting on you, finished, or failed—on a browser preview, a
physical Divoom Pixoo-64, or both.

**Tech:** Go, SQLite, Claude Code, Codex CLI, Divoom Pixoo-64

**Features:** One renderer for browser and hardware output; sanitized,
loopback-only lifecycle events; concurrent session visibility; attention states
for approval and input; installable Claude Code and Codex integrations

### Caffeinate

[![GitHub](https://img.shields.io/badge/GitHub-View_repository-181717?logo=github)](https://github.com/dacebt/caffeinate)

A macOS menu bar utility for starting, replacing, and stopping real
`caffeinate` sessions with plain-language wake modes and timed durations—without
keeping a Terminal window open.

**Tech:** Python 3.13, rumps, PyObjC, py2app, uv, mypy

**Features:** Eight wake-mode and duration combinations; process-authoritative
session state; safe replacement and shutdown; atomic preferences; standalone
packaging with no Dock icon or Terminal

### Bitcraft Codex

[![Website](https://img.shields.io/badge/Website-Visit-24b7a1?logo=googlechrome&logoColor=white)](https://bccodex.com)

A companion application for BitCraft Online with recursive recipe breakdowns,
multi-source inventory tracking, persistent selections, and a catalog of more
than 7,000 game items and their crafting trees.

**Tech:** React, Remix, TypeScript, Chakra UI, Cloudflare Pages

**Features:** Recursive material calculations; inventory tracking across
personal, claim, bank, and storage sources; persistent client selections;
complete recipe coverage for the game-item catalog

### Bitcraft Codex News

[![Website](https://img.shields.io/badge/Website-Visit-24b7a1?logo=googlechrome&logoColor=white)](https://news.bccodex.com)

An automated newspaper system that turns BitCraft Online game chat into daily
regional editions with a vintage newspaper presentation.

**Tech:** Cloudflare Workers, D1, React, TypeScript, OpenAI, Anthropic,
Google GenAI, Docker

**Features:** Cursor-based polling with backlog catch-up; separate ingestion and
generation workers; multi-provider LLM generation; idempotent processing across
nine game regions

### EBT Games

A collection of finished browser games exploring real-time multiplayer,
deterministic systems, 3D interaction, and responsive play. They share a
Chakra-based visual foundation while keeping their own gameplay and technical
identity.

#### Wikipedia Speedrun

[![Website](https://img.shields.io/badge/Website-Play-24b7a1?logo=googlechrome&logoColor=white)](https://speed-wiki.epicbadtiming.com)

A multiplayer Wikipedia race where up to eight players click from a shared
starting article to a goal article. A SQLite-backed Cloudflare Durable Object
owns each room and authoritatively handles timing, scoring, reconnects, and win
detection.

**Tech:** React, TypeScript, Cloudflare Workers, Durable Objects, WebSockets

#### Ninefold

[![Website](https://img.shields.io/badge/Website-Play-24b7a1?logo=googlechrome&logoColor=white)](https://ninefold.epicbadtiming.com)

A polished 9×9 number-logic puzzle game with deterministic generation,
unique-solution validation, responsive controls, and persistent local progress.

**Tech:** React, TypeScript, Vite, Chakra UI

#### Wordtrace

[![Website](https://img.shields.io/badge/Website-Play-24b7a1?logo=googlechrome&logoColor=white)](https://wordtrace.epicbadtiming.com)

A WebGL word-tracing game with a responsive 3D board, seeded generation,
dictionary and path validation, timed scoring, and persistent statistics.

**Tech:** React, TypeScript, Vite, Chakra UI, Three.js
