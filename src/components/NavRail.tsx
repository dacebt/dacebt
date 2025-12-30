import { Box, Icon, Link } from "@chakra-ui/react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import type { LinkProps as RouterLinkProps } from "react-router-dom"
import { FaHome, FaFolderOpen, FaUser, FaEnvelope } from "react-icons/fa"
import { Tooltip } from "./ui/tooltip"

interface NavItem {
  label: string
  path: string
  icon: typeof FaHome
}

const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: FaHome },
  { label: "Projects", path: "/projects", icon: FaFolderOpen },
  { label: "About", path: "/about", icon: FaUser },
  { label: "Contact", path: "/contact", icon: FaEnvelope },
]

export default function NavRail() {
  const location = useLocation()

  return (
    <Box
      display="flex"
      flexDirection={{ base: "row", md: "column" }}
      alignItems="center"
      justifyContent={{ base: "center", md: "flex-start" }}
      gap={3}
      py={{ base: 0, md: 4 }}
    >
      {navItems.map(({ label, path, icon }) => {
        const isActive = location.pathname === path

        return (
          <Tooltip key={path} content={label}>
            <Link
              as={RouterLink}
              {...({ to: path } as RouterLinkProps)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="48px"
              h="48px"
              borderRadius="full"
              bg={isActive ? "accent.tealAlpha.20" : "bg.steelAlpha.60"}
              border="1px solid"
              borderColor={isActive ? "accent.teal" : "border.inner"}
              color={isActive ? "accent.teal" : "text.secondary"}
              transition="all 0.3s ease"
              _hover={{
                bg: isActive ? "accent.tealAlpha.30" : "accent.tealAlpha.10",
                borderColor: "accent.teal",
                transform: "scale(1.1)",
              }}
              boxShadow={isActive ? "nav.indicator" : "none"}
              textDecoration="none"
            >
              <Icon as={icon} boxSize={5} />
            </Link>
          </Tooltip>
        )
      })}
    </Box>
  )
}

