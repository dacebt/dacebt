import { defineConfig } from "@chakra-ui/react"

export const textStyleConfig = defineConfig({
  theme: {
    textStyles: {
      selectableLabel: {
        description: "Selectable panel label text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          textAlign: "center",
          textShadow: "0 1px 2px var(--chakra-colors-black-alpha-50)",
        },
      },
      dialogue: {
        description: "Dialogue box text style",
        value: {
          fontSize: { base: "sm", md: "lg" },
          fontWeight: "500",
          lineHeight: "1.6",
          letterSpacing: "0.2px",
        },
      },
      pageTitle: {
        description: "Page heading text style",
        value: {
          fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
          fontWeight: "bold",
          letterSpacing: "normal",
          textTransform: "none",
          lineHeight: "1.2",
        },
      },
      pageSubtitle: {
        description: "Page subtitle text style",
        value: {
          fontSize: { base: "md", md: "lg" },
          color: "text.muted",
          lineHeight: "1.6",
        },
      },
      panelTitle: {
        description: "Content panel title text style",
        value: {
          fontSize: { base: "md", md: "lg" },
          fontWeight: "bold",
          lineHeight: "1.2",
        },
      },
      supportingText: {
        description: "Supporting content text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          color: "text.secondary",
          lineHeight: "1.5",
        },
      },
      modalTitle: {
        description: "Modal heading text style",
        value: {
          fontSize: { base: "xl", md: "2xl" },
          fontWeight: "bold",
          letterSpacing: "normal",
          lineHeight: "1.2",
        },
      },
      modalBody: {
        description: "Modal content text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          fontWeight: "500",
          lineHeight: "1.6",
        },
      },
      sectionLabel: {
        description: "Panel section label text style",
        value: {
          fontSize: "sm",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
      smallText: {
        description: "Base small text style",
        value: {
          fontSize: "xs",
          lineHeight: "1.3",
        },
      },
      smallTextMedium: {
        description: "Small text with medium weight",
        value: {
          fontSize: "xs",
          fontWeight: "medium",
        },
      },
      badgeText: {
        description: "Badge label text style",
        value: {
          fontSize: "xs",
          fontWeight: "semibold",
        },
      },
      progressText: {
        description: "Progress indicator text style",
        value: {
          fontSize: "sm",
          fontWeight: "medium",
        },
      },
    },
  },
})
