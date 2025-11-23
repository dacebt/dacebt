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

const mcpPromptCleaner = createProject({
  name: "MCP Prompt Cleaner",
  currentlyContributing: true,
  shortDescription: "A Model Context Protocol (MCP) server that uses AI to enhance and clean raw prompts",
  type: "personal",
  links: {
    github: "https://github.com/dacebt/prompt-cleaner-mcp",
  },
  technologies: ["Python 3.11+", "MCP Python SDK", "httpx", "pydantic", "pytest"],
  keyFeatures: [
    "AI-Powered Enhancement using large language models",
    "Two-Level Retry Strategy with HTTP and content-level retries",
    "Local LLM Support (LMStudio) with no API key required",
    "Production Ready with comprehensive test coverage"
  ],
  contributions: [
    "Complete Python implementation of MCP prompt cleaner server",
    "Two-level retry strategy implementation (HTTP + content level)",
    "Extensive test suite with 43 passing tests covering all functionality"
  ],
  metrics: [
    "43 passing tests with comprehensive coverage",
    "1,160+ lines of Python code across 9 Python files",
    "100% test pass rate"
  ],
  tags: ["python", "mcp", "ai", "prompt-engineering", "llm", "async", "retry-logic", "testing"],
})

const bitCraftOnlineProjectTool = createProject({
  name: "bccodex",
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
  decentApp,
  bitCraftOnlineProjectTool,
  mcpPromptCleaner,
  sarcophagusProtocol,
  decentUi,
]
