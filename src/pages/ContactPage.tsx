import { useEffect } from "react"
import { Box, Button, Grid, Text } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  x: FaXTwitter,
}

// Animation keyframes using CSS-in-JS
const float = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
`

const pulse = `
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`

export default function ContactPage() {
  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Inject keyframes into document head
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `${float} ${pulse}`
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <Box
      minHeight="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bg="bg.dark"
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
            Get In Touch
          </Text>
          <Text fontSize="lg" color="text.muted" maxW="400px" lineHeight="1.6">
            Connect with me through any of these platforms
          </Text>
        </Box>

        {/* Contact cards grid */}
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          maxW="600px"
          w="100%"
        >
          {contactData.map((contact, index) => {
            const Icon = iconMap[contact.icon as keyof typeof iconMap]

            return (
              <Tooltip key={contact.name} content={contact.url}>
                <Button
                  onClick={() => handleClick(contact.url)}
                  size="lg"
                  h="140px"
                  w="100%"
                  bg="linear-gradient(135deg, rgba(91, 192, 190, 0.08) 0%, rgba(29, 33, 38, 0.6) 100%)"
                  color="text.primary"
                  border="1px solid"
                  borderColor="border.inner"
                  borderRadius="xl"
                  position="relative"
                  overflow="hidden"
                  backdropFilter="blur(10px)"
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: "linear-gradient(135deg, rgba(91, 192, 190, 0.15) 0%, rgba(29, 33, 38, 0.8) 100%)",
                    borderColor: "accent.teal",
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: `
                      0 20px 40px rgba(91, 192, 190, 0.15),
                      0 8px 16px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `,
                  }}
                  _active={{
                    transform: "translateY(-4px) scale(1.01)",
                  }}
                  display="flex"
                  flexDirection="column"
                  gap={4}
                  animation={`float ${6 + index}s ease-in-out infinite`}
                  style={{
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {/* Shimmer effect overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
                    transform="translateX(-100%)"
                    transition="transform 0.6s ease"
                    _groupHover={{
                      transform: "translateX(100%)",
                    }}
                  />

                  {/* Icon container with enhanced styling */}
                  <Box
                    position="relative"
                    p={3}
                    borderRadius="lg"
                    bg="rgba(91, 192, 190, 0.1)"
                    border="1px solid"
                    borderColor="rgba(91, 192, 190, 0.2)"
                    _groupHover={{
                      bg: "rgba(91, 192, 190, 0.2)",
                      borderColor: "rgba(91, 192, 190, 0.4)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Icon
                      size={32}
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(91, 192, 190, 0.3))",
                      }}
                    />
                  </Box>

                  {/* Enhanced text styling */}
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    letterSpacing="0.5px"
                    textTransform="uppercase"
                    textAlign="center"
                    textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
                    _groupHover={{
                      color: "accent.teal",
                    }}
                    transition="color 0.3s ease"
                  >
                    {contact.name}
                  </Box>

                  {/* Subtle glow effect */}
                  <Box
                    position="absolute"
                    top="-2px"
                    left="-2px"
                    right="-2px"
                    bottom="-2px"
                    borderRadius="xl"
                    bg="linear-gradient(135deg, rgba(91, 192, 190, 0.1), transparent, rgba(91, 192, 190, 0.1))"
                    opacity={0}
                    transition="opacity 0.3s ease"
                    _groupHover={{
                      opacity: 1,
                    }}
                    zIndex={-1}
                  />
                </Button>
              </Tooltip>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
