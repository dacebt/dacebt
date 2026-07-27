import type { SystemStyleObject } from "@chakra-ui/react"

export const compactActionStyles = {
  px: 2,
  py: 1,
  h: "auto",
  minW: "auto",
  bg: "bg.dark",
  border: "1px solid",
  borderColor: "border.inner",
  borderRadius: "sm",
  color: "accent.teal",
  textStyle: "badgeText",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.2s ease",
  _hover: {
    bg: "bg.steel",
    borderColor: "accent.teal",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "accent.teal",
    outlineOffset: "2px",
  },
} as const satisfies SystemStyleObject
