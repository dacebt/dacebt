import { Box } from "@chakra-ui/react"

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
      <img
        src={speakerImage}
        alt={speaker || "Speaker"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Box>
  )
}
