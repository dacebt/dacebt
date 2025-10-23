import React from "react"
import { Box, Text, type BoxProps } from "@chakra-ui/react"

interface SimpleDialogueBoxProps extends Omit<BoxProps, "position"> {
  content: string
  speaker?: string
  speakerImage?: string
  imagePosition?: "left" | "right" | "center"
  position?: { top?: string; bottom?: string; left?: string; right?: string }
  hasMore?: boolean
  onClick?: () => void
  cssPosition?: "absolute" | "relative" | "static"
}

const SimpleDialogueBox = React.forwardRef<HTMLDivElement, SimpleDialogueBoxProps>(
  (
    {
      content,
      speaker,
      speakerImage,
      imagePosition = "left",
      position,
      hasMore = true,
      onClick,
      cssPosition = "absolute",
      ...props
    },
    ref
  ) => {
    const defaultPosition = {
      bottom: "0px",
      left: "0px",
      right: "0px",
    }

    const finalPosition = cssPosition === "absolute" ? { ...defaultPosition, ...position } : {}

    return (
      <Box
        ref={ref}
        position={cssPosition}
        {...finalPosition}
        bg="bg.dark"
        borderRadius="8px"
        p={6}
        minH="80px"
        display="flex"
        alignItems="center"
        gap={4}
        cursor={onClick ? "pointer" : "default"}
        onClick={onClick}
        transition="all 0.2s ease"
        _hover={
          onClick
            ? {
                boxShadow: `
              inset 0 0 0 2px rgba(255, 255, 255, 0.12),
              inset 0 0 0 4px var(--chakra-colors-accent-green),
              inset 0 0 0 6px var(--chakra-colors-border-outer),
              0 0 0 2px var(--chakra-colors-accent-green),
              0 4px 24px rgba(16, 185, 129, 0.3),
              0 8px 40px rgba(0, 0, 0, 0.4)
            `,
              }
            : undefined
        }
        boxShadow={`
          inset 0 0 0 2px rgba(255, 255, 255, 0.08),
          inset 0 0 0 4px var(--chakra-colors-accent-green),
          inset 0 0 0 6px var(--chakra-colors-border-outer),
          0 0 0 2px var(--chakra-colors-accent-green),
          0 4px 20px rgba(16, 185, 129, 0.2),
          0 8px 40px rgba(0, 0, 0, 0.4)
        `}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "8px",
          background: `linear-gradient(135deg, 
            rgba(16, 185, 129, 0.05) 0%, 
            transparent 30%, 
            rgba(0, 0, 0, 0.3) 100%)`,
          pointerEvents: "none",
        }}
        {...props}
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
          >
            {speaker}
          </Box>
        )}

        {/* Speaker Avatar */}
        {speakerImage && (
          <Box
            w="48px"
            h="48px"
            borderRadius="full"
            bg="bg.steel"
            border="2px solid"
            borderColor="accent.green"
            boxShadow="0 0 8px rgba(16, 185, 129, 0.3)"
            flexShrink={0}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
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
          fontSize="2xl"
          fontWeight="medium"
          lineHeight="1.6"
          textShadow="0 0 12px rgba(16, 185, 129, 0.3)"
          position="relative"
          zIndex={1}
          flex={1}
        >
          {content}
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

SimpleDialogueBox.displayName = "SimpleDialogueBox"

export default SimpleDialogueBox
