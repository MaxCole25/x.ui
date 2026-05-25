import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'

export interface ButtonProps extends ElementStyleProps {
  variant?: ButtonVariant
  size?: XSize
  width?: number | string
  height?: number | string
  borderWidth?: number | string
  borderColor?: string
  fontSize?: number | string
  padding?: number | string
  radius?: number | string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  liftOnHover?: boolean
  disabled?: boolean
  loading?: boolean
}
