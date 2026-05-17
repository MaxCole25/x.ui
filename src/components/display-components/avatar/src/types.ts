import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = XSize

export interface AvatarProps extends ElementStyleProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  avatarSize?: number | string
  shape?: AvatarShape
  color?: string
}
