import { Flex, Box } from "@chakra-ui/react"
import { Tooltip } from "./tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook, FaBuilding } from "react-icons/fa"
import { type Project } from "../../data/projects"

const getLinkIcon = (linkType: string) => {
  switch (linkType) {
    case "github":
      return FaGithub
    case "website":
      return FaExternalLinkAlt
    case "demo":
      return FaPlay
    case "documentation":
      return FaBook
    case "company":
      return FaBuilding
    default:
      return FaExternalLinkAlt
  }
}

interface ProjectCardLinksProps {
  project: Project
  onLinkClick: (url: string, event: React.MouseEvent) => void
}

export default function ProjectCardLinks({ project, onLinkClick }: ProjectCardLinksProps) {
  const availableLinks = Object.entries(project.links).filter(([_, url]) => url && url !== "")

  // Add company link if available
  const allLinks = availableLinks
  if (project.companyUrl) {
    allLinks.push(["company", project.companyUrl])
  }

  if (allLinks.length === 0) return null

  return (
    <Flex
      gap={2}
      flexWrap="wrap"
      mt={3}
      align="center"
    >
      {allLinks.map(([linkType, url]) => {
        const Icon = getLinkIcon(linkType)
        return (
          <Tooltip key={linkType} content={`Open ${linkType}`}>
            <Box
              as="button"
              onClick={(e) => onLinkClick(url, e)}
              p={2}
              borderRadius="md"
              bg="accent.tealAlpha.10"
              border="1px solid"
              borderColor="accent.tealAlpha.20"
              color="accent.teal"
              transition="all 0.2s ease"
              _hover={{
                bg: "accent.tealAlpha.20",
                borderColor: "accent.teal",
                transform: "scale(1.05)",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon size={14} />
            </Box>
          </Tooltip>
        )
      })}
    </Flex>
  )
}
