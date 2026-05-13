import type { App } from 'vue'
import ColorPicker from './src/ColorPicker.vue'

export const XColorPicker = ColorPicker

export type { ColorPickerProps } from './src/types'

XColorPicker.install = (app: App) => {
  app.component(XColorPicker.name!, XColorPicker)
}

export default XColorPicker
