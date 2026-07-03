import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export type FormSize = XSize
export type FormPublicSize = XSize
export type FormControlSize = 'sm' | 'md' | 'lg'
export type FormLabelPosition = 'left' | 'right' | 'top'
export type FormItemAlign = 'start' | 'center'
export type FormItemHorizontalAlign = 'left' | 'center' | 'right'
export type FormItemContentJustify = 'start' | 'center' | 'end' | 'stretch'
export type FormItemClass = string | string[] | Record<string, boolean>
export type FormItemStyle = string | Record<string, string | number>

export interface FormItemRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  validator?: (rule: FormItemRule, value: unknown, model?: Record<string, unknown>) => boolean | string | Error | Promise<boolean | string | Error>
}

export type FormRules = Record<string, FormItemRule | FormItemRule[]>
export type FormValidateCallback = (valid: boolean, errors: Record<string, string>) => void
export type FormValidateResult = Promise<boolean>
export type FormValidateMethod = (callback?: FormValidateCallback) => FormValidateResult
export type FormValidateFieldMethod = (props?: string | string[], callback?: FormValidateCallback) => FormValidateResult

export interface FormProps extends ElementStyleProps {
  model?: Record<string, unknown>
  rules?: FormRules
  disabled?: boolean
  size?: FormSize
  inline?: boolean
  height?: string | number
  labelWidth?: string | number
  labelPosition?: FormLabelPosition
  loading?: boolean
  accentColor?: string
  radius?: string
}

export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  rules?: FormItemRule[]
  error?: string
  help?: string
  size?: FormSize
  disabled?: boolean
  labelWidth?: string | number
  labelHeight?: string | number
  labelGap?: string | number
  labelPosition?: FormLabelPosition
  contentHeight?: string | number
  contentFullHeight?: boolean
  align?: FormItemAlign
  labelAlign?: FormItemHorizontalAlign
  contentAlign?: FormItemHorizontalAlign | 'stretch'
  contentJustify?: FormItemContentJustify
  contentClass?: FormItemClass
  contentStyle?: FormItemStyle
  labelClass?: FormItemClass
  labelStyle?: FormItemStyle
  labelTextColor?: string
  labelColor?: string
  contentTextColor?: string
  backgroundColor?: string
  borderColor?: string
  requiredMarkColor?: string
  errorTextColor?: string
  hintTextColor?: string
  descriptionTextColor?: string
  loading?: boolean
}

export interface FormExpose {
  validate: FormValidateMethod
  validateField: FormValidateFieldMethod
  resetFields: (props?: string | string[]) => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
}
