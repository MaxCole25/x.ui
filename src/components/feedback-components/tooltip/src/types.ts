import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTrigger = 'hover' | 'click' | 'focus'

export interface TooltipProps extends ElementStyleProps {
  size?: XSize
  modelValue?: boolean
  content?: string
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
  disabled?: boolean
  showArrow?: boolean
  openDelay?: number
  closeDelay?: number
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
}
