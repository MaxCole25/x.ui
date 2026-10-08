import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Badge from './src/Badge.vue'

export const XBadge = Badge as ComponentWithInstall<typeof Badge>

export type { BadgeProps } from './src/types'

XBadge.install = (app: App) => {
  app.component(XBadge.name!, XBadge)
}

export default XBadge
