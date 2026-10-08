import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Dialog from './src/Dialog.vue'

export const XDialog = Dialog as ComponentWithInstall<typeof Dialog>

export type { DialogFooterDividerStyle, DialogProps } from './src/types'

XDialog.install = (app: App) => {
  app.component(XDialog.name!, XDialog)
}

export default XDialog
