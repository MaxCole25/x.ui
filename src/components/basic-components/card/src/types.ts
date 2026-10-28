import type { CSSProperties } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type CardShadow = 'always' | 'hover' | 'never'

export interface CardProps extends ElementStyleProps {
  fontSize?: number
  header?: string
  footer?: string
  shadow?: CardShadow
  /** 是否启用外沿泛光，不影响边框、尺寸和内容布局 */
  enableGlow?: boolean
  /** 泛光色，未指定时跟随卡片边框颜色 */
  glowColor?: string
  width?: number | string
  height?: number | string
  padding?: number | string
  /** 分隔线粗细，数字按 px 处理；设为 0 可隐藏 */
  dividerWidth?: number | string
  /** 分隔线颜色 */
  dividerColor?: string
  bodyStyle?: CSSProperties
}
