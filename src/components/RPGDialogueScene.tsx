import { useState, useEffect, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import RPGDialogueControls from "./RPGDialogueControls"
import TranscriptModal from "./TranscriptModal"
import { useRPGDialogue, type DialogueMessage } from "../hooks/useRPGDialogue"

interface RPGDialogueSceneProps {
	messages: DialogueMessage[]
	autoAdvanceDelay?: number
	streamingSpeed?: number
	autoPlay?: boolean
	onComplete?: () => void
	showControls?: boolean
	transcriptTitle?: string
}

export default function RPGDialogueScene({
	messages,
	autoAdvanceDelay = 1500,
	streamingSpeed = 30,
	autoPlay = true,
	onComplete,
	showControls = true,
	transcriptTitle = "Transcript",
}: RPGDialogueSceneProps) {
	const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

	const {
		currentMessage,
		currentIndex,
		totalMessages,
		displayedText,
		isStreaming,
		isComplete,
		hasMore,
		allMessages,
		skipStreaming,
		skipToEnd,
		handleClick,
	} = useRPGDialogue({
		messages,
		autoAdvanceDelay,
		streamingSpeed,
		autoPlay,
		onComplete,
	})

	useEffect(() => {
		if (isTranscriptOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === " " || event.key === "Enter") {
				event.preventDefault()
				handleClick()
			} else if (event.key === "t" || event.key === "T") {
				event.preventDefault()
				setIsTranscriptOpen(true)
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [isTranscriptOpen, handleClick])

	const handleTranscriptOpen = useCallback(() => {
		setIsTranscriptOpen(true)
	}, [])

	const handleTranscriptClose = useCallback(() => {
		setIsTranscriptOpen(false)
	}, [])

	const handleSkip = useCallback(() => {
		if (isStreaming) {
			skipStreaming()
		} else if (hasMore) {
			handleClick()
		}
	}, [isStreaming, hasMore, skipStreaming, handleClick])

	const handleSceneClick = useCallback(() => {
		handleClick()
	}, [handleClick])

	if (!currentMessage) {
		return null
	}

	return (
		<Box
			// Use CSS Grid with 3 rows to guarantee bottom placement
			// Row 1: Controls (auto height)
			// Row 2: Empty spacer (takes all remaining space)
			// Row 3: Dialogue panel (auto height, at bottom)
			display="grid"
			gridTemplateRows="auto 1fr auto"
			// Fill parent container - use flex for flex parents, height for explicit height parents
			flex={1}
			h="100%"
			w="100%"
		>
			{/* ROW 1: Controls HUD */}
			<Box>
				{showControls && (
					<RPGDialogueControls
						currentIndex={currentIndex}
						totalMessages={totalMessages}
						isStreaming={isStreaming}
						isComplete={isComplete}
						hasMore={hasMore}
						onTranscriptOpen={handleTranscriptOpen}
						onSkip={handleSkip}
						onSkipToEnd={skipToEnd}
					/>
				)}
			</Box>

			{/* ROW 2: Empty "world" spacer - clickable to advance */}
			<Box
				onClick={handleSceneClick}
				cursor="pointer"
			/>

			{/* ROW 3: Dialogue panel - anchored to bottom by grid */}
			<Box
				key={currentIndex}
				w="100%"
				animation="fadeIn 0.3s ease-out"
				onClick={handleSceneClick}
				cursor="pointer"
			>
				<DialogueBox
					content={currentMessage.message}
					speaker={currentMessage.speaker}
					speakerImage={currentMessage.image}
					hasMore={hasMore}
					externalText={displayedText}
					externalIsStreaming={isStreaming}
				/>
			</Box>

			{/* Transcript modal */}
			<TranscriptModal
				isOpen={isTranscriptOpen}
				onClose={handleTranscriptClose}
				messages={allMessages}
				currentIndex={currentIndex}
				title={transcriptTitle}
			/>
		</Box>
	)
}
