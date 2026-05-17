import type { InjectionKey } from 'vue'
import type { SelectOptionValue } from './types'

export interface SelectOptionRecord {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}

export interface SelectContext {
  multiple: boolean
  selectedValues: () => SelectOptionValue[]
  getOptionDisplayText: (option: SelectOptionRecord) => string
  registerOption: (option: SelectOptionRecord) => void
  unregisterOption: (value: SelectOptionValue) => void
  selectOption: (option: SelectOptionRecord) => void
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('x-select')
