import type { XSize } from '../../../_utils/size'

export interface DialogProps {
  modelValue: boolean
  title?: string
  size?: XSize
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  draggable?: boolean
  resizable?: boolean
  closeOnMaskClick?: boolean
}
