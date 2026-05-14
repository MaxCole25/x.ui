import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'
import type { InputProps } from '../../input/src/types'

export interface DateTimePickerProps extends Omit<InputProps, 'modelValue' | 'type'> {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
