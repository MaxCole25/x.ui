import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import JsonEditor from './src/JsonEditor.vue'

export const XJsonEditor = JsonEditor as ComponentWithInstall<typeof JsonEditor>
export type { JsonEditorProps } from './src/types'

XJsonEditor.install = (app: App) => {
  app.component(XJsonEditor.name!, XJsonEditor)
}

export default XJsonEditor
