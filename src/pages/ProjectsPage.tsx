import { useEffect } from "react"
import { Grid } from "@chakra-ui/react"
import { projects } from "../data/projects"
import PageLayout from "../components/PageLayout"
import ProjectCard from "../components/ProjectCard"
import { injectAnimations } from "../utils/animations"

export default function ProjectsPage() {
  // Inject animations into document head
  useEffect(() => {
    return injectAnimations(["float", "pulse", "activePulse"])
  }, [])

  const handleLinkClick = (url: string, event: React.MouseEvent) => {
    event.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <PageLayout title="My Projects" subtitle="A collection of my work and experiments">
      {/* Projects grid */}
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={4}
        w="100%"
        alignItems="start"
        pt={4}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onLinkClick={handleLinkClick}
          />
        ))}
      </Grid>
    </PageLayout>
  )
}
