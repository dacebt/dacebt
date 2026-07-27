import { Box, Text } from "@chakra-ui/react"
import { type ReactNode } from "react"
import { pageLayoutStyles } from "./page-layout-styles"

interface PageLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  centerContent?: boolean
}

export default function PageLayout({ title, subtitle, children, centerContent = false }: PageLayoutProps) {
  return (
    <Box
      {...pageLayoutStyles.root}
    >
      {/* Page title */}
      <Box {...pageLayoutStyles.heading}>
        <Text
          {...pageLayoutStyles.title}
        >
          {title}
        </Text>
        <Text {...pageLayoutStyles.subtitle}>
          {subtitle}
        </Text>
      </Box>

      {/* Content area */}
      <Box
        {...pageLayoutStyles.content}
        alignItems={centerContent ? "center" : "flex-start"}
        justifyContent={centerContent ? "center" : "flex-start"}
      >
        {children}
      </Box>
    </Box>
  )
}
