import { useEffect } from "react"
import { Box, Grid, Flex, Text, Image } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import GlassPanel from "./ui/GlassPanel"
import NavRail from "./NavRail"
import PlayerStatsCard from "./PlayerStatsCard"
import { injectAllAnimations } from "../utils/animations"

const getPageLabel = (pathname: string): string => {
  const mapping: Record<string, string> = {
    "/": "Home",
    "/projects": "Projects",
    "/about": "About",
    "/contact": "Contact",
  }
  return mapping[pathname] || "Home"
}

function AppShell() {
  const location = useLocation()
  const activePageLabel = getPageLabel(location.pathname)

  useEffect(() => {
    injectAllAnimations()
  }, [])

  return (
    <Box
      minHeight="100vh"
      padding={{ base: 3, md: 4, lg: 6 }}
      position="relative"
    >
      <Grid
        templateAreas={{
          base: '"top" "main" "footer"',
          md: '"top top" "rail main" "footer footer"',
        }}
        templateColumns={{
          base: "1fr",
          md: "auto 1fr",
        }}
        templateRows={{
          base: "auto 1fr auto",
          md: "auto 1fr auto",
        }}
        gap={{ base: 3, md: 4, lg: 6 }}
        height={{ base: "auto", md: "calc(100vh - 2rem)" }}
        maxWidth={{ base: "100%", lg: "1600px" }}
        margin="0 auto"
      >
        {/* Top Bar */}
        <GlassPanel
          gridArea="top"
          elevation="medium"
          role="container"
          p={{ base: 3, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={4}
        >
          <Flex alignItems="baseline" gap={2}>
            <Image
              src="/images/logo_unsized.png"
              alt="Logo"
              h={{ base: "32px", md: "40px" }}
              w="auto"
            />
            <Box>
              <Text
                textStyle="heading"
                color="text.primary"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                lineHeight="1.2"
                mb={0}
              >
                David Colon
              </Text>
              <Text
                textStyle="subtitle"
                color="text.muted"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="normal"
                lineHeight="1.4"
                mt={0.5}
              >
                Senior Web Engineer
              </Text>
            </Box>
          </Flex>
          <Box display={{ base: "none", md: "block" }}>
            <Text
              textStyle="subtitle"
              color="text.muted"
              fontSize="sm"
              fontWeight="normal"
            >
              {activePageLabel}
            </Text>
          </Box>
        </GlassPanel>

        {/* Left Icon Rail - Desktop */}
        <Box
          gridArea="rail"
          display={{ base: "none", md: "block" }}
        >
          <GlassPanel
            elevation="medium"
            role="container"
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            minH="fit-content"
          >
            <NavRail />
          </GlassPanel>
        </Box>

        {/* Mobile Navigation - Bottom Rail */}
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          display={{ base: "block", md: "none" }}
          zIndex={10}
          p={3}
        >
          <GlassPanel
            elevation="strong"
            role="container"
            p={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <NavRail />
          </GlassPanel>
        </Box>

        {/* Main Content Surface */}
        <GlassPanel
          gridArea="main"
          elevation="strong"
          role="container"
          p={{ base: 4, md: 6 }}
          minH={0}
          overflowY="auto"
          overflowX="hidden"
        >
          <Outlet />
        </GlassPanel>

        {/* Footer / Bottom Panel */}
        <GlassPanel
          gridArea="footer"
          elevation="subtle"
          role="container"
          p={{ base: 3, md: 4 }}
          minH={{ base: "auto", md: "120px" }}
        >
          <PlayerStatsCard />
        </GlassPanel>
      </Grid>
    </Box>
  )
}

export default AppShell

