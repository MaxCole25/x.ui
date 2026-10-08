import type { App, Component } from 'vue'

/** 单组件入口同时支持模板渲染和 app.use(Component)。 */
export type ComponentWithInstall<T extends Component> = T & {
  install(app: App): void
}
