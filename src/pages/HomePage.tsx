import { Box } from "@chakra-ui/react"
import DialogueBox from "../components/DialogueBox"
import { useDialogue } from "../hooks/useDialogue"

const welcomeMessages = [
  "Welcome to my portfolio!",
  "I'm a software engineer with a passion for building great products.",
  "Please navigate to the projects page to see my work, or check out the contact page to get in touch!",
]

export default function HomePage() {
  const { currentText, hasMore, handleClick } = useDialogue({
    messages: welcomeMessages,
    speed: 2,
    tickRate: 30,
  })

  return (
    <Box minHeight="100%" position="relative" p={6}>
      <DialogueBox
        position={{ bottom: "50px" }}
        content={currentText}
        hasMore={hasMore}
        onClick={handleClick}
      />
    </Box>
  )
}
