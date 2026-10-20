import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type CheckboxFontSize = number

export interface CheckboxProps extends ElementStyleProps {
  height?: number | string
  modelValue?: boolean | Array<string | number | boolean>
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  readonly?: boolean
  indeterminate?: boolean
  fontSize?: number
  checkedColor?: string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  radius?: number | string
  name?: string
}
