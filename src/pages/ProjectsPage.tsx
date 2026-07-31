import { useRef, useState } from "react"
import { Grid } from "@chakra-ui/react"
import { projects, type Project } from "../data/projects"
import PageLayout from "../components/PageLayout"
import ProjectCard from "../components/ProjectCard"
import ProjectDetailModal from "../components/ProjectDetailModal"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const inspectTriggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <PageLayout title="My Projects" subtitle="A collection of my work and experiments">
      {/* Projects grid */}
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(min(100%, 18.75rem), 1fr))"
        gap={{ base: 4, md: 6 }}
        w="100%"
        alignItems="stretch"
        pt={3}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onInspect={(trigger) => {
              inspectTriggerRef.current = trigger
              setSelectedProject(project)
            }}
          />
        ))}
      </Grid>
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        finalFocusEl={() => inspectTriggerRef.current}
      />
    </PageLayout>
  )
}
