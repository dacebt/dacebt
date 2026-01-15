import { Box } from "@chakra-ui/react"
import RPGDialogueScene from "../components/RPGDialogueScene"
import { welcomeMessages } from "../data/home"

export default function HomePage() {
	return (
		<Box
			h="100%"
			minH="100%"
			display="flex"
			flexDirection="column"
		>
			<RPGDialogueScene
				messages={welcomeMessages}
				autoAdvanceDelay={2000}
				autoPlay={true}
				transcriptTitle="Welcome"
			/>
		</Box>
	)
}
