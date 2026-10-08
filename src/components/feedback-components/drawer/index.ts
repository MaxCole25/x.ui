import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Drawer from './src/Drawer.vue'

export const XDrawer = Drawer as ComponentWithInstall<typeof Drawer>

export type { DrawerDirection, DrawerProps } from './src/types'

XDrawer.install = (app: App) => {
  app.component(XDrawer.name!, XDrawer)
}

export default XDrawer
