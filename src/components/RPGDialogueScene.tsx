import { useState, useEffect, useCallback, useRef } from "react"
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

const CONTROL_TARGET_SELECTOR = [
	"button",
	"a",
	"input",
	"select",
	"textarea",
	"summary",
	'[contenteditable]:not([contenteditable="false"])',
].join(", ")

function isControlTarget(target: EventTarget | null) {
	return target instanceof Element && target.closest(CONTROL_TARGET_SELECTOR) !== null
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
	const transcriptTriggerRef = useRef<HTMLButtonElement>(null)

	const {
		currentMessage,
		currentIndex,
		totalMessages,
		displayedText,
		isStreaming,
		hasMore,
		allMessages,
		skipStreaming,
		handleClick,
	} = useRPGDialogue({
		messages,
		autoAdvanceDelay,
		streamingSpeed,
		autoPlay,
		onComplete,
	})

	useEffect(() => {
		if (!currentMessage) {
			setIsTranscriptOpen(false)
		}
	}, [currentMessage])

	useEffect(() => {
		if (!currentMessage || isTranscriptOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			const isAdvanceKey = event.key === " " || event.key === "Enter"
			const isTranscriptKey = event.key === "t" || event.key === "T"

			if (
				(!isAdvanceKey && !isTranscriptKey) ||
				(isTranscriptKey && !showControls) ||
				isControlTarget(event.target)
			) {
				return
			}

			if (isAdvanceKey) {
				event.preventDefault()
				handleClick()
			} else {
				event.preventDefault()
				setIsTranscriptOpen(true)
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [currentMessage, isTranscriptOpen, handleClick, showControls])

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
						hasMore={hasMore}
						onTranscriptOpen={handleTranscriptOpen}
						onSkip={handleSkip}
						transcriptTriggerRef={transcriptTriggerRef}
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
				finalFocusEl={() => transcriptTriggerRef.current}
				isOpen={isTranscriptOpen}
				onClose={handleTranscriptClose}
				messages={allMessages}
				currentIndex={currentIndex}
				title={transcriptTitle}
			/>
		</Box>
	)
}
