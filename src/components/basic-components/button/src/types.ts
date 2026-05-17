import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'

export interface ButtonProps extends ElementStyleProps {
  variant?: ButtonVariant
  size?: XSize
  width?: number | string
  height?: number | string
  fontSize?: number | string
  padding?: number | string
  radius?: number | string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  disabled?: boolean
  loading?: boolean
}
