import React from "react"
import {
  Box,
  type BoxProps,
} from "@chakra-ui/react"
import {
  glassPanelStyles,
  type GlassPanelElevation,
} from "./glass-panel-styles"

interface GlassPanelProps extends BoxProps {
  children: React.ReactNode
  disabled?: boolean
  elevation?: GlassPanelElevation
  cornerAccents?: boolean
}

const cornerBracketPositions = [
  { top: "6px", left: "6px", borderTop: "1.5px solid", borderLeft: "1.5px solid" },
  { top: "6px", right: "6px", borderTop: "1.5px solid", borderRight: "1.5px solid" },
  { bottom: "6px", left: "6px", borderBottom: "1.5px solid", borderLeft: "1.5px solid" },
  { bottom: "6px", right: "6px", borderBottom: "1.5px solid", borderRight: "1.5px solid" },
] as const

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, bg, border, borderColor, borderRadius, disabled, as, elevation = "medium", cornerAccents = true, isolation: _isolation, ...props }, ref) => {
    const boxProps = as === "button" && disabled !== undefined ? { disabled } : {}
    const elevationStyle = glassPanelStyles.elevation[elevation]

    return (
      <Box
        ref={ref}
        as={as}
        {...glassPanelStyles.base}
        {...elevationStyle}
        bg={bg || elevationStyle.bg}
        border={border || glassPanelStyles.base.border}
        borderColor={borderColor || glassPanelStyles.base.borderColor}
        borderRadius={borderRadius || glassPanelStyles.base.borderRadius}
        _before={{
          ...glassPanelStyles.before,
          ...elevationStyle._before,
          borderRadius: borderRadius || "4px",
        }}
        {...boxProps}
        {...props}
      >
        {cornerAccents &&
          cornerBracketPositions.map((pos, i) => (
            <Box
              key={i}
              {...glassPanelStyles.corner}
              {...pos}
            />
          ))}
        {children}
      </Box>
    )
  }
)

GlassPanel.displayName = "GlassPanel"

export default GlassPanel
