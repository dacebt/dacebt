import { useEffect, useRef } from "react"
import { Box, Portal, CloseButton, Text } from "@chakra-ui/react"
import GlassPanel from "./ui/GlassPanel"
import DialogueBox from "./DialogueBox"
import { modalShellStyles } from "./ui/modal-shell-styles"
import type { DialogueMessage } from "../hooks/useRPGDialogue"

interface TranscriptModalProps {
	isOpen: boolean
	onClose: () => void
	messages: DialogueMessage[]
	currentIndex?: number
	title?: string
}

export default function TranscriptModal({
	isOpen,
	onClose,
	messages,
	currentIndex = 0,
	title = "Transcript",
}: TranscriptModalProps) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const hasUserScrolledRef = useRef(false)

	// Scroll to current message when opened
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
				setTimeout(() => {
					element.scrollIntoView({ behavior: "smooth", block: "center" })
				}, 100)
			}
		}
	}, [isOpen, currentIndex])

	// Keyboard handler
	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault()
				onClose()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<Portal>
			{/* Backdrop - z-index 2000 (above other modals) */}
			<Box
				{...modalShellStyles.backdrop}
				position="fixed"
				top={0}
				left={0}
				right={0}
				bottom={0}
				onClick={onClose}
			/>

			{/* Content - z-index 2001 */}
			<GlassPanel
				surface="modal"
				{...modalShellStyles.content}
				position="fixed"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				zIndex={2001}
				h="85vh"
			>
				{/* Header */}
				<Box
					{...modalShellStyles.header}
				>
					<Text {...modalShellStyles.title}>
						{title}
					</Text>
					<CloseButton
						onClick={onClose}
						size="md"
						{...modalShellStyles.closeControl}
					/>
				</Box>

				{/* Scrollable message list */}
				<Box
					ref={scrollRef}
					{...modalShellStyles.body}
					onWheel={() => {
						hasUserScrolledRef.current = true
					}}
					onTouchMove={() => {
						hasUserScrolledRef.current = true
					}}
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
				</Box>

				{/* Footer with message count */}
				<Box
					{...modalShellStyles.footer}
				>
					<Text textStyle="smallText" color="text.muted">
						{messages.length} {messages.length === 1 ? "message" : "messages"}
					</Text>
				</Box>
			</GlassPanel>
		</Portal>
	)
}
