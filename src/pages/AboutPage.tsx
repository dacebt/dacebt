import { useEffect, useState } from "react"
import { Box, Button, Grid, Text } from "@chakra-ui/react"
import PageLayout from "../components/PageLayout"
import ModalDialogue from "../components/ModalDialogue"
import { aboutTopics, type AboutTopic } from "../data/about"
import { injectAnimations } from "../utils/animations"

export default function AboutPage() {
  const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log("AboutPage render - selectedTopic:", selectedTopic?.id, "isModalOpen:", isModalOpen)

  // Inject animations into document head
  useEffect(() => {
    return injectAnimations(["float", "pulse"])
  }, [])

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
        {/* 3x3 Grid of floating buttons */}
        <Grid
          gridTemplateColumns="repeat(3, 1fr)"
          gap={6}
          w="100%"
          maxW="800px"
          mx="auto"
          alignItems="start"
          pt={4}
        >
          {aboutTopics.map((topic, index) => (
            <Button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              size="lg"
              h="120px"
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
              gap={3}
              animation={`float ${6 + index}s ease-in-out infinite`}
              style={{
                animationDelay: `${index * 0.3}s`,
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

              {/* Button content */}
              <Box
                position="relative"
                zIndex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                h="100%"
                gap={2}
              >
                {/* Subtle icon placeholder */}
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="full"
                  bg="rgba(91, 192, 190, 0.2)"
                  border="1px solid"
                  borderColor="rgba(91, 192, 190, 0.3)"
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
          ))}
        </Grid>
      </PageLayout>

      {/* Modal for dialogue */}
      {selectedTopic && isModalOpen && (
        <ModalDialogue
          isOpen={isModalOpen}
          onClose={handleModalClose}
          messages={selectedTopic.messages}
          title={selectedTopic.label}
        />
      )}
    </>
  )
}
