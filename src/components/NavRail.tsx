import { Box, Icon, Link } from "@chakra-ui/react"
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom"
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
      gap={2}
      py={{ base: 0, md: 3 }}
    >
      {navItems.map(({ label, path, icon }) => (
        <Tooltip key={path} content={label}>
          <Link asChild variant="route">
            <RouterLink
              to={path}
              aria-label={label}
              aria-current={
                matchPath(
                  { path, end: true, caseSensitive: false },
                  location.pathname,
                )
                  ? "page"
                  : undefined
              }
            >
              <Icon as={icon} boxSize={5} aria-hidden="true" />
            </RouterLink>
          </Link>
        </Tooltip>
      ))}
    </Box>
  )
}
