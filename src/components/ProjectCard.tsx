import { Box, Text, Icon, Flex, Link } from "@chakra-ui/react"
import { Tooltip } from "./ui/tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook, FaBuilding } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { type Project } from "../data/projects"
import ProjectCardBadge from "./ui/ProjectCardBadge"
import GlassPanel from "./ui/GlassPanel"
import { getAnimation } from "../utils/motion"

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
  enableFloat?: boolean
}

export default function ProjectCard({
  project,
  index,
  enableFloat = true,
}: ProjectCardProps) {
  const availableLinks = Object.entries(project.links).filter(([, url]) => Boolean(url))
  const allLinks: Array<[string, string]> = [...availableLinks] as Array<[string, string]>
  if (project.companyUrl) {
    allLinks.push(["company", project.companyUrl])
  }

  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH)
  const remainingTechCount = project.technologies.length - visibleTech.length

  return (
    <GlassPanel
      p={{ base: 2, md: 3 }}
      color="text.primary"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      effects="none"
      _hover={{
        borderColor: "accent.teal",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px var(--chakra-colors-black-alpha-20)",
      }}
      animation={enableFloat ? getAnimation(`float ${6 + index}s ease-in-out infinite`) : undefined}
      style={enableFloat ? {
        animationDelay: `${index * 0.2}s`,
      } : undefined}
      w="100%"
      h="100%"
      textAlign="left"
      wordWrap="break-word"
      whiteSpace="normal"
      display="flex"
      flexDirection="column"
      opacity={project.currentlyContributing ? 1 : 0.85}
    >
      {project.type === "personal" && (
        <Box position="absolute" bottom={0} left={0} zIndex={1}>
          <ProjectCardBadge project={project} />
        </Box>
      )}

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        gap={2}
        flexWrap="wrap"
      >
        <Text
          textStyle="projectTitle"
          textAlign="left"
          color="text.primary"
          fontWeight="bold"
          flex="1"
          minW={0}
        >
          {project.name}
        </Text>
        {!project.currentlyContributing && (
          <Tooltip content="Currently not contributing">
            <Icon
              as={FaXmark}
              boxSize={3}
              color="text.muted"
              opacity={0.6}
            />
          </Tooltip>
        )}
      </Flex>

      <Text
        textStyle="smallText"
        color="text.secondary"
        mb={1.5}
        wordWrap="break-word"
        whiteSpace="normal"
        lineHeight="1.5"
      >
        {project.shortDescription}
      </Text>

      {visibleTech.length > 0 && (
        <Box mb={1.5}>
          {visibleTech.map((tech: string, techIndex: number) => (
            <Tooltip key={`${project.name}-tech-${techIndex}`} content={tech}>
              <Text
                as="span"
                textStyle="smallText"
                px={1.5}
                py={0.5}
                bg="bg.dark"
                border="1px solid"
                borderColor="border.inner"
                borderRadius="sm"
                color="accent.teal"
                mr={1}
                cursor="default"
                display="inline-block"
              >
                {tech}
              </Text>
            </Tooltip>
          ))}
          {remainingTechCount > 0 && (
            <Tooltip content={project.technologies.slice(MAX_VISIBLE_TECH).join(", ")}>
              <Text
                as="span"
                textStyle="smallText"
                px={1.5}
                py={0.5}
                bg="bg.dark"
                border="1px solid"
                borderColor="border.outer"
                borderRadius="sm"
                color="text.muted"
                cursor="default"
                display="inline-block"
              >
                +{remainingTechCount}
              </Text>
            </Tooltip>
          )}
        </Box>
      )}

      <Flex flexDirection="column" gap={0.5} mb={1.5}>
        {project.keyFeatures.map((feature: string, featureIndex: number) => (
          <Text
            key={`feature-${featureIndex}`}
            textStyle="smallText"
            color="text.secondary"
            mb={0.25}
            wordWrap="break-word"
            whiteSpace="normal"
            lineHeight="1.4"
            fontSize="xs"
          >
            <Text as="span" opacity={0.6} fontSize="xs" mr={1}>⭐</Text>
            {feature}
          </Text>
        ))}
        {project.metrics.map((metric: string, metricIndex: number) => (
          <Text
            key={`metric-${metricIndex}`}
            textStyle="smallText"
            color="accent.tealAlpha.90"
            mb={0.25}
            wordWrap="break-word"
            whiteSpace="normal"
            lineHeight="1.4"
            fontSize="xs"
          >
            <Text as="span" opacity={0.6} fontSize="xs" mr={1}>📊</Text>
            {metric}
          </Text>
        ))}
        {project.contributions.map((contribution: string, contributionIndex: number) => (
          <Text
            key={`contribution-${contributionIndex}`}
            textStyle="smallText"
            color="text.secondary"
            mb={0.25}
            wordWrap="break-word"
            whiteSpace="normal"
            lineHeight="1.4"
            fontSize="xs"
          >
            <Text as="span" opacity={0.6} fontSize="xs" mr={1}>🤝</Text>
            {contribution}
          </Text>
        ))}
      </Flex>

      {allLinks.length > 0 && (
        <Box display="flex" justifyContent="flex-end" gap={1} mt="auto" pt={1.5}>
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
                <Link
                  href={url}
                  variant="iconSmall"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkLabels[linkType] || "Open Link"}
                >
                  <Icon as={IconComponent} boxSize={3} color="accent.teal" />
                </Link>
              </Tooltip>
            )
          })}
        </Box>
      )}
    </GlassPanel>
  )
}
