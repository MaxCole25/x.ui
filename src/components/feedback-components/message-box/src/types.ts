import type { XSize } from '../../../_utils/size'
import type { OverlayProps } from '../../../_utils/overlay'

export type MessageBoxType = 'success' | 'warning' | 'info' | 'error'
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'

export interface MessageBoxProps extends OverlayProps {
  modelValue?: boolean
  title?: string
  message?: string
  status?: MessageBoxType
  size?: XSize
  showCancelButton?: boolean
  showConfirmButton?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  distinguishCancelAndClose?: boolean
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  borderColor?: string
  iconColor?: string
  maskColor?: string
  confirmBackgroundColor?: string
  confirmTextColor?: string
  confirmBorderColor?: string
  cancelBackgroundColor?: string
  cancelTextColor?: string
  cancelBorderColor?: string
  radius?: number | string
  padding?: string
  shadow?: string
}

export interface MessageBoxOptions extends Omit<MessageBoxProps, 'modelValue'> {
  callback?: (action: MessageBoxAction) => void
}
