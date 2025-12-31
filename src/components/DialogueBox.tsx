import React, { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import DialogueBoxSpeaker from "./ui/DialogueBoxSpeaker"
import DialogueBoxAvatar from "./ui/DialogueBoxAvatar"
import DialogueBoxContent from "./ui/DialogueBoxContent"
import DialogueBoxArrow from "./ui/DialogueBoxArrow"

interface DialogueBoxProps {
  content: string
  speaker?: string
  speakerImage?: string
  hasMore?: boolean
  onClick?: () => void
  enableStreaming?: boolean
  streamingSpeed?: number
  variant?: "default" | "flat"
}

const DialogueBox = React.forwardRef<HTMLDivElement, DialogueBoxProps>(
  (
    {
      content,
      speaker,
      speakerImage,
      hasMore = true,
      onClick,
      enableStreaming = true,
      streamingSpeed = 30,
      variant = "default",
    },
    ref
  ) => {
    const isFlat = variant === "flat"
    const [displayedText, setDisplayedText] = useState("")
    const [isStreaming, setIsStreaming] = useState(false)

    useEffect(() => {
      if (!enableStreaming) {
        setDisplayedText(content)
        setIsStreaming(false)
        return
      }

      setDisplayedText("")
      setIsStreaming(true)
      
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedText(content.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsStreaming(false)
          clearInterval(interval)
        }
      }, streamingSpeed)

      return () => clearInterval(interval)
    }, [content, enableStreaming, streamingSpeed])

    return (
      <Box
        ref={ref}
        position="relative"
        bg={isFlat ? "transparent" : "linear-gradient(135deg, var(--chakra-colors-bg-dark-alpha-95) 0%, var(--chakra-colors-bg-steel-alpha-90) 100%)"}
        borderRadius={isFlat ? "md" : "16px"}
        px={{ base: 6, md: 10 }}
        pt={{ base: 3, md: 4 }}
        pb={{ base: 2, md: 3 }}
        display="flex"
        alignItems="flex-end"
        gap={{ base: 4, md: 8 }}
        cursor={onClick ? "pointer" : "default"}
        onClick={onClick}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        role="group"
        _hover={
          onClick && !isFlat
            ? {
                transform: "translateY(-2px)",
                boxShadow: "dialogue.hover",
              }
            : undefined
        }
        boxShadow={isFlat ? "none" : "dialogue.default"}
        border={isFlat ? "1px solid" : "none"}
        borderColor={isFlat ? "border.inner" : "transparent"}
        _before={
          isFlat
            ? undefined
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "16px",
                background: `linear-gradient(135deg, 
            var(--chakra-colors-accent-green-alpha-5) 0%, 
            transparent 30%, 
            var(--chakra-colors-black-alpha-30) 100%)`,
                pointerEvents: "none",
              }
        }
      >
        <DialogueBoxSpeaker speaker={speaker} />
        <DialogueBoxAvatar speakerImage={speakerImage} speaker={speaker} />
        <DialogueBoxContent displayedText={displayedText} isStreaming={isStreaming} />
        <DialogueBoxArrow hasMore={hasMore} />
      </Box>
    )
  }
)

DialogueBox.displayName = "DialogueBox"

export default DialogueBox
