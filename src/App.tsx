import HourglassGrid from "./components/HourglassGrid"
import InterfaceFrame from "./components/InterfaceFrame"
import { Text, Box, Heading, Grid } from "@chakra-ui/react"

function App() {
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
          gridTemplateAreas={`"main main navigation" "main main navigation" "footer footer footer"`}
          gridTemplateColumns="1fr 1fr 0.5fr"
          gridTemplateRows="1fr 1fr 0.25fr"
          minHeight="calc(100vh - 4rem)" // Subtract padding and gap
          gap={4}
        >
          <InterfaceFrame gridArea="main" >
            <Box minHeight="100%">Hello</Box>
          </InterfaceFrame>
          <InterfaceFrame gridArea="navigation">
            <>
              <Heading>Navigation</Heading>
              <Text>Home</Text>
              <Text>Projects</Text>
              <Text>Experiments</Text>
              <Text>About</Text>
              <Text>Contact</Text>
            </>
          </InterfaceFrame>
          <InterfaceFrame gridArea="footer">
            <></>
          </InterfaceFrame>
        </Grid>
      </Box>
    </>
  )
}

export default App
