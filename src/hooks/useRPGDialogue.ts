import { useState, useCallback, useEffect, useRef } from "react"

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
	/** Delay in ms after streaming completes before auto-advancing (default: 1500) */
	autoAdvanceDelay?: number
	/** Delay in ms per character for typewriter effect (default: 30) */
	streamingSpeed?: number
	/** Whether to automatically advance through messages (default: true) */
	autoPlay?: boolean
	/** Callback when all messages have been shown */
	onComplete?: () => void
}

interface UseRPGDialogueReturn {
	/** Current message being displayed */
	currentMessage: DialogueMessage | null
	/** Index of current message */
	currentIndex: number
	/** Total number of messages */
	totalMessages: number
	/** Currently displayed portion of text (for typewriter effect) */
	displayedText: string
	/** Whether typewriter animation is active */
	isStreaming: boolean
	/** Whether auto-advance is enabled */
	isPlaying: boolean
	/** Whether all messages have been shown and final message is complete */
	isComplete: boolean
	/** Whether there are more messages after current */
	hasMore: boolean
	/** All messages (for transcript) */
	allMessages: DialogueMessage[]
	/** Skip to end of current message's text */
	skipStreaming: () => void
	/** Jump to final message, fully rendered */
	skipToEnd: () => void
	/** Manually advance to next message */
	next: () => void
	/** Pause auto-advance */
	pause: () => void
	/** Resume auto-advance */
	resume: () => void
	/** Return to first message */
	reset: () => void
	/** Handle click - skip streaming or advance */
	handleClick: () => void
}

export function useRPGDialogue({
	messages,
	autoAdvanceDelay = 1500,
	streamingSpeed = 30,
	autoPlay = true,
	onComplete,
}: UseRPGDialogueOptions): UseRPGDialogueReturn {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [displayedText, setDisplayedText] = useState("")
	const [isStreaming, setIsStreaming] = useState(true)
	const [isPlaying, setIsPlaying] = useState(autoPlay)

	const streamingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const onCompleteCalledRef = useRef(false)

	const currentMessage = messages[currentIndex] ?? null
	const fullText = currentMessage?.message ?? ""
	const hasMore = currentIndex < messages.length - 1
	const isComplete = currentIndex === messages.length - 1 && !isStreaming

	// Clear timers helper
	const clearTimers = useCallback(() => {
		if (streamingIntervalRef.current) {
			clearInterval(streamingIntervalRef.current)
			streamingIntervalRef.current = null
		}
		if (autoAdvanceTimerRef.current) {
			clearTimeout(autoAdvanceTimerRef.current)
			autoAdvanceTimerRef.current = null
		}
	}, [])

	// Typewriter effect
	useEffect(() => {
		if (!currentMessage || !isStreaming) return

		setDisplayedText("")
		let charIndex = 0

		streamingIntervalRef.current = setInterval(() => {
			if (charIndex < fullText.length) {
				setDisplayedText(fullText.slice(0, charIndex + 1))
				charIndex++
			} else {
				setIsStreaming(false)
				if (streamingIntervalRef.current) {
					clearInterval(streamingIntervalRef.current)
					streamingIntervalRef.current = null
				}
			}
		}, streamingSpeed)

		return () => {
			if (streamingIntervalRef.current) {
				clearInterval(streamingIntervalRef.current)
				streamingIntervalRef.current = null
			}
		}
	}, [currentIndex, currentMessage, fullText, streamingSpeed, isStreaming])

	// Auto-advance timer
	useEffect(() => {
		if (isStreaming || !isPlaying || !hasMore) return

		autoAdvanceTimerRef.current = setTimeout(() => {
			setCurrentIndex((prev) => prev + 1)
			setIsStreaming(true)
		}, autoAdvanceDelay)

		return () => {
			if (autoAdvanceTimerRef.current) {
				clearTimeout(autoAdvanceTimerRef.current)
				autoAdvanceTimerRef.current = null
			}
		}
	}, [isStreaming, isPlaying, hasMore, autoAdvanceDelay])

	// Call onComplete when finished
	useEffect(() => {
		if (isComplete && !onCompleteCalledRef.current && onComplete) {
			onCompleteCalledRef.current = true
			onComplete()
		}
	}, [isComplete, onComplete])

	// Reset onComplete flag when messages change
	useEffect(() => {
		onCompleteCalledRef.current = false
	}, [messages])

	// Skip to end of current message
	const skipStreaming = useCallback(() => {
		clearTimers()
		setDisplayedText(fullText)
		setIsStreaming(false)
	}, [fullText, clearTimers])

	// Jump to final message, fully rendered
	const skipToEnd = useCallback(() => {
		clearTimers()
		const lastIndex = messages.length - 1
		setCurrentIndex(lastIndex)
		setDisplayedText(messages[lastIndex]?.message ?? "")
		setIsStreaming(false)
	}, [messages, clearTimers])

	// Manually advance to next message
	const next = useCallback(() => {
		if (hasMore) {
			clearTimers()
			setCurrentIndex((prev) => prev + 1)
			setIsStreaming(true)
		}
	}, [hasMore, clearTimers])

	// Pause auto-advance
	const pause = useCallback(() => {
		setIsPlaying(false)
		if (autoAdvanceTimerRef.current) {
			clearTimeout(autoAdvanceTimerRef.current)
			autoAdvanceTimerRef.current = null
		}
	}, [])

	// Resume auto-advance
	const resume = useCallback(() => {
		setIsPlaying(true)
	}, [])

	// Return to first message
	const reset = useCallback(() => {
		clearTimers()
		setCurrentIndex(0)
		setDisplayedText("")
		setIsStreaming(true)
		setIsPlaying(autoPlay)
		onCompleteCalledRef.current = false
	}, [autoPlay, clearTimers])

	// Handle click - skip streaming or advance to next
	const handleClick = useCallback(() => {
		if (isStreaming) {
			skipStreaming()
		} else if (hasMore) {
			next()
		}
	}, [isStreaming, hasMore, skipStreaming, next])

	// Cleanup on unmount
	useEffect(() => {
		return () => clearTimers()
	}, [clearTimers])

	return {
		currentMessage,
		currentIndex,
		totalMessages: messages.length,
		displayedText,
		isStreaming,
		isPlaying,
		isComplete,
		hasMore,
		allMessages: messages,
		skipStreaming,
		skipToEnd,
		next,
		pause,
		resume,
		reset,
		handleClick,
	}
}
