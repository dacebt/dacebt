import { Box, type BoxProps } from "@chakra-ui/react"

interface GlassPanelProps extends BoxProps {
  children: React.ReactNode
  disabled?: boolean
  elevation?: "subtle" | "medium" | "strong"
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

export default function GlassPanel({ children, bg, border, borderColor, borderRadius, backdropFilter, disabled, as, elevation = "medium", ...props }: GlassPanelProps) {
  const boxProps = as === "button" && disabled !== undefined ? { disabled } : {}
  const elevationStyle = elevationConfig[elevation]
  
  return (
    <Box
      as={as}
      bg={bg || elevationStyle.bg}
      border={border || "1px solid"}
      borderColor={borderColor || "border.inner"}
      borderRadius={borderRadius || "xl"}
      backdropFilter={backdropFilter || "blur(10px)"}
      {...boxProps}
      {...props}
    >
      {children}
    </Box>
  )
}

