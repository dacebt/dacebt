import type { SystemStyleObject } from "@chakra-ui/react"
import { glassPanelStyles } from "./glass-panel-styles"
import { selectablePanelStyles } from "./selectable-panel-styles"

const selectableSurfaceStyles = glassPanelStyles.surface.selectable

export const selectableControlStyles = {
  root: {
    ...glassPanelStyles.base,
    ...selectableSurfaceStyles,
    ...selectablePanelStyles.panel,
    _before: {
      ...glassPanelStyles.before,
      ...selectableSurfaceStyles._before,
      borderRadius: glassPanelStyles.base.borderRadius,
    },
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.teal",
      outlineOffset: "2px",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    h: "100%",
  },
  hoverComfortable: {
    borderColor: "accent.teal",
    transform: "translateY(-4px)",
  },
  hoverTight: {
    borderColor: "accent.teal",
    transform: "translateY(-2px)",
  },
  activeComfortable: {
    transform: "translateY(-2px)",
  },
  activeTight: {
    transform: "translateY(-1px)",
  },
} as const satisfies Record<string, SystemStyleObject>
