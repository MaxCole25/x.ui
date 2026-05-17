import type { App } from 'vue'
import Loading from './src/Loading.vue'
import { vLoading } from './src/directive'
import { XLoadingService } from './src/service'

export const XLoading = Loading
export { XLoadingService, vLoading }
export * from './src/types'

export default {
  install(app: App) {
    app.component(Loading.name!, Loading)
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = XLoadingService
  }
}
