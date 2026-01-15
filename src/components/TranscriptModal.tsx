import { useEffect, useRef } from "react"
import { Box, Portal, CloseButton, Text } from "@chakra-ui/react"
import GlassPanel from "./ui/GlassPanel"
import DialogueBox from "./DialogueBox"
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

	// Scroll to current message when opened
	useEffect(() => {
		if (isOpen && scrollRef.current && currentIndex !== undefined) {
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
				position="fixed"
				top={0}
				left={0}
				right={0}
				bottom={0}
				bg="black.alpha.80"
				backdropFilter="blur(8px)"
				zIndex={2000}
				onClick={onClose}
				animation="fadeIn 0.2s ease-out"
			/>

			{/* Content - z-index 2001 */}
			<GlassPanel
				elevation="strong"
				role="container"
				position="fixed"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				zIndex={2001}
				w="90vw"
				maxW="800px"
				maxH="85vh"
				overflow="hidden"
				display="flex"
				flexDirection="column"
				animation="slideIn 0.3s ease-out"
			>
				{/* Header */}
				<Box
					p={4}
					borderBottom="1px solid"
					borderColor="border.inner"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
				>
					<Text textStyle="pageSubtitle" color="text.primary" fontWeight="bold">
						{title}
					</Text>
					<CloseButton
						onClick={onClose}
						color="text.muted"
						size="md"
						bg="black.alpha.30"
						borderRadius="full"
						_hover={{
							color: "text.primary",
							bg: "accent.tealAlpha.20",
						}}
						border="1px solid"
						borderColor="border.inner"
					/>
				</Box>

				{/* Scrollable message list */}
				<Box
					ref={scrollRef}
					flex={1}
					overflowY="auto"
					p={4}
					css={{
						"&::-webkit-scrollbar": {
							width: "8px",
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "var(--chakra-colors-accent-teal-alpha-30)",
							borderRadius: "4px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "var(--chakra-colors-accent-teal-alpha-50)",
						},
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
					p={3}
					borderTop="1px solid"
					borderColor="border.inner"
					textAlign="center"
					flexShrink={0}
				>
					<Text textStyle="smallText" color="text.muted">
						{messages.length} {messages.length === 1 ? "message" : "messages"}
					</Text>
				</Box>
			</GlassPanel>
		</Portal>
	)
}
