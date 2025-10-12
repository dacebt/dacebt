import { Box, Button, Grid } from "@chakra-ui/react"
import { Tooltip } from "../components/ui/tooltip"
import { FaLinkedin, FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6"
import contactData from "../data/contact.json"

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
    <Box minHeight="100%" display="flex" alignItems="center" justifyContent="center">
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gap={4}
        maxW="500px"
        w="100%"
      >
        {contactData.map((contact) => {
          const Icon = iconMap[contact.icon as keyof typeof iconMap]
          
          return (
            <Tooltip key={contact.name} content={contact.url}>
              <Button
                onClick={() => handleClick(contact.url)}
                size="lg"
                h="120px"
                bg="rgba(91, 192, 190, 0.08)"
                color="text.primary"
                border="2px solid"
                borderColor="border.inner"
                borderRadius="md"
                position="relative"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  bg: "rgba(91, 192, 190, 0.15)",
                  borderColor: "accent.teal",
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(91, 192, 190, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
                _active={{
                  transform: "translateY(-2px)",
                }}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <Icon size={40} />
                <Box
                  fontSize="md"
                  fontWeight="bold"
                  letterSpacing="0.5px"
                  textTransform="uppercase"
                >
                  {contact.name}
                </Box>
              </Button>
            </Tooltip>
          )
        })}
      </Grid>
    </Box>
  )
}
