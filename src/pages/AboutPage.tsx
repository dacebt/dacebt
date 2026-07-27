import { useState, useEffect, useCallback } from "react"
import { Box, Grid, Icon, Text } from "@chakra-ui/react"
import { FiArrowLeft } from "react-icons/fi"
import PageLayout from "../components/PageLayout"
import RPGDialogueScene from "../components/RPGDialogueScene"
import CompactAction from "../components/ui/CompactAction"
import SelectableButton from "../components/ui/SelectableButton"
import { selectablePanelStyles } from "../components/ui/selectable-panel-styles"
import { aboutTopics, type AboutTopic } from "../data/about"

export default function AboutPage() {
	const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)

	const handleTopicClick = useCallback((topic: AboutTopic) => {
		setSelectedTopic(topic)
		window.history.pushState({ topicId: topic.id }, "", window.location.pathname)
	}, [])

	const handleBack = useCallback(() => {
		setSelectedTopic(null)
		window.history.back()
	}, [])

	useEffect(() => {
		const handlePopState = () => {
			setSelectedTopic(null)
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [])

	useEffect(() => {
		if (!selectedTopic) return

		const handleKeyDown = (event: KeyboardEvent) => {
			const isInsideDialog =
				event.target instanceof Element && event.target.closest('[role="dialog"]') !== null

			if (event.key === "Escape" && !isInsideDialog) {
				handleBack()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [selectedTopic, handleBack])

	if (selectedTopic) {
		return (
			<Box h="100%" display="flex" flexDirection="column">
				<Box pb={2}>
					<CompactAction
						onClick={handleBack}
						emphasis="subtle"
						gap={2}
					>
						<Icon as={FiArrowLeft} aria-hidden="true" />
						<Text as="span">Back to Topics</Text>
					</CompactAction>
				</Box>

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
					<SelectableButton
						key={topic.id}
						onClick={() => handleTopicClick(topic)}
						size="lg"
						height="120px"
						width="100%"
						index={index}
						animationDelay={index * 0.3}
						density="tight"
					>
						<Box
							{...selectablePanelStyles.iconFrame}
						>
							<Box {...selectablePanelStyles.indicator} />
						</Box>

						<Text
							{...selectablePanelStyles.label}
							_groupHover={{
								color: "accent.teal",
							}}
							transition="color 0.3s ease"
						>
							{topic.label}
						</Text>
					</SelectableButton>
				))}
			</Grid>
		</PageLayout>
	)
}
