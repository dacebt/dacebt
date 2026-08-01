import { useCallback, useEffect, useReducer, useSyncExternalStore } from "react"
import { prefersReducedMotion, subscribeReducedMotion } from "../utils/motion"

export interface DialogueMessage {
	/** The dialogue text content */
	message: string
	/** Speaker name for the label */
	speaker: string
	/** Path to speaker image */
	image?: string
}

interface UseRPGDialogueOptions {
	/** Array of dialogue messages to display sequentially */
	messages: DialogueMessage[]
	/** Delay after a completed line before the next message appears */
	autoAdvanceDelay?: number
	/** Delay in ms per character for the typewriter effect (default: 30) */
	streamingSpeed?: number
}

interface UseRPGDialogueReturn {
	/** Messages the visitor has reached */
	visibleMessages: DialogueMessage[]
	/** Index of the message currently being presented */
	currentIndex: number
	/** Currently displayed portion of the active message */
	displayedText: string
	/** Whether the active message is still streaming */
	isStreaming: boolean
	/** Skip the active stream or append the next message */
	handleAdvance: () => void
}

interface DialogueState {
	currentIndex: number
	displayedText: string
	isStreaming: boolean
}

type DialogueAction =
	| { type: "stream"; index: number; text: string }
	| { type: "complete"; index: number; text: string }
	| { type: "next"; index: number; text: string; isStreaming: boolean }

function dialogueReducer(state: DialogueState, action: DialogueAction): DialogueState {
	if (action.type === "next") {
		return {
			currentIndex: action.index,
			displayedText: action.text,
			isStreaming: action.isStreaming,
		}
	}

	if (state.currentIndex !== action.index) {
		return state
	}

	if (action.type === "complete") {
		return {
			...state,
			displayedText: action.text,
			isStreaming: false,
		}
	}

	if (!state.isStreaming) {
		return state
	}

	return {
		...state,
		displayedText: action.text,
	}
}

const stableServerSnapshotFalse = () => false

export function useRPGDialogue({
	messages,
	autoAdvanceDelay = 1500,
	streamingSpeed = 30,
}: UseRPGDialogueOptions): UseRPGDialogueReturn {
	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		prefersReducedMotion,
		stableServerSnapshotFalse,
	)
	const [state, dispatch] = useReducer(dialogueReducer, undefined, (): DialogueState => ({
		currentIndex: 0,
		displayedText: reduceMotion ? (messages[0]?.message ?? "") : "",
		isStreaming: !reduceMotion && messages.length > 0,
	}))

	const currentMessage = messages[state.currentIndex]
	const fullText = currentMessage?.message ?? ""
	const displayedText = reduceMotion ? fullText : state.displayedText
	const isStreaming = state.isStreaming && !reduceMotion
	const hasMore = state.currentIndex < messages.length - 1
	const visibleMessages = messages.slice(0, Math.min(state.currentIndex + 1, messages.length))

	useEffect(() => {
		if (!reduceMotion || !currentMessage || !state.isStreaming) return

		dispatch({
			type: "complete",
			index: state.currentIndex,
			text: fullText,
		})
	}, [currentMessage, fullText, reduceMotion, state.currentIndex, state.isStreaming])

	useEffect(() => {
		if (!currentMessage || !isStreaming) return

		if (state.displayedText.length >= fullText.length) {
			dispatch({
				type: "complete",
				index: state.currentIndex,
				text: fullText,
			})
			return
		}

		const timeoutId = window.setTimeout(() => {
			dispatch({
				type: "stream",
				index: state.currentIndex,
				text: fullText.slice(0, state.displayedText.length + 1),
			})
		}, streamingSpeed)

		return () => window.clearTimeout(timeoutId)
	}, [
		currentMessage,
		fullText,
		state.currentIndex,
		state.displayedText,
		isStreaming,
		streamingSpeed,
	])

	const skipStreaming = useCallback(() => {
		if (!currentMessage || !isStreaming) return

		dispatch({
			type: "complete",
			index: state.currentIndex,
			text: fullText,
		})
	}, [currentMessage, fullText, isStreaming, state.currentIndex])

	const next = useCallback(() => {
		if (isStreaming || !hasMore) return

		const nextIndex = state.currentIndex + 1
		dispatch({
			type: "next",
			index: nextIndex,
			text: reduceMotion ? (messages[nextIndex]?.message ?? "") : "",
			isStreaming: !reduceMotion,
		})
	}, [hasMore, isStreaming, messages, reduceMotion, state.currentIndex])

	useEffect(() => {
		if (reduceMotion || isStreaming || !hasMore) return

		const timeoutId = window.setTimeout(next, autoAdvanceDelay)
		return () => window.clearTimeout(timeoutId)
	}, [autoAdvanceDelay, hasMore, isStreaming, next, reduceMotion])

	const handleAdvance = useCallback(() => {
		if (isStreaming) {
			skipStreaming()
			return
		}

		next()
	}, [isStreaming, next, skipStreaming])

	return {
		visibleMessages,
		currentIndex: state.currentIndex,
		displayedText,
		isStreaming,
		handleAdvance,
	}
}
