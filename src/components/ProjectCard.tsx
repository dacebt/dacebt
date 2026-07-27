import { Box, Text, Icon, Flex, Link } from "@chakra-ui/react"
import { Tooltip } from "./ui/tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook, FaBuilding } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { type Project } from "../data/projects"
import ProjectCardBadge from "./ui/ProjectCardBadge"
import GlassPanel from "./ui/GlassPanel"
import CompactAction from "./ui/CompactAction"
import { selectablePanelStyles } from "./ui/selectable-panel-styles"
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

const getProjectLinkLabel = (projectName: string, linkType: string) => {
  switch (linkType) {
    case "github":
      return `View ${projectName} on GitHub`
    case "website":
      return `Visit ${projectName} website`
    case "demo":
      return `View ${projectName} demo`
    case "documentation":
      return `View ${projectName} documentation`
    case "company":
      return `Visit ${projectName} company website`
    default:
      return `Open ${projectName} link`
  }
}

interface ProjectCardProps {
  project: Project
  index: number
  enableFloat?: boolean
  onInspect?: (trigger: HTMLButtonElement) => void
}

export default function ProjectCard({
  project,
  index,
  enableFloat = true,
  onInspect,
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
      surface="selectable"
      cornerAccents={false}
      p={{ base: 2, md: 3 }}
      {...selectablePanelStyles.panel}
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
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
          textStyle="panelTitle"
          textAlign="left"
          color="text.primary"
          flex="1"
          minW={0}
        >
          {project.name}
        </Text>
        {!project.currentlyContributing && (
          <Flex alignItems="center" gap={1} color="text.muted">
            <Tooltip content="Currently not contributing">
              <Box display="flex" aria-hidden="true">
                <Icon
                  as={FaXmark}
                  boxSize={3}
                  opacity={0.6}
                />
              </Box>
            </Tooltip>
            <Text textStyle="smallText">
              Not contributing
            </Text>
          </Flex>
        )}
      </Flex>

      <Text
        textStyle="supportingText"
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

      {!onInspect && (
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
      )}

      {(allLinks.length > 0 || onInspect) && (
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} mt="auto" pt={1.5}>
          {onInspect && (
            <CompactAction
              onClick={(event) => onInspect(event.currentTarget)}
              mr={1}
              aria-label={`Inspect ${project.name}`}
            >
              Inspect
            </CompactAction>
          )}
          {allLinks.map(([linkType, url]) => {
            const IconComponent = getLinkIcon(linkType)
            const linkLabel = getProjectLinkLabel(project.name, linkType)

            return (
              <Tooltip
                key={`${project.name}-${linkType}`}
                content={linkLabel}
              >
                <Link
                  href={url}
                  variant="projectIcon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkLabel}
                >
                  <Icon
                    as={IconComponent}
                    boxSize={3}
                    color="accent.teal"
                    aria-hidden="true"
                  />
                </Link>
              </Tooltip>
            )
          })}
        </Box>
      )}
    </GlassPanel>
  )
}
