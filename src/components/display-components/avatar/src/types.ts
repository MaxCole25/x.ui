import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { FontSize } from '../../../_utils/size'
import type { IconVariant } from '../../../basic-components/icon'

export type AvatarShape = 'circle' | 'square'
export type AvatarFontSize = FontSize

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
  fontSize?: number
  avatarSize?: number | string
  shape?: AvatarShape
  avatarBackgroundColor?: string
}
