import { useState, useCallback } from "react"
import type { SectionId } from "../contexts/navModeContext"

export function useNavMode() {
  const [activeId, setActiveId] = useState<SectionId | undefined>(undefined)
  const [mode, setMode] = useState<"route" | "section">("route")

  const scrollToId = useCallback((id: SectionId) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const registerScrollHandler = useCallback((_handler: (id: SectionId) => void) => {
    // Stub implementation - no cleanup needed
    return () => {}
  }, [])

  return {
    activeId,
    setActiveId,
    mode,
    setMode,
    scrollToId,
    registerScrollHandler,
  }
}

