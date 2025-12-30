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
}

export default function ProjectCard({
  project,
  index,
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
      _hover={{
        borderColor: "accent.teal",
        transform: "translateY(-4px)",
        boxShadow: "card.projectHover",
      }}
      animation={getAnimation(`float ${6 + index}s ease-in-out infinite`)}
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
        <Box position="absolute" bottom={0} left={0} zIndex={1}>
          <ProjectCardBadge project={project} />
        </Box>
      )}

      <Box
        position="relative"
        bg="bg.dark"
        borderRadius="md"
        p={{ base: 2, md: 3 }}
        mb={2}
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
          textStyle="projectTitle"
          textAlign="center"
          bgGradient="linear-gradient(135deg, var(--chakra-colors-gradient-blue), var(--chakra-colors-gradient-purple))"
          bgClip="text"
          color="transparent"
        >
          {project.name}
        </Text>
      </Box>

      <Text
        textStyle="smallText"
        color="text.muted"
        mb={1.5}
        wordWrap="break-word"
        whiteSpace="normal"
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
          >
            ⭐ {feature}
          </Text>
        ))}
        {project.metrics.map((metric: string, metricIndex: number) => (
          <Text
            key={`metric-${metricIndex}`}
            textStyle="smallText"
            color="accent.tealAlpha.80"
            mb={0.25}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            📊 {metric}
          </Text>
        ))}
        {project.contributions.map((contribution: string, contributionIndex: number) => (
          <Text
            key={`contribution-${contributionIndex}`}
            textStyle="smallText"
            color="text.secondaryAlpha.90"
            mb={0.25}
            wordWrap="break-word"
            whiteSpace="normal"
          >
            🤝 {contribution}
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
