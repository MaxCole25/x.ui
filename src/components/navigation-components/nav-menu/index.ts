import type { App } from 'vue'
import NavMenu from './src/NavMenu.vue'
import HorizontalMenu from './src/HorizontalMenu.vue'
import VerticalMenu from './src/VerticalMenu.vue'

export const XNavMenu = NavMenu
export const XHorizontalMenu = HorizontalMenu
export const XVerticalMenu = VerticalMenu

export type { HorizontalMenuProps, NavMenuItem, NavMenuMode, NavMenuProps, VerticalMenuProps } from './src/types'

XNavMenu.install = (app: App) => {
  app.component(XNavMenu.name!, XNavMenu)
}

XHorizontalMenu.install = (app: App) => {
  app.component(XHorizontalMenu.name!, XHorizontalMenu)
}

XVerticalMenu.install = (app: App) => {
  app.component(XVerticalMenu.name!, XVerticalMenu)
}

export default XNavMenu
