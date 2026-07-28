// Project Types
export type ProjectType = "personal" | "professional" | "experiment" | "collaboration"

export interface ProjectLinks {
  github?: string
  website?: string
  demo?: string
  documentation?: string
}

export interface Project {
  name: string
  shortDescription: string

  currentlyContributing: boolean
  type: ProjectType
  company?: string
  companyUrl?: string
  links: ProjectLinks
  technologies: string[]
  keyFeatures: string[]
  contributions: string[]
  metrics: string[]
  tags: string[]
}

// Helper function to create a project
export function createProject(project: Project): Project {
  return project
}

const decentApp = createProject({
  name: "Decent App",
  shortDescription: "A decentralized protocol for managing and operating an onchain organization",
  type: "professional",
  company: "Decent Labs",
  companyUrl: "https://decent.build",
  currentlyContributing: false,
  links: {
    github: "https://github.com/decentdao/decent-interface",
    website: "https://www.app.decent.org",
    documentation: "https://docs.decentdao.org/app",
  },
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Chakra UI",
    "Zustand",
    "Viem",
    "wagmi",
    "TanStack Query",
    "Safe",
    "WalletConnect",
    "urql",
    "Formik",
    "i18next",
    "Sentry",
    "Hardhat",
    "Solidity",
  ],
  keyFeatures: [
    "Safe Treasury Management",
    "Sub-DAO hierarchies with nested organization structure",
    "Onchain Organization Management",
    "Token Launches",
  ],
  contributions: [
    "3+ years of contributions across the application and its contracts",
    "Core features development",
    "Architecture design",
    "Performance optimization",
    "Smart Contract development",
    "Third Party Integrations",
  ],
  metrics: ["$10m in seed funding", "Paid clients on platform"],
  tags: ["fullstack", "web3", "decent"],
})

const sarcophagusProtocol = createProject({
  name: "Sarcophagus Protocol",
  currentlyContributing: false,
  shortDescription: "A decentralized dead man's switch",
  type: "professional",
  company: "Decent Labs",
  companyUrl: "https://decent.build",
  links: {
    website: "https://sarcophagus.io",
    demo: "https://app.sarcophagus.io/dashboard",
  },
  technologies: ["React", "TypeScript", "ethers", "Arweave", "Chakra UI"],
  keyFeatures: ["Onchain dead man's switch", "Encrypted payloads stored on Arweave"],
  contributions: [
    "Created the initial frontend for the Sarcophagus Protocol",
    "Evolved entire frontend from javascript to Typescript",
  ],
  metrics: ["Collaborated with the Sarcophagus team resulting in $1.5M in paid contracts"],
  tags: ["decent", "sarcophagus", "dead mans switch", "arweave"],
})

const bitCraftOnlineProjectTool = createProject({
  name: "Bitcraft Codex",
  currentlyContributing: true,
  shortDescription:
    "A web application designed as the ultimate companion tool for BitCraft Online players",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/bccodex",
    website: "https://bccodex.com",
  },
  technologies: [
    "React 18.2",
    "Remix 2.17",
    "Vite 5.1",
    "TypeScript 5.1",
    "Chakra UI 2.8",
    "Emotion 11",
    "Zustand 5",
    "TanStack Query 5",
    "Framer Motion 11",
    "i18next",
    "Cloudflare Pages",
    "Zod",
    "ioredis",
    "pako",
    "Vitest",
    "Playwright",
    "ESLint",
  ],
  keyFeatures: [
    "Deep Recipe Breakdown with recursive material calculations",
    "Multi-Source Inventory Tracking across personal, banks, storage, and claims",
    "Persistent Selections that track inventories across sessions",
    "Complete recipe database covering the full game item catalog",
  ],
  contributions: [
    "Built the recursive recipe resolver that expands a target item into its full material tree",
    "Designed the multi-source inventory model spanning personal, claim, bank, and storage stock",
    "Implemented persistent client selections so inventories survive across sessions",
    "Set up the Cloudflare Pages deployment and the Vitest and Playwright verification suites",
  ],
  metrics: [
    "7,000+ game items and their full crafting recipe trees",
    "Processes inventory data from multiple sources (personal, claims, banks)",
  ],
  tags: [
    "react",
    "remix",
    "typescript",
    "chakra-ui",
    "bitcraft",
    "gaming",
    "recipe-calculator",
    "inventory-management",
    "real-time-api",
    "cloudflare-pages",
    "vite",
    "testing",
    "algorithm",
    "data-processing",
    "mmo-tools",
  ],
})

