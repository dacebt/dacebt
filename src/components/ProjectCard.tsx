import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { type Project } from "../data/projects"
import CompactAction from "./ui/CompactAction"
import GlassPanel from "./ui/GlassPanel"
import { Tooltip } from "./ui/tooltip"

const MAX_VISIBLE_TECH = 3

interface ProjectCardProps {
  project: Project
  onInspect: (trigger: HTMLButtonElement) => void
}

export default function ProjectCard({ project, onInspect }: ProjectCardProps) {
  const visibleTech = project.technologies.slice(0, MAX_VISIBLE_TECH)
  const remainingTechCount = project.technologies.length - visibleTech.length
  const githubLabel = `View ${project.name} on GitHub`

  return (
    <GlassPanel
      as="article"
      surface="selectable"
      cornerAccents={false}
      p={4}
      transition="transform 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
      }}
      w="100%"
      h="100%"
      textAlign="left"
      wordWrap="break-word"
      whiteSpace="normal"
    >
      <Flex direction="column" gap={3} h="100%">
        <Flex
          as="header"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={3}
          pb="0.65rem"
          borderBottom="1px solid"
          borderColor="projectCard.divider"
        >
          <Box flex="1" minW={0}>
            {project.type === "personal" && (
              <Text
                textStyle="projectCardEyebrow"
                color="accent.teal"
                mb={1}
              >
                Personal project
              </Text>
            )}
            <Text
              as="h3"
              textStyle="projectCardTitle"
              color="text.primary"
              overflowWrap="anywhere"
            >
              {project.name}
            </Text>
            {!project.currentlyContributing && (
              <Text textStyle="smallText" color="text.muted" mt={1}>
                Not contributing
              </Text>
            )}
          </Box>
          {project.links.github && (
            <Tooltip content={githubLabel}>
              <Link
                href={project.links.github}
                variant="projectIcon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={githubLabel}
              >
                <Icon
                  as={FaGithub}
                  boxSize="17px"
                  aria-hidden="true"
                />
              </Link>
            </Tooltip>
          )}
        </Flex>

        <Text
          textStyle="projectCardSummary"
          overflowWrap="anywhere"
        >
          {project.shortDescription}
        </Text>

        {visibleTech.length > 0 && (
          <Flex
            flexWrap="wrap"
            gap="0.45rem"
            minW={0}
            role="group"
            aria-label="Featured technologies"
          >
            {visibleTech.map((tech: string, techIndex: number) => (
              <Tooltip key={`${project.name}-tech-${techIndex}`} content={tech}>
                <Text
                  as="span"
                  textStyle="projectCardChip"
                  px="0.55rem"
                  py="0.35rem"
                  bg="projectCard.chip"
                  border="1px solid"
                  borderColor="projectCard.chipBorder"
                  borderRadius="sm"
                  color="accent.teal"
                  cursor="default"
                  display="inline-block"
                  maxW="100%"
                  overflowWrap="anywhere"
                >
                  {tech}
                </Text>
              </Tooltip>
            ))}
            {remainingTechCount > 0 && (
              <Tooltip content={project.technologies.slice(MAX_VISIBLE_TECH).join(", ")}>
                <Text
                  as="span"
                  textStyle="projectCardChip"
                  px="0.55rem"
                  py="0.35rem"
                  bg="projectCard.chip"
                  border="1px solid"
                  borderColor="projectCard.chipBorder"
                  borderRadius="sm"
                  color="accent.teal"
                  cursor="default"
                  display="inline-block"
                  flexShrink={0}
                >
                  +{remainingTechCount}
                </Text>
              </Tooltip>
            )}
          </Flex>
        )}

        <Box mt="auto" pt="0.15rem">
          <Flex
            as="footer"
            alignItems="stretch"
            gap="0.55rem"
            flexWrap="wrap"
            minW={0}
          >
            <CompactAction
              emphasis="primary"
              textStyle="projectCardAction"
              bg="gradient.projectCard.primary"
              borderColor="accent.teal"
              color="accent.teal"
              flex="1"
              minW="max-content"
              minH="42px"
              px="0.8rem"
              py="0.65rem"
              letterSpacing="0.05em"
              whiteSpace="nowrap"
              _hover={{
                bg: "gradient.projectCard.primary",
                borderColor: "accent.teal",
                color: "accent.teal",
              }}
              onClick={(event) => onInspect(event.currentTarget)}
              aria-label={`Inspect project ${project.name}`}
            >
              Inspect project
            </CompactAction>
            {project.primaryDestination && (
              <Link
                href={project.primaryDestination.url}
                variant="projectAction"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.primaryDestination.label} for ${project.name}`}
              >
                {project.primaryDestination.label}
              </Link>
            )}
          </Flex>
        </Box>
      </Flex>
    </GlassPanel>
  )
}
