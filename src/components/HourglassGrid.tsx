import React from "react"
import { Box } from "@chakra-ui/react"

const GRID_COLUMNS = 13
const GRID_ROWS = 13
const TOTAL_CELLS = GRID_COLUMNS * GRID_ROWS
const ANIMATED_CELL_INTERVAL = 4

// Precompute cell indices once to avoid recreating large arrays on each render
const hourglassCellIndices = Array.from({ length: TOTAL_CELLS }, (_, index) => index)

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

const HourglassGridComponent: React.FC = () => {
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
        gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
        gridTemplateRows={`repeat(${GRID_ROWS}, 1fr)`}
        gap="2rem"
        style={{ animation: "infiniteScroll 40s linear infinite" }}
      >
        {hourglassCellIndices.map((index) => {
          const isAnimated = index % ANIMATED_CELL_INTERVAL === 0

          return (
            <Box key={index} display="flex" alignItems="center" justifyContent="center" opacity="0.3">
              <Box
                color="text.muted"
                style={
                  isAnimated
                    ? { animation: `pulseScale 4s ease-in-out ${index * 0.15}s infinite` }
                    : undefined
                }
              >
                <HourglassIcon boxSize="32px" />
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

const HourglassGrid = React.memo(HourglassGridComponent)

export default HourglassGrid
