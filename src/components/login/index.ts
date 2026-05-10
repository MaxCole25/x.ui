import type { App } from 'vue'
import XLogin from './src/Login.vue'

export { XLogin }
export default XLogin
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './src/types'

XLogin.install = (app: App) => {
  app.component(XLogin.name!, XLogin)
}
