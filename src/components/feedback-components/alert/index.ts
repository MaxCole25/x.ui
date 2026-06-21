import type { App } from 'vue'
import Alert from './src/Alert.vue'

export const XAlert = Alert

export type { AlertProps } from './src/types'

XAlert.install = (app: App) => {
  app.component(XAlert.name!, XAlert)
}

export default XAlert
