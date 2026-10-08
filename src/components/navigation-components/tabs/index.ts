import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Tabs from './src/Tabs.vue'

export const XTabs = Tabs as ComponentWithInstall<typeof Tabs>
export type {
  TabItem,
  TabName,
  TabPosition,
  TabsLabelDirection,
  TabsCloseAllPayload,
  TabsCloseOthersPayload,
  TabsEditAction,
  TabsExpose,
  TabsPaneContext,
  TabsProps,
  TabsReorderPayload,
  TabsReorderPosition,
  TabsType
} from './src/types'

XTabs.install = (app: App) => {
  app.component(XTabs.name!, XTabs)
}

export default XTabs
