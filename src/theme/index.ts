import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      breakpoints: {
        sm: { value: "640px" },
        md: { value: "768px" },
        lg: { value: "1024px" },
        xl: { value: "1280px" },
        "2xl": { value: "1536px" },
      },
      spacing: {
        container: {
          sm: { value: "640px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1280px" },
          "2xl": { value: "1536px" },
        },
        sidebar: {
          base: { value: "100%" },
          md: { value: "280px" },
        },
      },
      fonts: {
        body: { value: "system-ui, -apple-system, sans-serif" },
      },
      colors: {
        bg: {
          dark: { value: "#0a0a0a" },
          steel: { value: "#1D2126" },
          darkAlpha: {
            95: { value: "rgba(10, 10, 10, 0.95)" },
          },
          steelAlpha: {
            60: { value: "rgba(29, 33, 38, 0.6)" },
            80: { value: "rgba(29, 33, 38, 0.8)" },
            90: { value: "rgba(29, 33, 38, 0.9)" },
          },
        },
        border: {
          inner: { value: "#4B5663" },
          outer: { value: "#0E1013" },
        },
        accent: {
          teal: { value: "#5BC0BE" },
          green: { value: "#10B981" },
          steel: { value: "#64748B" },
          steelLight: { value: "#94A3B8" },
          tealAlpha: {
            2: { value: "rgba(91, 192, 190, 0.02)" },
            3: { value: "rgba(91, 192, 190, 0.03)" },
            5: { value: "rgba(91, 192, 190, 0.05)" },
            6: { value: "rgba(91, 192, 190, 0.06)" },
            8: { value: "rgba(91, 192, 190, 0.08)" },
            10: { value: "rgba(91, 192, 190, 0.1)" },
            12: { value: "rgba(91, 192, 190, 0.12)" },
            15: { value: "rgba(91, 192, 190, 0.15)" },
            18: { value: "rgba(91, 192, 190, 0.18)" },
            20: { value: "rgba(91, 192, 190, 0.2)" },
            25: { value: "rgba(91, 192, 190, 0.25)" },
            30: { value: "rgba(91, 192, 190, 0.3)" },
            40: { value: "rgba(91, 192, 190, 0.4)" },
            50: { value: "rgba(91, 192, 190, 0.5)" },
            60: { value: "rgba(91, 192, 190, 0.6)" },
            70: { value: "rgba(91, 192, 190, 0.7)" },
            80: { value: "rgba(91, 192, 190, 0.8)" },
            100: { value: "rgba(91, 192, 190, 1)" },
          },
          greenAlpha: {
            5: { value: "rgba(16, 185, 129, 0.05)" },
            25: { value: "rgba(16, 185, 129, 0.25)" },
            30: { value: "rgba(16, 185, 129, 0.3)" },
            40: { value: "rgba(16, 185, 129, 0.4)" },
            50: { value: "rgba(16, 185, 129, 0.5)" },
          },
        },
        gradient: {
          blue: { value: "#3B82F6" },
          purple: { value: "#8B5CF6" },
          steel: { value: "#475569" },
          steelLight: { value: "#64748B" },
        },
        text: {
          primary: { value: "#E2E8F0" },
          secondary: { value: "#94A3B8" },
          muted: { value: "#64748B" },
          secondaryAlpha: {
            90: { value: "rgba(148, 163, 184, 0.9)" },
          },
        },
        // Alpha variants for opacity values
        white: {
          alpha: {
            5: { value: "rgba(255, 255, 255, 0.05)" },
            10: { value: "rgba(255, 255, 255, 0.1)" },
            15: { value: "rgba(255, 255, 255, 0.15)" },
            20: { value: "rgba(255, 255, 255, 0.2)" },
            30: { value: "rgba(255, 255, 255, 0.3)" },
            40: { value: "rgba(255, 255, 255, 0.4)" },
          },
        },
        black: {
          alpha: {
            10: { value: "rgba(0, 0, 0, 0.1)" },
            20: { value: "rgba(0, 0, 0, 0.2)" },
            30: { value: "rgba(0, 0, 0, 0.3)" },
            40: { value: "rgba(0, 0, 0, 0.4)" },
            50: { value: "rgba(0, 0, 0, 0.5)" },
            60: { value: "rgba(0, 0, 0, 0.6)" },
            80: { value: "rgba(0, 0, 0, 0.8)" },
          },
        },
        glow: {
          teal: {
            weak: { value: "{colors.accent.tealAlpha.10}" },
            medium: { value: "{colors.accent.tealAlpha.15}" },
            strong: { value: "{colors.accent.tealAlpha.30}" },
          },
          green: {
            weak: { value: "{colors.accent.greenAlpha.25}" },
            medium: { value: "{colors.accent.greenAlpha.30}" },
            strong: { value: "{colors.accent.greenAlpha.40}" },
          },
        },
      },
      shadows: {
        dialogue: {
          default: {
            value: "inset 0 0 0 2px {colors.white.alpha.10}, inset 0 0 0 4px {colors.accent.green}, inset 0 0 0 6px {colors.border.outer}, 0 0 0 2px {colors.accent.green}, 0 6px 24px {colors.accent.greenAlpha.25}, 0 12px 48px {colors.black.alpha.50}, 0 0 0 1px {colors.white.alpha.5}",
          },
          hover: {
            value: "inset 0 0 0 2px {colors.white.alpha.15}, inset 0 0 0 4px {colors.accent.green}, inset 0 0 0 6px {colors.border.outer}, 0 0 0 3px {colors.accent.green}, 0 8px 32px {colors.accent.greenAlpha.40}, 0 16px 64px {colors.black.alpha.60}, 0 0 0 1px {colors.white.alpha.10}",
          },
        },
        nav: {
          active: {
            value: "inset 0 1px 0 {colors.white.alpha.10}, 0 2px 8px {colors.accent.tealAlpha.15}",
          },
          activeHover: {
            value: "inset 0 1px 0 {colors.white.alpha.15}, 0 2px 12px {colors.accent.tealAlpha.25}",
          },
          inactiveHover: {
            value: "inset 0 1px 0 {colors.white.alpha.5}, 0 2px 6px {colors.black.alpha.10}",
          },
          indicator: {
            value: "0 0 12px {colors.accent.tealAlpha.100}, 0 0 6px {colors.accent.tealAlpha.60}",
          },
        },
        avatar: {
          frame: {
            value: "inset 0 0 0 2px {colors.white.alpha.15}, inset 0 0 0 4px {colors.border.outer}, 0 0 0 2px {colors.border.outer}, 0 0 0 4px {colors.border.inner}, 0 2px 8px {colors.black.alpha.30}, 0 4px 16px {colors.black.alpha.20}",
          },
        },
        button: {
          primaryHover: {
            value: "0 20px 40px {colors.accent.tealAlpha.15}, 0 8px 16px {colors.black.alpha.30}, inset 0 1px 0 {colors.white.alpha.10}, inset 0 -1px 0 {colors.black.alpha.10}",
          },
          closeHover: {
            value: "0 8px 25px {colors.accent.tealAlpha.30}",
          },
        },
        modal: {
          content: {
            value: "0 20px 60px {colors.black.alpha.60}, 0 8px 25px {colors.black.alpha.40}, inset 0 0 0 1px {colors.white.alpha.10}",
          },
        },
        speaker: {
          label: {
            value: "0 0 8px {colors.accent.greenAlpha.30}",
          },
        },
        card: {
          projectHover: {
            value: "0 8px 25px {colors.accent.tealAlpha.15}",
          },
        },
        badge: {
          personal: {
            value: "0 2px 8px {colors.accent.tealAlpha.20}",
          },
        },
        glowCard: {
          tealHover: {
            value: "0 8px 25px {colors.accent.tealAlpha.15}, inset 0 0 0 1px {colors.glow.teal.weak}",
          },
          greenHover: {
            value: "0 8px 25px {colors.accent.greenAlpha.15}, inset 0 0 0 1px {colors.glow.green.weak}",
          },
        },
        bolt: {
          frame: {
            value: "inset 0 1px 2px {colors.white.alpha.40}, inset 0 -1px 2px {colors.black.alpha.60}, 0 2px 4px {colors.black.alpha.30}, 0 0 0 1px {colors.black.alpha.20}",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        "bg.overlay.dark": {
          value: "{colors.bg.darkAlpha.95}",
        },
        "bg.overlay.steel": {
          value: "{colors.bg.steelAlpha.90}",
        },
        "glow.teal.weak": {
          value: "{colors.glow.teal.weak}",
        },
        "glow.teal.medium": {
          value: "{colors.glow.teal.medium}",
        },
        "glow.teal.strong": {
          value: "{colors.glow.teal.strong}",
        },
        "glow.green.weak": {
          value: "{colors.glow.green.weak}",
        },
        "glow.green.medium": {
          value: "{colors.glow.green.medium}",
        },
        "glow.green.strong": {
          value: "{colors.glow.green.strong}",
        },
        "border.inner.glow": {
          value: "{colors.white.alpha.10}",
        },
        "shadow.layer.1": {
          value: "{colors.black.alpha.10}",
        },
        "shadow.layer.2": {
          value: "{colors.black.alpha.20}",
        },
        "shadow.layer.3": {
          value: "{colors.black.alpha.30}",
        },
        "shadow.layer.4": {
          value: "{colors.black.alpha.40}",
        },
        "shadow.dialogue.active": {
          value: "{colors.accent.greenAlpha.40}",
        },
        "shadow.dialogue.default": {
          value: "{colors.accent.greenAlpha.25}",
        },
        "glow.border.teal": {
          value: "{colors.accent.tealAlpha.30}",
        },
        "glow.border.green": {
          value: "{colors.accent.greenAlpha.30}",
        },
        "gradient.pageTitle": {
          value: "linear-gradient(135deg, {colors.text.primary} 0%, {colors.accent.teal} 100%)",
        },
        "gradient.projectTitle": {
          value: "linear-gradient(135deg, {colors.gradient.blue} 0%, {colors.gradient.purple} 100%)",
        },
        "gradient.button.primary": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.8} 0%, {colors.bg.steelAlpha.60} 100%)",
        },
        "gradient.button.primaryHover": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.15} 0%, {colors.bg.steelAlpha.80} 100%)",
        },
        "gradient.dialogue.bg": {
          value: "linear-gradient(135deg, {colors.bg.darkAlpha.95} 0%, {colors.bg.steelAlpha.90} 100%)",
        },
        "gradient.background.decorative1": {
          value: "linear-gradient(135deg, {colors.accent.tealAlpha.10} 0%, {colors.accent.tealAlpha.5} 100%)",
        },
        "gradient.background.decorative2": {
          value: "linear-gradient(45deg, {colors.accent.tealAlpha.8} 0%, {colors.accent.tealAlpha.3} 100%)",
        },
        "gradient.background.decorative3": {
          value: "linear-gradient(225deg, {colors.accent.tealAlpha.6} 0%, {colors.accent.tealAlpha.2} 100%)",
        },
      },
    },
    textStyles: {
      heading: {
        description: "Main heading text style",
        value: {
          fontSize: { base: "2xl", md: "3xl", lg: "4xl" },
          fontWeight: "bold",
          lineHeight: "1.2",
          letterSpacing: "tight",
        },
      },
      subtitle: {
        description: "Subtitle text style",
        value: {
          fontSize: { base: "lg", md: "xl", lg: "2xl" },
          fontWeight: "medium",
          lineHeight: "1.4",
          color: "text.secondary",
        },
      },
      body: {
        description: "Body text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          lineHeight: "1.6",
        },
      },
      buttonLabel: {
        description: "Floating button label text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          textAlign: "center",
          textShadow: "0 1px 2px var(--chakra-colors-black-alpha-50)",
        },
      },
      dialogue: {
        description: "Dialogue box text style",
        value: {
          fontSize: { base: "sm", md: "lg" },
          fontWeight: "500",
          lineHeight: "1.6",
          letterSpacing: "0.2px",
        },
      },
      pageTitle: {
        description: "Page heading text style",
        value: {
          fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          lineHeight: "1.2",
        },
      },
      pageSubtitle: {
        description: "Page subtitle text style",
        value: {
          fontSize: { base: "md", md: "lg" },
          color: "text.muted",
          lineHeight: "1.6",
        },
      },
      navItem: {
        description: "Navigation item text style",
        value: {
          fontSize: "md",
          fontWeight: "medium",
          letterSpacing: "normal",
          textTransform: "uppercase",
        },
      },
      navItemActive: {
        description: "Active navigation item text style",
        value: {
          fontSize: "md",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        },
      },
      playerName: {
        description: "Player name text style",
        value: {
          fontSize: { base: "sm", md: "md" },
          fontWeight: "bold",
          lineHeight: "1.6",
        },
      },
      playerRole: {
        description: "Player role text style",
        value: {
          fontSize: "sm",
          lineHeight: "1.6",
        },
      },
      projectTitle: {
        description: "Project card title text style",
        value: {
          fontSize: "xl",
          fontWeight: "bold",
          lineHeight: "1.2",
        },
      },
      speakerLabel: {
        description: "Dialogue box speaker label text style",
        value: {
          fontSize: "sm",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
      smallText: {
        description: "Base small text style",
        value: {
          fontSize: "xs",
          lineHeight: "1.3",
        },
      },
      smallTextBold: {
        description: "Small text with bold weight",
        value: {
          fontSize: "xs",
          fontWeight: "bold",
        },
      },
      smallTextMedium: {
        description: "Small text with medium weight",
        value: {
          fontSize: "xs",
          fontWeight: "medium",
        },
      },
      badgeText: {
        description: "Badge label text style",
        value: {
          fontSize: "xs",
          fontWeight: "semibold",
        },
      },
      progressText: {
        description: "Progress indicator text style",
        value: {
          fontSize: "sm",
          fontWeight: "medium",
        },
      },
    },
  },
})

export default system
