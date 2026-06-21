export type AlertStatus = 'success' | 'warning' | 'info' | 'error'
export type AlertVariant = 'light' | 'plain'

export interface AlertProps {
  title?: string
  description?: string
  status?: AlertStatus
  variant?: AlertVariant
  closable?: boolean
  showIcon?: boolean
  center?: boolean
}
