import type { SystemStyleObject } from "@chakra-ui/react"

export const compactActionStyles = {
  px: 2,
  py: 1,
  h: "auto",
  minW: "auto",
  border: "1px solid",
  borderRadius: "sm",
  textStyle: "badgeText",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.2s ease",
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.teal",
    outlineOffset: "2px",
  },
  _disabled: {
    cursor: "not-allowed",
    opacity: 0.6,
  },
} as const satisfies SystemStyleObject

export const compactActionEmphasisStyles = {
  neutral: {
    bg: "bg.dark",
    borderColor: "border.inner",
    color: "accent.teal",
    _hover: {
      bg: "bg.steel",
      borderColor: "accent.teal",
    },
  },
  subtle: {
    bg: "accent.tealAlpha.10",
    borderColor: "border.inner",
    color: "text.secondary",
    _hover: {
      bg: "accent.tealAlpha.20",
      borderColor: "accent.teal",
      color: "text.primary",
    },
  },
  primary: {
    bg: "accent.tealAlpha.15",
    borderColor: "accent.teal",
    color: "text.primary",
    _hover: {
      bg: "accent.tealAlpha.25",
    },
  },
} as const satisfies Record<string, SystemStyleObject>
