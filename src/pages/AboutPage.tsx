import { useState, useEffect, useCallback } from "react"
import { Box, Grid, Text, Button } from "@chakra-ui/react"
import { FiArrowLeft } from "react-icons/fi"
import PageLayout from "../components/PageLayout"
import RPGDialogueScene from "../components/RPGDialogueScene"
import FloatingButton from "../components/ui/FloatingButton"
import { aboutTopics, type AboutTopic } from "../data/about"

export default function AboutPage() {
	const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)

	const handleTopicClick = useCallback((topic: AboutTopic) => {
		setSelectedTopic(topic)
		// Push state so browser back returns to grid
		window.history.pushState({ topicId: topic.id }, "", `#${topic.id}`)
	}, [])

	const handleBack = useCallback(() => {
		setSelectedTopic(null)
		// Go back in history to remove the topic hash
		window.history.back()
	}, [])


	// Handle browser back button
	useEffect(() => {
		const handlePopState = () => {
			setSelectedTopic(null)
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [])

	// Handle Escape key to go back
	useEffect(() => {
		if (!selectedTopic) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleBack()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [selectedTopic, handleBack])

	// Show dialogue scene when topic is selected
	if (selectedTopic) {
		return (
			<Box h="100%" display="flex" flexDirection="column">
				{/* Back button */}
				<Box pb={2}>
					<Button
						onClick={handleBack}
						size="sm"
						bg="accent.tealAlpha.10"
						color="text.secondary"
						border="1px solid"
						borderColor="border.inner"
						borderRadius="md"
						display="flex"
						alignItems="center"
						gap={2}
						_hover={{
							bg: "accent.tealAlpha.20",
							color: "text.primary",
							borderColor: "accent.teal",
						}}
						transition="all 0.2s ease"
					>
						<FiArrowLeft />
						<Text as="span">Back to Topics</Text>
					</Button>
				</Box>

				{/* Dialogue scene */}
				<Box flex={1}>
					<RPGDialogueScene
						messages={selectedTopic.messages}
						autoAdvanceDelay={1500}
						autoPlay={true}
						transcriptTitle={selectedTopic.label}
					/>
				</Box>
			</Box>
		)
	}

	// Show topic selection grid
	return (
		<PageLayout title="About Me" subtitle="Click on any topic to learn more about me">
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
						index={index}
						animationDelay={index * 0.3}
						density="tight"
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
	)
}
