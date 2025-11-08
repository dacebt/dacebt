import React from "react"
import { Box } from "@chakra-ui/react"

const HourglassIcon: React.FC<{ boxSize?: string }> = ({ boxSize = "24px" }) => (
  <svg
    width={boxSize}
    height={boxSize}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ stroke: "currentColor" }}
  >
    <path
      d="M6 2H18V6L12 12L18 18V22H6V18L12 12L6 6V2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const HourglassGrid: React.FC = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="bg.dark"
      overflow="hidden"
      zIndex="-1"
    >
      <Box
        position="absolute"
        top="-100vh"
        left="-100vw"
        width="400vw"
        height="400vh"
        transform="skew(-20deg, -10deg)"
        display="grid"
        gridTemplateColumns="repeat(25, 1fr)"
        gridTemplateRows="repeat(25, 1fr)"
        gap="2rem"
        style={{ animation: "infiniteScroll 30s linear infinite" }}
      >
        {Array.from({ length: 625 }, (_, i) => (
          <Box key={i} display="flex" alignItems="center" justifyContent="center" opacity="0.3">
            <Box color="text.muted" style={{ animation: `pulseScale 3s ease-in-out ${i * 0.1}s infinite` }}>
              <HourglassIcon boxSize="32px" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default HourglassGrid
