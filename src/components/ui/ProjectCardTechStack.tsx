import { Badge, Wrap } from "@chakra-ui/react"

interface ProjectCardTechStackProps {
  techStack: string[]
}

export default function ProjectCardTechStack({ techStack }: ProjectCardTechStackProps) {
  if (!techStack || techStack.length === 0) return null

  return (
    <Wrap gap={1} mt={3}>
      {techStack.map((tech: string) => (
        <Badge
          key={tech}
          size="sm"
          px={2}
          py={1}
          bg="accent.tealAlpha.8"
          color="text.secondary"
          border="1px solid"
          borderColor="accent.tealAlpha.15"
          borderRadius="4px"
          textStyle="smallTextMedium"
        >
          {tech}
        </Badge>
      ))}
    </Wrap>
  )
}
