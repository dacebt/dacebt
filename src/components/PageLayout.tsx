import { Box, Text } from "@chakra-ui/react"
import { type ReactNode } from "react"

interface PageLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  centerContent?: boolean
}

export default function PageLayout({ title, subtitle, children, centerContent = false }: PageLayoutProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={6}
      alignItems="center"
      position="relative"
      w="100%"
      h="100%"
      py={6}
    >
      {/* Animated background elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="linear-gradient(135deg, var(--chakra-colors-accent-tealAlpha-10) 0%, var(--chakra-colors-accent-tealAlpha-5) 100%)"
        animation="float 6s ease-in-out infinite"
        filter="blur(1px)"
      />
      <Box
        position="absolute"
        bottom="15%"
        right="15%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="linear-gradient(45deg, var(--chakra-colors-accent-tealAlpha-8) 0%, var(--chakra-colors-accent-tealAlpha-3) 100%)"
        animation="float 8s ease-in-out infinite reverse"
        filter="blur(1px)"
      />
      <Box
        position="absolute"
        top="50%"
        left="5%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="linear-gradient(225deg, var(--chakra-colors-accent-tealAlpha-6) 0%, var(--chakra-colors-accent-tealAlpha-2) 100%)"
        animation="pulse 4s ease-in-out infinite"
        filter="blur(2px)"
      />

      {/* Page title */}
      <Box display="flex" flexDirection="column" gap={2} textAlign="center" position="relative" zIndex={1}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="text.primary"
          letterSpacing="0.5px"
          textTransform="uppercase"
          bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
          bgClip="text"
          textShadow="0 0 20px accent.tealAlpha.30"
        >
          {title}
        </Text>
        <Text fontSize="lg" color="text.muted" maxW="400px" lineHeight="1.6">
          {subtitle}
        </Text>
      </Box>

      {/* Content area - scrollable */}
      <Box
        flex="1"
        w="100%"
        overflowY="auto"
        overflowX="hidden"
        position="relative"
        zIndex={1}
        px={4}
        display="flex"
        alignItems={centerContent ? "center" : "flex-start"}
        justifyContent={centerContent ? "center" : "flex-start"}
      >
        {children}
      </Box>
    </Box>
  )
}
