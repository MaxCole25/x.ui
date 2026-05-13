import type { ElementStyleProps } from '../../_utils/elementStyle'

export interface DatePickerPanelProps extends ElementStyleProps {
  modelValue?: string
  year?: number
  month?: number
}
