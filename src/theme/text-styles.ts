import { defineConfig } from "@chakra-ui/react"

export const textStyleConfig = defineConfig({
  theme: {
    textStyles: {
      heading: {
        description: "Main heading text style",
        value: {
          fontSize: { base: "2xl", md: "3xl", lg: "4xl" },
          fontWeight: "bold",
          lineHeight: "1.2",
          letterSpacing: "tight",
        },
      },
      subtitle: {
        description: "Subtitle text style",
        value: {
          fontSize: { base: "lg", md: "xl", lg: "2xl" },
          fontWeight: "medium",
          lineHeight: "1.4",
          color: "text.secondary",
        },
      },
      body: {
        description: "Body text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          lineHeight: "1.6",
        },
      },
      buttonLabel: {
        description: "Floating button label text style",
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
          letterSpacing: "0.5px",
          textTransform: "uppercase",
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
      navItem: {
        description: "Navigation item text style",
        value: {
          fontSize: "md",
          fontWeight: "medium",
          letterSpacing: "normal",
          textTransform: "uppercase",
        },
      },
      navItemActive: {
        description: "Active navigation item text style",
        value: {
          fontSize: "md",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        },
      },
      playerName: {
        description: "Player name text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          fontWeight: "bold",
          lineHeight: "1.6",
        },
      },
      playerRole: {
        description: "Player role text style",
        value: {
          fontSize: "sm",
          lineHeight: "1.6",
        },
      },
      projectTitle: {
        description: "Project card title text style",
        value: {
          fontSize: "xl",
          fontWeight: "bold",
          lineHeight: "1.2",
        },
      },
      speakerLabel: {
        description: "Dialogue box speaker label text style",
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
      smallTextBold: {
        description: "Small text with bold weight",
        value: {
          fontSize: "xs",
          fontWeight: "bold",
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
