import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { OverlayProps } from '../../../_utils/overlay'

export type DialogFooterDividerStyle = 'solid' | 'dashed' | 'dotted'

export interface DialogProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  fontSize?: number
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  draggable?: boolean
  resizable?: boolean
  showFullscreen?: boolean
  /** 是否启用遮罩、滚动锁和模态焦点管理。 */
  enableModal?: boolean
  closeOnMaskClick?: boolean
  closeOnEsc?: boolean
  maskColor?: string
  titleColor?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
  headerBorderColor?: string
  footerBorderColor?: string
  showFooterDivider?: boolean
  footerDividerColor?: string
  footerDividerWidth?: number | string
  footerDividerStyle?: DialogFooterDividerStyle
  closeIconColor?: string
  closeIconHoverColor?: string
  closeIconHoverBackgroundColor?: string
  shadow?: string
  resizerColor?: string
}
