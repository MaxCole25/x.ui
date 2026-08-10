import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { OverlayProps } from '../../../_utils/overlay'
import type { XSize } from '../../../_utils/size'

export type DialogFooterDividerStyle = 'solid' | 'dashed' | 'dotted'

export interface DialogProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  size?: XSize
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  draggable?: boolean
  resizable?: boolean
  showFullscreen?: boolean
  closeOnMaskClick?: boolean
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
