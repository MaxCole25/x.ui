import type { InjectionKey } from 'vue'
import type { SelectOptionValue } from './types'

export interface SelectOptionRecord {
  id: string
  element?: HTMLElement
  label: string
  value: SelectOptionValue
  disabled?: boolean
}

export interface SelectContext {
  isActive: (id: string) => boolean
  selectedValues: () => SelectOptionValue[]
  getOptionDisplayText: (option: SelectOptionRecord) => string
  registerOption: (option: SelectOptionRecord) => void
  unregisterOption: (id: string) => void
  selectOption: (option: SelectOptionRecord) => void
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('x-select')
