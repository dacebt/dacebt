import { Box, Image } from "@chakra-ui/react"

interface DialogueBoxAvatarProps {
  speakerImage?: string
  speaker?: string
}

export default function DialogueBoxAvatar({ speakerImage, speaker }: DialogueBoxAvatarProps) {
  if (!speakerImage) return null

  const avatarWidth = { base: "60px", md: "90px" }
  const avatarHeight = { base: "80px", md: "110px" }

  return (
    <Box
      w={avatarWidth}
      h={avatarHeight}
      borderRadius="md"
      flexShrink={0}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Image
        src={speakerImage}
        alt={speaker || "Speaker"}
        w="100%"
        h="100%"
        objectFit="cover"
        borderRadius="md"
        fallback={<Box w="100%" h="100%" bg="bg.steel" borderRadius="md" />}
      />
    </Box>
  )
}
