import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import TimeSelect from './src/TimeSelect.vue'

export const XTimeSelect = TimeSelect as ComponentWithInstall<typeof TimeSelect>

export type { TimeSelectProps } from './src/types'

XTimeSelect.install = (app: App) => {
  app.component(XTimeSelect.name!, XTimeSelect)
}

export default XTimeSelect
