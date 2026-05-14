import type { ElementStyleProps } from '../../_utils/elementStyle'

export type DatePickerFestivalType = 'festival' | 'solar-term' | 'custom'

export interface DatePickerFestivalItem {
  name: string
  type: DatePickerFestivalType
}

export interface DatePickerPanelProps extends ElementStyleProps {
  modelValue?: string
  year?: number
  month?: number
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
