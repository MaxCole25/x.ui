import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type BaseInputSize = 'sm' | 'md' | 'lg'
export type BaseInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
export type BaseInputStatus = 'default' | 'success' | 'warning' | 'error'
export type BaseInputTextAlign = 'left' | 'center' | 'right'
export type BaseInputFormatter = (value: string | number) => string
export type BaseInputParser = (displayValue: string) => string | number

export interface BaseInputProps extends ElementStyleProps {
  modelValue?: string | number
  type?: BaseInputType
  formatter?: BaseInputFormatter
  parser?: BaseInputParser
  formatOnBlur?: boolean
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  size?: BaseInputSize
  status?: BaseInputStatus
  prefix?: string
  suffix?: string
  activeBorderColor?: string
  color?: string
  clearIconColor?: string
  clearIconSize?: number | string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  fontFamily?: string
  fontSize?: number | string
  height?: number | string
  autoHeight?: boolean
  hideClearButton?: boolean
  padding?: number | string
  radius?: string
  textAlign?: BaseInputTextAlign
  background?: string
  name?: string
  id?: string
  maxlength?: number
}
