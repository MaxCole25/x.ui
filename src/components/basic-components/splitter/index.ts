import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import SplitPane from './src/SplitPane.vue'
import Splitter from './src/Splitter.vue'

export const XSplitter = Splitter as ComponentWithInstall<typeof Splitter>
export const XSplitPane = SplitPane as ComponentWithInstall<typeof SplitPane>

export type {
  SplitPaneOverflow,
  SplitPaneProps,
  SplitterDirection,
  SplitterProps,
  SplitterResizePayload,
  SplitterSize
} from './src/types'

XSplitter.install = (app: App) => {
  app.component(XSplitter.name!, XSplitter)
  app.component(XSplitPane.name!, XSplitPane)
}

XSplitPane.install = (app: App) => {
  app.component(XSplitPane.name!, XSplitPane)
}

export default XSplitter
