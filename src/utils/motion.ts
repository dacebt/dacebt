const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches
}

export function getAnimation(animation: string): string {
  return prefersReducedMotion() ? "none" : animation
}
