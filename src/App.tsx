import HourglassGrid from "./components/HourglassGrid"
import InterfaceFrame from "./components/InterfaceFrame"
import Navigation from "./components/Navigation"
import { Box, Grid } from "@chakra-ui/react"
import { useNavigationStore } from "./store/navigationStore"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import ExperimentsPage from "./pages/ExperimentsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

function App() {
  const currentPage = useNavigationStore((state) => state.currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "projects":
        return <ProjectsPage />
      case "experiments":
        return <ExperimentsPage />
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
        maxWidth="1200px"
        padding="2rem"
        backgroundColor="transparent"
        color="text.primary"
      >
        <Grid
          gridTemplateAreas={`"main navigation" "footer footer"`}
          gridTemplateColumns="1fr 0.3fr"
          gridTemplateRows="1fr 150px"
          height="calc(100vh - 4rem)"
          gap={4}
        >
          <InterfaceFrame gridArea="main" depthLevel="deep" h="100%" overflow="hidden">
            <Box h="100%" overflow="auto">
              {renderPage()}
            </Box>
          </InterfaceFrame>
          <InterfaceFrame gridArea="navigation" depthLevel="medium" alignSelf="start" w="280px">
            <Navigation />
          </InterfaceFrame>
          <InterfaceFrame gridArea="footer" depthLevel="shallow">
            <></>
          </InterfaceFrame>
        </Grid>
      </Box>
    </>
  )
}

export default App
