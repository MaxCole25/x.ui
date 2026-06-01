import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'
import type { IconVariant } from '../../../basic-components/icon'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = XSize

export interface AvatarProps extends ElementStyleProps {
  src?: string
  alt?: string
  name?: string
  icon?: string
  iconVariant?: IconVariant
  iconFull?: boolean
  iconColor?: string
  iconTitle?: string
  iconSpin?: boolean
  size?: AvatarSize
  avatarSize?: number | string
  shape?: AvatarShape
  avatarBackgroundColor?: string
}
