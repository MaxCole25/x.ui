import type { App } from 'vue'
import DropdownItem from './src/DropdownItem.vue'

export const XDropdownItem = DropdownItem

export type { DropdownItemProps } from './src/types'

XDropdownItem.install = (app: App) => {
  app.component(XDropdownItem.name!, XDropdownItem)
}

export default XDropdownItem
