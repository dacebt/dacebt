import type { DialogBodyProps, SystemStyleObject } from "@chakra-ui/react"

interface ModalShellStyles {
  backdrop: SystemStyleObject
  positioner: SystemStyleObject
  content: SystemStyleObject
  header: SystemStyleObject
  title: SystemStyleObject
  closeControl: SystemStyleObject
  body: DialogBodyProps
  scrollContainment: SystemStyleObject
  footer: SystemStyleObject
}

export const modalShellStyles = {
  backdrop: {
    bg: "bg.overlay.dark",
    backdropFilter: "blur(8px)",
    zIndex: 2000,
    animation: "fadeIn 0.2s ease-out",
  },
  positioner: {
    zIndex: 2001,
    p: { base: 4, md: 6 },
  },
  content: {
    w: "90vw",
    maxW: "800px",
    maxH: "85vh",
    overflow: "hidden",
    animation: "fadeIn 0.2s ease-out",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    p: 4,
    borderBottom: "1px solid",
    borderColor: "border.inner",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    textStyle: "modalTitle",
    color: "text.primary",
  },
  closeControl: {
    color: "text.muted",
    bg: "bg.modal.control",
    borderRadius: "full",
    _hover: {
      color: "text.primary",
      bg: "accent.tealAlpha.20",
    },
    border: "1px solid",
    borderColor: "border.inner",
  },
  body: {
    flex: 1,
    minH: 0,
    overflowY: "auto",
    p: 5,
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.teal",
      outlineOffset: "-2px",
    },
    css: {
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "var(--chakra-colors-accent-teal-alpha-30)",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "var(--chakra-colors-accent-teal-alpha-50)",
      },
    },
  },
  scrollContainment: {
    overscrollBehaviorY: "contain",
  },
  footer: {
    p: 3,
    borderTop: "1px solid",
    borderColor: "border.inner",
    textAlign: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
} as const satisfies ModalShellStyles
