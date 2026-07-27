import { Box, Text } from "@chakra-ui/react"

interface DialogueBoxContentProps {
  displayedText: string
  isStreaming: boolean
}

export default function DialogueBoxContent({ displayedText, isStreaming }: DialogueBoxContentProps) {
  return (
    <Text
      textStyle="dialogue"
      color="text.primary"
      textShadow="var(--chakra-shadows-dialogue-text)"
      position="relative"
      zIndex={1}
      flex={1}
      fontFamily="var(--chakra-fonts-body)"
      whiteSpace="pre-wrap"
    >
      {displayedText}
      {isStreaming && (
        <Box
          as="span"
          w="2px"
          h="1.2em"
          bg="accent.green"
          ml="2px"
          display="inline-block"
          animation="blink 1s infinite"
          verticalAlign="text-bottom"
        />
      )}
    </Text>
  )
}
