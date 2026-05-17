import type { App } from 'vue'
import MessageBox from './src/MessageBox.vue'
import { XMessageBox as MessageBoxService } from './src/method'

export const XMessageBoxComponent = MessageBox
export const XMessageBox = MessageBoxService

export * from './src/types'

export default {
  install(app: App) {
    app.component(MessageBox.name!, MessageBox)
    app.config.globalProperties.$messageBox = MessageBoxService
  }
}
