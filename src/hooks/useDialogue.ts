import { useState, useEffect, useCallback, useRef } from "react"

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

interface UseDialogueOptions {
  /** Array of dialogue messages to display sequentially */
  messages: DialogueMessage[]
  /** Characters per tick for typing speed (default: 2) */
  speed?: number
  /** Milliseconds between ticks (default: 30) */
  tickRate?: number
  /** Auto-start typing on mount (default: true) */
  autoStart?: boolean
  /** Enable global click and spacebar interaction (default: false) */
  useGlobalInteraction?: boolean
}

interface UseDialogueReturn {
  /** Current text being displayed (may be partial during typing) */
  currentText: string
  /** Current message object with speaker and image info */
  currentMessage: DialogueMessage
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
  useGlobalInteraction = false,
}: UseDialogueOptions): UseDialogueReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const charIndexRef = useRef(0)
  const intervalRef = useRef<number | null>(null)

  const currentMessageObj = messages[currentIndex] || { message: "", speaker: "" }
  const currentMessage = currentMessageObj.message
  const hasMore = currentIndex < messages.length - 1
  const isComplete = currentIndex === messages.length - 1 && currentText === currentMessage

  // Helper function to check if element is interactive
  const isInteractiveElement = useCallback((element: EventTarget | null): boolean => {
    if (!element || !(element instanceof Element)) return false

    const tagName = element.tagName.toLowerCase()
    const role = element.getAttribute("role")
    const cursor = getComputedStyle(element).cursor
    const hasOnClick =
      element.hasAttribute("onclick") || (element as HTMLDivElement).onclick !== null

    // Check for interactive HTML elements
    const interactiveTags = ["button", "a", "input", "textarea", "select", "option", "label"]
    if (interactiveTags.includes(tagName)) return true

    // Check for interactive roles
    const interactiveRoles = [
      "button",
      "link",
      "menuitem",
      "tab",
      "option",
      "checkbox",
      "radio",
      "switch",
    ]
    if (role && interactiveRoles.includes(role)) return true

    // Check for pointer cursor or onclick handler
    if (cursor === "pointer" || hasOnClick) return true

    // Check if element is inside an interactive container
    const parent = element.closest('button, a, [role="button"], [role="link"], [onclick]')
    if (parent) return true

    return false
  }, [])

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

  // Global click handler
  const handleGlobalClick = useCallback(
    (event: MouseEvent) => {
      if (isInteractiveElement(event.target)) return
      handleClick()
    },
    [isInteractiveElement, handleClick]
  )

  const handleGlobalKeyDown = useCallback(() => {
    // No spacebar handling - only handle other keys if needed
  }, [])

  // Start typing when message changes
  useEffect(() => {
    if (autoStart || currentIndex > 0) {
      startTyping()
    }

    return () => {
      clearTypingInterval()
    }
  }, [currentIndex, autoStart, startTyping, clearTypingInterval])

  // Global event listeners
  useEffect(() => {
    if (!useGlobalInteraction) return

    document.addEventListener("click", handleGlobalClick)
    document.addEventListener("keydown", handleGlobalKeyDown)

    return () => {
      document.removeEventListener("click", handleGlobalClick)
      document.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [useGlobalInteraction, handleGlobalClick, handleGlobalKeyDown])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTypingInterval()
    }
  }, [clearTypingInterval])

  return {
    currentText,
    currentMessage: currentMessageObj,
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
