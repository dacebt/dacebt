import { Box } from "@chakra-ui/react"
import StackedDialogueBox from "../components/StackedDialogueBox"
import PlayerStatsCard from "../components/PlayerStatsCard"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomeSection() {
  const { visibleMessages, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box
      id="section-home"
      minH="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={{ base: 4, md: 6 }}
      py={{ base: 12, md: 16 }}
      pb={{ base: 20, md: 24 }}
      scrollMarginTop="80px"
    >
      <Box maxH={{ base: "60vh", md: "70vh" }} mb={8}>
        <StackedDialogueBox
          variant="home"
          messages={visibleMessages}
          hasMore={hasMore}
          onClick={handleClick}
        />
      </Box>
      <Box maxW="1000px" mx="auto" w="100%">
        <PlayerStatsCard />
      </Box>
    </Box>
  )
}

