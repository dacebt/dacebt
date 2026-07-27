import type { SystemStyleObject } from "@chakra-ui/react"

export type GlassPanelElevation = "subtle" | "medium" | "strong"

export const glassPanelStyles = {
  base: {
    border: "1px solid",
    borderColor: "border.inner",
    borderRadius: "4px",
    position: "relative",
    isolation: "isolate",
  },
  elevation: {
    subtle: {
      bg: "bg.steelAlpha.60",
      boxShadow: "panel.subtle",
      backdropFilter: "blur(6px)",
      _before: {
        background: "gradient.panel.subtle",
      },
    },
    medium: {
      bg: "bg.steelAlpha.80",
      boxShadow: "panel.medium",
      backdropFilter: "blur(10px)",
      _before: {
        background: "gradient.panel.medium",
      },
    },
    strong: {
      bg: "bg.steelAlpha.90",
      boxShadow: "panel.strong",
      backdropFilter: "blur(14px)",
      _before: {
        background: "gradient.panel.strong",
      },
    },
  },
  before: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: -1,
  },
  corner: {
    position: "absolute",
    w: "14px",
    h: "14px",
    borderColor: "accent.teal",
    pointerEvents: "none",
    zIndex: 2,
  },
} as const satisfies {
  base: SystemStyleObject
  elevation: Record<GlassPanelElevation, SystemStyleObject>
  before: SystemStyleObject
  corner: SystemStyleObject
}
