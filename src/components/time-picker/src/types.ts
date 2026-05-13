import type { ElementStyleProps } from '../../_utils/elementStyle'

export interface TimePickerProps extends ElementStyleProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}
