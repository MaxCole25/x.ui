import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'

export interface ButtonProps extends ElementStyleProps {
  variant?: ButtonVariant
  width?: number | string
  height?: number | string
  borderWidth?: number | string
  borderColor?: string
  fontSize?: number
  padding?: number | string
  radius?: number | string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  liftOnHover?: boolean
  disabled?: boolean
  loading?: boolean
}
