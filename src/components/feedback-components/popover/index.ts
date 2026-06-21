import type { App } from 'vue'
import Popover from './src/Popover.vue'

export const XPopover = Popover

export type { PopoverProps } from './src/types'

XPopover.install = (app: App) => {
  app.component(XPopover.name!, XPopover)
}

export default XPopover
