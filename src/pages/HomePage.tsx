import { Box } from "@chakra-ui/react"
import DialogueBox from "../components/DialogueBox"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { currentMessage, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box minHeight="100%" position="relative" p={6}>
      <DialogueBox
        variant="home"
        position={{ bottom: "50px" }}
        content={currentMessage.message}
        speaker={currentMessage.speaker}
        speakerImage={currentMessage.image}
        imagePosition={currentMessage.imagePosition}
        hasMore={hasMore}
        onClick={handleClick}
      />
    </Box>
  )
}
