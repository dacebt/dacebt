import React, { useState, useEffect } from "react"
import { Box, Image } from "@chakra-ui/react"
import GlassPanel from "./ui/GlassPanel"
import DialogueBoxContent from "./ui/DialogueBoxContent"

interface DialogueBoxProps {
	content: string
	speaker?: string
	speakerImage?: string
	hasMore?: boolean
	onClick?: () => void
	enableStreaming?: boolean
	streamingSpeed?: number
	variant?: "default" | "flat"
	externalText?: string
	externalIsStreaming?: boolean
}

// Layout constants
const LAYOUT = {
	portraitSlot: { base: 96, md: 132 },
	portraitSize: { base: 80, md: 112 },
	gap: { base: 12, md: 16 },
	padding: { base: 12, md: 16 },
}

const DialogueBox = React.forwardRef<HTMLDivElement, DialogueBoxProps>(
	(
		{
			content,
			speaker,
			speakerImage,
			hasMore = true,
			onClick,
			enableStreaming = true,
			streamingSpeed = 30,
			variant = "default",
			externalText,
			externalIsStreaming,
		},
		ref
	) => {
		const isFlat = variant === "flat"
		const useExternalControl = externalText !== undefined
		const [internalDisplayedText, setInternalDisplayedText] = useState("")
		const [internalIsStreaming, setInternalIsStreaming] = useState(false)
		const [imageError, setImageError] = useState(false)

		const displayedText = useExternalControl ? externalText : internalDisplayedText
		const isStreaming = useExternalControl ? (externalIsStreaming ?? false) : internalIsStreaming

		useEffect(() => {
			if (useExternalControl) return

			if (!enableStreaming) {
				setInternalDisplayedText(content)
				setInternalIsStreaming(false)
				return
			}

			setInternalDisplayedText("")
			setInternalIsStreaming(true)

			let currentIndex = 0
			const interval = setInterval(() => {
				if (currentIndex < content.length) {
					setInternalDisplayedText(content.slice(0, currentIndex + 1))
					currentIndex++
				} else {
					setInternalIsStreaming(false)
					clearInterval(interval)
				}
			}, streamingSpeed)

			return () => clearInterval(interval)
		}, [content, enableStreaming, streamingSpeed, useExternalControl])

		useEffect(() => {
			setImageError(false)
		}, [speakerImage])

		// FLAT VARIANT - Simple layout for transcript modal
		if (isFlat) {
			return (
				<Box
					ref={ref}
					position="relative"
					px={{ base: 3, md: 4 }}
					py={{ base: 2, md: 3 }}
					cursor={onClick ? "pointer" : "default"}
					onClick={onClick}
				>
					<Box
						display="grid"
					gridTemplateColumns={speakerImage ? "64px 1fr" : "1fr"}
						gap={3}
						alignItems="flex-start"
					>
						{speakerImage && !imageError && (
							<Box
								w="64px"
								h="64px"
								borderRadius="md"
								overflow="hidden"
								border="1px solid"
								borderColor="border.inner"
								flexShrink={0}
							>
								<Image
									src={speakerImage}
									alt={speaker || "Speaker"}
									w="100%"
									h="100%"
									objectFit="cover"
									onError={() => setImageError(true)}
								/>
							</Box>
						)}
						<DialogueBoxContent displayedText={displayedText} isStreaming={isStreaming} />
					</Box>
				</Box>
			)
		}

		// DEFAULT VARIANT - RPG-style dialogue panel
		// Layout: 2-column grid
		//   Column A: Portrait frame + Nameplate below it
		//   Column B: Text content
		//   Arrow: Absolute bottom-right
		return (
			<GlassPanel
				ref={ref}
				boxShadow="dialogue.default"
				position="relative"
				cursor={onClick ? "pointer" : "default"}
				onClick={onClick}
				p={{
					base: `${LAYOUT.padding.base}px`,
					md: `${LAYOUT.padding.md}px`,
				}}
			>
				{/* 2-COLUMN GRID: Portrait+Name column | Text column */}
				<Box
					display="grid"
					gridTemplateColumns={{
						base: `${LAYOUT.portraitSlot.base}px 1fr`,
						md: `${LAYOUT.portraitSlot.md}px 1fr`,
					}}
					gap={{
						base: `${LAYOUT.gap.base}px`,
						md: `${LAYOUT.gap.md}px`,
					}}
					alignItems="start"
				>
				{/* COLUMN A: Portrait */}
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						gap={2}
					>
						{/* Portrait Frame */}
						<Box
							w={{
								base: `${LAYOUT.portraitSize.base}px`,
								md: `${LAYOUT.portraitSize.md}px`,
							}}
							h={{
								base: `${LAYOUT.portraitSize.base}px`,
								md: `${LAYOUT.portraitSize.md}px`,
							}}
							borderRadius="md"
							overflow="hidden"
							border="3px solid"
							borderColor="border.inner"
							boxShadow="inset 0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.4)"
							bg="bg.steel"
							display="flex"
							alignItems="center"
							justifyContent="center"
							flexShrink={0}
						>
							{speakerImage && !imageError ? (
								<Image
									src={speakerImage}
									alt={speaker || "Speaker"}
									w="100%"
									h="100%"
									objectFit="cover"
									onError={() => setImageError(true)}
								/>
							) : (
								<Box
									w="40%"
									h="40%"
									borderRadius="full"
									bg="accent.tealAlpha.20"
									border="1px solid"
									borderColor="accent.tealAlpha.30"
								/>
							)}
						</Box>

					</Box>

					{/* COLUMN B: Text Content */}
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						minH={{ base: "80px", md: "100px" }}
						pr={{ base: 5, md: 6 }}
					>
						<DialogueBoxContent displayedText={displayedText} isStreaming={isStreaming} />
					</Box>
				</Box>

				{/* ADVANCE ARROW - Absolute bottom-right */}
				{hasMore && (
					<Box
						position="absolute"
						bottom={{ base: "10px", md: "14px" }}
						right={{ base: "10px", md: "14px" }}
						w="0"
						h="0"
						borderLeft="8px solid transparent"
						borderRight="8px solid transparent"
						borderTop="10px solid"
						borderTopColor="accent.green"
						opacity={0.9}
						animation="bounce 1.5s ease-in-out infinite"
					/>
				)}
			</GlassPanel>
		)
	}
)

DialogueBox.displayName = "DialogueBox"

export default DialogueBox
