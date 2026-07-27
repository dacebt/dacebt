import React from "react"
import {
  Button,
  type ButtonProps,
} from "@chakra-ui/react"
import { compactActionStyles } from "./compact-action-styles"

type CompactActionProps = Omit<ButtonProps, "as" | "asChild" | "type">

const CompactAction = React.forwardRef<HTMLButtonElement, CompactActionProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      {...compactActionStyles}
      {...props}
      type="button"
    >
      {children}
    </Button>
  )
)

CompactAction.displayName = "CompactAction"

export default CompactAction
