import type { App } from 'vue'
import Badge from './src/Badge.vue'

export const XBadge = Badge

export type { BadgeProps } from './src/types'

XBadge.install = (app: App) => {
  app.component(XBadge.name!, XBadge)
}

export default XBadge
