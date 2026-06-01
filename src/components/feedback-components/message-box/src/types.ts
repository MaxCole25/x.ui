import type { XSize } from '../../../_utils/size'

export type MessageBoxType = 'success' | 'warning' | 'info' | 'error'
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'

export interface MessageBoxProps {
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
  zIndex?: number
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
