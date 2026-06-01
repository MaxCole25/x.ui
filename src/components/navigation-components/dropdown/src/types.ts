import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type DropdownTrigger = 'hover' | 'click'
export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end'
export type DropdownSize = 'sm' | 'md' | 'lg'

export interface DropdownProps extends ElementStyleProps {
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  size?: DropdownSize
  disabled?: boolean
  hideOnClick?: boolean
  showArrow?: boolean
  teleported?: boolean
  teleportTo?: string
  offset?: number | string
  popperWidth?: number | string
  zIndex?: number | string
  radius?: number | string
  shadow?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
}
