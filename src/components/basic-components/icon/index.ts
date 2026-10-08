import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Icon from './src/Icon.vue'

export const XIcon = Icon as ComponentWithInstall<typeof Icon>

export { iconAliases } from './src/aliases'
export type { IconProps, IconFontSize, IconVariant } from './src/types'

XIcon.install = (app: App) => {
  app.component(XIcon.name!, XIcon)
}

export default XIcon
