import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface ScrollbarProps extends ElementStyleProps {
  size?: XSize
  maxHeight?: string | number
  height?: string | number
}
