import { Grid } from "@chakra-ui/react"
import { projects } from "../data/projects"
import PageLayout from "../components/PageLayout"
import ProjectCard from "../components/ProjectCard"

export default function ProjectsPage() {
  return (
    <PageLayout title="My Projects" subtitle="A collection of my work and experiments">
      {/* Projects grid */}
      <Grid
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 4, md: 6 }}
        w="100%"
        alignItems="stretch"
        pt={3}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            enableFloat={false}
          />
        ))}
      </Grid>
    </PageLayout>
  )
}
