import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Input from './src/Input.vue'

export const XInput = Input as ComponentWithInstall<typeof Input>

export type { InputProps, InputFontSize, InputStatus, InputTextAlign, InputType } from './src/types'

XInput.install = (app: App) => {
  app.component(XInput.name!, XInput)
}

export default XInput
