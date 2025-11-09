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
        {/* Mega Man Style Avatar Frame */}
        <Box
          position="relative"
          w="90px"
          h="90px"
          border="5px solid"
          borderColor="border.inner"
          bg="bg.steel"
          boxShadow={`
            inset 0 0 0 2px white.alpha.15,
            inset 0 0 0 4px border.outer,
            0 0 0 2px border.outer,
            0 0 0 4px border.inner,
            0 2px 8px black.alpha.30,
            0 4px 16px black.alpha.20
          `}
          _before={{
            content: '""',
            position: "absolute",
            top: "-3px",
            left: "-3px",
            right: "-3px",
            bottom: "-3px",
            border: "2px solid",
            borderColor: "accent.teal",
            opacity: 0.7,
          }}
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
          <Text fontSize="lg" fontWeight="bold" color="text.primary">
            David
          </Text>
          <Text fontSize="sm" color="text.muted">
            Senior Web Developer
          </Text>
          <Text fontSize="xs" color="accent.teal" fontWeight="medium">
            {experience} experience
          </Text>
          <Text fontSize="xs" color="text.muted">
            Georgia, US • Remote
          </Text>
        </Box>
      </Flex>

      {/* Right Side - Tech Stack */}
      <Box display="flex" flexDirection="column" alignItems="end" gap={2}>
        <Text fontSize="xs" color="text.muted" mb={1}>
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
              fontSize="xs"
              borderColor="accent.teal"
              color="accent.teal"
              bg="accent.tealAlpha.10"
              _hover={{
                bg: "accent.tealAlpha.20",
                transform: "scale(1.05)",
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
