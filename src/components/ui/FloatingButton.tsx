import { Box } from "@chakra-ui/react"
import GlassPanel from "./GlassPanel"
import { getAnimation } from "../../utils/motion"

interface FloatingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  height?: string | number
  width?: string | number
  animationDelay?: number
  index?: number
  density?: "comfortable" | "tight"
}

export default function FloatingButton({
  children,
  onClick,
  size = "lg",
  disabled = false,
  height,
  width = "100%",
  animationDelay,
  index = 0,
  density = "comfortable",
}: FloatingButtonProps) {
  const densityConfig = {
    comfortable: { p: { base: 4, md: 4 }, gap: 3 },
    tight: { p: { base: 2, md: 3 }, gap: 2 },
  }
  
  const sizeConfig = {
    sm: { h: height || "80px" },
    md: { h: height || "100px" },
    lg: { h: height || "120px" },
  }
  
  const densityStyle = densityConfig[density]

  const config = sizeConfig[size]

  return (
    <GlassPanel
      as="button"
      onClick={onClick}
      disabled={disabled}
      role="surface"
      {...config}
      p={densityStyle.p}
      w={width}
      color="text.primary"
      position="relative"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? 0.6 : 1}
      _hover={
        !disabled
          ? {
              borderColor: "accent.teal",
              transform: density === "tight" ? "translateY(-2px)" : "translateY(-4px)",
            }
          : undefined
      }
      _active={
        !disabled
          ? {
              transform: density === "tight" ? "translateY(-1px)" : "translateY(-2px)",
            }
          : undefined
      }
      display="flex"
      flexDirection="column"
      gap={densityStyle.gap}
      animation={getAnimation(`float ${6 + index}s ease-in-out infinite`)}
      style={{
        animationDelay: `${(animationDelay || 0) + index * 0.3}s`,
      }}
    >
      {/* Button content */}
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        gap={density === "tight" ? 1.5 : 2}
      >
        {children}
      </Box>
    </GlassPanel>
  )
}
