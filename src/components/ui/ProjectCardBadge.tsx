import { Badge } from "@chakra-ui/react"
import { type Project } from "../../data/projects"

interface ProjectCardBadgeProps {
  project: Project
}

export default function ProjectCardBadge({ project }: ProjectCardBadgeProps) {
  if (project.type !== "personal") return null

  return (
    <Badge
      position="absolute"
      bottom={0}
      left={0}
      size="sm"
      fontSize="xs"
      px={2}
      py={1}
      bg="accent.tealAlpha.15"
      color="accent.teal"
      border="1px solid"
      borderColor="accent.teal"
      borderRadius="8px"
      fontWeight="semibold"
      backdropFilter="blur(8px)"
      boxShadow="0 2px 8px accent.tealAlpha.20"
      zIndex={1}
    >
      personal
    </Badge>
  )
}
