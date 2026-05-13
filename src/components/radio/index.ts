import type { App } from 'vue'
import Radio from './src/Radio.vue'

export const XRadio = Radio

export type { RadioProps, RadioSize } from './src/types'

XRadio.install = (app: App) => {
  app.component(XRadio.name!, XRadio)
}

export default XRadio
