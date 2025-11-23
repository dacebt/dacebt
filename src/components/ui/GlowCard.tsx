import { Box, type BoxProps } from "@chakra-ui/react"

interface GlowCardProps extends BoxProps {
  children: React.ReactNode
  glowIntensity?: "weak" | "medium" | "strong"
  isActive?: boolean
  glowColor?: "teal" | "green"
}

export default function GlowCard({
  children,
  glowIntensity = "medium",
  isActive = false,
  glowColor = "teal",
  ...props
}: GlowCardProps) {
  const glowConfig = {
    weak: {
      glow: glowColor === "teal" ? "glow.teal.weak" : "glow.green.weak",
      opacity: 0.3,
    },
    medium: {
      glow: glowColor === "teal" ? "glow.teal.medium" : "glow.green.medium",
      opacity: 0.5,
    },
    strong: {
      glow: glowColor === "teal" ? "glow.teal.strong" : "glow.green.strong",
      opacity: 0.7,
    },
  }

  const config = glowConfig[glowIntensity]

  return (
    <Box
      position="relative"
      bg="bg.steel"
      border="1px solid"
      borderColor="border.inner"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        borderColor: glowColor === "teal" ? "accent.teal" : "accent.green",
        transform: "translateY(-2px)",
        boxShadow: glowColor === "teal" ? "glowCard.tealHover" : "glowCard.greenHover",
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: config.glow,
        opacity: isActive ? config.opacity : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
