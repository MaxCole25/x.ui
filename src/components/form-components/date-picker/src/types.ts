import type { InputProps } from '../../input/src/types'
import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'
import type { PickerPopupThemeProps } from '../../_utils/pickerTheme'

export interface DatePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerPopupThemeProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
