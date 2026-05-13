import type { ElementStyleProps } from '../../_utils/elementStyle'

export interface DateTimePickerProps extends ElementStyleProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}
