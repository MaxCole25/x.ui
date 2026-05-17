import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface ColorPickerPanelProps extends ElementStyleProps {
  size?: XSize
  modelValue?: string
  colors?: string[]
}
