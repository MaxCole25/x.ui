import type { ElementStyleProps } from '../../_utils/elementStyle'

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectOptionValue = string | number | boolean

export interface SelectOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}

export interface SelectProps extends ElementStyleProps {
  modelValue?: SelectOptionValue | SelectOptionValue[]
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  size?: SelectSize
  color?: string
  radius?: string
  background?: string
  name?: string
}

export interface OptionProps {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}
