import type { App } from 'vue'
import TimeSelect from './src/TimeSelect.vue'

export const XTimeSelect = TimeSelect

export type { TimeSelectProps } from './src/types'

XTimeSelect.install = (app: App) => {
  app.component(XTimeSelect.name!, XTimeSelect)
}

export default XTimeSelect
