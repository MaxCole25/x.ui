import type { App } from 'vue'
import Slider from './src/Slider.vue'

export const XSlider = Slider

export type { SliderProps } from './src/types'

XSlider.install = (app: App) => {
  app.component(XSlider.name!, XSlider)
}

export default XSlider
