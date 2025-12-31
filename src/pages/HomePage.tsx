import { Box } from "@chakra-ui/react"
import StackedDialogueBox from "../components/StackedDialogueBox"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { visibleMessages, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box minH="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={{ base: 4, md: 6 }}>
      <Box w="100%" maxW="800px">
        <StackedDialogueBox
          variant="dashboard"
          messages={visibleMessages}
          hasMore={hasMore}
          onClick={handleClick}
        />
      </Box>
    </Box>
  )
}
