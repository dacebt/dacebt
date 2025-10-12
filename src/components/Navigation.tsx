import { VStack, Text, Box } from "@chakra-ui/react"
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
    <VStack align="stretch" gap={3} my={4}>
      {navItems.map(({ label, page }) => {
        const isActive = currentPage === page
        
        return (
          <Box
            key={page}
            cursor="pointer"
            px={4}
            py={3}
            borderRadius="sm"
            position="relative"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg={isActive ? "rgba(91, 192, 190, 0.12)" : "transparent"}
            borderLeft={isActive ? "3px solid" : "3px solid transparent"}
            borderColor="accent.teal"
            boxShadow={
              isActive
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(91, 192, 190, 0.15)"
                : "none"
            }
            _hover={{
              bg: isActive ? "rgba(91, 192, 190, 0.18)" : "rgba(91, 192, 190, 0.08)",
              transform: "translateX(4px)",
              boxShadow: isActive
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 12px rgba(91, 192, 190, 0.25)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate(page)}
          >
            <Text
              fontSize="md"
              fontWeight={isActive ? "bold" : "medium"}
              color={isActive ? "accent.teal" : "text.primary"}
              letterSpacing={isActive ? "0.5px" : "normal"}
              textTransform="uppercase"
              transition="all 0.3s"
            >
              {label}
            </Text>
            {isActive && (
              <Box
                position="absolute"
                right="12px"
                top="50%"
                transform="translateY(-50%)"
                w="6px"
                h="6px"
                borderRadius="full"
                bg="accent.teal"
                boxShadow="0 0 12px rgba(91, 192, 190, 1), 0 0 6px rgba(91, 192, 190, 0.6)"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              />
            )}
          </Box>
        )
      })}
    </VStack>
  )
}
