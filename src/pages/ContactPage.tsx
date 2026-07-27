import { Box, Grid, Icon, Text } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"
import PageLayout from "../components/PageLayout"
import SelectableLink from "../components/ui/SelectableLink"
import { selectablePanelStyles } from "../components/ui/selectable-panel-styles"

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  x: FaXTwitter,
}

export default function ContactPage() {
  return (
    <PageLayout title="Get In Touch" subtitle="Connect with me through any of these platforms" centerContent>
      <Grid
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
        gap={{ base: 4, md: 6 }}
        maxW={{ base: "100%", md: "600px" }}
        w="100%"
        mx="auto"
        justifyItems="center"
      >
        {contactData.map((contact, index) => {
          const ContactIcon = iconMap[contact.icon as keyof typeof iconMap]

          return (
            <Tooltip key={contact.name} content={contact.url}>
              <SelectableLink
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                height="140px"
                width="100%"
                index={index}
                animationDelay={index * 0.5}
                density="tight"
              >
                <Box
                  {...selectablePanelStyles.iconFrame}
                  _groupHover={{
                    bg: "accent.tealAlpha.20",
                    borderColor: "accent.tealAlpha.40",
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon as={ContactIcon} boxSize={6} aria-hidden="true" />
                </Box>

                <Text
                  {...selectablePanelStyles.label}
                  _groupHover={{
                    color: "accent.teal",
                  }}
                  transition="color 0.3s ease"
                >
                  {contact.name}
                </Text>
              </SelectableLink>
            </Tooltip>
          )
        })}
      </Grid>
    </PageLayout>
  )
}
