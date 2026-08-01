import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import { useRPGDialogue, type DialogueMessage } from "../hooks/useRPGDialogue"

interface RPGDialogueSceneProps {
	messages: DialogueMessage[]
	autoAdvanceDelay?: number
	streamingSpeed?: number
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
}: RPGDialogueSceneProps) {
	const [announcement, setAnnouncement] = useState<{
		id: number
		text: string
	} | null>(null)
	const {
		visibleMessages,
		currentIndex,
		displayedText,
		isStreaming,
		handleAdvance,
	} = useRPGDialogue({ messages, autoAdvanceDelay, streamingSpeed })

	useEffect(() => {
		if (currentIndex === 0) return

		const currentMessage = messages[currentIndex]
		if (!currentMessage) return

		setAnnouncement({
			id: currentIndex,
			text: `${currentMessage.speaker} added a message below the previous one.`,
		})
	}, [currentIndex, messages])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				(event.key !== " " && event.key !== "Enter") ||
				isControlTarget(event.target)
			) {
				return
			}

			event.preventDefault()
			handleAdvance()
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [handleAdvance])

	if (visibleMessages.length === 0) {
		return null
	}

	return (
		<Box
			minH="100%"
			w="100%"
			display="flex"
			flexDirection="column"
			justifyContent="flex-end"
			cursor="pointer"
			onClick={handleAdvance}
			css={{ overflowAnchor: "none" }}
		>
			<Box
				display="flex"
				flexDirection="column"
				flexShrink={0}
				gap={{ base: 2.5, md: 3.5 }}
			>
				{visibleMessages.map((message, index) => {
					const isCurrent = index === currentIndex

					return (
						<DialogueBox
							key={`${message.speaker}-${index}`}
							message={message}
							displayedText={isCurrent ? displayedText : message.message}
							isStreaming={isCurrent && isStreaming}
							isCurrent={isCurrent}
						/>
					)
				})}
			</Box>

			<Box
				position="absolute"
				w="1px"
				h="1px"
				p={0}
				m="-1px"
				overflow="hidden"
				clip="rect(0, 0, 0, 0)"
				whiteSpace="nowrap"
				border={0}
				aria-live="polite"
				aria-atomic="true"
			>
				{announcement && <span key={announcement.id}>{announcement.text}</span>}
			</Box>
		</Box>
	)
}
