import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Textarea from './src/Textarea.vue'

export const XTextarea = Textarea as ComponentWithInstall<typeof Textarea>

export type { TextareaProps, TextareaFontSize, TextareaStatus, TextareaTextAlign } from './src/types'

XTextarea.install = (app: App) => {
  app.component(XTextarea.name!, XTextarea)
}

export default XTextarea
