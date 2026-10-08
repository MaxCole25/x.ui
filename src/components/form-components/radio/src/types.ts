import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { ButtonVariant } from '../../../basic-components/button/src/types'
import type { ButtonGroupDirection } from '../../../basic-components/button-group/src/types'

export type RadioFontSize = number

export interface RadioProps extends ElementStyleProps {
  height?: number | string

  modelValue?: string | number | boolean
  label?: string
  value: string | number | boolean
  disabled?: boolean
  fontFamily?: string
  fontSize?: number
  labelColor?: string
  buttonColor?: string
  buttonSize?: number | string
  name?: string
}

export interface RadioButtonProps extends RadioProps {
  variant?: ButtonVariant
  direction?: ButtonGroupDirection
  width?: number | string
  height?: number | string
  radius?: number | string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
}
