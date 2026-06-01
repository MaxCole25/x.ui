import type { InputProps } from '../../input'

export type AutocompleteSize = NonNullable<InputProps['size']>
export type AutocompleteOptionValue = string | number
export type AutocompleteDisplayField = 'label' | 'value'
export type AutocompleteRemoteTrigger = 'input' | 'enter'

export interface AutocompleteOption {
  label: string
  value: AutocompleteOptionValue
  disabled?: boolean
}

export interface AutocompleteFieldNames {
  label?: string
  value?: string
  disabled?: string
}

export type AutocompleteOptionSource = string | AutocompleteOption | Record<string, unknown>

export type AutocompleteRemoteMethod = (
  keyword: string
) => AutocompleteOptionSource[] | Promise<AutocompleteOptionSource[] | void> | void

export interface AutocompleteExpose {
  getOptions: () => readonly AutocompleteOption[]
  getVisibleOptions: () => readonly AutocompleteOption[]
}

export interface AutocompleteProps
  extends Omit<
    InputProps,
    'type'
  > {
  inputValue?: string | number
  valueOnInput?: boolean
  clearModelValueOnInput?: boolean
  autoWidth?: boolean
  options?: AutocompleteOptionSource[]
  fieldNames?: AutocompleteFieldNames
  displayField?: AutocompleteDisplayField
  remote?: boolean
  remoteMethod?: AutocompleteRemoteMethod
  remoteTrigger?: AutocompleteRemoteTrigger
  remoteDebounce?: number
  remoteMinLength?: number
  dropdownMaxHeight?: number | string
  dropdownMaxWidth?: number | string
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
  dropdownBackgroundColor?: string
  loading?: boolean
  loadingText?: string
  emptyText?: string
}
