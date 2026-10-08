import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface ColorPickerPanelProps extends ElementStyleProps {
  fontSize?: number
  modelValue?: string
  colors?: string[]
}
