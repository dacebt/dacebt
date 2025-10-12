import { Heading, VStack, Text } from "@chakra-ui/react"
import { useNavigationStore, type Page } from "../store/navigationStore"

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Projects", page: "projects" },
  { label: "Experiments", page: "experiments" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
]

export default function Navigation() {
  const { currentPage, navigate } = useNavigationStore()

  return (
    <VStack align="stretch" gap={2}>
      <Heading size="lg" mb={2}>Navigation</Heading>
      {navItems.map(({ label, page }) => (
        <Text
          key={page}
          cursor="pointer"
          px={3}
          py={2}
          borderRadius="sm"
          fontWeight={currentPage === page ? "bold" : "normal"}
          color={currentPage === page ? "accent.teal" : "text.primary"}
          bg={currentPage === page ? "rgba(91, 192, 190, 0.1)" : "transparent"}
          transition="all 0.2s"
          _hover={{
            bg: "rgba(91, 192, 190, 0.15)",
            transform: "translateX(4px)",
          }}
          onClick={() => navigate(page)}
        >
          {label}
        </Text>
      ))}
    </VStack>
  )
}
