import type { App } from 'vue'
import type { ComponentWithInstall } from '../../_utils/install'
import Chat from './src/Chat.vue'

export const XChat = Chat as ComponentWithInstall<typeof Chat>
export type * from './src/types'

XChat.install = (app: App) => {
  app.component(XChat.name!, XChat)
}

export default XChat
