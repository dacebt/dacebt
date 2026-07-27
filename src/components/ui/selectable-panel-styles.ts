import type { SystemStyleObject } from "@chakra-ui/react"

export const selectablePanelStyles = {
  panel: {
    color: "text.primary",
  },
  iconFrame: {
    w: "40px",
    h: "40px",
    borderRadius: "md",
    bg: "accent.tealAlpha.10",
    border: "1px solid",
    borderColor: "accent.tealAlpha.20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    w: "8px",
    h: "8px",
    borderRadius: "full",
    bg: "accent.teal",
    opacity: 0.8,
  },
  label: {
    textStyle: "selectableLabel",
    textAlign: "center",
  },
} as const satisfies Record<string, SystemStyleObject>
