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
}

// Helper to inject animations into document head
export const injectAnimations = (animationKeys: (keyof typeof animations)[]) => {
  const style = document.createElement("style")
  style.textContent = animationKeys.map((key) => animations[key]).join("\n")
  document.head.appendChild(style)
  return () => {
    if (document.head.contains(style)) {
      document.head.removeChild(style)
    }
  }
}
