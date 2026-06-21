export type StepStatus = 'wait' | 'process' | 'success' | 'error'
export type StepsDirection = 'horizontal' | 'vertical'

export interface StepItem {
  title: string
  description?: string
  status?: StepStatus
  disabled?: boolean
}

export interface StepsProps {
  modelValue?: number
  items?: StepItem[]
  direction?: StepsDirection
  clickable?: boolean
}
