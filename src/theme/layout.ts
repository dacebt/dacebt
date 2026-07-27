import { defineConfig } from "@chakra-ui/react"

export const layoutConfig = defineConfig({
  theme: {
    tokens: {
      breakpoints: {
        sm: { value: "640px" },
        md: { value: "768px" },
        lg: { value: "1024px" },
        xl: { value: "1280px" },
        "2xl": { value: "1536px" },
      },
      spacing: {
        container: {
          sm: { value: "640px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1280px" },
          "2xl": { value: "1536px" },
        },
        sidebar: {
          base: { value: "100%" },
          md: { value: "280px" },
        },
      },
      fonts: {
        body: { value: "system-ui, -apple-system, sans-serif" },
      },
    },
  },
})
