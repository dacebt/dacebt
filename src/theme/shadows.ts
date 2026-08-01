import { defineConfig } from "@chakra-ui/react"

export const shadowConfig = defineConfig({
  theme: {
    tokens: {
      shadows: {
        panel: {
          subtle: {
            value: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 0 16px rgba(60, 100, 160, 0.02), 0 0 0 1px #0a0c10, 0 0 0 2px rgba(58, 78, 96, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5)",
          },
          medium: {
            value: "inset 0 1px 0 0 rgba(255, 255, 255, 0.17), inset 0 0 24px rgba(60, 100, 160, 0.04), 0 0 0 1px #0a0c10, 0 0 0 2px rgba(58, 78, 96, 0.78), 0 6px 20px rgba(0, 0, 0, 0.55), 0 0 40px rgba(0, 0, 0, 0.2)",
          },
          strong: {
            value: "inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(60, 100, 160, 0.05), 0 0 0 1px #0a0c10, 0 0 0 2px rgba(58, 78, 96, 0.85), 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 0, 0, 0.25)",
          },
        },
        dialogueEntry: {
          default: {
            value: "0 8px 18px {colors.dialogueEntry.depth.default}, inset 0 1px 0 {colors.dialogueEntry.edge}",
          },
          current: {
            value: "0 11px 26px {colors.dialogueEntry.depth.current}, 0 0 22px {colors.accent.tealAlpha.8}, inset 0 1px 0 {colors.dialogueEntry.edge}",
          },
        },
        nav: {
          active: {
            value: "inset 0 1px 0 {colors.white.alpha.10}, 0 2px 8px {colors.accent.tealAlpha.15}",
          },
          activeHover: {
            value: "inset 0 1px 0 {colors.white.alpha.15}, 0 2px 12px {colors.accent.tealAlpha.25}",
          },
          inactiveHover: {
            value: "inset 0 1px 0 {colors.white.alpha.5}, 0 2px 6px {colors.black.alpha.10}",
          },
          indicator: {
            value: "0 0 12px {colors.accent.tealAlpha.100}, 0 0 6px {colors.accent.tealAlpha.60}",
          },
        },
        avatar: {
          frame: {
            value: "inset 0 0 0 2px var(--chakra-colors-white-alpha-15), inset 0 0 0 4px {colors.border.outer}, 0 0 0 2px {colors.border.outer}, 0 0 0 4px {colors.border.inner}, 0 2px 8px var(--chakra-colors-black-alpha-30), 0 4px 16px var(--chakra-colors-black-alpha-20)",
          },
        },
        button: {
          primaryHover: {
            value: "0 20px 40px {colors.accent.tealAlpha.15}, 0 8px 16px {colors.black.alpha.30}, inset 0 1px 0 {colors.white.alpha.10}, inset 0 -1px 0 {colors.black.alpha.10}",
          },
          closeHover: {
            value: "0 8px 25px {colors.accent.tealAlpha.30}",
          },
        },
        modal: {
          content: {
            value: "0 20px 60px {colors.modal.depth.strong}, 0 8px 25px {colors.modal.depth.medium}, 0 0 40px {colors.accent.tealAlpha.15}, inset 0 0 0 1px {colors.modal.edge}",
          },
        },
        bolt: {
          frame: {
            value: "inset 0 1px 2px {colors.white.alpha.40}, inset 0 -1px 2px {colors.black.alpha.60}, 0 2px 4px {colors.black.alpha.30}, 0 0 0 1px {colors.black.alpha.20}",
          },
        },
      },
    },
  },
})
