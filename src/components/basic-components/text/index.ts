import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Text from './src/Text.vue'

export const XText = Text as ComponentWithInstall<typeof Text>

export type { TextAlign, TextFormatter, TextProps, TextFontSize, TextType } from './src/types'

XText.install = (app: App) => {
  app.component(XText.name!, XText)
}

export default XText
