import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    // Fonts will be defined here
    tokens: {
      fonts: {
        // Custom font families will be added here
        // Example:
        // heading: { value: "Inter, sans-serif" },
        // body: { value: "Inter, sans-serif" },
        // mono: { value: "JetBrains Mono, monospace" },
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
    // Other theme extensions will go here
    // colors: {
    //   // Custom color palette will be added here
    // },
  },
})

export default system
