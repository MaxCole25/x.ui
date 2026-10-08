import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type SwitchFontSize = number
export type SwitchValue = boolean
export type SwitchLabelPosition = 'outside' | 'inside'

export interface SwitchProps extends ElementStyleProps {
  height?: number | string
  modelValue?: boolean
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  labelPosition?: SwitchLabelPosition
  activeValue?: SwitchValue
  inactiveValue?: SwitchValue
  checkedColor?: string
  inactiveColor?: string
  thumbColor?: string
  buttonSize?: number | string
  fontSize?: number
  fontFamily?: string
  radius?: number | string
  name?: string
}

export interface SwitchEmits {
  'update:modelValue': [value: SwitchValue]
  change: [value: SwitchValue]
}
