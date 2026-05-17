import type { InjectionKey } from 'vue'

export interface DropdownContext {
  select(command: unknown): void
}

export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('x-dropdown')
