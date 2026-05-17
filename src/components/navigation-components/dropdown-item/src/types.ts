import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface DropdownItemProps extends ElementStyleProps {
  command?: unknown
  disabled?: boolean
  divided?: boolean
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
  height?: number | string
  padding?: string
  radius?: number | string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
  dividedColor?: string
}
