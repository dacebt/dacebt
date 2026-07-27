import type { DialogBodyProps, SystemStyleObject } from "@chakra-ui/react"

interface ModalShellStyles {
  backdrop: SystemStyleObject
  positioner: SystemStyleObject
  content: SystemStyleObject
  header: SystemStyleObject
  title: SystemStyleObject
  closeControl: SystemStyleObject
  body: DialogBodyProps
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
    border: "2px solid",
    borderColor: "accent.tealAlpha.40",
    boxShadow: "modal.content",
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
    textStyle: "pageTitle",
    color: "text.primary",
    fontSize: { base: "xl", md: "2xl" },
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
    overscrollBehaviorY: "contain",
    p: 5,
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
} as const satisfies ModalShellStyles
