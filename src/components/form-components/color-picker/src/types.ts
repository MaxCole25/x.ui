import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface ColorPickerProps extends ElementStyleProps {
  size?: XSize
  modelValue?: string
  disabled?: boolean
}
