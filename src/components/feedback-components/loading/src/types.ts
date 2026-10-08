export interface LoadingProps {
  fontSize?: number
  modelValue?: boolean
  text?: string
  fullscreen?: boolean
  lock?: boolean
  backgroundColor?: string
  textColor?: string
  spinnerColor?: string
  spinnerSize?: number | string
  zIndex?: number
}

export interface LoadingOptions extends Omit<LoadingProps, 'modelValue'> {
  target?: HTMLElement | string
}

export interface LoadingInstance {
  close: () => void
}
