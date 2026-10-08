import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import NavMenu from './src/NavMenu.vue'
import HorizontalMenu from './src/HorizontalMenu.vue'
import VerticalMenu from './src/VerticalMenu.vue'

export const XNavMenu = NavMenu as ComponentWithInstall<typeof NavMenu>
export const XHorizontalMenu = HorizontalMenu as ComponentWithInstall<typeof HorizontalMenu>
export const XVerticalMenu = VerticalMenu as ComponentWithInstall<typeof VerticalMenu>

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
