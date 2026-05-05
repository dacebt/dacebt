import { useEffect } from "react"
import { Box, Portal, CloseButton, Flex, Text } from "@chakra-ui/react"
import GlassPanel from "./ui/GlassPanel"
import type { Project } from "../data/projects"

interface ProjectDetailModalProps {
	project: Project | null
	onClose: () => void
}

interface SectionProps {
	label: string
	items: string[]
}

function Section({ label, items }: SectionProps) {
	if (items.length === 0) return null

	return (
		<Box mb={5} _last={{ mb: 0 }}>
			<Text
				textStyle="speakerLabel"
				color="accent.teal"
				mb={2}
				pb={1}
				borderBottom="1px solid"
				borderColor="border.inner"
			>
				{label}
			</Text>
			<Flex flexDirection="column" gap={1.5}>
				{items.map((item, idx) => (
					<Flex
						key={`${label}-${idx}`}
						gap={2}
						alignItems="flex-start"
					>
						<Text
							as="span"
							textStyle="smallText"
							color="accent.teal"
							lineHeight="1.6"
							flexShrink={0}
						>
							▸
						</Text>
						<Text
							textStyle="dialogue"
							color="text.primary"
							fontSize={{ base: "sm", md: "md" }}
							lineHeight="1.6"
						>
							{item}
						</Text>
					</Flex>
				))}
			</Flex>
		</Box>
	)
}

export default function ProjectDetailModal({
	project,
	onClose,
}: ProjectDetailModalProps) {
	useEffect(() => {
		if (!project) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault()
				onClose()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [project, onClose])

	if (!project) return null

	return (
		<Portal>
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

			<GlassPanel
				elevation="strong"
				cornerAccents
				position="fixed"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				zIndex={2001}
				w="90vw"
				maxW="800px"
				maxH="85vh"
				overflow="hidden"
				border="2px solid"
				borderColor="accent.tealAlpha.40"
				boxShadow="modal.content, glow.teal.medium"
				animation="fadeIn 0.2s ease-out"
				display="flex"
				flexDirection="column"
			>
				<Box
					p={4}
					borderBottom="1px solid"
					borderColor="border.inner"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
				>
					<Text
						textStyle="pageTitle"
						color="text.primary"
						fontSize={{ base: "xl", md: "2xl" }}
					>
						{project.name}
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

				<Box
					flex={1}
					minH={0}
					overflowY="auto"
					p={5}
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
					<Section label="FEATURES" items={project.keyFeatures} />
					<Section label="METRICS" items={project.metrics} />
					<Section label="CONTRIBUTIONS" items={project.contributions} />
				</Box>
			</GlassPanel>
		</Portal>
	)
}
