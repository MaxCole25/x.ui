import type { FontSize } from '../../../_utils/size'

export type IconVariant = 'line' | 'fill'
export type IconFontSize = FontSize

export interface IconProps {
  name: string
  variant?: IconVariant
  fontSize?: number
  iconSize?: number | string
  offsetY?: number | string
  color?: string
  title?: string
  decorative?: boolean
  spin?: boolean
}
