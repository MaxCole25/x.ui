import type { ElementStyleProps } from '../../_utils/elementStyle'
import type { SelectOptionValue } from '../../select'

export interface CascaderOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps extends ElementStyleProps {
  modelValue?: SelectOptionValue[]
  options?: CascaderOption[]
  placeholder?: string
  disabled?: boolean
}
