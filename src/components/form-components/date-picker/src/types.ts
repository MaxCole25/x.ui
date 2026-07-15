import type { InputProps } from '../../input/src/types'
import type { DatePickerFestivalItem } from '../../date-picker-panel/src/types'
import type { PickerPopupThemeProps } from '../../_utils/pickerTheme'
import type { OverlayProps } from '../../../_utils/overlay'

export interface DatePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerPopupThemeProps, OverlayProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
