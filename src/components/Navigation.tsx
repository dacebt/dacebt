import { Box, Text } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
]

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" gap={3} my={4}>
      {navItems.map(({ label, path }) => {
        const isActive = location.pathname === path

        return (
          <Box
            key={path}
            cursor="pointer"
            px={4}
            py={3}
            borderRadius="sm"
            position="relative"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg={isActive ? "accent.tealAlpha.12" : "transparent"}
            borderLeft={isActive ? "3px solid" : "3px solid transparent"}
            borderColor="accent.teal"
            boxShadow={isActive ? "nav.active" : "none"}
            _hover={{
              bg: isActive ? "accent.tealAlpha.18" : "accent.tealAlpha.8",
              transform: "translateX(4px)",
              boxShadow: isActive ? "nav.activeHover" : "nav.inactiveHover",
            }}
            onClick={() => navigate(path)}
          >
            <Text
              textStyle={isActive ? "navItemActive" : "navItem"}
              color={isActive ? "accent.teal" : "text.primary"}
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
                boxShadow="nav.indicator"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}
