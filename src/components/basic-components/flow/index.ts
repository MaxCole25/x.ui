import type { App } from 'vue'
import Flow from './src/Flow.vue'
import FlowItem from './src/FlowItem.vue'

export const XFlow = Flow
export const XFlowItem = FlowItem

export type { FlowAlign, FlowItemKey, FlowItemOverflow, FlowItemProps, FlowProps, FlowSize } from './src/types'

XFlow.install = (app: App) => {
  app.component(XFlow.name!, XFlow)
  app.component(XFlowItem.name!, XFlowItem)
}

XFlowItem.install = (app: App) => {
  app.component(XFlowItem.name!, XFlowItem)
}

export default XFlow
