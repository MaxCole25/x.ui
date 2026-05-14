import type { InputProps } from '../../input/src/types'

export interface TimeSelectProps extends Omit<InputProps, 'modelValue' | 'type'> {
  modelValue?: string
  start?: string
  end?: string
  stepMinutes?: number
}
