import { useEffect } from "react"
import HourglassGrid from "./components/HourglassGrid"
import InterfaceFrame from "./components/InterfaceFrame"
import Navigation from "./components/Navigation"
import PlayerStatsCard from "./components/PlayerStatsCard"
import { Box, Grid } from "@chakra-ui/react"
import { useNavigationStore } from "./store/navigationStore"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import { injectAllAnimations } from "./utils/animations"

const NAV_COLUMN_WIDTH = "280px"

function App() {
  const currentPage = useNavigationStore((state) => state.currentPage)

  // Inject all animations once on mount
  useEffect(() => {
    injectAllAnimations()
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "projects":
        return <ProjectsPage />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <>
      <HourglassGrid />
      <Box
        position="relative"
        zIndex={1}
        margin="0 auto"
        minHeight="100vh"
        maxWidth={{ base: "100%", md: "spacing.container.md", lg: "spacing.container.lg", xl: "spacing.container.xl" }}
        padding={{ base: "1rem", md: "2rem" }}
        backgroundColor="transparent"
        color="text.primary"
      >
        <Grid
          templateAreas={{
            base: '"main" "navigation" "footer"',
            lg: '"main navigation" "footer footer"',
          }}
          templateColumns={{ base: "1fr", lg: `minmax(0, 1fr) ${NAV_COLUMN_WIDTH}` }}
          templateRows={{ base: "auto", lg: "1fr 180px" }}
          gap={{ base: 4, lg: 5 }}
          alignItems="start"
          height={{ base: "auto", lg: "calc(100vh - 4rem)" }}
        >
          {/* Main content area */}
          <InterfaceFrame 
            depthLevel="deep" 
            overflow="hidden"
            minH={0}
            gridArea="main"
            h="100%"
          >
            <Box h="100%" overflow="auto">
              {renderPage()}
            </Box>
          </InterfaceFrame>

          {/* Navigation sidebar */}
          <InterfaceFrame 
            depthLevel="medium" 
            gridArea="navigation"
            minW={{ base: "100%", lg: NAV_COLUMN_WIDTH }}
            maxW={{ base: "100%", lg: NAV_COLUMN_WIDTH }}
            alignSelf="start"
          >
            <Navigation />
          </InterfaceFrame>

          {/* Player stats card */}
          <InterfaceFrame 
            depthLevel="shallow" 
            gridArea="footer"
            mt={{ base: 0, lg: 4 }}
          >
            <PlayerStatsCard />
          </InterfaceFrame>
        </Grid>
      </Box>
    </>
  )
}

export default App
