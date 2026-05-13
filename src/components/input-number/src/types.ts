import type { ElementStyleProps } from '../../_utils/elementStyle'
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
  color?: string
  activeBorderColor?: string
  borderRadius?: number | string
  fontFamily?: string
  fontSize?: number | string
  decreaseButtonBackgroundColor?: string
  increaseButtonBackgroundColor?: string
}
