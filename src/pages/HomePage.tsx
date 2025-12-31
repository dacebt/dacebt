import { Box, Text, Flex, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import type { LinkProps as RouterLinkProps } from "react-router-dom"
import StackedDialogueBox from "../components/StackedDialogueBox"
import { useSimpleDialogue } from "../hooks/useSimpleDialogue"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
  const { visibleMessages, hasMore, handleClick } = useSimpleDialogue({
    messages: welcomeMessages,
  })

  return (
    <Box minH="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={{ base: 4, md: 6 }}>
      <Box w="100%" maxW="800px" display="flex" flexDirection="column" gap={4}>
        {/* Subtle header */}
        <Box textAlign="center">
          <Text
            textStyle="heading"
            color="text.primary"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            mb={1}
          >
            Welcome
          </Text>
          <Text
            textStyle="subtitle"
            color="text.muted"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="normal"
          >
            Start here, then explore Projects / About / Contact
          </Text>
        </Box>

        {/* Dialogue section */}
        <StackedDialogueBox
          variant="dashboard"
          messages={visibleMessages}
          hasMore={hasMore}
          onClick={handleClick}
        />

        {/* Quick links */}
        <Flex
          justifyContent="center"
          gap={2}
          flexWrap="wrap"
          mt={2}
        >
          {[
            { label: "Projects", path: "/projects" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              as={RouterLink}
              {...({ to: path } as RouterLinkProps)}
              px={3}
              py={1.5}
              borderRadius="md"
              border="1px solid"
              borderColor="border.inner"
              bg="bg.steelAlpha.40"
              color="text.secondary"
              fontSize="xs"
              fontWeight="medium"
              textDecoration="none"
              transition="all 0.2s ease"
              _hover={{
                bg: "accent.tealAlpha.10",
                borderColor: "accent.teal",
                color: "accent.teal",
              }}
            >
              {label}
            </Link>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
