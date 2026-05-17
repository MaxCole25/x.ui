import type { XSize } from '../../../_utils/size'

export type IconVariant = 'line' | 'fill'
export type IconSize = XSize

export interface IconProps {
  name: string
  variant?: IconVariant
  size?: IconSize
  iconSize?: number | string
  color?: string
  title?: string
  decorative?: boolean
  spin?: boolean
}
