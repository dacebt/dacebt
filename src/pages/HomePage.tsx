import { Box, Text } from "@chakra-ui/react"
import DialogueBox from "../components/DialogueBox"

export default function HomePage() {
  return (
    <Box minHeight="100%" position="relative" p={6}>
      <Text>Home page content</Text>
      <DialogueBox position={{ bottom: "50px" }} content="Welcome to my portfolio! Please navigate to the projects page to see my work." hasMore={true} />
    </Box>
  )
}
