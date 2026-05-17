import type { App } from 'vue'
import ColorPickerPanel from './src/ColorPickerPanel.vue'

export const XColorPickerPanel = ColorPickerPanel

export type { ColorPickerPanelProps } from './src/types'

XColorPickerPanel.install = (app: App) => {
  app.component(XColorPickerPanel.name!, XColorPickerPanel)
}

export default XColorPickerPanel
