import type { App } from 'vue'
import BaseInput from './src/BaseInput.vue'

export const XBaseInput = BaseInput

export type {
  BaseInputProps,
  BaseInputSize,
  BaseInputStatus,
  BaseInputTextAlign,
  BaseInputType
} from './src/types'

XBaseInput.install = (app: App) => {
  app.component(XBaseInput.name!, XBaseInput)
}

export default XBaseInput
