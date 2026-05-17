import type { App } from 'vue'
import InputNumber from './src/InputNumber.vue'

export const XInputNumber = InputNumber

export type { InputNumberProps } from './src/types'

XInputNumber.install = (app: App) => {
  app.component(XInputNumber.name!, XInputNumber)
}

export default XInputNumber
