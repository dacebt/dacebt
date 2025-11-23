import { Box, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import type { LinkProps as RouterLinkProps } from "react-router-dom"

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

interface NavLinkProps extends RouterLinkProps {
  isActive: boolean
}

function NavLink({ isActive, children, ...props }: NavLinkProps) {
  return (
    <Link
      as={RouterLink}
      {...(props as RouterLinkProps)}
      variant="nav"
      bg={isActive ? "accent.tealAlpha.12" : "transparent"}
      borderLeft={isActive ? "3px solid" : "3px solid transparent"}
      borderColor="accent.teal"
      boxShadow={isActive ? "nav.active" : "none"}
      _hover={
        isActive
          ? {
              bg: "accent.tealAlpha.18",
              boxShadow: "nav.activeHover",
            }
          : undefined
      }
    >
      {children}
    </Link>
  )
}

export default function Navigation() {
  const location = useLocation()

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" gap={3} my={4}>
      {navItems.map(({ label, path }) => {
        const isActive = location.pathname === path

        return (
          <NavLink key={path} to={path} isActive={isActive}>
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
          </NavLink>
        )
      })}
    </Box>
  )
}
