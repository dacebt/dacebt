import { Box } from "@chakra-ui/react"
import StackedDialogueBox from "../components/StackedDialogueBox"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { visibleMessages, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box minHeight="100%" position="relative" p={6}>
      <StackedDialogueBox
        variant="home"
        position={{ bottom: "50px" }}
        messages={visibleMessages}
        hasMore={hasMore}
        onClick={handleClick}
      />
    </Box>
  )
}
