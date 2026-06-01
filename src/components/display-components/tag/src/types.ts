import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagEffect = 'light' | 'dark' | 'plain'
export type TagSize = 'sm' | 'md' | 'lg'

export interface TagProps extends ElementStyleProps {
  variant?: TagType
  effect?: TagEffect
  size?: TagSize
  closable?: boolean
  round?: boolean
  hit?: boolean
  disabled?: boolean
  accentColor?: string
}
