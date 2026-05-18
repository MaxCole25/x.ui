import type { XSize } from '../../../_utils/size'

export interface DialogProps {
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
  closeOnMaskClick?: boolean
  zIndex?: number
}
