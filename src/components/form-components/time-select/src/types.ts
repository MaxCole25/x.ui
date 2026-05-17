import type { InputProps } from '../../input/src/types'
import type { PickerTimePopupThemeProps } from '../../_utils/pickerTheme'

export interface TimeSelectProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerTimePopupThemeProps {
  modelValue?: string
  start?: string
  end?: string
  stepMinutes?: number
}
