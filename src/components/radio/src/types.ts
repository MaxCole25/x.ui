import type { ElementStyleProps } from '../../_utils/elementStyle'

export type RadioSize = 'sm' | 'md' | 'lg'

export interface RadioProps extends ElementStyleProps {
  modelValue?: string | number | boolean
  label?: string
  value: string | number | boolean
  disabled?: boolean
  size?: RadioSize
  fontFamily?: string
  fontSize?: number | string
  labelColor?: string
  buttonColor?: string
  buttonSize?: number | string
  name?: string
}
