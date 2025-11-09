import { Box, Button, Grid } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"
import PageLayout from "../components/PageLayout"

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  x: FaXTwitter,
}

export default function ContactPage() {
  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <PageLayout title="Get In Touch" subtitle="Connect with me through any of these platforms" centerContent>
      {/* Contact cards grid */}
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        maxW="600px"
        w="100%"
        mx="auto"
        justifyItems="center"
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
                bg="linear-gradient(135deg, accent.tealAlpha.8 0%, bg.steelAlpha.60 100%)"
                color="text.primary"
                border="1px solid"
                borderColor="border.inner"
                borderRadius="xl"
                position="relative"
                overflow="hidden"
                backdropFilter="blur(10px)"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  bg: "linear-gradient(135deg, accent.tealAlpha.15 0%, bg.steelAlpha.80 100%)",
                  borderColor: "accent.teal",
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: `
                    0 20px 40px accent.tealAlpha.15,
                    0 8px 16px black.alpha.30,
                    inset 0 1px 0 white.alpha.10,
                    inset 0 -1px 0 black.alpha.10
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
                  bg="linear-gradient(90deg, transparent 0%, white.alpha.10 50%, transparent 100%)"
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
                  bg="accent.tealAlpha.10"
                  border="1px solid"
                  borderColor="accent.tealAlpha.20"
                  _groupHover={{
                    bg: "accent.tealAlpha.20",
                    borderColor: "accent.tealAlpha.40",
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
                  textShadow="0 1px 2px black.alpha.50"
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
                  bg="linear-gradient(135deg, accent.tealAlpha.10, transparent, accent.tealAlpha.10)"
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
    </PageLayout>
  )
}
