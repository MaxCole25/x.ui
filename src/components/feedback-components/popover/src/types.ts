import type { XSize } from '../../../_utils/size'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export type PopoverTrigger = 'hover' | 'click' | 'focus'

export interface PopoverProps {
  modelValue?: boolean
  title?: string
  content?: string
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  disabled?: boolean
  showArrow?: boolean
  width?: number | string
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
  size?: XSize
}
