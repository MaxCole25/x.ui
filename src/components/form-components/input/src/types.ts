import type {
  BaseInputProps,
  BaseInputFontSize,
  BaseInputStatus,
  BaseInputTextAlign,
  BaseInputType
} from '../../../basic-components/base-input/src/types'

export type InputFontSize = BaseInputFontSize
export type InputType = BaseInputType
export type InputStatus = BaseInputStatus
export type InputTextAlign = BaseInputTextAlign

export interface InputProps extends BaseInputProps {
  fontSize?: number
}
