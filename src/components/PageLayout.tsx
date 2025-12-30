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
      {/* Page title */}
      <Box display="flex" flexDirection="column" gap={2} textAlign="center" position="relative" zIndex={1}>
        <Text
          textStyle="pageTitle"
          color="text.primary"
          bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
          bgClip="text"
          textShadow="0 0 20px accent.tealAlpha.30"
        >
          {title}
        </Text>
        <Text textStyle="pageSubtitle" maxW="400px">
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
