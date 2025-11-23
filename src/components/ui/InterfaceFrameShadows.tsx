interface InterfaceFrameShadowsProps {
  isActive: boolean
  config: {
    shadowIntensity: number
    innerGlow: number
  }
}

export default function InterfaceFrameShadows({ isActive, config }: InterfaceFrameShadowsProps) {
  const accentColor = "var(--chakra-colors-accent-teal)"
  const borderInner = "var(--chakra-colors-border-inner)"
  const borderOuter = "var(--chakra-colors-border-outer)"
  const whiteBase = "255, 255, 255"
  const blackBase = "0, 0, 0"

  return {
    _hover: {
      boxShadow: `
        inset 0 0 0 2px rgba(${whiteBase}, ${config.innerGlow + 0.03}),
        inset 0 0 0 4px ${borderInner},
        inset 0 0 0 8px ${borderOuter},
        0 0 0 4px ${isActive ? accentColor : borderInner},
        ${
          isActive
            ? `0 0 20px var(--chakra-colors-accent-teal-alpha-10)`
            : `0 4px 20px rgba(${blackBase}, ${config.shadowIntensity}), 0 8px 40px rgba(${blackBase}, ${
                config.shadowIntensity * 0.7
              }), 0 16px 60px rgba(${blackBase}, ${config.shadowIntensity * 0.4})`
        }
      `,
    },
    boxShadow: `
      inset 0 0 0 2px rgba(${whiteBase}, ${config.innerGlow}),
      inset 0 0 0 4px ${borderInner},
      inset 0 0 0 8px ${borderOuter},
      0 0 0 4px ${isActive ? accentColor : borderInner},
      ${
        isActive
          ? `0 0 20px var(--chakra-colors-accent-teal-alpha-10)`
          : `0 4px 20px rgba(${blackBase}, ${config.shadowIntensity}), 0 8px 40px rgba(${blackBase}, ${
              config.shadowIntensity * 0.7
            }), 0 16px 60px rgba(${blackBase}, ${config.shadowIntensity * 0.4})`
      }
    `,
  }
}
