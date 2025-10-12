import { Box, Text, Icon, Badge, Flex } from "@chakra-ui/react"
import { Tooltip } from "./ui/tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook, FaBuilding } from "react-icons/fa"
import { type Project } from "../data/projects"
import { FaXmark } from "react-icons/fa6"

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
  onProjectClick: (project: Project) => void
  onLinkClick: (url: string, event: React.MouseEvent) => void
}

export default function ProjectCard({
  project,
  index,
  onProjectClick,
  onLinkClick,
}: ProjectCardProps) {
  const availableLinks = Object.entries(project.links).filter(([_, url]) => url && url !== "")

  // Add company link if available
  const allLinks = availableLinks
  if (project.companyUrl) {
    allLinks.push(["company", project.companyUrl])
  }

  return (
    <Box
      onClick={() => onProjectClick(project)}
      p={3}
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
        boxShadow: "0 8px 25px rgba(91, 192, 190, 0.15)",
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
      {/* Personal badge - bottom left of card */}
      {project.type === "personal" && (
        <Badge
          position="absolute"
          bottom={0}
          left={0}
          size="sm"
          fontSize="xs"
          px={2}
          py={1}
          bg="rgba(91, 192, 190, 0.15)"
          color="accent.teal"
          border="1px solid"
          borderColor="accent.teal"
          borderRadius="8px"
          fontWeight="semibold"
          backdropFilter="blur(8px)"
          boxShadow="0 2px 8px rgba(91, 192, 190, 0.2)"
          zIndex={1}
        >
          personal
        </Badge>
      )}

      {/* Project banner */}
      <Box
        position="relative"
        bg="bg.dark"
        borderRadius="md"
        p={4}
        mb={3}
        border="1px solid"
        borderColor="border.inner"
      >
        {/* Currently contributing indicator - top right */}
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

        {/* Project name with gradient */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          backgroundImage="linear-gradient(135deg, #3B82F6, #8B5CF6)"
          backgroundClip="text"
          color="transparent"
          lineHeight="1.2"
        >
          {project.name}
        </Text>
      </Box>

      {/* Description */}
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

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <Box mb={2}>
          {project.technologies.slice(0, 2).map((tech, techIndex) => (
            <Tooltip key={techIndex} content={tech}>
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
          {project.technologies.length > 2 && (
            <Tooltip content={`${project.technologies.slice(2).join(", ")}`}>
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
                +{project.technologies.length - 2}
              </Box>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Metrics and Key Features */}
      <Flex flexDirection="column" gap={1} mb={2}>
        {project.keyFeatures.map((feature, idx) => (
          <Text
            key={`feature-${idx}`}
            fontSize="xs"
            color="text.secondary"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            ⭐ {feature}
          </Text>
        ))}
        {project.metrics.map((metric, idx) => (
          <Text
            key={`metric-${idx}`}
            fontSize="xs"
            color="rgba(91, 192, 190, 0.8)"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            📊 {metric}
          </Text>
        ))}
        {project.contributions.map((contribution, idx) => (
          <Text
            key={`contribution-${idx}`}
            fontSize="xs"
            color="rgba(148, 163, 184, 0.9)"
            mb={0.5}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            🤝 {contribution}
          </Text>
        ))}
      </Flex>

      {/* Links */}
      {allLinks.length > 0 && (
        <Box display="flex" justifyContent="flex-end" gap={1} mt="auto" pt={2}>
          {allLinks.map(([linkType, url]) => {
            const IconComponent = getLinkIcon(linkType)
            const linkLabels = {
              github: "View on GitHub",
              website: "Visit Website",
              demo: "View Demo",
              documentation: "View Documentation",
              company: project.company || "Visit Company Website",
            }
            return (
              <Tooltip
                key={linkType}
                content={linkLabels[linkType as keyof typeof linkLabels] || "Open Link"}
              >
                <Box
                  as="button"
                  onClick={(e) => onLinkClick(url!, e)}
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
