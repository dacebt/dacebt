import { useState, useCallback } from "react"

export interface DialogueMessage {
  /** The dialogue text content */
  message: string
  /** Speaker name for the label */
  speaker: string
  /** Path to speaker image */
  image?: string
  /** Where to position the speaker image (defaults to 'left') */
  imagePosition?: "left" | "right" | "center"
}

interface UseSimpleDialogueOptions {
  /** Array of dialogue messages to display sequentially */
  messages: DialogueMessage[]
}

interface UseSimpleDialogueReturn {
  /** Current message object with speaker and image info */
  currentMessage: DialogueMessage
  /** Index of current message in the messages array */
  currentIndex: number
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentMessage = messages[currentIndex] || { message: "", speaker: "" }
  const totalMessages = messages.length
  const hasMore = currentIndex < messages.length - 1
  const isComplete = currentIndex === messages.length - 1

  // Advance to next message
  const next = useCallback(() => {
    if (hasMore) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [hasMore])

  // Skip to the last message
  const skipToEnd = useCallback(() => {
    setCurrentIndex(messages.length - 1)
  }, [messages.length])

  // Reset to first message
  const reset = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  // Handle click - advance to next message
  const handleClick = useCallback(() => {
    next()
  }, [next])

  return {
    currentMessage,
    currentIndex,
    totalMessages,
    hasMore,
    isComplete,
    handleClick,
    next,
    skipToEnd,
    reset,
  }
}
