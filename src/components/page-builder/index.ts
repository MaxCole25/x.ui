import type { App } from 'vue'
import PageBuilder from './src/PageBuilder.vue'

export const XPageBuilder = PageBuilder

export type {
  PageBuilderCanvasSchema,
  PageBuilderLayoutSchema,
  PageBuilderNodeSchema,
  PageBuilderNodeType,
  PageBuilderProps,
  PageBuilderSchema,
  PageBuilderWidgetCategory,
  PageBuilderWidgetDefinition
} from './src/types'

export {
  clonePageBuilderSchema,
  createDefaultPageBuilderSchema,
  createPageBuilderNode
} from './src/schema'
export {
  getPageBuilderWidget,
  isPageBuilderContainer,
  pageBuilderCategoryLabels,
  pageBuilderWidgets
} from './src/registry'

XPageBuilder.install = (app: App) => {
  app.component(XPageBuilder.name!, XPageBuilder)
}

export default XPageBuilder
