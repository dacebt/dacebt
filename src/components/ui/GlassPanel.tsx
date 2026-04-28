import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

interface GlassPanelProps extends BoxProps {
  children: React.ReactNode
  disabled?: boolean
  elevation?: "subtle" | "medium" | "strong"
}

const elevationConfig = {
  subtle: {
    bg: "bg.steelAlpha.60",
    shadow: "panel.subtle",
  },
  medium: {
    bg: "bg.steelAlpha.80",
    shadow: "panel.medium",
  },
  strong: {
    bg: "bg.steelAlpha.90",
    shadow: "panel.strong",
  },
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, bg, border, borderColor, borderRadius, disabled, as, elevation = "medium", ...props }, ref) => {
    const boxProps = as === "button" && disabled !== undefined ? { disabled } : {}
    const elevationStyle = elevationConfig[elevation]

    return (
      <Box
        ref={ref}
        as={as}
        bg={bg || elevationStyle.bg}
        border={border || "1px solid"}
        borderColor={borderColor || "border.inner"}
        borderRadius={borderRadius || "4px"}
        boxShadow={elevationStyle.shadow}
        position="relative"
        {...boxProps}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

GlassPanel.displayName = "GlassPanel"

export default GlassPanel
