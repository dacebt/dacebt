import { useState } from "react"
import { Box, Image } from "@chakra-ui/react"

interface DialogueBoxAvatarProps {
  speakerImage?: string
  speaker?: string
}

export default function DialogueBoxAvatar({ speakerImage, speaker }: DialogueBoxAvatarProps) {
  const [imageError, setImageError] = useState(false)

  if (!speakerImage) return null

  const avatarWidth = { base: "60px", md: "90px" }
  const avatarHeight = { base: "80px", md: "110px" }

  if (imageError) {
    return (
      <Box
        w={avatarWidth}
        h={avatarHeight}
        borderRadius="md"
        flexShrink={0}
        bg="bg.steel"
        display="flex"
        alignItems="center"
        justifyContent="center"
      />
    )
  }

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
        onError={() => setImageError(true)}
      />
    </Box>
  )
}
