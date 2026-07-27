import { defineRecipe } from "@chakra-ui/react"

export const linkRecipe = defineRecipe({
  base: {
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.teal",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      route: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        w: "46px",
        h: "46px",
        borderRadius: "4px",
        border: "1px solid",
        bg: "bg.steelAlpha.60",
        borderColor: "border.inner",
        color: "text.secondary",
        boxShadow: "none",
        transition: "all 0.2s ease",
        textDecoration: "none",
        _hover: {
          bg: "accent.tealAlpha.8",
          borderColor: "accent.teal",
          color: "accent.teal",
          boxShadow: "nav.inactiveHover",
        },
        _currentPage: {
          bg: "accent.tealAlpha.15",
          borderColor: "accent.teal",
          color: "accent.teal",
          boxShadow: "nav.active",
          _hover: {
            bg: "accent.tealAlpha.25",
            borderColor: "accent.teal",
            color: "accent.teal",
            boxShadow: "nav.activeHover",
          },
        },
      },
      projectIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        borderRadius: "sm",
        bg: "bg.dark",
        border: "1px solid",
        borderColor: "border.inner",
        color: "accent.teal",
        textDecoration: "none",
        transition: "all 0.2s ease",
        _hover: {
          bg: "bg.steel",
          borderColor: "accent.teal",
        },
      },
    },
  },
})
