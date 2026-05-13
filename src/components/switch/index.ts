import type { App } from 'vue'
import Switch from './src/Switch.vue'

export const XSwitch = Switch

export type { SwitchEmits, SwitchProps, SwitchSize, SwitchValue } from './src/types'

XSwitch.install = (app: App) => {
  app.component(XSwitch.name!, XSwitch)
}

export default XSwitch
