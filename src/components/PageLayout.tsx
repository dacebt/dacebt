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
      w="100%"
      maxW="1200px"
      mx="auto"
    >
      {/* Page title */}
      <Box display="flex" flexDirection="column" gap={2} textAlign="center">
        <Text
          textStyle="pageTitle"
          color="text.primary"
          bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
          bgClip="text"
          letterSpacing="normal"
          textTransform="none"
        >
          {title}
        </Text>
        <Text textStyle="pageSubtitle" maxW="400px">
          {subtitle}
        </Text>
      </Box>

      {/* Content area */}
      <Box
        w="100%"
        display="flex"
        alignItems={centerContent ? "center" : "flex-start"}
        justifyContent={centerContent ? "center" : "flex-start"}
      >
        {children}
      </Box>
    </Box>
  )
}
