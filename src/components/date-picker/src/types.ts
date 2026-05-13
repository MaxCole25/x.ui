import type { ElementStyleProps } from '../../_utils/elementStyle'

export interface DatePickerProps extends ElementStyleProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}
