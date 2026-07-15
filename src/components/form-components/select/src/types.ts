import type { XSize } from '../../../_utils/size'
import type { InputProps, InputStatus, InputTextAlign } from '../../input'

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectOptionValue = string | number | boolean
export type SelectStatus = InputStatus
export type SelectTextAlign = InputTextAlign
export type SelectDisplayField = 'label' | 'value'

export interface SelectOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}

export interface SelectFieldNames {
  label?: string
  value?: string
  disabled?: string
}

export type SelectOptionSource = SelectOption | Record<string, unknown>

export type SelectRemoteMethod = () => SelectOptionSource[] | Promise<SelectOptionSource[] | void> | void

export interface SelectProps
  extends Omit<
    InputProps,
    'modelValue' | 'type' | 'maxlength'
  > {
  modelValue?: SelectOptionValue | SelectOptionValue[]
  options?: SelectOptionSource[]
  fieldNames?: SelectFieldNames
  displayField?: SelectDisplayField
  remote?: boolean
  remoteMethod?: SelectRemoteMethod
  loading?: boolean
  loadingText?: string
  emptyText?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  multiple?: boolean
  size?: SelectSize
  status?: SelectStatus
  prefix?: string
  suffix?: string
  autoWidth?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
  popperMaxWidth?: number | string
  popperBackgroundColor?: string
  textAlign?: SelectTextAlign
  name?: string
}

export interface OptionProps {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}
