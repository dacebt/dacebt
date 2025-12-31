import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

interface GlassPanelProps extends BoxProps {
  children: React.ReactNode
  disabled?: boolean
  elevation?: "subtle" | "medium" | "strong"
  role?: "container" | "surface"
}

const elevationConfig = {
  subtle: {
    bg: "bg.steelAlpha.60",
  },
  medium: {
    bg: "bg.steelAlpha.80",
  },
  strong: {
    bg: "bg.steelAlpha.90",
  },
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, bg, border, borderColor, borderRadius, backdropFilter, disabled, as, elevation = "medium", role = "surface", ...props }, ref) => {
  const boxProps = as === "button" && disabled !== undefined ? { disabled } : {}
  const elevationStyle = elevationConfig[elevation]
  const isSurface = role === "surface"
  
    return (
      <Box
        ref={ref}
        as={as}
        bg={bg || elevationStyle.bg}
      border={border || "1px solid"}
      borderColor={borderColor || "border.inner"}
      borderRadius={borderRadius || "xl"}
      backdropFilter={backdropFilter || "blur(10px)"}
      position="relative"
      _before={isSurface ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: borderRadius || "xl",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0,
      } : undefined}
      _after={isSurface ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: borderRadius || "xl",
        background: "radial-gradient(circle at top left, transparent 0%, rgba(0, 0, 0, 0.1) 100%)",
        pointerEvents: "none",
        zIndex: 0,
      } : undefined}
      {...boxProps}
      {...props}
    >
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
    )
  }
)

GlassPanel.displayName = "GlassPanel"

export default GlassPanel

