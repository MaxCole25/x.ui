import type { ElementStyleProps } from '../../_utils/elementStyle'

export interface TimeSelectProps extends ElementStyleProps {
  modelValue?: string
  start?: string
  end?: string
  stepMinutes?: number
  placeholder?: string
  disabled?: boolean
}