const bcCodexNews = createProject({
  name: "Bitcraft Codex News",
  currentlyContributing: true,
  shortDescription: "Automated newspaper generation system that transforms BitCraft Online game chat into daily regional news editions with vintage newspaper aesthetic",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/bc-news-workers",
    website: "https://news.bccodex.com",
  },
  technologies: [
    "Cloudflare Workers",
    "D1 SQL",
    "Wrangler",
    "Miniflare",
    "React 18",
    "Vite",
    "TypeScript",
    "Chakra UI",
    "Zod 4",
    "Anthropic SDK",
    "OpenAI SDK",
    "Google GenAI SDK",
    "Turborepo",
    "pnpm workspaces",
    "Vitest",
    "Docker",
    "GitHub Actions",
  ],
  keyFeatures: [
    "Cursor-based polling of BitJita chat API every minute with automatic backlog catch-up",
    "Multi-provider LLM pipeline (Google/OpenAI/Anthropic) for content generation",
    "Idempotent message ingestion with burst deduplication across 9 game regions",
    "Vintage newspaper layout with CSS multi-column layouts and custom paper texture system",
  ],
  contributions: [
    "Architected end-to-end system with separate ingest and generator Cloudflare Workers",
    "Designed Docker-based local development workflow with shared D1 persistence",
    "Implemented strict chrome/paper token separation achieving WCAG AA contrast standards",
    "Built a GitHub Actions workflow that applies D1 database migrations",
  ],
  metrics: [
    "Generates daily editions for 9 game regions",
    "Scheduled generation with automatic retry windows",
    "Zero duplicate message processing via PRIMARY KEY deduplication",
  ],
  tags: [
    "cloudflare-workers",
    "d1-database",
    "react",
    "typescript",
    "llm",
    "bitcraft",
    "newspaper-generation",
    "cursor-based-polling",
    "docker",
    "ci-cd",
    "chakra-ui",
    "serverless",
  ],
})

const ebtPlugins = createProject({
  name: "EBT Plugins",
  currentlyContributing: true,
  shortDescription:
    "A plugin marketplace for AI coding agents — five independently installable plugins that give Claude Code and Codex a build discipline, a project memory, and a shared quality bar",
  type: "personal",
  links: {},
  technologies: [
    "Claude Code",
    "Codex CLI",
    "Claude Code Plugins",
    "SKILL.md",
    "Marketplace JSON",
    "Markdown",
    "Pre-commit Hooks",
  ],
  keyFeatures: [
    "Five plugins install independently rather than as one bundle, so a project takes only the discipline it wants",
    "Build orchestration that grows software one runnable slice at a time, with agents that implement, adversarially critique, and quality-gate each unit of work",
    "A per-project external brain that keeps tasks, architectural decisions, a linked knowledge graph, journals, and session handoffs as plain Markdown",
    "Project-agnostic skills for codebase investigation, completed-work review, runtime prompt authoring, memory hygiene, and documentation foundations",
    "Session launchers that run and direct fleets of background agent sessions, plus a live status HUD",
    "The same capabilities ship for both Claude Code and Codex, so the workflow does not change with the agent",
  ],
  contributions: [
    "Designed and built the entire marketplace and all five plugins",
    "Authored the skill catalog spanning orchestration, investigation, review, documentation, and project memory",
    "Built three specialized review agents that split implementation, counterexample hunting, and quality gating into separate roles",
    "Implemented hook-based enforcement so standards hold mechanically rather than by convention",
    "Maintained parallel Claude Code and Codex support across every release",
  ],
  metrics: [
    "5 plugins, 32 skills, and 3 agents",
    "Works with both Claude Code and Codex",
    "MIT licensed",
  ],
  tags: [
    "agent-skills",
    "developer-productivity",
    "claude-code",
    "claude-code-plugin",
    "codex-cli",
    "subagents",
    "marketplace",
    "developer-tools",
    "automation",
  ],
})

