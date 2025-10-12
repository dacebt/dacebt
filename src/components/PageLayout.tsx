import { Box, Text } from "@chakra-ui/react"
import { type ReactNode } from "react"

interface PageLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bg="bg.dark"
      py={8}
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

      <Box
        display="flex"
        flexDirection="column"
        gap={8}
        alignItems="center"
        position="relative"
        zIndex={1}
        w="100%"
        maxW="100%"
        px={4}
        height="100%"
        overflow="auto"
      >
        {/* Page title */}
        <Box display="flex" flexDirection="column" gap={2} textAlign="center">
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

        {children}
      </Box>
    </Box>
  )
}
