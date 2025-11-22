import { Box } from "@chakra-ui/react"
import StackedDialogueBox from "../components/StackedDialogueBox"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { visibleMessages, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-end" p={{ base: 4, md: 6 }}>
      <Box maxH={{ base: "60vh", md: "70vh" }}>
        <StackedDialogueBox
          variant="home"
          messages={visibleMessages}
          hasMore={hasMore}
          onClick={handleClick}
        />
      </Box>
    </Box>
  )
}
