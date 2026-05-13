import type { InjectionKey, Ref } from 'vue'
import type { FormSize } from './types'

export interface FormContext {
  disabled: Ref<boolean>
  size: Ref<FormSize>
  labelWidth: Ref<string | number>
  labelPosition: Ref<'left' | 'top'>
}

export interface FormItemContext {
  id: string
  prop?: string
  label?: string
}

export const formContextKey: InjectionKey<FormContext> = Symbol('x-form')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('x-form-item')
