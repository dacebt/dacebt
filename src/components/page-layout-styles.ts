import type { SystemStyleObject } from "@chakra-ui/react"

export const pageLayoutStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
    w: "100%",
    maxW: "1200px",
    mx: "auto",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    textAlign: "center",
  },
  title: {
    textStyle: "pageTitle",
    color: "text.primary",
    bg: "gradient.pageTitle",
    bgClip: "text",
  },
  subtitle: {
    textStyle: "pageSubtitle",
    maxW: "400px",
  },
  content: {
    w: "100%",
    display: "flex",
  },
} as const satisfies Record<string, SystemStyleObject>
