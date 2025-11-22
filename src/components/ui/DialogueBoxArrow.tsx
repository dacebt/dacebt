import { Box } from "@chakra-ui/react"

interface DialogueBoxArrowProps {
  hasMore?: boolean
}

export default function DialogueBoxArrow({ hasMore = true }: DialogueBoxArrowProps) {
  if (!hasMore) return null

  return (
    <Box
      w="0"
      h="0"
      borderLeft="8px solid transparent"
      borderRight="8px solid transparent"
      borderTop="10px solid"
      borderTopColor="accent.green"
      opacity={0.8}
      flexShrink={0}
      animation="bounce 1.5s ease-in-out infinite"
      transition="all 0.3s ease"
    />
  )
}
