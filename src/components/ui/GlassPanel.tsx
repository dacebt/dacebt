import React from "react"
import {
  Box,
  type BoxProps,
} from "@chakra-ui/react"
import {
  glassPanelStyles,
  type GlassPanelSurface,
} from "./glass-panel-styles"

type GlassPanelOwnedProperty =
  | "_before"
  | "backdropBlur"
  | "backdropFilter"
  | "background"
  | "backgroundColor"
  | "backgroundImage"
  | "bg"
  | "bgColor"
  | "bgImage"
  | "border"
  | "borderBlock"
  | "borderBlockColor"
  | "borderBlockEnd"
  | "borderBlockEndColor"
  | "borderBlockEndStyle"
  | "borderBlockEndWidth"
  | "borderBlockStart"
  | "borderBlockStartColor"
  | "borderBlockStartStyle"
  | "borderBlockStartWidth"
  | "borderBlockStyle"
  | "borderBlockWidth"
  | "borderBottom"
  | "borderBottomColor"
  | "borderBottomLeftRadius"
  | "borderBottomRadius"
  | "borderBottomRightRadius"
  | "borderBottomStyle"
  | "borderBottomWidth"
  | "borderColor"
  | "borderEnd"
  | "borderEndColor"
  | "borderEndRadius"
  | "borderEndStyle"
  | "borderEndWidth"
  | "borderInline"
  | "borderInlineColor"
  | "borderInlineEnd"
  | "borderInlineEndColor"
  | "borderInlineEndStyle"
  | "borderInlineEndWidth"
  | "borderInlineStart"
  | "borderInlineStartColor"
  | "borderInlineStartStyle"
  | "borderInlineStartWidth"
  | "borderInlineStyle"
  | "borderInlineWidth"
  | "borderLeft"
  | "borderLeftColor"
  | "borderLeftRadius"
  | "borderLeftStyle"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRight"
  | "borderRightColor"
  | "borderRightRadius"
  | "borderRightStyle"
  | "borderRightWidth"
  | "borderStart"
  | "borderStartColor"
  | "borderStartRadius"
  | "borderStartStyle"
  | "borderStartWidth"
  | "borderStyle"
  | "borderTop"
  | "borderTopColor"
  | "borderTopLeftRadius"
  | "borderTopRadius"
  | "borderTopRightRadius"
  | "borderTopStyle"
  | "borderTopWidth"
  | "borderWidth"
  | "borderX"
  | "borderY"
  | "boxShadow"
  | "isolation"
  | "rounded"
  | "roundedBottom"
  | "roundedBottomLeft"
  | "roundedBottomRight"
  | "roundedEnd"
  | "roundedLeft"
  | "roundedRight"
  | "roundedStart"
  | "roundedTop"
  | "roundedTopLeft"
  | "roundedTopRight"
  | "shadow"

interface GlassPanelProps extends Omit<BoxProps, GlassPanelOwnedProperty> {
  children: React.ReactNode
  disabled?: boolean
  surface: GlassPanelSurface
  cornerAccents?: boolean
}

const cornerBracketPositions = [
  { top: "6px", left: "6px", borderTop: "1.5px solid", borderLeft: "1.5px solid" },
  { top: "6px", right: "6px", borderTop: "1.5px solid", borderRight: "1.5px solid" },
  { bottom: "6px", left: "6px", borderBottom: "1.5px solid", borderLeft: "1.5px solid" },
  { bottom: "6px", right: "6px", borderBottom: "1.5px solid", borderRight: "1.5px solid" },
] as const

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, disabled, as, surface, cornerAccents = true, ...props }, ref) => {
    const boxProps = as === "button" && disabled !== undefined ? { disabled } : {}
    const surfaceStyle = glassPanelStyles.surface[surface]

    return (
      <Box
        ref={ref}
        as={as}
        {...glassPanelStyles.base}
        {...surfaceStyle}
        _before={{
          ...glassPanelStyles.before,
          ...surfaceStyle._before,
          borderRadius: glassPanelStyles.base.borderRadius,
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
