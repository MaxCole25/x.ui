import type { XSize } from '../../../_utils/size'

export type NotificationStatus = 'success' | 'warning' | 'info' | 'error'
export type NotificationPlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NotificationProps {
  id?: string
  title?: string
  message?: string
  status?: NotificationStatus
  placement?: NotificationPlacement
  duration?: number
  showClose?: boolean
  size?: XSize
  zIndex?: number
}

export interface NotificationOptions extends NotificationProps {
  onClose?: () => void
}

export interface NotificationHandler {
  close: () => void
}
