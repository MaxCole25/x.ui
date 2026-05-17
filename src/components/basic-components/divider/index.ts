import type { App } from 'vue'
import Divider from './src/Divider.vue'

export const XDivider = Divider

export type { DividerBorderStyle, DividerContentPosition, DividerDirection, DividerProps } from './src/types'

XDivider.install = (app: App) => {
  app.component(XDivider.name!, XDivider)
}

export default XDivider
