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
        },
        border: {
          inner: { value: "#4B5663" },
          outer: { value: "#0E1013" },
        },
        accent: {
          teal: { value: "#5BC0BE" },
        },
        text: {
          primary: { value: "#E2E8F0" },
          secondary: { value: "#94A3B8" },
          muted: { value: "#aaa" },
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
    },
  },
})

export default system
