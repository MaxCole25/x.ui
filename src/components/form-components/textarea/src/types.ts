import type {
  BaseInputSize,
  BaseInputStatus,
  BaseInputTextAlign
} from '../../../basic-components/base-input/src/types'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type TextareaSize = BaseInputSize
export type TextareaStatus = BaseInputStatus
export type TextareaTextAlign = BaseInputTextAlign

export interface TextareaProps extends ElementStyleProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  size?: TextareaSize
  status?: TextareaStatus
  rows?: number
  maxRows?: number
  autoHeight?: boolean
  fullHeight?: boolean
  allowWrap?: boolean
  accentColor?: string
  activeBorderColor?: string
  clearIconColor?: string
  clearIconSize?: number | string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  fontFamily?: string
  fontSize?: number | string
  width?: number | string
  height?: number | string
  padding?: number | string
  textAlign?: TextareaTextAlign
  inputBackgroundColor?: string
  name?: string
  id?: string
  maxlength?: number
}
