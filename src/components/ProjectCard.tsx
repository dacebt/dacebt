import { Box, Text, Image, Icon } from "@chakra-ui/react"
import { Tooltip } from "./ui/tooltip"
import { FaGithub, FaExternalLinkAlt, FaPlay, FaBook } from "react-icons/fa"
import { type Project } from "../data/projects"

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
      return FaExternalLinkAlt
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
      minH="280px"
    >
      {/* Project image/icon */}
      <Box w="100%" h="50px" borderRadius="sm" overflow="hidden" bg="bg.dark" mb={2}>
        {project.image ? (
          <Image src={project.image} alt={project.name} maxH="100%" maxW="100%" objectFit="cover" />
        ) : (
          <Text color="accent.teal" fontSize="lg" fontWeight="bold" p={2}>
            {project.name.charAt(0)}
          </Text>
        )}
      </Box>

      {/* Project name and type indicator */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="bold" color="text.primary">
          {project.name}
        </Text>
        <Box display="flex" alignItems="center" gap={1}>
          {/* Project type indicator */}
          <Box
            w="6px"
            h="6px"
            borderRadius="full"
            bg={
              project.type === "professional"
                ? "blue.500"
                : project.type === "personal"
                ? "green.500"
                : project.type === "experiment"
                ? "purple.500"
                : project.type === "collaboration"
                ? "orange.500"
                : "gray.500"
            }
          />
          {project.currentlyContributing && (
            <Box
              w="4px"
              h="4px"
              borderRadius="full"
              bg="accent.teal"
              animation="activePulse 2s ease-in-out infinite"
            />
          )}
        </Box>
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

      {/* Key feature/metric */}
      {(project.metrics.length > 0 || project.keyFeatures.length > 0) && (
        <Text fontSize="xs" color="text.muted" mb={2} wordWrap="break-word" whiteSpace="normal">
          • {project.metrics[0] || project.keyFeatures[0]}
        </Text>
      )}

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
