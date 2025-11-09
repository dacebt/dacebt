import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        // Custom font families will be added here
        // Example:
        // heading: { value: "Inter, sans-serif" },
        // body: { value: "Inter, sans-serif" },
        // mono: { value: "JetBrains Mono, monospace" },
      },
      colors: {
        bg: {
          dark: { value: "#0a0a0a" },
          steel: { value: "#1D2126" },
          darkAlpha: {
            95: { value: "rgba(10, 10, 10, 0.95)" },
          },
          steelAlpha: {
            60: { value: "rgba(29, 33, 38, 0.6)" },
            80: { value: "rgba(29, 33, 38, 0.8)" },
            90: { value: "rgba(29, 33, 38, 0.9)" },
          },
        },
        border: {
          inner: { value: "#4B5663" },
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
            60: { value: "rgba(91, 192, 190, 0.6)" },
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
          muted: { value: "#64748B" },
          secondaryAlpha: {
            90: { value: "rgba(148, 163, 184, 0.9)" },
          },
        },
        // Alpha variants for opacity values
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
      },
    },
    semanticTokens: {
      colors: {
        "bg.overlay.dark": {
          value: "{colors.bg.darkAlpha.95}",
        },
        "bg.overlay.steel": {
          value: "{colors.bg.steelAlpha.90}",
        },
        "glow.teal.weak": {
          value: "{colors.accent.tealAlpha.10}",
        },
        "glow.teal.medium": {
          value: "{colors.accent.tealAlpha.15}",
        },
        "glow.teal.strong": {
          value: "{colors.accent.tealAlpha.30}",
        },
        "glow.green.weak": {
          value: "{colors.accent.greenAlpha.25}",
        },
        "glow.green.medium": {
          value: "{colors.accent.greenAlpha.30}",
        },
        "glow.green.strong": {
          value: "{colors.accent.greenAlpha.40}",
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
      },
    },
    // Text styles will be defined here
    textStyles: {
      // Custom text styles will be added here
      // Example:
      // heading: {
      //   description: "Main heading text style",
      //   value: {
      //     fontFamily: "heading",
      //     fontWeight: "bold",
      //     fontSize: "2xl",
      //     lineHeight: "1.2",
      //   },
      // },
      // body: {
      //   description: "Body text style",
      //   value: {
      //     fontFamily: "body",
      //     fontSize: "md",
      //     lineHeight: "1.6",
      //   },
      // },
      // mono: {
      //   description: "Monospace text style",
      //   value: {
      //     fontFamily: "mono",
      //     fontSize: "sm",
      //   },
      // },
      buttonLabel: {
        description: "Floating button label text style",
        value: {
          fontSize: "md",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          textAlign: "center",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)", // black.alpha.50
        },
      },
    },
  },
})

export default system
