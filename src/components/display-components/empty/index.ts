import type { App } from 'vue'
import Empty from './src/Empty.vue'

export const XEmpty = Empty

export type { EmptyProps } from './src/types'

XEmpty.install = (app: App) => {
  app.component(XEmpty.name!, XEmpty)
}

export default XEmpty
