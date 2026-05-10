import type { App } from 'vue'
import NavMenu from './src/NavMenu.vue'

export const XNavMenu = NavMenu

export type { NavMenuItem, NavMenuMode, NavMenuProps } from './src/types'

XNavMenu.install = (app: App) => {
  app.component(XNavMenu.name!, XNavMenu)
}

export default XNavMenu
