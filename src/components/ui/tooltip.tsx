import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const { children, content, ...rest } = props
    
    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref}>
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  }
)
