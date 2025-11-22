interface InterfaceFrameShadowsProps {
  isActive: boolean
  config: {
    shadowIntensity: number
    innerGlow: number
  }
}

export default function InterfaceFrameShadows({ isActive, config }: InterfaceFrameShadowsProps) {
  const accentColor = "accent.teal"
  const borderInner = "border.inner"
  const borderOuter = "border.outer"

  return {
    _hover: {
      boxShadow: `
        inset 0 0 0 2px rgba(255, 255, 255, ${config.innerGlow + 0.03}),
        inset 0 0 0 4px ${borderInner},
        inset 0 0 0 8px ${borderOuter},
        0 0 0 4px ${isActive ? accentColor : borderInner},
        ${
          isActive
            ? `0 0 20px accent.tealAlpha.10`
            : `0 4px 20px rgba(0, 0, 0, ${config.shadowIntensity}), 0 8px 40px rgba(0, 0, 0, ${
                config.shadowIntensity * 0.7
              }), 0 16px 60px rgba(0, 0, 0, ${config.shadowIntensity * 0.4})`
        }
      `,
    },
    boxShadow: `
      inset 0 0 0 2px rgba(255, 255, 255, ${config.innerGlow}),
      inset 0 0 0 4px ${borderInner},
      inset 0 0 0 8px ${borderOuter},
      0 0 0 4px ${isActive ? accentColor : borderInner},
      ${
        isActive
          ? `0 0 20px accent.tealAlpha.10`
          : `0 4px 20px rgba(0, 0, 0, ${config.shadowIntensity}), 0 8px 40px rgba(0, 0, 0, ${
              config.shadowIntensity * 0.7
            }), 0 16px 60px rgba(0, 0, 0, ${config.shadowIntensity * 0.4})`
      }
    `,
  }
}
