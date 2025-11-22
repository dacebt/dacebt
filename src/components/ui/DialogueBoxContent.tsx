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
      textShadow="0 2px 8px black.alpha.80, 0 0 20px accent.greenAlpha.30"
      position="relative"
      zIndex={1}
      flex={1}
      fontFamily="system-ui, -apple-system, sans-serif"
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
