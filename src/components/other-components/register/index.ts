import type { App } from 'vue'
import XRegister from './src/Register.vue'

export { XRegister }
export default XRegister
export type { RegisterLabelPosition, RegisterLogoPosition, RegisterProps, RegisterFontSize, RegisterSubmitPayload } from './src/types'

XRegister.install = (app: App) => {
  app.component(XRegister.name!, XRegister)
}
