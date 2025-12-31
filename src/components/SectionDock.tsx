import { Box, Text, Flex } from "@chakra-ui/react"
import { useNavMode } from "../hooks/useNavMode"
import type { SectionId } from "../contexts/navModeContext"

interface DockItem {
  label: string
  sectionId: SectionId
}

const dockItems: DockItem[] = [
  { label: "Home", sectionId: "section-home" },
  { label: "Projects", sectionId: "section-projects" },
  { label: "About", sectionId: "section-about" },
  { label: "Contact", sectionId: "section-contact" },
]

export default function SectionDock() {
  const { activeId, scrollToId } = useNavMode()

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={100}
      bg="bg.steel"
      borderBottom="1px solid"
      borderColor="border.inner"
      px={4}
      py={2}
      mb={4}
      backdropFilter="blur(8px)"
      bgGradient="linear-gradient(to bottom, var(--chakra-colors-bg-steel) 0%, var(--chakra-colors-bg-steel-alpha-95) 100%)"
    >
      <Flex gap={1} alignItems="center" justifyContent="center" maxW="600px" mx="auto">
        {dockItems.map((item) => {
          const isActive = activeId === item.sectionId

          return (
            <Box
              key={item.sectionId}
              as="button"
              onClick={() => scrollToId(item.sectionId)}
              px={3}
              py={1.5}
              borderRadius="sm"
              bg={isActive ? "accent.tealAlpha.12" : "transparent"}
              border="1px solid"
              borderColor={isActive ? "accent.teal" : "transparent"}
              color={isActive ? "accent.teal" : "text.primary"}
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                bg: isActive ? "accent.tealAlpha.18" : "bg.dark",
                borderColor: "accent.teal",
              }}
            >
              <Text fontSize="xs" fontWeight={isActive ? "semibold" : "normal"}>
                {item.label}
              </Text>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

