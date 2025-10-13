import React from "react"
import { Box, Text, type BoxProps } from "@chakra-ui/react"

// Bounce animation for the arrow indicator
const bounceAnimation = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-4px);
    }
    60% {
      transform: translateY(-2px);
    }
  }
`

interface DialogueBoxProps extends Omit<BoxProps, "position"> {
  content: string
  position?: { top?: string; bottom?: string; left?: string; right?: string }
  hasMore?: boolean
  onClick?: () => void
  cssPosition?: "absolute" | "relative" | "static"
}

const DialogueBox = React.forwardRef<HTMLDivElement, DialogueBoxProps>(
  ({ content, position, hasMore = true, onClick, cssPosition = "absolute", ...props }, ref) => {
    const defaultPosition = {
      bottom: "0px",
      left: "0px",
      right: "0px",
    }

    const finalPosition = cssPosition === "absolute" ? { ...defaultPosition, ...position } : {}

    return (
      <>
        <style>{bounceAnimation}</style>
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
          cursor={onClick ? "pointer" : "default"}
          onClick={onClick}
          transition="all 0.2s ease"
          _hover={onClick ? {
            boxShadow: `
              inset 0 0 0 2px rgba(255, 255, 255, 0.12),
              inset 0 0 0 4px var(--chakra-colors-accent-green),
              inset 0 0 0 6px var(--chakra-colors-border-outer),
              0 0 0 2px var(--chakra-colors-accent-green),
              0 4px 24px rgba(16, 185, 129, 0.3),
              0 8px 40px rgba(0, 0, 0, 0.4)
            `
          } : undefined}
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
          {/* Content */}
          <Text
            color="text.primary"
            fontSize="2xl"
            fontWeight="medium"
            lineHeight="1.6"
            textShadow="0 0 12px rgba(16, 185, 129, 0.3)"
            position="relative"
            zIndex={1}
            pr={10}
            pb={5}
          >
            {content}
          </Text>

          {/* Bottom right arrow indicator */}
          <Box
            position="absolute"
            bottom="12px"
            right="12px"
            w="0"
            h="0"
            borderLeft="8px solid transparent"
            borderRight="8px solid transparent"
            borderTop="10px solid"
            borderTopColor={hasMore ? "accent.green" : "text.muted"}
            opacity={hasMore ? 1 : 0.5}
            animation={hasMore ? "bounce 1.5s ease-in-out infinite" : "none"}
            transition="all 0.3s ease"
          />
        </Box>
      </>
    )
  }
)

DialogueBox.displayName = "DialogueBox"

export default DialogueBox
