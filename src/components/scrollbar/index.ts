import type { App } from 'vue'
import Scrollbar from './src/Scrollbar.vue'

export const XScrollbar = Scrollbar

export type { ScrollbarProps } from './src/types'

XScrollbar.install = (app: App) => {
  app.component(XScrollbar.name!, XScrollbar)
}

export default XScrollbar
