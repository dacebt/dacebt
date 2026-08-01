const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches
}

export function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}

  const mediaQuery = window.matchMedia(reducedMotionQuery)
  const handleChange = () => onChange()
  mediaQuery.addEventListener("change", handleChange)

  return () => mediaQuery.removeEventListener("change", handleChange)
}

export function getAnimation(animation: string): string {
  return prefersReducedMotion() ? "none" : animation
}
