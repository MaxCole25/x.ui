import type { App } from 'vue'
import Icon from './src/Icon.vue'

export const XIcon = Icon

export { iconAliases } from './src/aliases'
export type { IconProps, IconSize, IconVariant } from './src/types'

XIcon.install = (app: App) => {
  app.component(XIcon.name!, XIcon)
}

export default XIcon
