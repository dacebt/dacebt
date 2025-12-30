/**
 * Returns animation style that respects prefers-reduced-motion
 * @param animation - The animation string to apply
 * @returns Animation string or "none" if user prefers reduced motion
 */
export function getAnimation(animation: string): string {
  if (typeof window === "undefined") {
    return animation
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return prefersReducedMotion ? "none" : animation
}

