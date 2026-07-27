export interface SelectableControlInputProps {
  size?: "sm" | "md" | "lg"
  height?: string | number
  width?: string | number
  animationDelay?: number
  index?: number
  density?: "comfortable" | "tight"
}

export interface SelectableControlNativeProps {
  translate?: "yes" | "no"
  "data-focus-visible"?: never
  "data-hover"?: never
  "data-active"?: never
  "data-disabled"?: never
}

export type SelectableControlReservedNativeProperty =
  | keyof SelectableControlInputProps
  | keyof SelectableControlNativeProps
  | "className"
  | "color"
  | "content"
  | "role"
  | "style"
