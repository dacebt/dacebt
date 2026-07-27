import React from "react"
import {
  Button,
  type ButtonProps,
} from "@chakra-ui/react"
import {
  compactActionEmphasisStyles,
  compactActionStyles,
} from "./compact-action-styles"

type CompactActionEmphasis = "neutral" | "subtle" | "primary"

interface CompactActionProps
  extends Omit<ButtonProps, "as" | "asChild" | "type"> {
  emphasis?: CompactActionEmphasis
}

const CompactAction = React.forwardRef<HTMLButtonElement, CompactActionProps>(
  ({ children, emphasis = "neutral", ...props }, ref) => (
    <Button
      ref={ref}
      {...compactActionStyles}
      {...compactActionEmphasisStyles[emphasis]}
      {...props}
      type="button"
    >
      {children}
    </Button>
  )
)

CompactAction.displayName = "CompactAction"

export default CompactAction
