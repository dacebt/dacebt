import { Box, Text, Icon, Badge, Flex } from "@chakra-ui/react"
import { Tooltip } from "./ui/tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook, FaBuilding } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { type Project } from "../data/projects"

const MAX_VISIBLE_TECH = 2

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

interface ProjectCardProps {
  project: Project
  index: number
  onLinkClick: (url: string, event: React.MouseEvent) => void
}

export default function ProjectCard({
  project,
  index,
  onLinkClick,
}: ProjectCardProps) {
  const availableLinks = Object.entries(project.links).filter(([, url]) => Boolean(url))
  const allLinks: Array<[string, string]> = [...availableLinks] as Array<[string, string]>
  if (project.companyUrl) {
    allLinks.push(["company", project.companyUrl])
  }

  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH)
  const remainingTechCount = project.technologies.length - visibleTech.length

  return (
    <Box
      p={{ base: 3, md: 4 }}
      bg="bg.steel"
      color="text.primary"
      border="1px solid"
      borderColor="border.inner"
      borderRadius="lg"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        borderColor: "accent.teal",
        transform: "translateY(-4px)",
        boxShadow: "0 8px 25px accent.tealAlpha.15",
      }}
      animation={`float ${6 + index}s ease-in-out infinite`}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
      w="100%"
      textAlign="left"
      wordWrap="break-word"
      whiteSpace="normal"
      display="flex"
      flexDirection="column"
      opacity={project.currentlyContributing ? 1 : 0.85}
    >
      {project.type === "personal" && (
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
      )}

      <Box
        position="relative"
        bg="bg.dark"
        borderRadius="md"
        p={{ base: 3, md: 4 }}
        mb={3}
        border="1px solid"
        borderColor="border.inner"
      >
        {!project.currentlyContributing && (
          <Tooltip content="Currently not contributing">
            <Icon
              as={FaXmark}
              position="absolute"
              top={2}
              right={2}
              boxSize={3}
              color="red.400"
              opacity={0.7}
            />
          </Tooltip>
        )}

        <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear-gradient(135deg, var(--chakra-colors-gradient-blue), var(--chakra-colors-gradient-purple))"
          bgClip="text"
          color="transparent"
          lineHeight="1.2"
        >
          {project.name}
        </Text>
      </Box>

      <Text
        fontSize="xs"
        color="text.muted"
        mb={2}
        lineHeight="1.3"
        wordWrap="break-word"
        whiteSpace="normal"
      >
        {project.shortDescription}
      </Text>

      {visibleTech.length > 0 && (
        <Box mb={2}>
          {visibleTech.map((tech: string, techIndex: number) => (
            <Tooltip key={`${project.name}-tech-${techIndex}`} content={tech}>
              <Box
                as="span"
                px={1.5}
                py={0.5}
                bg="bg.dark"
                border="1px solid"
                borderColor="border.inner"
                borderRadius="sm"
                fontSize="xs"
                color="accent.teal"
                mr={1}
                cursor="default"
              >
                {tech}
              </Box>
            </Tooltip>
          ))}
          {remainingTechCount > 0 && (
            <Tooltip content={project.technologies.slice(MAX_VISIBLE_TECH).join(", ")}>
              <Box
                as="span"
                px={1.5}
                py={0.5}
                bg="bg.dark"
                border="1px solid"
                borderColor="border.outer"
                borderRadius="sm"
                fontSize="xs"
                color="text.muted"
                cursor="default"
              >
                +{remainingTechCount}
              </Box>
            </Tooltip>
          )}
        </Box>
      )}

      <Flex flexDirection="column" gap={1} mb={2}>
        {project.keyFeatures.map((feature: string, featureIndex: number) => (
          <Text
            key={`feature-${featureIndex}`}
            fontSize="xs"
            color="text.secondary"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            ⭐ {feature}
          </Text>
        ))}
        {project.metrics.map((metric: string, metricIndex: number) => (
          <Text
            key={`metric-${metricIndex}`}
            fontSize="xs"
            color="accent.tealAlpha.80"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            📊 {metric}
          </Text>
        ))}
        {project.contributions.map((contribution: string, contributionIndex: number) => (
          <Text
            key={`contribution-${contributionIndex}`}
            fontSize="xs"
            color="text.secondaryAlpha.90"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            🤝 {contribution}
          </Text>
        ))}
      </Flex>

      {allLinks.length > 0 && (
        <Box display="flex" justifyContent="flex-end" gap={1} mt="auto" pt={2}>
          {allLinks.map(([linkType, url]) => {
            const IconComponent = getLinkIcon(linkType)
            const linkLabels: Record<string, string> = {
              github: "View on GitHub",
              website: "Visit Website",
              demo: "View Demo",
              documentation: "View Documentation",
              company: project.company || "Visit Company Website",
            }

            return (
              <Tooltip
                key={`${project.name}-${linkType}`}
                content={linkLabels[linkType] || "Open Link"}
              >
                <Box
                  as="button"
                  onClick={(e) => onLinkClick(url, e)}
                  p={1}
                  borderRadius="sm"
                  bg="bg.dark"
                  border="1px solid"
                  borderColor="border.inner"
                  _hover={{
                    bg: "bg.steel",
                    borderColor: "accent.teal",
                  }}
                  transition="all 0.2s ease"
                  cursor="pointer"
                >
                  <Icon as={IconComponent} boxSize={3} color="accent.teal" />
                </Box>
              </Tooltip>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
