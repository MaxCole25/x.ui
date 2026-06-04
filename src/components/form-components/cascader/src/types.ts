import type { InputProps, InputStatus, InputTextAlign } from '../../input'
import type { SelectOptionValue } from '../../select'

export type CascaderSize = 'sm' | 'md' | 'lg'
export type CascaderStatus = InputStatus
export type CascaderTextAlign = InputTextAlign
export type CascaderDisplayField = 'label' | 'value'

export interface CascaderOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}

export type CascaderOptionSource = CascaderOption | Record<string, unknown>

export type CascaderRemoteMethod = (
  option?: CascaderOption,
  path?: CascaderOption[]
) => CascaderOptionSource[] | Promise<CascaderOptionSource[] | void> | void

export interface CascaderProps
  extends Omit<
    InputProps,
    'modelValue' | 'type' | 'maxlength'
  > {
  modelValue?: SelectOptionValue[]
  options?: CascaderOptionSource[]
  fieldNames?: CascaderFieldNames
  displayField?: CascaderDisplayField
  remote?: boolean
  remoteMethod?: CascaderRemoteMethod
  loading?: boolean
  loadingText?: string
  emptyText?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  size?: CascaderSize
  status?: CascaderStatus
  prefix?: string
  suffix?: string
  autoWidth?: boolean
  textAlign?: CascaderTextAlign
  separator?: string
  changeOnSelect?: boolean
  teleportTo?: string
  name?: string
}
