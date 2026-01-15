import { Box, Button, Text } from "@chakra-ui/react"
import { FiFileText, FiSkipForward, FiChevronsRight } from "react-icons/fi"

interface RPGDialogueControlsProps {
	currentIndex: number
	totalMessages: number
	isStreaming: boolean
	isComplete: boolean
	hasMore: boolean
	onTranscriptOpen: () => void
	onSkip: () => void
}

export default function RPGDialogueControls({
	currentIndex,
	totalMessages,
	isStreaming,
	isComplete,
	hasMore,
	onTranscriptOpen,
	onSkip,
}: RPGDialogueControlsProps) {
	const showSkipButton = isStreaming || hasMore
	const skipLabel = isStreaming ? "Skip" : "Next"
	const skipIcon = isStreaming ? <FiSkipForward /> : <FiChevronsRight />

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			w="100%"
			px={2}
			py={2}
			mb={4}
		>
			{/* Transcript button - left */}
			<Button
				onClick={onTranscriptOpen}
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
				<FiFileText />
				<Text as="span" display={{ base: "none", md: "inline" }}>
					Transcript
				</Text>
			</Button>

			{/* Progress indicator - center */}
			<Text textStyle="progressText" color="text.muted">
				{currentIndex + 1} / {totalMessages}
			</Text>

			{/* Skip buttons - right */}
			<Box display="flex" gap={2}>
				{/* Skip/Next button */}
				{showSkipButton && (
					<Button
						onClick={onSkip}
						size="sm"
						bg="accent.tealAlpha.15"
						color="text.primary"
						border="1px solid"
						borderColor="accent.teal"
						borderRadius="md"
						display="flex"
						alignItems="center"
						gap={1}
						_hover={{
							bg: "accent.tealAlpha.25",
						}}
						transition="all 0.2s ease"
					>
						<Text as="span" display={{ base: "none", md: "inline" }}>
							{skipLabel}
						</Text>
						{skipIcon}
					</Button>
				)}
			</Box>
		</Box>
	)
}
