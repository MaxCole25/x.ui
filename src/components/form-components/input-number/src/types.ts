import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { InputSize } from '../../input'

export interface InputNumberProps extends ElementStyleProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  size?: InputSize
  placeholder?: string
  fullWidth?: boolean
  fullHeight?: boolean
  accentColor?: string
  activeBorderColor?: string
  radius?: number | string
  fontFamily?: string
  fontSize?: number | string
  decreaseButtonBackgroundColor?: string
  increaseButtonBackgroundColor?: string
}
