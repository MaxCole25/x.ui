import type { App } from 'vue'
import Textarea from './src/Textarea.vue'

export const XTextarea = Textarea

export type { TextareaProps, TextareaSize, TextareaStatus, TextareaTextAlign } from './src/types'

XTextarea.install = (app: App) => {
  app.component(XTextarea.name!, XTextarea)
}

export default XTextarea
