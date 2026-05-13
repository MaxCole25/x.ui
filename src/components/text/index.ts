import type { App } from 'vue'
import Text from './src/Text.vue'

export const XText = Text

export type { TextProps, TextSize, TextType } from './src/types'

XText.install = (app: App) => {
  app.component(XText.name!, XText)
}

export default XText
