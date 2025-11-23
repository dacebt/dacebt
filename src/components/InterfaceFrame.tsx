import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"
import InterfaceFrameBolts from "./ui/InterfaceFrameBolts"
import InterfaceFrameShadows from "./ui/InterfaceFrameShadows"

interface InterfaceFrameProps extends BoxProps {
  children: React.ReactNode
  isActive?: boolean
  maxWidth?: string
  depthLevel?: "shallow" | "medium" | "deep"
}

const InterfaceFrame = React.forwardRef<HTMLDivElement, InterfaceFrameProps>(
  ({ children, isActive = false, maxWidth = "1200px", depthLevel = "medium", ...props }, ref) => {
    // Depth configuration based on depthLevel
    const depthConfig = {
      shallow: {
        shadowIntensity: 0.2,
        innerGlow: 0.05,
        transform: "translateZ(0)",
      },
      medium: {
        shadowIntensity: 0.4,
        innerGlow: 0.1,
        transform: "translateZ(1px)",
      },
      deep: {
        shadowIntensity: 0.6,
        innerGlow: 0.15,
        transform: "translateZ(2px)",
      },
    }

    const config = depthConfig[depthLevel]
    const shadowProps = InterfaceFrameShadows({ isActive, config })

    return (
      <Box
          ref={ref}
          maxW={maxWidth}
          bg="bg.steel"
          borderRadius="md"
          position="relative"
          transform={config.transform}
          transition="box-shadow 0.3s ease"
          {...shadowProps}
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
          p={6}
          {...props}
        >
          <InterfaceFrameBolts />
          {children}
        </Box>
    )
  }
)

InterfaceFrame.displayName = "InterfaceFrame"

export default InterfaceFrame
