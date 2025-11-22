import { Box } from "@chakra-ui/react"

interface DialogueBoxSpeakerProps {
  speaker?: string
}

export default function DialogueBoxSpeaker({ speaker }: DialogueBoxSpeakerProps) {
  if (!speaker) return null

  return (
    <Box
      position="absolute"
      top="-12px"
      left="16px"
      bg="bg.dark"
      color="accent.green"
      px={3}
      py={1}
      borderRadius="md"
      fontSize="sm"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.5px"
      border="1px solid"
      borderColor="accent.green"
      boxShadow="0 0 8px accent.greenAlpha.30"
      zIndex={2}
      opacity={1}
    >
      {speaker}
    </Box>
  )
}
