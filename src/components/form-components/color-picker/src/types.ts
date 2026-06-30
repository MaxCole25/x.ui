import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type ColorPickerPanelMode = 'inline' | 'popover'

export interface ColorPickerProps extends ElementStyleProps {
  size?: XSize
  modelValue?: string
  disabled?: boolean
  panelMode?: ColorPickerPanelMode
  hideInlinePanel?: boolean
  showValue?: boolean
  width?: number | string
  padding?: number | string
}
