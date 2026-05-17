import type { InputProps } from '../../input/src/types'
import type { PickerTimePopupThemeProps } from '../../_utils/pickerTheme'

export interface TimePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerTimePopupThemeProps {
  modelValue?: string
}
