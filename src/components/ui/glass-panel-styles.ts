import type { SystemStyleObject } from "@chakra-ui/react"

export type GlassPanelSurface =
  | "shell"
  | "content"
  | "supporting"
  | "selectable"
  | "dialogue"
  | "modal"

export const glassPanelStyles = {
  base: {
    border: "1px solid",
    borderColor: "border.inner",
    borderRadius: "4px",
    position: "relative",
    isolation: "isolate",
  },
  surface: {
    shell: {
      bg: "surface.shell",
      boxShadow: "panel.medium",
      backdropFilter: "blur(10px)",
      _before: {
        background: "gradient.panel.medium",
      },
    },
    content: {
      bg: "surface.content",
      boxShadow: "panel.strong",
      backdropFilter: "blur(14px)",
      _before: {
        background: "gradient.panel.strong",
      },
    },
    supporting: {
      bg: "surface.supporting",
      boxShadow: "panel.subtle",
      backdropFilter: "blur(6px)",
      _before: {
        background: "gradient.panel.subtle",
      },
    },
    selectable: {
      bg: "surface.selectable",
      boxShadow: "panel.medium",
      backdropFilter: "blur(10px)",
      _before: {
        background: "gradient.panel.medium",
      },
    },
    dialogue: {
      bg: "surface.dialogue",
      boxShadow: "dialogue.default",
      backdropFilter: "blur(10px)",
      _before: {
        background: "gradient.panel.medium",
      },
    },
    modal: {
      bg: "surface.modal",
      border: "2px solid",
      borderColor: "accent.tealAlpha.40",
      boxShadow: "modal.content",
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
  surface: Record<GlassPanelSurface, SystemStyleObject>
  before: SystemStyleObject
  corner: SystemStyleObject
}
