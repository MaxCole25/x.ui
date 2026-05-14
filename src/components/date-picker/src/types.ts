import type { InputProps } from '../../input/src/types'
import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'

export interface DatePickerProps extends Omit<InputProps, 'modelValue' | 'type'> {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
