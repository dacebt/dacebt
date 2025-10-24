import React, { useState, useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"

interface DialogueBoxProps {
  content: string
  speaker?: string
  speakerImage?: string
  hasMore?: boolean
  onClick?: () => void
  variant?: "home" | "modal"
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
      variant = "home",
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

    // Variant-specific styling
    const isModal = variant === "modal"
    const avatarSize = isModal ? "100px" : "80px"
    const padding = isModal ? 10 : 10
    const minHeight = isModal ? "250px" : "140px"
    const gap = isModal ? 8 : 8

    return (
      <Box
        ref={ref}
        position="relative"
        bg="linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(29, 33, 38, 0.9) 100%)"
        borderRadius="16px"
        p={padding}
        minH={minHeight}
        display="flex"
        alignItems="center"
        gap={gap}
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
                  inset 0 0 0 4px var(--chakra-colors-accent-green),
                  inset 0 0 0 6px var(--chakra-colors-border-outer),
                  0 0 0 3px var(--chakra-colors-accent-green),
                  0 8px 32px rgba(16, 185, 129, 0.4),
                  0 16px 64px rgba(0, 0, 0, 0.6),
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
              }
            : undefined
        }
        boxShadow={`
          inset 0 0 0 2px rgba(255, 255, 255, 0.1),
          inset 0 0 0 4px var(--chakra-colors-accent-green),
          inset 0 0 0 6px var(--chakra-colors-border-outer),
          0 0 0 2px var(--chakra-colors-accent-green),
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
            rgba(16, 185, 129, 0.05) 0%, 
            transparent 30%, 
            rgba(0, 0, 0, 0.3) 100%)`,
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
            boxShadow="0 0 8px rgba(16, 185, 129, 0.3)"
            zIndex={2}
            opacity={1}
          >
            {speaker}
          </Box>
        )}

        {/* Speaker Avatar */}
        {speakerImage && (
          <Box
            w={avatarSize}
            h={avatarSize}
            borderRadius="full"
            bg="bg.steel"
            border="3px solid"
            borderColor="accent.green"
            boxShadow="0 0 12px rgba(16, 185, 129, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
            flexShrink={0}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "-3px",
              left: "-3px",
              right: "-3px",
              bottom: "-3px",
              borderRadius: "full",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(91, 192, 190, 0.3) 100%)",
              zIndex: -1,
            }}
          >
            <img
              src={speakerImage}
              alt={speaker || "Speaker"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Text
          color="text.primary"
          fontSize={isModal ? "lg" : "lg"}
          fontWeight="500"
          lineHeight="1.6"
          textShadow="0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.3)"
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
