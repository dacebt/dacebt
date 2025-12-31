import { useState } from "react"
import { Box, Grid, Text } from "@chakra-ui/react"
import ConversationModal from "../components/ConversationModal"
import FloatingButton from "../components/ui/FloatingButton"
import { aboutTopics, type AboutTopic } from "../data/about"

interface AboutSectionProps {
  includeTitle?: boolean
}

export default function AboutSection({ includeTitle = false }: AboutSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTopicClick = (topic: AboutTopic) => {
    setSelectedTopic(topic)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setSelectedTopic(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Box id="section-about" py={includeTitle ? 12 : 4} px={includeTitle ? 4 : 0} scrollMarginTop="80px">
        {includeTitle && (
          <Box display="flex" flexDirection="column" gap={2} textAlign="center" mb={8}>
            <Text
              textStyle="pageTitle"
              color="text.primary"
              bg="linear-gradient(135deg, var(--chakra-colors-text-primary) 0%, var(--chakra-colors-accent-teal) 100%)"
              bgClip="text"
              textShadow="0 0 20px accent.tealAlpha.30"
            >
              About Me
            </Text>
            <Text textStyle="pageSubtitle" maxW="400px" mx="auto">
              Click on any topic to learn more about me
            </Text>
          </Box>
        )}

        <Grid
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
          gap={{ base: 4, md: 6 }}
          w="100%"
          maxW={{ base: "100%", md: "800px" }}
          mx="auto"
          alignItems="start"
          pt={includeTitle ? 0 : 4}
        >
          {aboutTopics.map((topic, index) => (
            <FloatingButton
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              size="lg"
              height="120px"
              width="100%"
              index={index}
              animationDelay={index * 0.3}
            >
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="accent.tealAlpha.20"
                border="1px solid"
                borderColor="accent.tealAlpha.30"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box w="8px" h="8px" borderRadius="full" bg="accent.teal" opacity={0.8} />
              </Box>

              <Text
                textStyle="buttonLabel"
                _groupHover={{
                  color: "accent.teal",
                }}
                transition="color 0.3s ease"
              >
                {topic.label}
              </Text>
            </FloatingButton>
          ))}
        </Grid>
      </Box>

      {selectedTopic && isModalOpen && (
        <ConversationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          messages={selectedTopic.messages}
          title={selectedTopic.label}
        />
      )}
    </>
  )
}

