import type { Ref } from "react"
import { Box, Icon, Text } from "@chakra-ui/react"
import { FiFileText, FiSkipForward, FiChevronsRight } from "react-icons/fi"
import CompactAction from "./ui/CompactAction"

interface RPGDialogueControlsProps {
	currentIndex: number
	totalMessages: number
	isStreaming: boolean
	hasMore: boolean
	onTranscriptOpen: () => void
	onSkip: () => void
	transcriptTriggerRef: Ref<HTMLButtonElement>
}

export default function RPGDialogueControls({
	currentIndex,
	totalMessages,
	isStreaming,
	hasMore,
	onTranscriptOpen,
	onSkip,
	transcriptTriggerRef,
}: RPGDialogueControlsProps) {
	const showSkipButton = isStreaming || hasMore
	const skipLabel = isStreaming ? "Skip" : "Next"
	const SkipIcon = isStreaming ? FiSkipForward : FiChevronsRight

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
			<CompactAction
				ref={transcriptTriggerRef}
				onClick={onTranscriptOpen}
				emphasis="subtle"
				gap={2}
				aria-label="Transcript"
			>
				<Icon as={FiFileText} aria-hidden="true" />
				<Text as="span" display={{ base: "none", md: "inline" }}>
					Transcript
				</Text>
			</CompactAction>

			<Text textStyle="progressText" color="text.muted">
				{currentIndex + 1} / {totalMessages}
			</Text>

			<Box display="flex" gap={2}>
				{showSkipButton && (
					<CompactAction
						onClick={onSkip}
						emphasis="primary"
						gap={1}
						aria-label={skipLabel}
					>
						<Text as="span" display={{ base: "none", md: "inline" }}>
							{skipLabel}
						</Text>
						<Icon as={SkipIcon} aria-hidden="true" />
					</CompactAction>
				)}
			</Box>
		</Box>
	)
}
