import type { App } from 'vue'
import Collapse from './src/Collapse.vue'

export const XCollapse = Collapse

export type { CollapseProps } from './src/types'

XCollapse.install = (app: App) => {
  app.component(XCollapse.name!, XCollapse)
}

export default XCollapse
