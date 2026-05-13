import type { ElementStyleProps } from '../../_utils/elementStyle'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends ElementStyleProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  color?: string
}
