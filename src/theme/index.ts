import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { colorConfig } from "./colors"
import { globalCssConfig } from "./global-css"
import { layoutConfig } from "./layout"
import { linkRecipe } from "./link"
import { semanticColorConfig } from "./semantic-colors"
import { shadowConfig } from "./shadows"
import { textStyleConfig } from "./text-styles"

const recipeConfig = defineConfig({
  theme: {
    recipes: {
      link: linkRecipe,
    },
  },
})

const system = createSystem(
  defaultConfig,
  globalCssConfig,
  layoutConfig,
  colorConfig,
  shadowConfig,
  semanticColorConfig,
  textStyleConfig,
  recipeConfig,
)

export default system
