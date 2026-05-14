import type { InputProps } from '../../input'

export type AutocompleteSize = NonNullable<InputProps['size']>
export type AutocompleteOptionValue = string | number

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
    'type' | 'color'
  > {
  autoWidth?: boolean
  options?: AutocompleteOptionSource[]
  fieldNames?: AutocompleteFieldNames
  remote?: boolean
  remoteMethod?: AutocompleteRemoteMethod
  remoteDebounce?: number
  remoteMinLength?: number
  loading?: boolean
  loadingText?: string
  emptyText?: string
}
