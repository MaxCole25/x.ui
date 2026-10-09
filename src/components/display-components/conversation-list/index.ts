import type { App } from 'vue'
import type { ComponentWithInstall } from '../../_utils/install'
import ConversationList from './src/ConversationList.vue'
export const XConversationList = ConversationList as ComponentWithInstall<typeof ConversationList>
export type * from './src/types'
XConversationList.install = (app: App) => { app.component(XConversationList.name!, XConversationList) }
export default XConversationList
