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
      nav: {
        display: "flex",
        alignItems: "center",
        px: 4,
        py: 3,
        borderRadius: "sm",
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        bg: "transparent",
        borderLeft: "3px solid transparent",
        borderColor: "accent.teal",
        textDecoration: "none",
        _hover: {
          bg: "accent.tealAlpha.8",
          transform: "translateX(4px)",
          boxShadow: "nav.inactiveHover",
        },
      },
      icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        borderRadius: "md",
        bg: "accent.tealAlpha.10",
        border: "1px solid",
        borderColor: "accent.tealAlpha.20",
        color: "accent.teal",
        textDecoration: "none",
        transition: "all 0.2s ease",
        _hover: {
          bg: "accent.tealAlpha.20",
          borderColor: "accent.teal",
          transform: "scale(1.05)",
        },
      },
      iconSmall: {
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

