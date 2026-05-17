import type { App } from 'vue'
import Tooltip from './src/Tooltip.vue'

export const XTooltip = Tooltip

export type { TooltipPlacement, TooltipProps, TooltipTrigger } from './src/types'

XTooltip.install = (app: App) => {
  app.component(XTooltip.name!, XTooltip)
}

export default XTooltip
