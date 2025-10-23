import React from "react"
import { Box, Text, type BoxProps } from "@chakra-ui/react"

interface DialogueBoxProps extends Omit<BoxProps, "position"> {
  content: string
  speaker?: string
  speakerImage?: string
  imagePosition?: "left" | "right" | "center"
  position?: { top?: string; bottom?: string; left?: string; right?: string }
  hasMore?: boolean
  onClick?: () => void
  cssPosition?: "absolute" | "relative" | "static"
  variant?: "home" | "modal"
}

const DialogueBox = React.forwardRef<HTMLDivElement, DialogueBoxProps>(
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
      variant = "home",
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

    // Variant-specific styling
    const isModal = variant === "modal"
    const avatarSize = isModal ? "100px" : "80px"
    const padding = isModal ? 10 : 10
    const minHeight = isModal ? "250px" : "140px"
    const gap = isModal ? 8 : 8

    return (
      <Box
        ref={ref}
        position={cssPosition}
        {...finalPosition}
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
          fontSize={isModal ? "3xl" : "2xl"}
          fontWeight="500"
          lineHeight="1.6"
          textShadow="0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.3)"
          position="relative"
          zIndex={1}
          flex={1}
          letterSpacing="0.2px"
          fontFamily="system-ui, -apple-system, sans-serif"
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

DialogueBox.displayName = "DialogueBox"

export default DialogueBox
