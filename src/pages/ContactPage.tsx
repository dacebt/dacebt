import { Box, Grid, Text, Link } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"
import PageLayout from "../components/PageLayout"
import FloatingButton from "../components/ui/FloatingButton"

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  x: FaXTwitter,
}

export default function ContactPage() {
  return (
    <PageLayout title="Get In Touch" subtitle="Connect with me through any of these platforms" centerContent>
      {/* Contact cards grid */}
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
                  density="tight"
                >
                  {/* Icon container with enhanced styling */}
                  <Box
                    position="relative"
                    p={2}
                    borderRadius="md"
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
                      size={24}
                    />
                  </Box>

                  {/* Enhanced text styling */}
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
    </PageLayout>
  )
}
