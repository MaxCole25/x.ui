import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'
import type { InputProps } from '../../input/src/types'
import type { PickerDateTimePopupThemeProps } from '../../_utils/pickerTheme'
import type { OverlayProps } from '../../../_utils/overlay'

export interface DateTimePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerDateTimePopupThemeProps, OverlayProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
