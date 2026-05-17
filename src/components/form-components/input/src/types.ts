import type {
  BaseInputProps,
  BaseInputSize,
  BaseInputStatus,
  BaseInputTextAlign,
  BaseInputType
} from '../../../basic-components/base-input/src/types'

export type InputSize = BaseInputSize
export type InputType = BaseInputType
export type InputStatus = BaseInputStatus
export type InputTextAlign = BaseInputTextAlign

export interface InputProps extends BaseInputProps {
  size?: InputSize
}
