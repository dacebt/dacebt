import { Box } from "@chakra-ui/react"
import DialogueBox from "../components/DialogueBox"
import { useDialogue } from "../hooks/useDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { currentText, currentMessage, hasMore, handleClick } = useDialogue({
    messages: welcomeMessages,
    speed: 2,
    tickRate: 30,
    useGlobalInteraction: true,
  })

  return (
    <Box minHeight="100%" position="relative" p={6}>
      <DialogueBox
        position={{ bottom: "50px" }}
        content={currentText}
        speaker={currentMessage.speaker}
        speakerImage={currentMessage.image}
        imagePosition={currentMessage.imagePosition}
        hasMore={hasMore}
        onClick={handleClick}
      />
    </Box>
  )
}
