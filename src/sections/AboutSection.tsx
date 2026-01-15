import { useState, useCallback, useEffect } from "react"
import { Box, Grid, Text, Portal, Button } from "@chakra-ui/react"
import { FiX } from "react-icons/fi"
import RPGDialogueScene from "../components/RPGDialogueScene"
import FloatingButton from "../components/ui/FloatingButton"
import GlassPanel from "../components/ui/GlassPanel"
import { aboutTopics, type AboutTopic } from "../data/about"

interface AboutSectionProps {
	includeTitle?: boolean
}

export default function AboutSection({ includeTitle = false }: AboutSectionProps) {
	const [selectedTopic, setSelectedTopic] = useState<AboutTopic | null>(null)

	const handleTopicClick = useCallback((topic: AboutTopic) => {
		setSelectedTopic(topic)
	}, [])

	const handleClose = useCallback(() => {
		setSelectedTopic(null)
	}, [])

	// Handle Escape key to close
	useEffect(() => {
		if (!selectedTopic) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [selectedTopic, handleClose])

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

			{/* Dialogue overlay - uses Portal to render above everything */}
			{selectedTopic && (
				<Portal>
					{/* Backdrop */}
					<Box
						position="fixed"
						top={0}
						left={0}
						right={0}
						bottom={0}
						bg="black.alpha.80"
						backdropFilter="blur(8px)"
						zIndex={1000}
						animation="fadeIn 0.2s ease-out"
					/>

					{/* Dialogue scene container */}
					<GlassPanel
						elevation="strong"
						role="container"
						position="fixed"
						top="50%"
						left="50%"
						transform="translate(-50%, -50%)"
						w="95vw"
						maxW="1000px"
						h="calc(100vh - 4rem)"
						maxH="800px"
						zIndex={1001}
						p={{ base: 4, md: 6 }}
						display="flex"
						flexDirection="column"
						animation="slideIn 0.3s ease-out"
					>
						{/* Close button */}
						<Button
							onClick={handleClose}
							position="absolute"
							top={4}
							right={4}
							size="sm"
							bg="black.alpha.50"
							color="text.muted"
							borderRadius="full"
							p={2}
							minW="auto"
							_hover={{
								color: "text.primary",
								bg: "accent.tealAlpha.20",
							}}
							border="1px solid"
							borderColor="border.inner"
							zIndex={1}
						>
							<FiX size={18} />
						</Button>

						{/* Topic title */}
						<Text
							textStyle="pageSubtitle"
							color="text.primary"
							fontWeight="bold"
							textAlign="center"
							mb={4}
						>
							{selectedTopic.label}
						</Text>

						{/* Dialogue scene */}
						<Box flex={1} minH={0}>
							<RPGDialogueScene
								messages={selectedTopic.messages}
								autoAdvanceDelay={1500}
								autoPlay={true}
								onComplete={handleClose}
								transcriptTitle={selectedTopic.label}
							/>
						</Box>
					</GlassPanel>
				</Portal>
			)}
		</>
	)
}
