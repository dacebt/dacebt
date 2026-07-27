import React from "react"
import { Box, Button } from "@chakra-ui/react"
import { getAnimation } from "../../utils/motion"
import { selectableControlStyles } from "./selectable-control-styles"
import type {
  SelectableControlInputProps,
  SelectableControlNativeProps,
  SelectableControlReservedNativeProperty,
} from "./selectable-control-types"

interface SelectableButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      SelectableControlReservedNativeProperty | "type"
    >,
    SelectableControlInputProps,
    SelectableControlNativeProps {}

const SelectableButton = React.forwardRef<
  HTMLButtonElement,
  SelectableButtonProps
>(
  (
    {
      children,
      size = "lg",
      height,
      width = "100%",
      animationDelay = 0,
      index = 0,
      density = "comfortable",
      disabled,
      translate,
      ...props
    },
    ref,
  ) => (
    <Button
      ref={ref}
      {...selectableControlStyles.root}
      {...props}
      className="group"
      type="button"
      disabled={disabled}
      htmlTranslate={translate}
      h={{
        sm: height ?? "80px",
        md: height ?? "100px",
        lg: height ?? "120px",
      }[size]}
      w={width}
      p={density === "tight" ? { base: 2, md: 3 } : { base: 4, md: 4 }}
      animation={getAnimation(`float ${6 + index}s ease-in-out infinite`)}
      style={{
        animationDelay: `${animationDelay + index * 0.3}s`,
      }}
      _hover={
        disabled
          ? undefined
          : density === "tight"
            ? selectableControlStyles.hoverTight
            : selectableControlStyles.hoverComfortable
      }
      _active={
        disabled
          ? undefined
          : density === "tight"
            ? selectableControlStyles.activeTight
            : selectableControlStyles.activeComfortable
      }
    >
      <Box
        {...selectableControlStyles.content}
        gap={density === "tight" ? 1.5 : 2}
      >
        {children}
      </Box>
    </Button>
  ),
)

SelectableButton.displayName = "SelectableButton"

export default SelectableButton
