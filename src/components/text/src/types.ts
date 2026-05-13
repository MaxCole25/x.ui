import type { ElementStyleProps } from '../../_utils/elementStyle'

export type TextSize = 'sm' | 'md' | 'lg' | 'title'
export type TextType = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'

export interface TextProps extends ElementStyleProps {
  size?: TextSize
  type?: TextType
  tag?: string
  truncated?: boolean
}
