import type { App } from 'vue'
import XLoginPage from './src/LoginPage.vue'

export { XLoginPage }
export default XLoginPage
export type {
  LoginPageAlign,
  LoginPageBackgroundRepeat,
  LoginPageBackgroundSize,
  LoginPageDirection,
  LoginPageJustify,
  LoginPagePreset,
  LoginPageProps,
  LoginPageSectionConfig,
  LoginPageSectionOverflow
} from './src/types'

XLoginPage.install = (app: App) => {
  app.component(XLoginPage.name!, XLoginPage)
}
