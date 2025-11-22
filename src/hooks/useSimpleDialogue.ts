import { useState, useCallback } from "react"

export interface DialogueMessage {
  /** The dialogue text content */
  message: string
  /** Speaker name for the label */
  speaker: string
  /** Path to speaker image */
  image?: string
}

interface UseSimpleDialogueOptions {
  /** Array of dialogue messages to display sequentially */
  messages: DialogueMessage[]
}

interface UseSimpleDialogueReturn {
  /** Array of visible messages to display */
  visibleMessages: DialogueMessage[]
  /** Latest visible message object with speaker and image info */
  latestMessage: DialogueMessage
  /** Number of currently visible messages */
  visibleCount: number
  /** Total number of messages */
  totalMessages: number
  /** Whether there are more messages after current */
  hasMore: boolean
  /** Whether all messages have been shown */
  isComplete: boolean
  /** Handle click - advances to next message */
  handleClick: () => void
  /** Manually advance to next message */
  next: () => void
  /** Skip to the last message */
  skipToEnd: () => void
  /** Reset to first message */
  reset: () => void
}

export function useSimpleDialogue({
  messages,
}: UseSimpleDialogueOptions): UseSimpleDialogueReturn {
  const [visibleCount, setVisibleCount] = useState(1)

  const visibleMessages = messages.slice(0, visibleCount)
  const latestMessage = visibleMessages[visibleMessages.length - 1] || { message: "", speaker: "" }
  const totalMessages = messages.length
  const hasMore = visibleCount < messages.length
  const isComplete = visibleCount === messages.length

  // Advance to next message
  const next = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + 1, messages.length))
    }
  }, [hasMore, messages.length])

  // Skip to the last message
  const skipToEnd = useCallback(() => {
    setVisibleCount(messages.length)
  }, [messages.length])

  // Reset to first message
  const reset = useCallback(() => {
    setVisibleCount(1)
  }, [])

  // Handle click - advance to next message
  const handleClick = useCallback(() => {
    next()
  }, [next])

  return {
    visibleMessages,
    latestMessage,
    visibleCount,
    totalMessages,
    hasMore,
    isComplete,
    handleClick,
    next,
    skipToEnd,
    reset,
  }
}
