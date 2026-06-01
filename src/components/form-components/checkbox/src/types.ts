import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps extends ElementStyleProps {
  modelValue?: boolean | Array<string | number | boolean>
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  indeterminate?: boolean
  size?: CheckboxSize
  checkedColor?: string
  radius?: string
  name?: string
}
