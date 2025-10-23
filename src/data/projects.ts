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
  fullDescription: string

  currentlyContributing: boolean
  type: ProjectType
  company?: string
  companyUrl?: string
  image: string
  gallery: string[]
  links: ProjectLinks
  technologies: string[]
  keyFeatures: string[]
  contributions: string[]
  metrics: string[]
  learnings: string[]
  challenges: string[]
  featured: boolean
  order: number
  tags: string[]
}

// Helper function to create a project
export function createProject(project: Omit<Project, "order"> & { order?: number }): Project {
  return {
    order: 0,
    ...project,
  }
}

const decentApp = createProject({
  name: "Decent App",
  shortDescription: "A decentralized protocol for managing and operating an onchain organization",
  fullDescription: "",
  type: "professional",
  company: "Decent Labs",
  companyUrl: "https://decent.build",
  currentlyContributing: true,
  // todo add image
  image: "/public/decent-app.png",
  gallery: [],
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
  learnings: [],
  challenges: [],
  featured: true,
  tags: ["fullstack", "web3", "decent", ""],
})

const sarcophagusProtocol = createProject({
  name: "Sarcophagus Protocol",
  currentlyContributing: false,
  shortDescription: "A decentralized dead man's switch",
  fullDescription:
    "This was a quick experiment to learn about a new framework and see how it compares to existing solutions.",
  type: "professional",
  // todo add image
  image: "/public/lumen-protocol.png",
  gallery: [],
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
  learnings: [],
  challenges: [],
  featured: false,
  tags: ["decent", "sarcophagus", "dead mans switch", "arweave"],
})

const mcpPromptCleaner = createProject({
  name: "MCP Prompt Cleaner",
  currentlyContributing: true,
  shortDescription: "A small project to learn about MCP by building a prompt cleaner",
  fullDescription: "",
  type: "personal",
  // todo add image
  image: "/public/mcp-prompt-cleaner.png",
  gallery: [],
  links: {
    github: "https://github.com/Da-Colon/prompt-cleaner-mcp",
  },
  technologies: [],
  keyFeatures: [],
  contributions: [],
  metrics: [],
  learnings: [],
  challenges: [],
  featured: true,
  tags: ["mcp", "prompt", "cleaner"],
})

const bitCraftOnlineProjectTool = createProject({
  name: "BitCraft Project Planner & Recipe Calculator",
  currentlyContributing: true,
  shortDescription:
    "A sophisticated web application designed as the ultimate companion tool for BitCraft Online players",
  fullDescription:
    "A sophisticated web application designed as the ultimate companion tool for BitCraft Online players. The app provides intelligent recipe calculation, unified inventory management, and project planning capabilities. It integrates with the BitJita API to pull real-time player data and uses the official BitCraft GameData to provide accurate recipe calculations. The system features a two-pass algorithm that builds complete recipe trees and applies inventory reductions with dependency awareness, allowing players to see exactly what materials they need after accounting for their current inventory across personal storage, bank vaults, claim buildings, and recovery stashes.",
  type: "personal",
  // todo add image
  image: "/public/bitcraftonline-project-tool.png",
  gallery: [],
  links: {
    github: "https://github.com/Da-Colon/bitcraftonline-project-tool",
    website: "https://bitcraftonlinetools.netlify.app/",
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
  ],
  contributions: [],
  metrics: [
    "Handles complex recipe trees with 100+ items across 10+ tiers",
    "Processes inventory data from multiple sources (personal, claims, banks)",
    "Supports 1,000+ game items with complete recipe database",
    "Sub-5 second calculation times for complex recipes",
  ],
  learnings: [
    "Advanced algorithm design for dependency-aware recipe calculations",
    "Performance optimization for large dataset processing",
    "Modern React patterns with Remix SSR and client-side hydration",
  ],
  challenges: [
    "Complex Recipe Dependencies: Building algorithms to handle multi-tier recipe trees with circular dependency detection",
    "Inventory Aggregation: Combining data from multiple sources with different data formats",
    "Performance Optimization: Ensuring sub-5 second calculations for recipes with 100+ items across 10+ tiers",
  ],
  featured: true,
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
  fullDescription: "",
  type: "professional",
  company: "Decent Labs",
  companyUrl: "https://decent.build",
  // todo add image
  image: "/public/decent-ui.png",
  gallery: [],
  links: {
    github: "https://github.com/decentdao/decent-ui",
  },
  technologies: ["Chakra UI", "TypeScript", "Storybook"],
  keyFeatures: ["Resuable components", "Design tokens", "Design system"],
  contributions: ["Worked with the design team to create a design system for Decent"],
  metrics: [],
  learnings: [],
  challenges: [],
  featured: true,
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
