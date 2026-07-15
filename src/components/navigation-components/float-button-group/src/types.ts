import type { XSize } from '../../../_utils/size'
import type { TooltipPlacement } from '../../../feedback-components/tooltip'

export type FloatButtonGroupMode = 'menu' | 'direct'
export type FloatButtonGroupDirection = 'horizontal' | 'vertical'
export type FloatButtonGroupPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type FloatButtonGroupPosition = 'fixed' | 'absolute'
export type FloatButtonGroupItemKey = string | number

export interface FloatButtonGroupItem {
  key: FloatButtonGroupItemKey
  label: string
  icon: string
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
}

export interface FloatButtonGroupProps {
  items?: FloatButtonGroupItem[]
  mode?: FloatButtonGroupMode
  modelValue?: boolean
  defaultModelValue?: boolean
  direction?: FloatButtonGroupDirection
  placement?: FloatButtonGroupPlacement
  position?: FloatButtonGroupPosition
  offsetX?: number | string
  offsetY?: number | string
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  size?: XSize
  zIndex?: number
  triggerIcon?: string
  closeIcon?: string
  triggerLabel?: string
  tooltipPlacement?: TooltipPlacement
  showTooltip?: boolean
}
