import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { InputFontSize } from '../../input'

export interface InputNumberProps extends ElementStyleProps {
  showActiveBorder?: boolean
  height?: number | string
  padding?: number | string
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  fullWidth?: boolean
  fullHeight?: boolean
  accentColor?: string
  activeBorderColor?: string
  radius?: number | string
  fontFamily?: string
  fontSize?: number
  decreaseButtonBackgroundColor?: string
  increaseButtonBackgroundColor?: string
}
