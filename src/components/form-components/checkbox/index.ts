import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Checkbox from './src/Checkbox.vue'

export const XCheckbox = Checkbox as ComponentWithInstall<typeof Checkbox>

export type { CheckboxProps, CheckboxFontSize } from './src/types'

XCheckbox.install = (app: App) => {
  app.component(XCheckbox.name!, XCheckbox)
}

export default XCheckbox
