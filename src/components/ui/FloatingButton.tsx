import { Box, Button } from "@chakra-ui/react"

interface FloatingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
  disabled?: boolean
  height?: string | number
  width?: string | number
  animationDelay?: number
  index?: number
}

export default function FloatingButton({
  children,
  onClick,
  size = "lg",
  variant = "primary",
  disabled = false,
  height,
  width = "100%",
  animationDelay,
  index = 0,
}: FloatingButtonProps) {
  const sizeConfig = {
    sm: { h: height || "80px", p: 3 },
    md: { h: height || "100px", p: 4 },
    lg: { h: height || "120px", p: 4 },
  }

  const variantConfig = {
    primary: {
      bg: "linear-gradient(135deg, var(--chakra-colors-accent-teal-alpha-8) 0%, var(--chakra-colors-bg-steel-alpha-60) 100%)",
      borderColor: "border.inner",
      hoverBg: "linear-gradient(135deg, var(--chakra-colors-accent-teal-alpha-15) 0%, var(--chakra-colors-bg-steel-alpha-80) 100%)",
      hoverBorderColor: "accent.teal",
    },
    secondary: {
      bg: "bg.steel",
      borderColor: "border.inner",
      hoverBg: "bg.steelAlpha.80",
      hoverBorderColor: "accent.tealAlpha.50",
    },
  }

  const config = sizeConfig[size]
  const variantStyle = variantConfig[variant]

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      {...config}
      w={width}
      bg={variantStyle.bg}
      color="text.primary"
      border="1px solid"
      borderColor={variantStyle.borderColor}
      borderRadius="xl"
      position="relative"
      overflow="hidden"
      backdropFilter="blur(10px)"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={
        !disabled
          ? {
              bg: variantStyle.hoverBg,
              borderColor: variantStyle.hoverBorderColor,
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: "button.primaryHover",
            }
          : undefined
      }
      _active={
        !disabled
          ? {
              transform: "translateY(-4px) scale(1.01)",
            }
          : undefined
      }
      display="flex"
      flexDirection="column"
      gap={3}
      animation={`float ${6 + index}s ease-in-out infinite`}
      style={{
        animationDelay: `${(animationDelay || 0) + index * 0.3}s`,
      }}
    >
      {/* Shimmer effect overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(90deg, transparent 0%, var(--chakra-colors-white-alpha-10) 50%, transparent 100%)"
        transform="translateX(-100%)"
        transition="transform 0.6s ease"
        _groupHover={{
          transform: "translateX(100%)",
        }}
      />

      {/* Button content */}
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        gap={2}
      >
        {children}
      </Box>

      {/* Subtle glow effect */}
      <Box
        position="absolute"
        top="-2px"
        left="-2px"
        right="-2px"
        bottom="-2px"
        borderRadius="xl"
        bg="linear-gradient(135deg, var(--chakra-colors-accent-teal-alpha-10), transparent, var(--chakra-colors-accent-teal-alpha-10))"
        opacity={0}
        transition="opacity 0.3s ease"
        _hover={
          !disabled
            ? {
                opacity: 1,
              }
            : undefined
        }
        zIndex={-1}
      />
    </Button>
  )
}
