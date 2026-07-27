import { useEffect, useRef } from "react"
import { Box, Text } from "@chakra-ui/react"
import DialogueBox from "./DialogueBox"
import ModalShell from "./ui/ModalShell"
import type { DialogueMessage } from "../hooks/useRPGDialogue"

interface TranscriptModalProps {
	finalFocusEl: () => HTMLElement | null
	isOpen: boolean
	onClose: () => void
	messages: DialogueMessage[]
	currentIndex?: number
	title?: string
}

export default function TranscriptModal({
	finalFocusEl,
	isOpen,
	onClose,
	messages,
	currentIndex = 0,
	title = "Transcript",
}: TranscriptModalProps) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const hasUserScrolledRef = useRef(false)

	useEffect(() => {
		if (isOpen) {
			hasUserScrolledRef.current = false
		}
	}, [isOpen])

	useEffect(() => {
		if (!isOpen || hasUserScrolledRef.current) return

		if (scrollRef.current && currentIndex !== undefined) {
			const element = scrollRef.current.children[currentIndex] as HTMLElement | undefined
			if (element) {
				const timeoutId = window.setTimeout(() => {
					if (!hasUserScrolledRef.current) {
						element.scrollIntoView({ behavior: "smooth", block: "center" })
					}
				}, 100)

				return () => window.clearTimeout(timeoutId)
			}
		}
	}, [isOpen, currentIndex])

	return (
		<ModalShell
			open={isOpen}
			onClose={onClose}
			title={title}
			finalFocusEl={finalFocusEl}
			bodyRef={scrollRef}
			onBodyScrollIntent={() => {
				hasUserScrolledRef.current = true
			}}
			footer={
				<Text textStyle="smallText" color="text.muted">
					{messages.length} {messages.length === 1 ? "message" : "messages"}
				</Text>
			}
		>
			{messages.map((msg, idx) => (
				<Box
					key={`${msg.speaker}-${idx}`}
					mb={4}
					opacity={idx === currentIndex ? 1 : 0.6}
					transform={idx === currentIndex ? "scale(1.01)" : "scale(1)"}
					transition="all 0.2s ease"
					borderLeft={idx === currentIndex ? "3px solid" : "3px solid transparent"}
					borderColor={idx === currentIndex ? "accent.green" : "transparent"}
					pl={idx === currentIndex ? 2 : 0}
					_last={{ mb: 0 }}
				>
					<DialogueBox
						content={msg.message}
						speaker={msg.speaker}
						speakerImage={msg.image}
						hasMore={false}
						enableStreaming={false}
						variant="flat"
					/>
				</Box>
			))}
		</ModalShell>
	)
}
