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
    },
    ref
  ) => {
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
        bg="linear-gradient(135deg, bg.darkAlpha.95 0%, bg.steelAlpha.90 100%)"
        borderRadius="16px"
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
          onClick
            ? {
                transform: "translateY(-2px)",
                boxShadow: `
                  inset 0 0 0 2px rgba(255, 255, 255, 0.15),
                  inset 0 0 0 4px #10B981,
                  inset 0 0 0 6px #0E1013,
                  0 0 0 3px #10B981,
                  0 8px 32px rgba(16, 185, 129, 0.4),
                  0 16px 64px rgba(0, 0, 0, 0.6),
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
              }
            : undefined
        }
        boxShadow={`
          inset 0 0 0 2px rgba(255, 255, 255, 0.1),
          inset 0 0 0 4px #10B981,
          inset 0 0 0 6px #0E1013,
          0 0 0 2px #10B981,
          0 6px 24px rgba(16, 185, 129, 0.25),
          0 12px 48px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.05)
        `}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "16px",
          background: `linear-gradient(135deg, 
            accent.greenAlpha.5 0%, 
            transparent 30%, 
            black.alpha.30 100%)`,
          pointerEvents: "none",
        }}
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
