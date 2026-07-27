import { defineConfig } from "@chakra-ui/react"

export const globalCssConfig = defineConfig({
  globalCss: {
    "html, body": {
      height: "100%",
      margin: 0,
      overflow: "hidden",
      background: "bg.dark",
    },
    "#root": {
      height: "100%",
      overflow: "hidden",
    },
  },
})
