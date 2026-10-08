import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type BaseInputFontSize = number
export type BaseInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
export type BaseInputStatus = 'default' | 'success' | 'warning' | 'error'
export type BaseInputTextAlign = 'left' | 'center' | 'right'
export type BaseInputFormatter = (value: string | number) => string
export type BaseInputParser = (displayValue: string) => string | number

export interface BaseInputProps extends ElementStyleProps {
  showActiveBorder?: boolean
  modelValue?: string | number
  type?: BaseInputType
  formatter?: BaseInputFormatter
  parser?: BaseInputParser
  formatOnBlur?: boolean
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  status?: BaseInputStatus
  prefix?: string
  suffix?: string
  accentColor?: string
  activeBorderColor?: string
  clearIconColor?: string
  clearIconSize?: number | string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  fontFamily?: string
  fontSize?: number
  width?: number | string
  height?: number | string
  autoHeight?: boolean
  hideClearButton?: boolean
  padding?: number | string
  radius?: number | string
  textAlign?: BaseInputTextAlign
  inputBackgroundColor?: string
  name?: string
  id?: string
  maxlength?: number
}
