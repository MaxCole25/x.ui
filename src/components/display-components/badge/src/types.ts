import type { XSize } from '../../../_utils/size'

export type BadgeStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface BadgeProps {
  modelValue?: string | number
  max?: number
  showZero?: boolean
  dot?: boolean
  hidden?: boolean
  status?: BadgeStatus
  size?: XSize
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
}
