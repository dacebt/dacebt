import { Grid, type GridProps } from "@chakra-ui/react"

interface ResponsiveGridProps extends GridProps {
  columns?: {
    base?: number | string
    sm?: number | string
    md?: number | string
    lg?: number | string
    xl?: number | string
  }
  gap?: {
    base?: number | string
    md?: number | string
  }
}

export default function ResponsiveGrid({
  columns = { base: 1, sm: 2, lg: 3 },
  gap = { base: 4, md: 6 },
  children,
  ...props
}: ResponsiveGridProps) {
  // Convert column numbers to repeat strings if needed
  const gridTemplateColumns: Record<string, string> = {}
  Object.entries(columns).forEach(([breakpoint, value]) => {
    if (typeof value === 'number') {
      gridTemplateColumns[breakpoint] = `repeat(${value}, 1fr)`
    } else {
      gridTemplateColumns[breakpoint] = value
    }
  })

  return (
    <Grid
      gridTemplateColumns={gridTemplateColumns}
      gap={gap}
      w="100%"
      alignItems="start"
      {...props}
    >
      {children}
    </Grid>
  )
}
