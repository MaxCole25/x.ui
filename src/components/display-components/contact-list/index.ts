import type { App } from 'vue'
import type { ComponentWithInstall } from '../../_utils/install'
import ContactList from './src/ContactList.vue'
export const XContactList = ContactList as ComponentWithInstall<typeof ContactList>
export type * from './src/types'
XContactList.install = (app: App) => { app.component(XContactList.name!, XContactList) }
export default XContactList
