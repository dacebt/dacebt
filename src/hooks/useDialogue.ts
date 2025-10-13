import { useState, useEffect, useCallback, useRef } from "react"

interface UseDialogueOptions {
  /** Array of text messages to display sequentially */
  messages: string[]
  /** Characters per tick for typing speed (default: 2) */
  speed?: number
  /** Milliseconds between ticks (default: 30) */
  tickRate?: number
  /** Auto-start typing on mount (default: true) */
  autoStart?: boolean
}

interface UseDialogueReturn {
  /** Current text being displayed (may be partial during typing) */
  currentText: string
  /** Whether text is currently being typed */
  isTyping: boolean
  /** Index of current message in the messages array */
  currentIndex: number
  /** Whether there are more messages after current */
  hasMore: boolean
  /** Whether all messages have been shown */
  isComplete: boolean
  /** Handle click - completes typing or advances to next message */
  handleClick: () => void
  /** Manually advance to next message */
  next: () => void
  /** Reset to first message */
  reset: () => void
  /** Skip typing animation and show full current message */
  skipTyping: () => void
}

export function useDialogue({
  messages,
  speed = 2,
  tickRate = 30,
  autoStart = true,
}: UseDialogueOptions): UseDialogueReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const charIndexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)

  const currentMessage = messages[currentIndex] || ""
  const hasMore = currentIndex < messages.length - 1
  const isComplete = currentIndex === messages.length - 1 && currentText === currentMessage

  // Clear interval helper
  const clearTypingInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Start typing animation
  const startTyping = useCallback(() => {
    clearTypingInterval()
    setIsTyping(true)
    charIndexRef.current = 0
    setCurrentText("")

    intervalRef.current = setInterval(() => {
      charIndexRef.current += speed

      if (charIndexRef.current >= currentMessage.length) {
        setCurrentText(currentMessage)
        setIsTyping(false)
        clearTypingInterval()
      } else {
        setCurrentText(currentMessage.slice(0, charIndexRef.current))
      }
    }, tickRate)
  }, [currentMessage, speed, tickRate, clearTypingInterval])

  // Skip typing animation and show full message
  const skipTyping = useCallback(() => {
    if (isTyping) {
      clearTypingInterval()
      setCurrentText(currentMessage)
      setIsTyping(false)
    }
  }, [isTyping, currentMessage, clearTypingInterval])

  // Advance to next message
  const next = useCallback(() => {
    if (hasMore) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [hasMore])

  // Reset to first message
  const reset = useCallback(() => {
    clearTypingInterval()
    setCurrentIndex(0)
    setCurrentText("")
    setIsTyping(false)
    charIndexRef.current = 0
  }, [clearTypingInterval])

  // Handle click - skip typing or advance
  const handleClick = useCallback(() => {
    if (isTyping) {
      skipTyping()
    } else if (hasMore) {
      next()
    }
  }, [isTyping, hasMore, skipTyping, next])

  // Start typing when message changes
  useEffect(() => {
    if (autoStart || currentIndex > 0) {
      startTyping()
    }

    return () => {
      clearTypingInterval()
    }
  }, [currentIndex, autoStart, startTyping, clearTypingInterval])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTypingInterval()
    }
  }, [clearTypingInterval])

  return {
    currentText,
    isTyping,
    currentIndex,
    hasMore,
    isComplete,
    handleClick,
    next,
    reset,
    skipTyping,
  }
}
