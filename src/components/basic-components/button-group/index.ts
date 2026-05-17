import type { App } from 'vue'
import ButtonGroup from './src/ButtonGroup.vue'

export const XButtonGroup = ButtonGroup

export type { ButtonGroupDirection, ButtonGroupProps } from './src/types'

XButtonGroup.install = (app: App) => {
  app.component(XButtonGroup.name!, XButtonGroup)
}

export default XButtonGroup