const ebtGamesDesignLibrary = createProject({
  name: "EBT Games Design Library",
  currentlyContributing: true,
  shortDescription:
    "A Chakra-based design system with shared tokens, recipes, animations, and Storybook docs for EBT Games projects",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/ebtgames-theme",
  },
  technologies: [
    "TypeScript",
    "React 19",
    "Chakra UI",
    "Storybook",
    "tsup",
    "CSS variables",
  ],
  keyFeatures: [
    "Centralized semantic tokens for color, spacing, typography, and shadows",
    "Recipe and slot-recipe component patterns for reusable UI primitives",
    "WCAG-aware contrast utilities with branded global visual styling",
  ],
  contributions: [
    "Built shared token foundations consumed across game interfaces",
    "Authored component recipes and slot recipes for consistent UX",
    "Documented design primitives and components through Storybook coverage",
  ],
  metrics: [
    "8 core recipes exported",
    "5 slot recipes exported",
    "15 Storybook stories documenting the exported primitives",
  ],
  tags: [
    "design-system",
    "chakra-ui",
    "storybook",
    "typescript",
    "design-tokens",
    "css-variables",
    "component-library",
    "animations",
    "accessibility",
  ],
})

const ninefoldProject = createProject({
  name: "Ninefold",
  currentlyContributing: true,
  shortDescription:
    "A polished 9x9 number-logic puzzle game with deterministic generation, responsive controls, and local save support",
  type: "personal",
  links: {
    website: "https://ninefold.epicbadtiming.com",
  },
  technologies: [
    "React 19",
    "TypeScript 5",
    "Vite 7",
    "Chakra UI",
    "React Router 7",
    "@ebtgames/theme",
  ],
  keyFeatures: [
    "Deterministic puzzle generation with unique-solution validation",
    "Difficulty-tuned gameplay with targeted clue ranges",
    "Keyboard and mobile-friendly controls with pause and resume flow",
  ],
  contributions: [
    "Implemented generator and validator pipeline for reliable puzzle quality",
    "Built core game-state orchestration with autosave and conflict handling",
    "Delivered responsive game UI across board, controls, and overlays",
  ],
  metrics: [
    "4 difficulty tiers with configured clue ranges",
    "Autosave cadence every 500ms",
    "Persistent stats and best times tracked locally",
  ],
  tags: [
    "puzzle-game",
    "react",
    "typescript",
    "vite",
    "chakra-ui",
    "design-system",
    "game-state",
    "localstorage",
    "responsive-ui",
  ],
})

const wordtraceProject = createProject({
  name: "Wordtrace",
  currentlyContributing: true,
  shortDescription:
    "A WebGL-powered word tracing game with dictionary validation, timed scoring, and responsive desktop/mobile play",
  type: "personal",
  links: {
    website: "https://wordtrace.epicbadtiming.com",
  },
  technologies: [
    "React 19",
    "TypeScript",
    "Vite 7",
    "Chakra UI",
    "Three.js",
    "react-three-fiber",
    "react-three/drei",
    "React Router",
    "Framer Motion",
    "@ebtgames/theme",
  ],
  keyFeatures: [
    "Interactive 3D board rendered with WebGL",
    "Seeded board generation with adjacency and path validation",
    "Timed and untimed modes with score tracking and feedback",
  ],
  contributions: [
    "Implemented gameplay orchestration for timing, scoring, and persistence",
    "Built engine modules for board generation, path checks, and lexicon validation",
    "Created responsive interfaces spanning desktop sidebar and mobile action panels",
  ],
  metrics: [
    "Default timed mode set to 3 minutes",
    "Exponential score model based on word length",
    "Persistent stats for games played, total score, and best scores",
  ],
  tags: [
    "word-game",
    "webgl",
    "three-js",
    "react",
    "typescript",
    "vite",
    "chakra-ui",
    "game-engine",
    "localstorage",
    "responsive-ui",
  ],
})

