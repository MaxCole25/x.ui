import type { App } from 'vue'
import Radio from './src/Radio.vue'
import RadioButton from './src/RadioButton.vue'

export const XRadio = Radio
export const XRadioButton = RadioButton

export type { RadioButtonProps, RadioProps, RadioSize } from './src/types'

XRadio.install = (app: App) => {
  app.component(XRadio.name!, XRadio)
}

XRadioButton.install = (app: App) => {
  app.component(XRadioButton.name!, XRadioButton)
}

export default XRadio
