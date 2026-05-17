import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { PickerCalendarThemeProps, PickerPanelThemeProps } from '../../_utils/pickerTheme'

export type DatePickerFestivalType = 'festival' | 'solar-term' | 'custom'

export interface DatePickerFestivalItem {
  name: string
  type: DatePickerFestivalType
}

export interface DatePickerPanelProps extends ElementStyleProps, PickerPanelThemeProps, PickerCalendarThemeProps {
  size?: XSize
  modelValue?: string
  year?: number
  month?: number
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
