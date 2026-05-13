import type { ElementStyleProps } from '../../_utils/elementStyle'

export type FormSize = 'sm' | 'md' | 'lg'

export interface FormProps extends ElementStyleProps {
  model?: Record<string, unknown>
  disabled?: boolean
  size?: FormSize
  labelWidth?: string | number
  labelPosition?: 'left' | 'top'
  color?: string
  radius?: string
}

export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  error?: string
  help?: string
  labelWidth?: string | number
}
