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
    github: "https://github.com/decentdao/decent-app",
    website: "https://www.app.decent.org",
    documentation: "https://docs.decentdao.org/app",
  },
  technologies: ["React", "Chakra UI", "Zustand", "Viem", "Hardhat", "Solidity"],
  keyFeatures: [
    "Safe Treasury Management",
    "Sub Projects",
    "Onchain Organization Management",
    "Compliant Token Launches",
  ],
  contributions: [
    "5+ years of contributions",
    "Core features development",
    "Architecture design",
    "Performance optimization",
    "Smart Contract development",
    "Third Party Integrations",
  ],
  metrics: ["$10m in seed funding", "Paid clients on platform"],
  tags: ["fullstack", "web3", "decent", ""],
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
  technologies: [],
  keyFeatures: ["Decentralized, deployed on arweave.net", "Onchain dead man's switch"],
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
    github: "https://github.com/dacebt/bitcraftonline-project-tool",
    website: "https://bccodex.com",
  },
  technologies: [
    "React 18.2",
    "Remix 2.12",
    "Vite 5.1",
    "TypeScript 5.1",
    "Chakra UI 2.8",
    "Emotion 11",
    "Netlify",
    "Zod",
    "ioredis",
    "Vitest",
    "ESLint",
  ],
  keyFeatures: [
    "Deep Recipe Breakdown with recursive material calculations",
    "Multi-Source Inventory Tracking across personal, banks, storage, and claims",
    "Persistent Selections that track inventories across sessions",
    "Supports 5,000+ game items with complete recipe database",
  ],
  contributions: [],
  metrics: [
    "Handles complex recipe trees with 100+ items across 10+ tiers",
    "Processes inventory data from multiple sources (personal, claims, banks)",
    "Supports 1,000+ game items with complete recipe database",
    "Sub-5 second calculation times for complex recipes",
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
    "netlify",
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
    github: "https://github.com/dacebt/bc-news-worker",
    website: "https://news.bccodex.com",
  },
  technologies: [
    "Cloudflare Workers",
    "D1 SQL",
    "React 18",
    "Vite",
    "TypeScript",
    "Chakra UI",
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
    "Built automated CI/CD pipeline via GitHub Actions for zero-downtime deployments",
  ],
  metrics: [
    "Processes 100+ messages per poll with 99%+ uptime",
    "Generates daily editions for 9 regions at 10 AM UTC",
    "Sub-100ms frontend render times with vintage newspaper aesthetic",
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

const ebtAgentSkills = createProject({
  name: "EBT Agent Skills",
  currentlyContributing: true,
  shortDescription:
    "A curated set of portable coding-agent skills for cleanup review, release notes, and subagent collaboration",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/ebt-agent-skills",
  },
  technologies: [
    "Claude Code",
    "Cursor",
    "Codex CLI",
    "Gemini CLI",
    "SKILL.md",
    "Marketplace JSON",
  ],
  keyFeatures: [
    "Cross-platform install workflows for major coding-agent CLIs",
    "Consistent SKILL.md structure with safety and usage guidance",
    "Portable skill catalog for cleanup-review, subagent-collab, and release-notes",
  ],
  contributions: [
    "Defined and documented install patterns across multiple agent ecosystems",
    "Packaged and maintained a focused, reusable skill catalog",
    "Established safety-first conventions for reviewing skill behavior before install",
  ],
  metrics: [
    "3 curated skills in the catalog",
    "Supports 4 coding-agent platforms",
    "Marketplace schema published and versioned",
  ],
  tags: [
    "agent-skills",
    "developer-productivity",
    "code-review",
    "release-workflow",
    "claude-code",
    "cursor",
    "codex-cli",
    "gemini-cli",
    "marketplace",
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
    "Versioned package ready for reuse across projects",
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
  technologies: ["React 19", "TypeScript 5", "Vite 7", "Chakra UI", "Framer Motion"],
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
    "framer-motion",
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
    "Persistent stats for played games, scores, and words found",
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
    "GitHub Actions automation for daily profile updates",
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
    "Configurable 20-60 FPS for GIF generation",
    "Zero-dependency game engine built with pure Python",
  ],
  tags: [
    "python",
    "github-api",
    "visualization",
    "game-dev",
    "animation",
    "pillow",
    "cli-tool",
    "github-actions",
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
    github: "https://github.com/decentdao/decent-ui",
  },
  technologies: ["Chakra UI", "TypeScript", "Storybook"],
  keyFeatures: ["Resuable components", "Design tokens", "Design system"],
  contributions: ["Worked with the design team to create a design system for Decent"],
  metrics: [],
  tags: ["decent", "design", "chakra", "storybook"],
})

// Projects data
export const projects: Project[] = [
  bitCraftOnlineProjectTool,
  bcCodexNews,
  ebtAgentSkills,
  ebtGamesDesignLibrary,
  ninefoldProject,
  wordtraceProject,
  ghBrickbreak,
  decentApp,
  sarcophagusProtocol,
  decentUi,
]
