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
