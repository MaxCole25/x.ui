import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface SliderProps extends ElementStyleProps {
  fontSize?: number
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
  vertical?: boolean
}
