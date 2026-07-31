import { defineConfig } from "@chakra-ui/react"

export const semanticColorConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          overlay: {
            dark: { value: "{colors.bg.darkAlpha.80}" },
            steel: { value: "{colors.bg.steelAlpha.90}" },
          },
          modal: {
            control: { value: "{colors.bg.darkAlpha.30}" },
          },
        },
        surface: {
          shell: { value: "{colors.bg.steelAlpha.80}" },
          content: { value: "{colors.bg.steelAlpha.90}" },
          supporting: { value: "{colors.bg.steelAlpha.60}" },
          selectable: { value: "{colors.bg.steelAlpha.80}" },
          dialogue: { value: "{colors.bg.steelAlpha.80}" },
          modal: { value: "{colors.bg.steelAlpha.90}" },
        },
        modal: {
          depth: {
            strong: { value: "rgba(0, 0, 0, 0.6)" },
            medium: { value: "rgba(0, 0, 0, 0.4)" },
          },
          edge: { value: "rgba(255, 255, 255, 0.1)" },
        },
        projectCard: {
          control: { value: "rgba(40, 48, 57, 0.96)" },
          chip: { value: "rgba(10, 10, 10, 0.62)" },
          divider: { value: "rgba(93, 122, 148, 0.52)" },
          chipBorder: { value: "rgba(93, 122, 148, 0.70)" },
        },
        gradient: {
          panel: {
            subtle: {
              value: "linear-gradient(180deg, rgba(70, 110, 180, 0.12) 0%, rgba(40, 70, 130, 0.04) 30%, transparent 60%, rgba(0, 0, 0, 0.18) 100%)",
            },
            medium: {
              value: "linear-gradient(180deg, rgba(80, 130, 200, 0.16) 0%, rgba(50, 90, 160, 0.06) 25%, transparent 55%, rgba(0, 0, 0, 0.22) 100%)",
            },
            strong: {
              value: "linear-gradient(180deg, rgba(90, 140, 220, 0.18) 0%, rgba(55, 100, 180, 0.07) 20%, transparent 50%, rgba(0, 0, 0, 0.25) 100%)",
            },
          },
          projectCard: {
            primary: {
              value: "linear-gradient(180deg, rgba(91, 192, 190, 0.22), rgba(91, 192, 190, 0.08))",
            },
          },
          pageTitle: {
            value: "linear-gradient(135deg, {colors.text.primary} 0%, {colors.accent.teal} 100%)",
          },
        },
        "glow.teal.weak": {
          value: "{colors.glow.teal.weak}",
        },
        "glow.teal.medium": {
          value: "{colors.glow.teal.medium}",
        },
        "glow.teal.strong": {
          value: "{colors.glow.teal.strong}",
        },
        "glow.green.weak": {
          value: "{colors.glow.green.weak}",
        },
        "glow.green.medium": {
          value: "{colors.glow.green.medium}",
        },
        "glow.green.strong": {
          value: "{colors.glow.green.strong}",
        },
        "border.inner.glow": {
          value: "{colors.white.alpha.10}",
        },
        "shadow.layer.1": {
          value: "{colors.black.alpha.10}",
        },
        "shadow.layer.2": {
          value: "{colors.black.alpha.20}",
        },
        "shadow.layer.3": {
          value: "{colors.black.alpha.30}",
        },
        "shadow.layer.4": {
          value: "{colors.black.alpha.40}",
        },
        "shadow.dialogue.active": {
          value: "{colors.accent.greenAlpha.40}",
        },
        "shadow.dialogue.default": {
          value: "{colors.accent.greenAlpha.25}",
        },
        "glow.border.teal": {
          value: "{colors.accent.tealAlpha.30}",
        },
        "glow.border.green": {
          value: "{colors.accent.greenAlpha.30}",
        },
        "gradient.button.primary": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.8} 0%, {colors.bg.steelAlpha.60} 100%)",
        },
        "gradient.button.primaryHover": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.15} 0%, {colors.bg.steelAlpha.80} 100%)",
        },
        "gradient.dialogue.bg": {
          value: "linear-gradient(135deg, {colors.bg.darkAlpha.95} 0%, {colors.bg.steelAlpha.90} 100%)",
        },
        "gradient.background.decorative1": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.10} 0%, {colors.accent.tealAlpha.5} 100%)",
        },
        "gradient.background.decorative2": {
          value: "linear-gradient(45deg, {colors.accent.tealAlpha.8} 0%, {colors.accent.tealAlpha.3} 100%)",
        },
        "gradient.background.decorative3": {
          value: "linear-gradient(225deg, {colors.accent.tealAlpha.6} 0%, {colors.accent.tealAlpha.2} 100%)",
        },
      },
    },
  },
})
