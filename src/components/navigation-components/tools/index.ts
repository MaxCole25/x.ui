import type { App } from 'vue'
import Tools from './src/Tools.vue'

export const XTools = Tools

export type { ToolsActionItem, ToolsItem, ToolsItemKey, ToolsItemLayout, ToolsItemType, ToolsMenuItem, ToolsProps, ToolsSeparatorItem } from './src/types'

XTools.install = (app: App) => {
  app.component(XTools.name!, XTools)
}

export default XTools
