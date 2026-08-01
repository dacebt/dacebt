import { Box, Text } from "@chakra-ui/react"

interface DialogueBoxContentProps {
	displayedText: string
	isStreaming: boolean
}

export default function DialogueBoxContent({
	displayedText,
	isStreaming,
}: DialogueBoxContentProps) {
	return (
		<Text
			textStyle="dialogue"
			color="text.primary"
			position="relative"
			zIndex={1}
			whiteSpace="pre-wrap"
		>
			{displayedText}
			{isStreaming && (
				<Box
					as="span"
					aria-hidden="true"
					data-dialogue-cursor
					display="inline-block"
					w="2px"
					h="1.05em"
					ml="3px"
					verticalAlign="-0.11em"
					animation="blink 780ms steps(1) infinite"
				/>
			)}
		</Text>
	)
}
