import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type TextSize = 'sm' | 'md' | 'lg' | 'title'
export type TextType = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
export type TextAlign = 'left' | 'center' | 'right'
export type TextVerticalAlign = 'top' | 'middle' | 'bottom'
export type TextFormatter = (value: string | number) => string

export interface TextProps extends ElementStyleProps {
  modelValue?: string | number
  size?: TextSize
  variant?: TextType
  tag?: string
  truncated?: boolean
  formatter?: TextFormatter
  disabled?: boolean
  fontFamily?: string
  fontWeight?: number | string
  fontSize?: number | string
  lineHeight?: number | string
  width?: number | string
  height?: number | string
  autoHeight?: boolean
  padding?: number | string
  radius?: string
  textAlign?: TextAlign
  verticalAlign?: TextVerticalAlign
  name?: string
  id?: string
  maxlength?: number
}
