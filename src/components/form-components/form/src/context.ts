import type { InjectionKey, Ref } from 'vue'
import type { FormControlSize, FormItemRule, FormLabelPosition, FormPublicSize } from './types'

export interface FormContext {
  disabled: Ref<boolean>
  size: Ref<FormControlSize>
  publicSize: Ref<FormPublicSize>
  labelWidth: Ref<string | number>
  labelPosition: Ref<FormLabelPosition>
  model: Ref<Record<string, unknown> | undefined>
  rules: Ref<Record<string, FormItemRule | FormItemRule[]> | undefined>
  registerItem: (item: FormItemValidateContext) => void
  unregisterItem: (id: string) => void
}

export interface FormItemContext {
  id: string
  prop?: string
  label?: string
}

export interface FormItemValidateContext {
  id: string
  prop?: string
  validate: () => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  scrollIntoView: () => void
  getError: () => string
}

export const xFormContextKey: InjectionKey<FormContext> = Symbol('x-form')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('x-form-item')
export const formContextKey = xFormContextKey
