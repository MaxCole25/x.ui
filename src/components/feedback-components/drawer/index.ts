import type { App } from 'vue'
import Drawer from './src/Drawer.vue'

export const XDrawer = Drawer

export type { DrawerDirection, DrawerProps } from './src/types'

XDrawer.install = (app: App) => {
  app.component(XDrawer.name!, XDrawer)
}

export default XDrawer
