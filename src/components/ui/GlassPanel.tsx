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
    blur: "blur(6px)",
    gradient: "linear-gradient(180deg, rgba(70, 110, 180, 0.12) 0%, rgba(40, 70, 130, 0.04) 30%, transparent 60%, rgba(0, 0, 0, 0.18) 100%)",
  },
  medium: {
    bg: "bg.steelAlpha.80",
    shadow: "panel.medium",
    blur: "blur(10px)",
    gradient: "linear-gradient(180deg, rgba(80, 130, 200, 0.16) 0%, rgba(50, 90, 160, 0.06) 25%, transparent 55%, rgba(0, 0, 0, 0.22) 100%)",
  },
  strong: {
    bg: "bg.steelAlpha.90",
    shadow: "panel.strong",
    blur: "blur(14px)",
    gradient: "linear-gradient(180deg, rgba(90, 140, 220, 0.18) 0%, rgba(55, 100, 180, 0.07) 20%, transparent 50%, rgba(0, 0, 0, 0.25) 100%)",
  },
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, bg, border, borderColor, borderRadius, disabled, as, elevation = "medium", isolation: _isolation, ...props }, ref) => {
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
        backdropFilter={elevationStyle.blur}
        position="relative"
        isolation="isolate"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: borderRadius || "4px",
          background: elevationStyle.gradient,
          pointerEvents: "none",
          zIndex: -1,
        }}
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
