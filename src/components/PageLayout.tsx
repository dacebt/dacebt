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
        bg="linear-gradient(135deg, rgba(91, 192, 190, 0.1) 0%, rgba(91, 192, 190, 0.05) 100%)"
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
        bg="linear-gradient(45deg, rgba(91, 192, 190, 0.08) 0%, rgba(91, 192, 190, 0.03) 100%)"
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
        bg="linear-gradient(225deg, rgba(91, 192, 190, 0.06) 0%, rgba(91, 192, 190, 0.02) 100%)"
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
          bg="linear-gradient(135deg, #E2E8F0 0%, #5BC0BE 100%)"
          bgClip="text"
          textShadow="0 0 20px rgba(91, 192, 190, 0.3)"
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
