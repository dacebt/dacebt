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
    gradient: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%)",
  },
  medium: {
    bg: "bg.steelAlpha.80",
    shadow: "panel.medium",
    blur: "blur(10px)",
    gradient: "linear-gradient(180deg, rgba(91,192,190,0.05) 0%, transparent 30%, rgba(0,0,0,0.1) 100%)",
  },
  strong: {
    bg: "bg.steelAlpha.90",
    shadow: "panel.strong",
    blur: "blur(14px)",
    gradient: "linear-gradient(180deg, rgba(91,192,190,0.06) 0%, transparent 25%, rgba(0,0,0,0.15) 100%)",
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
        borderColor={borderColor || "#3a4858"}
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
