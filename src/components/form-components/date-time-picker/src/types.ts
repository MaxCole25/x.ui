import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'
import type { InputProps } from '../../input/src/types'
import type { PickerDateTimePopupThemeProps } from '../../_utils/pickerTheme'

export interface DateTimePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerDateTimePopupThemeProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
