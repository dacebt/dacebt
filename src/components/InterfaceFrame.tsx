import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

// Animation keyframes using CSS-in-JS
const slideIn = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`

const borderGlow = `
  @keyframes borderGlow {
    0%, 100% {
      box-shadow: 
        inset 0 0 0 4px #4B5663,
        inset 0 0 0 8px #0E1013,
        0 0 0 4px #5BC0BE,
        0 0 20px rgba(91, 192, 190, 0.1);
    }
    50% {
      box-shadow: 
        inset 0 0 0 4px #4B5663,
        inset 0 0 0 8px #0E1013,
        0 0 0 4px #5BC0BE,
        0 0 30px rgba(91, 192, 190, 0.2);
    }
  }
`

interface InterfaceFrameProps extends BoxProps {
  children: React.ReactNode
  isActive?: boolean
  maxWidth?: string
}

const InterfaceFrame = React.forwardRef<HTMLDivElement, InterfaceFrameProps>(
  ({ children, isActive = false, maxWidth = "1200px", ...props }, ref) => {
    // Color scheme - cool tone
    const bgColor = "#1D2126" // Steel background
    const borderInner = "#4B5663"
    const borderOuter = "#0E1013"
    const accentColor = "#5BC0BE" // Teal accent

    return (
      <>
        <style>
          {slideIn}
          {borderGlow}
        </style>
        <Box
          ref={ref}
          maxW={maxWidth}
          bg={bgColor}
          borderRadius="md"
          position="relative"
          style={{
            animation: "slideIn 0.2s ease-out",
            ...(isActive && { animation: "borderGlow 2s ease-in-out infinite" }),
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
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%, 
              rgba(0, 0, 0, 0.3) 100%)`,
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
              rgba(255, 255, 255, 0.05) 0%, 
              transparent 30%, 
              rgba(0, 0, 0, 0.1) 100%)`,
            pointerEvents: "none",
          }}
          boxShadow={`
            inset 0 0 0 4px ${borderInner},
            inset 0 0 0 8px ${borderOuter},
            0 0 0 4px ${isActive ? accentColor : borderInner},
            ${isActive ? `0 0 20px rgba(91, 192, 190, 0.1)` : "0 4px 20px rgba(0, 0, 0, 0.3)"}
          `}
          p={6}
          {...props}
        >
          {/* Corner screws/bolts */}
          <Box
            position="absolute"
            top="12px"
            left="12px"
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={`linear-gradient(135deg, ${accentColor} 0%, ${borderInner} 100%)`}
            boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.5)"
          />
          <Box
            position="absolute"
            top="12px"
            right="12px"
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={`linear-gradient(135deg, ${accentColor} 0%, ${borderInner} 100%)`}
            boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.5)"
          />
          <Box
            position="absolute"
            bottom="12px"
            left="12px"
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={`linear-gradient(135deg, ${accentColor} 0%, ${borderInner} 100%)`}
            boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.5)"
          />
          <Box
            position="absolute"
            bottom="12px"
            right="12px"
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={`linear-gradient(135deg, ${accentColor} 0%, ${borderInner} 100%)`}
            boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.5)"
          />

          {children}
        </Box>
      </>
    )
  }
)

InterfaceFrame.displayName = "InterfaceFrame"

export default InterfaceFrame
