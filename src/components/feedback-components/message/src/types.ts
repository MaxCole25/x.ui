import type { XSize } from '../../../_utils/size'

export type MessageType = 'success' | 'warning' | 'info' | 'error'
export type MessagePlacement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

export interface MessageProps {
  id?: string
  message?: string
  type?: MessageType
  size?: XSize
  duration?: number
  showClose?: boolean
  plain?: boolean
  round?: boolean
  center?: boolean
  offset?: number
  placement?: MessagePlacement
  zIndex?: number
  icon?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  closeColor?: string
  iconColor?: string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  padding?: string
  radius?: number | string
  shadow?: string
}

export interface MessageHandler {
  close: () => void
}

export interface MessageOptions extends MessageProps {
  onClose?: () => void
}
