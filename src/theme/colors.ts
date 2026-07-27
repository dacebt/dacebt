import { defineConfig } from "@chakra-ui/react"

export const colorConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
          dark: { value: "#0a0a0a" },
          steel: { value: "#1D2126" },
          darkAlpha: {
            30: { value: "rgba(0, 0, 0, 0.3)" },
            80: { value: "rgba(0, 0, 0, 0.8)" },
            95: { value: "rgba(10, 10, 10, 0.95)" },
          },
          steelAlpha: {
            60: { value: "rgba(18, 32, 60, 0.72)" },
            80: { value: "rgba(22, 40, 75, 0.84)" },
            90: { value: "rgba(28, 50, 92, 0.92)" },
          },
        },
        border: {
          inner: { value: "#5d7a94" },
          outer: { value: "#0E1013" },
        },
        accent: {
          teal: { value: "#5BC0BE" },
          green: { value: "#10B981" },
          steel: { value: "#64748B" },
          steelLight: { value: "#94A3B8" },
          tealAlpha: {
            2: { value: "rgba(91, 192, 190, 0.02)" },
            3: { value: "rgba(91, 192, 190, 0.03)" },
            5: { value: "rgba(91, 192, 190, 0.05)" },
            6: { value: "rgba(91, 192, 190, 0.06)" },
            8: { value: "rgba(91, 192, 190, 0.08)" },
            10: { value: "rgba(91, 192, 190, 0.1)" },
            12: { value: "rgba(91, 192, 190, 0.12)" },
            15: { value: "rgba(91, 192, 190, 0.15)" },
            18: { value: "rgba(91, 192, 190, 0.18)" },
            20: { value: "rgba(91, 192, 190, 0.2)" },
            25: { value: "rgba(91, 192, 190, 0.25)" },
            30: { value: "rgba(91, 192, 190, 0.3)" },
            40: { value: "rgba(91, 192, 190, 0.4)" },
            50: { value: "rgba(91, 192, 190, 0.5)" },
            60: { value: "rgba(91, 192, 190, 0.6)" },
            70: { value: "rgba(91, 192, 190, 0.7)" },
            80: { value: "rgba(91, 192, 190, 0.8)" },
            100: { value: "rgba(91, 192, 190, 1)" },
          },
          greenAlpha: {
            5: { value: "rgba(16, 185, 129, 0.05)" },
            25: { value: "rgba(16, 185, 129, 0.25)" },
            30: { value: "rgba(16, 185, 129, 0.3)" },
            40: { value: "rgba(16, 185, 129, 0.4)" },
            50: { value: "rgba(16, 185, 129, 0.5)" },
          },
        },
        gradient: {
          blue: { value: "#3B82F6" },
          purple: { value: "#8B5CF6" },
          steel: { value: "#475569" },
          steelLight: { value: "#64748B" },
        },
        text: {
          primary: { value: "#E2E8F0" },
          secondary: { value: "#94A3B8" },
          muted: { value: "#9ba6bb" },
          secondaryAlpha: {
            90: { value: "rgba(148, 163, 184, 0.9)" },
          },
        },
        white: {
          alpha: {
            5: { value: "rgba(255, 255, 255, 0.05)" },
            10: { value: "rgba(255, 255, 255, 0.1)" },
            15: { value: "rgba(255, 255, 255, 0.15)" },
            20: { value: "rgba(255, 255, 255, 0.2)" },
            30: { value: "rgba(255, 255, 255, 0.3)" },
            40: { value: "rgba(255, 255, 255, 0.4)" },
          },
        },
        black: {
          alpha: {
            10: { value: "rgba(0, 0, 0, 0.1)" },
            20: { value: "rgba(0, 0, 0, 0.2)" },
            30: { value: "rgba(0, 0, 0, 0.3)" },
            40: { value: "rgba(0, 0, 0, 0.4)" },
            50: { value: "rgba(0, 0, 0, 0.5)" },
            60: { value: "rgba(0, 0, 0, 0.6)" },
            80: { value: "rgba(0, 0, 0, 0.8)" },
          },
        },
        glow: {
          teal: {
            weak: { value: "{colors.accent.tealAlpha.10}" },
            medium: { value: "{colors.accent.tealAlpha.15}" },
            strong: { value: "{colors.accent.tealAlpha.30}" },
          },
          green: {
            weak: { value: "{colors.accent.greenAlpha.25}" },
            medium: { value: "{colors.accent.greenAlpha.30}" },
            strong: { value: "{colors.accent.greenAlpha.40}" },
          },
        },
      },
    },
  },
})
