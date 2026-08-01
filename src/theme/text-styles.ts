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
      projectCardEyebrow: {
        description: "Project card personal-work eyebrow text style",
        value: {
          fontSize: "0.7rem",
          fontWeight: "600",
          lineHeight: "1.3",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        },
      },
      projectCardTitle: {
        description: "Project card title text style",
        value: {
          fontSize: "1.2rem",
          fontWeight: "600",
          lineHeight: "1.2",
          letterSpacing: "0.01em",
        },
      },
      projectCardSummary: {
        description: "Project card summary text style",
        value: {
          fontSize: "0.95rem",
          fontWeight: "normal",
          lineHeight: "1.55",
          color: "text.primary",
        },
      },
      projectCardChip: {
        description: "Project card technology chip text style",
        value: {
          fontSize: "0.76rem",
          fontWeight: "normal",
          lineHeight: "1.3",
        },
      },
      projectCardAction: {
        description: "Project card action text style",
        value: {
          fontSize: "0.76rem",
          fontWeight: "600",
          lineHeight: "1.3",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
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
    },
  },
})
