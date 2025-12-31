import { Box } from "@chakra-ui/react"

interface DialogueBoxSpeakerProps {
  speaker?: string
}

export default function DialogueBoxSpeaker({ speaker }: DialogueBoxSpeakerProps) {
  if (!speaker) return null

  return (
    <Box
      position="absolute"
      top="-28px"
      left="-8px"
      bg="bg.dark"
      color="accent.green"
      px={3}
      py={1}
      borderRadius="md"
      textStyle="speakerLabel"
      border="1px solid"
      borderColor="accent.green"
      boxShadow="speaker.label"
      zIndex={2}
      opacity={1}
    >
      {speaker}
    </Box>
  )
}
