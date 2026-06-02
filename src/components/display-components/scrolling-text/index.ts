import type { App } from 'vue'
import ScrollingText from './src/ScrollingText.vue'

export const XScrollingText = ScrollingText

export type { ScrollingTextDisplayDirection, ScrollingTextFlowDirection, ScrollingTextProps } from './src/types'

XScrollingText.install = (app: App) => {
  app.component(XScrollingText.name!, XScrollingText)
}

export default XScrollingText
