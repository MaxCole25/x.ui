import type { App } from 'vue'
import RichTextEditor from './src/RichTextEditor.vue'

export const XRichTextEditor = RichTextEditor
export { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from './src/types'
export type { RichTextEditorExpose, RichTextEditorProps, RichTextEditorTheme, RichTextEditorToolbarButton, RichTextEditorValue, UploadResult } from './src/types'

XRichTextEditor.install = (app: App) => {
  app.component(XRichTextEditor.name!, XRichTextEditor)
}

export default XRichTextEditor


