import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Alert from './src/Alert.vue'

export const XAlert = Alert as ComponentWithInstall<typeof Alert>

export type { AlertProps } from './src/types'

XAlert.install = (app: App) => {
  app.component(XAlert.name!, XAlert)
}

export default XAlert
