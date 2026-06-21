import type { XSize } from '../../../_utils/size'

export type ProgressStatus = 'primary' | 'success' | 'warning' | 'danger'
export type ProgressVariant = 'line' | 'circle'

export interface ProgressProps {
  percentage?: number
  status?: ProgressStatus
  variant?: ProgressVariant
  size?: XSize
  strokeWidth?: number
  showText?: boolean
  textInside?: boolean
  accentColor?: string
  trackColor?: string
  textColor?: string
  width?: number | string
}
