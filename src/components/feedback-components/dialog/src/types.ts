import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export interface DialogProps extends ElementStyleProps {
  modelValue: boolean
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
  zIndex?: number
  maskColor?: string
  titleColor?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
  headerBorderColor?: string
  footerBorderColor?: string
  closeIconColor?: string
  closeIconHoverColor?: string
  closeIconHoverBackgroundColor?: string
  shadow?: string
  resizerColor?: string
}
