import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import ButtonGroup from './src/ButtonGroup.vue'

export const XButtonGroup = ButtonGroup as ComponentWithInstall<typeof ButtonGroup>

export type { ButtonGroupDirection, ButtonGroupProps } from './src/types'

XButtonGroup.install = (app: App) => {
  app.component(XButtonGroup.name!, XButtonGroup)
}

export default XButtonGroup
