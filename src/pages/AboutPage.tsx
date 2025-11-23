import { useState } from "react"
import { Box, Grid, Text } from "@chakra-ui/react"
import PageLayout from "../components/PageLayout"
import ConversationModal from "../components/ConversationModal"
import FloatingButton from "../components/ui/FloatingButton"
import { aboutTopics, type AboutTopic } from "../data/about"

export default function AboutPage() {
  const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTopicClick = (topic: AboutTopic) => {
    setSelectedTopic(topic)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    // Clear both states atomically to prevent race conditions
    setSelectedTopic(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <PageLayout title="About Me" subtitle="Click on any topic to learn more about me">
        {/* Responsive grid of floating buttons */}
        <Grid
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
          gap={{ base: 4, md: 6 }}
          w="100%"
          maxW={{ base: "100%", md: "800px" }}
          mx="auto"
          alignItems="start"
          pt={4}
        >
          {aboutTopics.map((topic, index) => (
            <FloatingButton
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              size="lg"
              height="120px"
              width="100%"
              variant="primary"
              index={index}
              animationDelay={index * 0.3}
            >
              {/* Subtle icon placeholder */}
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

              {/* Label text */}
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
      </PageLayout>

      {/* Modal for dialogue */}
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