const ghBrickbreak = createProject({
  name: "gh-brickbreak",
  currentlyContributing: true,
  shortDescription: "Transform your GitHub contribution graph into an animated Breakout-style brick-breaking game",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/gh-brickbreak",
  },
  technologies: ["Python 3.10+", "Pillow", "requests", "python-dotenv", "GitHub GraphQL API"],
  keyFeatures: [
    "Fetches GitHub contribution data via GraphQL API",
    "Maps contributions to game bricks with strength based on commit intensity",
    "Autonomous paddle AI with 3 distinct strategies (follow, column, row)",
    "Physics-based ball and collision system with realistic bouncing",
    "Generates animated GIF visualization with configurable FPS",
    "Raw contribution data saves to disk so replays cost no further API calls",
  ],
  contributions: [
    "Built complete physics engine from scratch using Python and Pillow",
    "Implemented 3 AI strategies for autonomous paddle control",
    "Created GitHub GraphQL API integration for contribution data",
    "Designed CLI with comprehensive options (strategies, FPS, watermarks, token support)",
    "Developed raw data save/load system to minimize API calls",
  ],
  metrics: [
    "Supports 365+ days of contribution history visualization",
    "3 distinct AI strategies for varied gameplay",
    "Configurable GIF frame rate, defaulting to 40 FPS",
    "Physics, collision, and rendering written from scratch on Pillow",
  ],
  tags: [
    "python",
    "github-api",
    "visualization",
    "game-dev",
    "animation",
    "pillow",
    "cli-tool",
    "graphql",
    "ai-strategies",
  ],
})

const decentUi = createProject({
  name: "Decent UI",
  currentlyContributing: false,
  shortDescription: "A UI Design System for Decent",
  type: "professional",
  company: "Decent Labs",
  companyUrl: "https://decent.build",
  links: {
    github: "https://github.com/decent-dao/decent-ui",
  },
  technologies: [
    "Chakra UI",
    "TypeScript",
    "Storybook",
    "Rollup",
    "Emotion",
    "Framer Motion",
    "Phosphor Icons",
  ],
  keyFeatures: ["Reusable components", "Design tokens", "Design system"],
  contributions: [
    "Worked with the design team to create a design system for Decent",
    "Built the Rollup package pipeline that publishes the library for downstream consumption",
  ],
  metrics: ["Published as @decent-org/fractal-ui"],
  tags: ["decent", "design", "chakra", "storybook"],
})

const wikipediaSpeedrun = createProject({
  name: "Wikipedia Speedrun",
  currentlyContributing: true,
  shortDescription:
    "A multiplayer Wikipedia race where players join a room by code and click their way from a shared starting article to a goal article, refereed by an authoritative Cloudflare Durable Object",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/speed-wiki",
    website: "https://speed-wiki.epicbadtiming.com",
  },
  technologies: [
    "TypeScript",
    "React 19",
    "Vite 8",
    "Cloudflare Workers",
    "Cloudflare Durable Objects",
    "WebSockets",
    "Wrangler",
    "pnpm workspaces",
    "Vitest",
    "Playwright",
    "DOMPurify",
    "oxlint",
  ],
  keyFeatures: [
    "Room-code multiplayer where one SQLite-backed Durable Object owns a room from lobby through countdown, racing, results, and replay",
    "Server-authoritative play — clients send intents only, and all placement, timing, scoring, and win detection are decided by a pure event-sourced core",
    "In-app Wikipedia reader that strips navigation chrome, sanitizes article HTML, and intercepts links so only real article hops count",
    "Durable identity that keeps a seat across refresh, network drop, and server eviction, resuming mid-race with path, clicks, and timer intact",
    "Deadline-driven scheduling with no timers in room code, so duplicate, stale, or early wakeups are inert",
    "Host controls for round length, countdown, difficulty, themed categories, and removing a player",
  ],
  contributions: [
    "Sole author and designer of the entire codebase",
    "Designed the architecture around a shared message catalog, a pure event-sourced game core, a client organized by feature, and one explicit Cloudflare runtime shell",
    "Built the game core as pure functions over plain data, with no I/O and no clock access, so every rule is directly testable",
    "Implemented the room runtime — versioned snapshot persistence, transactional connection fencing, disconnect grace, and alarm-driven phase transitions",
    "Built the single-origin deployment where one Worker serves the application, the HTTP API, and native WebSockets",
    "Wrote a two-browser end-to-end journey covering create, join, reconnect, race, results, replay, and kick against the real runtime",
  ],
  metrics: [
    "Up to 8 players per room",
    "Curated and random article pairs across themed categories",
  ],
  tags: [
    "multiplayer",
    "real-time",
    "websockets",
    "cloudflare-workers",
    "durable-objects",
    "event-sourcing",
    "react",
    "typescript",
    "game",
    "wikipedia",
    "serverless",
  ],
})

