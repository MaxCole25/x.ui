import type { XSize } from '../../../_utils/size'
import type { CSSProperties } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type CardShadow = 'always' | 'hover' | 'never'

export interface CardProps extends ElementStyleProps {
  size?: XSize
  header?: string
  footer?: string
  shadow?: CardShadow
  width?: number | string
  height?: number | string
  bodyStyle?: CSSProperties
}
