import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type ButtonGroupDirection = 'horizontal' | 'vertical'

export interface ButtonGroupProps extends ElementStyleProps {
  size?: XSize
  direction?: ButtonGroupDirection
  width?: number | string
  height?: number | string
  radius?: number | string
}
