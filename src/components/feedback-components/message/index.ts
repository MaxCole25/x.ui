import type { App } from 'vue'
import MessageComponent from './src/Message.vue'
import { XMessage as MessageService } from './src/method'

export const XMessageComponent = MessageComponent
export const XMessage = MessageService

export * from './src/types'
export { MessageService }

export default {
  install(app: App) {
    app.component(MessageComponent.name!, MessageComponent)
    app.config.globalProperties.$message = MessageService
  }
}
