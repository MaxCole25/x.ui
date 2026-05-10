import type { App } from 'vue'
import Dialog from './src/Dialog.vue'

export const XDialog = Dialog

export type { DialogProps } from './src/types'

XDialog.install = (app: App) => {
  app.component(XDialog.name!, XDialog)
}

export default XDialog
