import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import IconSelect from './src/IconSelect.vue'

export const XIconSelect = IconSelect as ComponentWithInstall<typeof IconSelect>

export type { IconSelectCategoryName, IconSelectIconInfo, IconSelectProps } from './src/types'

XIconSelect.install = (app: App) => {
  app.component(XIconSelect.name!, XIconSelect)
}

export default XIconSelect
