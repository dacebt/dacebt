// Common animation keyframes used across components
export const animations = {
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
  `,

  pulseScale: `
    @keyframes pulseScale {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.1);
      }
    }
  `,

  activePulse: `
    @keyframes activePulse {
      0%, 100% { 
        opacity: 1;
        transform: scale(1);
      }
      50% { 
        opacity: 0.7;
        transform: scale(1.1);
      }
    }
  `,

  shimmer: `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,

  infiniteScroll: `
    @keyframes infiniteScroll {
      0% { transform: translate(-50vw, 50vh); }
      50% { transform: translate(50vw, -50vh); }
      100% { transform: translate(-50vw, 50vh); }
    }
  `,

  slideIn: `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `,

  borderGlow: `
    @keyframes borderGlow {
      0%, 100% {
        box-shadow: 
          inset 0 0 0 4px var(--chakra-colors-border-inner),
          inset 0 0 0 8px var(--chakra-colors-border-outer),
          0 0 0 4px var(--chakra-colors-accent-teal),
          0 0 20px var(--chakra-colors-accent-teal-alpha-10);
      }
      50% {
        box-shadow: 
          inset 0 0 0 4px var(--chakra-colors-border-inner),
          inset 0 0 0 8px var(--chakra-colors-border-outer),
          0 0 0 4px var(--chakra-colors-accent-teal),
          0 0 30px var(--chakra-colors-accent-teal-alpha-20);
      }
    }
  `,

  depthPulse: `
    @keyframes depthPulse {
      0%, 100% {
        transform: translateZ(0);
        box-shadow: 
          inset 0 0 0 2px var(--chakra-colors-white-alpha-10),
          inset 0 0 0 4px var(--chakra-colors-border-inner),
          inset 0 0 0 8px var(--chakra-colors-border-outer),
          0 0 0 4px var(--chakra-colors-border-inner),
          0 4px 20px var(--chakra-colors-black-alpha-30),
          0 8px 40px var(--chakra-colors-black-alpha-20),
          0 16px 60px var(--chakra-colors-black-alpha-10);
      }
      50% {
        transform: translateZ(2px);
        box-shadow: 
          inset 0 0 0 2px var(--chakra-colors-white-alpha-15),
          inset 0 0 0 4px var(--chakra-colors-border-inner),
          inset 0 0 0 8px var(--chakra-colors-border-outer),
          0 0 0 4px var(--chakra-colors-border-inner),
          0 6px 30px var(--chakra-colors-black-alpha-40),
          0 12px 50px var(--chakra-colors-black-alpha-30),
          0 20px 80px var(--chakra-colors-black-alpha-20);
      }
    }
  `,
}

// Track injected animations to prevent duplicates
const injectedAnimationIds = new Set<string>()

// Helper to inject animations into document head with deduplication
export const injectAnimations = (animationKeys: (keyof typeof animations)[]) => {
  const styleId = `animations-${animationKeys.sort().join("-")}`
  
  // Skip if already injected
  if (injectedAnimationIds.has(styleId)) {
    return () => {
      // No-op cleanup if already injected
    }
  }

  const style = document.createElement("style")
  style.id = styleId
  style.textContent = animationKeys.map((key) => animations[key]).join("\n")
  document.head.appendChild(style)
  injectedAnimationIds.add(styleId)

  return () => {
    if (document.head.contains(style)) {
      document.head.removeChild(style)
      injectedAnimationIds.delete(styleId)
    }
  }
}

// Helper to get all animation keys with proper typing
const getAllAnimationKeys = (): Array<keyof typeof animations> => {
  return Object.keys(animations) as Array<keyof typeof animations>
}

// Inject all app-wide animations at once
export const injectAllAnimations = () => {
  return injectAnimations(getAllAnimationKeys())
}
