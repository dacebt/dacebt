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
  name: "BitCraft Online Project Tool",
  currentlyContributing: true,
  shortDescription: "A tool to manage projects for Massively Multiplayer game BitCraft Online",
  fullDescription: "",
  type: "personal",
  // todo add image
  image: "/public/bitcraftonline-project-tool.png",
  gallery: [],
  links: {
    github: "https://github.com/Da-Colon/bitcraftonline-project-tool",
  },
  technologies: ["Remix", "Cursor", "Cascade (Windsurf)"],
  keyFeatures: ["Recipe Calculator", "Inventory Management"],
  contributions: [],
  metrics: ["Created a tool to help the Online Team build projects faster"],
  learnings: ["Wanted to learn a different framework (Remix)", "First full Vibe coded project"],
  challenges: [],
  featured: true,
  tags: ["remix", "cursor", "cascade", "windsurf"],
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
