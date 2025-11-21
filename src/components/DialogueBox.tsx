import React, { useState, useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"

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

    // Shared styling for all variants
    const avatarWidth = "90px"
    const avatarHeight = "110px"
    const paddingTop = 4
    const paddingBottom = 3

    return (
      <Box
        ref={ref}
        position="relative"
        bg="linear-gradient(135deg, bg.darkAlpha.95 0%, bg.steelAlpha.90 100%)"
        borderRadius="16px"
        px={10}
        pt={paddingTop}
        pb={paddingBottom}
        display="flex"
        alignItems="flex-end"
        gap={8}
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

        {/* Speaker Label */}
        {speaker && (
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
        )}

        {/* Speaker Avatar */}
        {speakerImage && (
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
        )}

        {/* Content */}
        <Text
          color="text.primary"
          fontSize="lg"
          fontWeight="500"
          lineHeight="1.6"
          textShadow="0 2px 8px black.alpha.80, 0 0 20px accent.greenAlpha.30"
          position="relative"
          zIndex={1}
          flex={1}
          letterSpacing="0.2px"
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

        {/* Bottom right arrow indicator */}
        {hasMore && (
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
        )}
      </Box>
    )
  }
)

DialogueBox.displayName = "DialogueBox"

export default DialogueBox
