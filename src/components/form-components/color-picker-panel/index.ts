import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import ColorPickerPanel from './src/ColorPickerPanel.vue'

export const XColorPickerPanel = ColorPickerPanel as ComponentWithInstall<typeof ColorPickerPanel>

export type { ColorPickerPanelProps } from './src/types'

XColorPickerPanel.install = (app: App) => {
  app.component(XColorPickerPanel.name!, XColorPickerPanel)
}

export default XColorPickerPanel
