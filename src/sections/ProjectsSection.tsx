import { Box, Text } from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"

interface ProjectsSectionProps {
  includeTitle?: boolean
}

export default function ProjectsSection({ includeTitle = false }: ProjectsSectionProps) {
  return (
    <Box id="section-projects" py={includeTitle ? 12 : 4} px={includeTitle ? 4 : 0} scrollMarginTop="80px">
      {includeTitle && (
        <Box display="flex" flexDirection="column" gap={2} textAlign="center" mb={8}>
          <Text
            textStyle="pageTitle"
            color="text.primary"
            bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
            bgClip="text"
            textShadow="0 0 20px accent.tealAlpha.30"
          >
            My Projects
          </Text>
          <Text textStyle="pageSubtitle" maxW="400px" mx="auto">
            A collection of my work and experiments
          </Text>
        </Box>
      )}
      <Box maxW="1200px" mx="auto" w="100%">
        <Grid
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
          gap={{ base: 4, md: 6 }}
          w="100%"
          alignItems="start"
          pt={includeTitle ? 0 : 4}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

