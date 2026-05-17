import type { App } from 'vue'
import Dropdown from './src/Dropdown.vue'

export const XDropdown = Dropdown

export type { DropdownPlacement, DropdownProps, DropdownTrigger } from './src/types'

XDropdown.install = (app: App) => {
  app.component(XDropdown.name!, XDropdown)
}

export default XDropdown
