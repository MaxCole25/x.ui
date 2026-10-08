import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import BaseInput from './src/BaseInput.vue'

export const XBaseInput = BaseInput as ComponentWithInstall<typeof BaseInput>

export type {
  BaseInputProps,
  BaseInputFontSize,
  BaseInputStatus,
  BaseInputTextAlign,
  BaseInputType
} from './src/types'

XBaseInput.install = (app: App) => {
  app.component(XBaseInput.name!, XBaseInput)
}

export default XBaseInput
