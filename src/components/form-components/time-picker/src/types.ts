import type { InputProps } from '../../input/src/types'
import type { PickerTimePopupThemeProps } from '../../_utils/pickerTheme'
import type { OverlayProps } from '../../../_utils/overlay'

export interface TimePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerTimePopupThemeProps, OverlayProps {
  modelValue?: string
}
