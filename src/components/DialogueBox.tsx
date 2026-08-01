import { useEffect, useState } from "react"
import { Box, Image, Text } from "@chakra-ui/react"
import type { DialogueMessage } from "../hooks/useRPGDialogue"
import DialogueBoxContent from "./ui/DialogueBoxContent"

interface DialogueBoxProps {
	message: DialogueMessage
	displayedText: string
	isStreaming: boolean
	isCurrent: boolean
}

export default function DialogueBox({
	message,
	displayedText,
	isStreaming,
	isCurrent,
}: DialogueBoxProps) {
	const [imageError, setImageError] = useState(false)
	const speaker = message.speaker
	const isDavid = speaker === "David"
	const accent = isDavid ? "accent.teal" : "accent.green"

	useEffect(() => {
		setImageError(false)
	}, [message.image])

	return (
		<Box
			as="article"
			aria-current={isCurrent ? "true" : undefined}
			display="grid"
			gridTemplateColumns={{ base: "62px minmax(0, 1fr)", md: "84px minmax(0, 1fr)" }}
			border="1px solid"
			borderColor={isCurrent ? "accent.teal" : "border.inner"}
			borderRadius="md"
			bg={isCurrent ? "dialogueEntry.surface.current" : "dialogueEntry.surface.default"}
			boxShadow={isCurrent ? "dialogueEntry.current" : "dialogueEntry.default"}
			position="relative"
			overflow="hidden"
			animation="messageEnter 180ms ease-out both"
			css={{
				"& [data-dialogue-cursor]": {
					backgroundColor: accent,
				},
			}}
		>
			<Box
				minW={0}
				display="flex"
				alignItems="flex-end"
				justifyContent="center"
				alignSelf="stretch"
				px={{ base: "7px", md: "8px" }}
				py={{ base: "8px", md: "9px" }}
				borderRight="2px solid"
				borderRightColor={accent}
			>
				{message.image && !imageError ? (
					<Image
						src={message.image}
						alt=""
						w="auto"
						h="auto"
						maxW={{ base: "46px", md: "66px" }}
						objectFit="contain"
						flexShrink={0}
						onError={() => setImageError(true)}
					/>
				) : (
					<Box
						w={{ base: "46px", md: "66px" }}
						aspectRatio="2 / 3"
						bg={accent}
						opacity={0.12}
					/>
				)}
			</Box>

			<Box
				minW={0}
				px={{ base: "11px", md: "16px" }}
				py={{ base: "10px", md: "13px" }}
			>
				<Box display="flex" alignItems="center" gap={2} minH="18px" mb={{ base: "5px", md: "7px" }}>
					<Text
						as="span"
						textStyle="sectionLabel"
						color={accent}
						fontWeight="extrabold"
						letterSpacing="0.11em"
						textTransform="uppercase"
					>
						{speaker}
					</Text>
					<Box display={{ base: "none", md: "block" }} w="30px" h="1px" bg={accent} opacity={0.46} />
					{isCurrent && (
						<Text
							as="span"
							display={{ base: "none", md: "inline" }}
							ml="auto"
							textStyle="smallText"
							color="text.muted"
							fontWeight="bold"
							letterSpacing="0.09em"
							textTransform="uppercase"
						>
							Current
						</Text>
					)}
				</Box>

				<DialogueBoxContent
					displayedText={displayedText}
					isStreaming={isCurrent && isStreaming}
				/>
			</Box>
		</Box>
	)
}
