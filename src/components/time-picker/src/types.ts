import type { InputProps } from '../../input/src/types'

export interface TimePickerProps extends Omit<InputProps, 'modelValue' | 'type'> {
  modelValue?: string
}
