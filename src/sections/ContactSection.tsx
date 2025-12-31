import { Box, Grid, Text, Link } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"
import FloatingButton from "../components/ui/FloatingButton"

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  x: FaXTwitter,
}

interface ContactSectionProps {
  includeTitle?: boolean
}

export default function ContactSection({ includeTitle = false }: ContactSectionProps) {
  return (
    <Box
      id="section-contact"
      py={includeTitle ? 12 : 4}
      px={includeTitle ? 4 : 0}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      scrollMarginTop="80px"
    >
      {includeTitle && (
        <Box display="flex" flexDirection="column" gap={2} textAlign="center" mb={8}>
          <Text
            textStyle="pageTitle"
            color="text.primary"
            bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
            bgClip="text"
            textShadow="0 0 20px accent.tealAlpha.30"
          >
            Get In Touch
          </Text>
          <Text textStyle="pageSubtitle" maxW="400px" mx="auto">
            Connect with me through any of these platforms
          </Text>
        </Box>
      )}

      <Grid
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
        gap={{ base: 4, md: 6 }}
        maxW={{ base: "100%", md: "600px" }}
        w="100%"
        mx="auto"
        justifyItems="center"
      >
        {contactData.map((contact, index) => {
          const Icon = iconMap[contact.icon as keyof typeof iconMap]

          return (
            <Tooltip key={contact.name} content={contact.url}>
              <Link
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                textDecoration="none"
                display="block"
                w="100%"
              >
                <FloatingButton
                  size="lg"
                  height="140px"
                  width="100%"
                  variant="primary"
                  index={index}
                  animationDelay={index * 0.5}
                >
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
                        filter: "drop-shadow(0 2px 4px var(--chakra-colors-accent-teal-alpha-30))",
                      }}
                    />
                  </Box>

                  <Text
                    textStyle="buttonLabel"
                    textAlign="center"
                    textShadow="0 1px 2px black.alpha.50"
                    _groupHover={{
                      color: "accent.teal",
                    }}
                    transition="color 0.3s ease"
                  >
                    {contact.name}
                  </Text>
                </FloatingButton>
              </Link>
            </Tooltip>
          )
        })}
      </Grid>
    </Box>
  )
}

