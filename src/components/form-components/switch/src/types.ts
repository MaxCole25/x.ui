import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type SwitchSize = 'sm' | 'md' | 'lg'
export type SwitchValue = boolean
export type SwitchLabelPosition = 'outside' | 'inside'

export interface SwitchProps extends ElementStyleProps {
  modelValue?: boolean
  disabled?: boolean
  size?: SwitchSize
  activeText?: string
  inactiveText?: string
  labelPosition?: SwitchLabelPosition
  activeValue?: SwitchValue
  inactiveValue?: SwitchValue
  checkedColor?: string
  inactiveColor?: string
  thumbColor?: string
  buttonSize?: number | string
  fontSize?: number | string
  fontFamily?: string
  radius?: string
  name?: string
}

export interface SwitchEmits {
  'update:modelValue': [value: SwitchValue]
  change: [value: SwitchValue]
}
