import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

interface InterfaceFrameProps extends BoxProps {
  children: React.ReactNode
  isActive?: boolean
  maxWidth?: string
  depthLevel?: "shallow" | "medium" | "deep"
}

const boltStyle = {
  w: "12px",
  h: "12px",
  borderRadius: "50%",
  bg: "linear-gradient(135deg, white.alpha.30 0%, accent.teal 30%, border.inner 70%, black.alpha.30 100%)",
  boxShadow: "inset 0 1px 2px white.alpha.40, inset 0 -1px 2px black.alpha.60, 0 2px 4px black.alpha.30, 0 0 0 1px black.alpha.20",
  _before: {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    w: "8px",
    h: "8px",
    borderRadius: "50%",
    bg: "linear-gradient(135deg, white.alpha.20 0%, transparent 50%)",
  },
}

const cornerPositions = [
  { top: "12px", left: "12px" },
  { top: "12px", right: "12px" },
  { bottom: "12px", left: "12px" },
  { bottom: "12px", right: "12px" },
]

const InterfaceFrame = React.forwardRef<HTMLDivElement, InterfaceFrameProps>(
  ({ children, isActive = false, maxWidth = "1200px", depthLevel = "medium", ...props }, ref) => {
    const bgColor = "bg.steel"
    const borderInner = "border.inner"
    const borderOuter = "border.outer"
    const accentColor = "accent.teal"

    // Depth configuration based on depthLevel
    const depthConfig = {
      shallow: {
        shadowLayers: 2,
        shadowIntensity: 0.2,
        innerGlow: 0.05,
        transform: "translateZ(0)",
      },
      medium: {
        shadowLayers: 4,
        shadowIntensity: 0.4,
        innerGlow: 0.1,
        transform: "translateZ(1px)",
      },
      deep: {
        shadowLayers: 6,
        shadowIntensity: 0.6,
        innerGlow: 0.15,
        transform: "translateZ(2px)",
      },
    }

    const config = depthConfig[depthLevel]

    return (
      <Box
          ref={ref}
          maxW={maxWidth}
          bg={bgColor}
          borderRadius="md"
          position="relative"
          transform={config.transform}
          transition="box-shadow 0.3s ease"
          _hover={{
            boxShadow: `
              inset 0 0 0 2px rgba(255, 255, 255, ${config.innerGlow + 0.03}),
              inset 0 0 0 4px ${borderInner},
              inset 0 0 0 8px ${borderOuter},
              0 0 0 4px ${isActive ? accentColor : borderInner},
              ${
                isActive
                  ? `0 0 20px accent.tealAlpha.10`
                  : `0 4px 20px rgba(0, 0, 0, ${config.shadowIntensity}), 0 8px 40px rgba(0, 0, 0, ${
                      config.shadowIntensity * 0.7
                    }), 0 16px 60px rgba(0, 0, 0, ${config.shadowIntensity * 0.4})`
              }
            `,
          }}
          style={{
            animation: isActive ? "borderGlow 2s ease-in-out infinite" : "slideIn 0.2s ease-out",
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "md",
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${config.innerGlow}) 0%, 
              transparent 30%, 
              rgba(0, 0, 0, ${config.shadowIntensity * 0.8}) 100%)`,
            pointerEvents: "none",
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            borderRadius: "md",
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${config.innerGlow * 0.5}) 0%, 
              transparent 20%, 
              rgba(0, 0, 0, ${config.shadowIntensity * 0.3}) 100%)`,
            pointerEvents: "none",
          }}
          boxShadow={`
            inset 0 0 0 2px rgba(255, 255, 255, ${config.innerGlow}),
            inset 0 0 0 4px ${borderInner},
            inset 0 0 0 8px ${borderOuter},
            0 0 0 4px ${isActive ? accentColor : borderInner},
            ${
              isActive
                ? `0 0 20px accent.tealAlpha.10`
                : `0 4px 20px rgba(0, 0, 0, ${config.shadowIntensity}), 0 8px 40px rgba(0, 0, 0, ${
                    config.shadowIntensity * 0.7
                  }), 0 16px 60px rgba(0, 0, 0, ${config.shadowIntensity * 0.4})`
            }
          `}
          p={6}
          {...props}
        >
          {/* Corner bolts */}
          {cornerPositions.map((position, i) => (
            <Box key={i} position="absolute" {...position} {...boltStyle} />
          ))}

          {children}
        </Box>
    )
  }
)

InterfaceFrame.displayName = "InterfaceFrame"

export default InterfaceFrame
