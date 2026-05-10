import type { App } from 'vue'
import Button from './src/Button.vue'

export const XButton = Button

export type { ButtonProps, ButtonSize, ButtonVariant } from './src/types'

XButton.install = (app: App) => {
  app.component(XButton.name!, XButton)
}

export default XButton
