import React from "react"
import { Box, Link } from "@chakra-ui/react"
import { getAnimation } from "../../utils/motion"
import { selectableControlStyles } from "./selectable-control-styles"
import type {
  SelectableControlInputProps,
  SelectableControlNativeProps,
  SelectableControlReservedNativeProperty,
} from "./selectable-control-types"

interface SelectableLinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      SelectableControlReservedNativeProperty
    >,
    SelectableControlInputProps,
    SelectableControlNativeProps {}

const SelectableLink = React.forwardRef<HTMLAnchorElement, SelectableLinkProps>(
  (
    {
      children,
      size = "lg",
      height,
      width = "100%",
      animationDelay = 0,
      index = 0,
      density = "comfortable",
      translate,
      ...props
    },
    ref,
  ) => (
    <Link
      ref={ref}
      {...selectableControlStyles.root}
      {...props}
      className="group"
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
        density === "tight"
          ? selectableControlStyles.hoverTight
          : selectableControlStyles.hoverComfortable
      }
      _active={
        density === "tight"
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
    </Link>
  ),
)

SelectableLink.displayName = "SelectableLink"

export default SelectableLink
