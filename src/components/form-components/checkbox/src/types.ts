import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type CheckboxFontSize = number

export interface CheckboxProps extends ElementStyleProps {
  height?: number | string
  modelValue?: boolean | Array<string | number | boolean>
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  indeterminate?: boolean
  fontSize?: number
  checkedColor?: string
  radius?: number | string
  name?: string
}
