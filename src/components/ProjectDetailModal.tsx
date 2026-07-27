import { Box, Flex, Text } from "@chakra-ui/react"
import ModalShell from "./ui/ModalShell"
import type { Project } from "../data/projects"

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
  finalFocusEl: () => HTMLElement | null
}

interface SectionProps {
  label: string
  items: string[]
}

function Section({ label, items }: SectionProps) {
  if (items.length === 0) return null

  return (
    <Box mb={5} _last={{ mb: 0 }}>
      <Text
        textStyle="speakerLabel"
        color="accent.teal"
        mb={2}
        pb={1}
        borderBottom="1px solid"
        borderColor="border.inner"
      >
        {label}
      </Text>
      <Flex flexDirection="column" gap={1.5}>
        {items.map((item, idx) => (
          <Flex
            key={`${label}-${idx}`}
            gap={2}
            alignItems="flex-start"
          >
            <Text
              as="span"
              textStyle="smallText"
              color="accent.teal"
              lineHeight="1.6"
              flexShrink={0}
            >
              ▸
            </Text>
            <Text
              textStyle="dialogue"
              color="text.primary"
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="1.6"
            >
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default function ProjectDetailModal({
  project,
  onClose,
  finalFocusEl,
}: ProjectDetailModalProps) {
  return (
    <ModalShell
      open={project !== null}
      onClose={onClose}
      title={project?.name ?? "Project details"}
      finalFocusEl={finalFocusEl}
    >
      {project && (
        <>
          <Section label="FEATURES" items={project.keyFeatures} />
          <Section label="METRICS" items={project.metrics} />
          <Section label="CONTRIBUTIONS" items={project.contributions} />
        </>
      )}
    </ModalShell>
  )
}
