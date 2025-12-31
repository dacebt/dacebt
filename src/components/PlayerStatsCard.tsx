import { Box, Text, Image, Badge, Flex } from "@chakra-ui/react"
import { useMemo } from "react"

const PlayerStatsCard = () => {
  // Calculate experience dynamically from August 2019
  const experience = useMemo(() => {
    const startDate = new Date(2019, 7) // August 2019 (month is 0-indexed)
    const now = new Date()
    const years = now.getFullYear() - startDate.getFullYear()
    const months = now.getMonth() - startDate.getMonth()
    
    const totalMonths = years * 12 + months
    const fullYears = Math.floor(totalMonths / 12)
    
    // If we're in first 6 months of year (Jan-Jun), show "Over X years"
    // If we're in second 6 months (Jul-Dec), show "Close to X+1 years"
    if (now.getMonth() < 6) {
      return `Over ${fullYears} years`
    } else {
      return `Close to ${fullYears + 1} years`
    }
  }, [])

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Python", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "Solidity", category: "Blockchain" },
    { name: "Insert Idea", category: "Adaptable" },
  ]

  return (
    <Flex
      h="100%"
      align="center"
      justify="space-between"
      px={4}
      gap={6}
      flexWrap="wrap"
    >
      {/* Left Side - Player Info */}
      <Flex align="center" gap={4}>
        {/* Avatar Frame */}
        <Box
          position="relative"
          w="90px"
          h="90px"
          border="2px solid"
          borderColor="border.inner"
          bg="bg.steelAlpha.60"
          borderRadius="md"
        >
          <Image
            src="/images/avatar.png"
            alt="David"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center 25%"
          />
        </Box>

        {/* Player Details */}
        <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
          <Text textStyle="playerName" color="text.primary">
            David
          </Text>
          <Text textStyle="playerRole" color="text.muted">
            Senior Web Developer
          </Text>
          <Text textStyle="smallTextMedium" color="accent.teal">
            {experience} experience
          </Text>
          <Text textStyle="smallText" color="text.muted">
            Georgia, US • Remote
          </Text>
        </Box>
      </Flex>

      {/* Right Side - Tech Stack */}
      <Box display="flex" flexDirection="column" alignItems="end" gap={2}>
        <Text textStyle="smallText" color="text.muted" mb={1}>
          Adaptable Stack
        </Text>
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="end">
          {techStack.map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              colorScheme="teal"
              px={2}
              py={1}
              textStyle="smallText"
              borderColor="border.inner"
              color="text.secondary"
              bg="transparent"
              _hover={{
                bg: "accent.tealAlpha.10",
                borderColor: "accent.teal",
                color: "accent.teal",
              }}
              transition="all 0.2s ease"
            >
              {tech.name}
            </Badge>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default PlayerStatsCard
