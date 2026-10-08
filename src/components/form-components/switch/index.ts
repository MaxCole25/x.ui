import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Switch from './src/Switch.vue'

export const XSwitch = Switch as ComponentWithInstall<typeof Switch>

export type { SwitchEmits, SwitchLabelPosition, SwitchProps, SwitchFontSize, SwitchValue } from './src/types'

XSwitch.install = (app: App) => {
  app.component(XSwitch.name!, XSwitch)
}

export default XSwitch
