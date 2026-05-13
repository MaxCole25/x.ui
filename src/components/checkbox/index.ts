import type { App } from 'vue'
import Checkbox from './src/Checkbox.vue'

export const XCheckbox = Checkbox

export type { CheckboxProps, CheckboxSize } from './src/types'

XCheckbox.install = (app: App) => {
  app.component(XCheckbox.name!, XCheckbox)
}

export default XCheckbox
