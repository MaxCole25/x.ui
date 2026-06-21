import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type DividerDirection = 'horizontal' | 'vertical'
export type DividerContentPosition = 'left' | 'center' | 'right'
export type DividerBorderStyle = 'solid' | 'dashed' | 'dotted'

export interface DividerProps extends ElementStyleProps {
  size?: XSize
  direction?: DividerDirection
  contentPosition?: DividerContentPosition
  borderStyle?: DividerBorderStyle
  thickness?: number | string
  margin?: number | string
}
