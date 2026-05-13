import type { App } from 'vue'
import Input from './src/Input.vue'

export const XInput = Input

export type { InputProps, InputSize, InputStatus, InputTextAlign, InputType } from './src/types'

XInput.install = (app: App) => {
  app.component(XInput.name!, XInput)
}

export default XInput
