import type { App } from 'vue'
import DropdownMenu from './src/DropdownMenu.vue'

export const XDropdownMenu = DropdownMenu

export type { DropdownMenuProps } from './src/types'

XDropdownMenu.install = (app: App) => {
  app.component(XDropdownMenu.name!, XDropdownMenu)
}

export default XDropdownMenu
