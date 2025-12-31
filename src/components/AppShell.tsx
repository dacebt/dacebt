import { useEffect } from "react"
import { Box, Grid } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import GlassPanel from "./ui/GlassPanel"
import NavRail from "./NavRail"
import PlayerStatsCard from "./PlayerStatsCard"
import { injectAllAnimations } from "../utils/animations"

function AppShell() {

  useEffect(() => {
    injectAllAnimations()
  }, [])

  return (
    <Box
      h="100vh"
      overflow="hidden"
      position="relative"
      p={{ base: 3, md: 4, lg: 6 }}
    >
      <Grid
        templateAreas={{
          base: '"main" "footer"',
          md: '"rail main" "footer footer"',
        }}
        templateColumns={{
          base: "1fr",
          md: "auto 1fr",
        }}
        templateRows={{
          base: "1fr auto",
          md: "1fr auto",
        }}
        gap={{ base: 3, md: 4, lg: 6 }}
        h="100%"
        maxWidth={{ base: "100%", lg: "1600px" }}
        margin="0 auto"
      >
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

