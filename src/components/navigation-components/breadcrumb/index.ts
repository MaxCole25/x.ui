import type { App } from 'vue'
import Breadcrumb from './src/Breadcrumb.vue'

export const XBreadcrumb = Breadcrumb

export type { BreadcrumbProps } from './src/types'

XBreadcrumb.install = (app: App) => {
  app.component(XBreadcrumb.name!, XBreadcrumb)
}

export default XBreadcrumb