const agentBeacon = createProject({
  name: "Agent Beacon",
  currentlyContributing: true,
  shortDescription:
    "A local status display for AI coding sessions that shows whether each one is working, idle, waiting on you, finished, or failed — on a browser preview, a physical 64x64 pixel display, or both",
  type: "personal",
  links: {},
  technologies: [
    "Go",
    "SQLite",
    "Divoom Pixoo-64",
    "Claude Code",
    "Codex CLI",
    "Make",
  ],
  keyFeatures: [
    "Hooks in Claude Code and Codex send sanitized lifecycle events to a daemon bound to the local loopback interface, so nothing leaves the machine",
    "One renderer drives both the browser preview and the physical Pixoo-64, so the two surfaces cannot drift",
    "Multiple concurrent sessions stay individually visible, with active workers distinguished from idle ones",
    "Attention states surface when a session is blocked waiting on approval, and clear on that session's next activity",
    "Ships its own installable plugin for both Claude Code and Codex",
    "Upgrades are a binary swap and a restart, with no migration step",
  ],
  contributions: [
    "Designed and built the whole system: the hook emitters, the event pipeline, the state reducer, the store, and both render targets",
    "Built one rendering path shared by the browser preview and the hardware display",
    "Implemented the local event store with versioned schema and backup-aware migration",
    "Authored the documentation set covering architecture, domain, events, display, interfaces, privacy, and testing",
    "Enforced formatting and a tiered file-length cap as part of the build gate",
  ],
  metrics: [
    "Renders one 64x64 frame to a browser preview and a Divoom Pixoo-64",
    "Runs entirely on the local machine, with no data leaving it",
  ],
  tags: [
    "go",
    "developer-tools",
    "observability",
    "hardware",
    "claude-code",
    "codex-cli",
    "daemon",
    "sqlite",
    "local-first",
  ],
})

const caffeinate = createProject({
  name: "Caffeinate",
  currentlyContributing: true,
  shortDescription:
    "A macOS menu bar utility that starts, replaces, and stops real caffeinate sessions with plain-language wake modes and timed durations, without keeping a Terminal window open",
  type: "personal",
  links: {},
  technologies: [
    "Python 3.13",
    "rumps",
    "PyObjC",
    "py2app",
    "uv",
    "mypy",
    "macOS",
  ],
  keyFeatures: [
    "Menu bar control with a template-rendered icon and explicit active and inactive titles, so the current state is readable at a glance",
    "Two wake modes — keeping the Mac awake, or the Mac and its display — mapped to exact system arguments",
    "Four durations from 30 minutes to indefinite, with a live row showing the applied mode and remaining time",
    "Changing a selection never rewrites a running session until it is explicitly applied",
    "Ordered replacement stops the exact owned process before starting the new one, and reverts to inactive with an alert if the new one fails to launch",
    "At most one owned session, terminated only through its own retained handle, so unrelated system processes are left untouched",
    "Signal handling and a quit path that stop the owned process before exit, leaving no orphaned child",
    "Preferences persist to disk atomically and recover field by field from missing, unreadable, or malformed files",
    "Ships as a standalone double-clickable app with no Dock icon and no Terminal",
  ],
  contributions: [
    "Designed and built the entire application: menu presentation, session control, preferences boundary, and packaging",
    "Established a one-way dependency direction so the session and preferences layers never import the UI framework",
    "Made active state derive from a single observation of the owned process rather than stored UI flags or timers",
    "Built the verification harness that drives real processes and a real event loop under supervised process groups, failing closed if any child leaks",
    "Wrote local type stubs for untyped dependencies so the whole surface checks under strict typing",
  ],
  metrics: [
    "8 session configurations — 2 wake modes by 4 durations",
    "Ships as a standalone app with no Dock icon and no Terminal",
  ],
  tags: [
    "macos",
    "python",
    "menu-bar-app",
    "desktop",
    "developer-tools",
    "process-management",
    "utility",
  ],
})

// Projects data
export const projects: Project[] = [
  agentBeacon,
  bitCraftOnlineProjectTool,
  caffeinate,
  bcCodexNews,
  ebtPlugins,
  ebtGamesDesignLibrary,
  ninefoldProject,
  wordtraceProject,
  wikipediaSpeedrun,
  ghBrickbreak,
  decentApp,
  sarcophagusProtocol,
  decentUi,
]
