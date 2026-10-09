import type { App } from 'vue'
import type { ComponentWithInstall } from '../../_utils/install'
import Messenger from './src/Messenger.vue'
export const XMessenger = Messenger as ComponentWithInstall<typeof Messenger>
export type * from './src/types'
XMessenger.install = (app: App) => { app.component(XMessenger.name!, XMessenger) }
export default XMessenger
