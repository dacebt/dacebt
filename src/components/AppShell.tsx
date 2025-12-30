import { useEffect } from "react"
import { Box, Grid, Flex, Text, Image } from "@chakra-ui/react"
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
          p={{ base: 3, md: 4 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={4}
        >
          <Flex alignItems="center" gap={3}>
            <Image
              src="/images/logo_unsized.png"
              alt="Logo"
              h={{ base: "32px", md: "40px" }}
              w="auto"
            />
            <Text
              textStyle="heading"
              color="text.primary"
              fontSize={{ base: "lg", md: "xl" }}
            >
              David Colon
            </Text>
          </Flex>
          <Box display={{ base: "none", md: "block" }}>
            <Text textStyle="subtitle" color="text.muted" fontSize="sm">
              Senior Web Engineer
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
          p={{ base: 4, md: 6, lg: 8 }}
          minH={0}
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Box
            flex="1"
            overflowY="auto"
            overflowX="hidden"
            h="100%"
          >
            <Outlet />
          </Box>
        </GlassPanel>

        {/* Footer / Bottom Panel */}
        <GlassPanel
          gridArea="footer"
          elevation="medium"
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

