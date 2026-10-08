import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Tree from './src/Tree.vue'

export const XTree = Tree as ComponentWithInstall<typeof Tree>
export type {
  TreeContextAction,
  TreeContextMenuContext,
  TreeContextMenuItem,
  TreeContextMenuItems,
  TreeCreateNode,
  TreeCreateRootNode,
  TreeDeleteNode,
  TreeNodeData,
  TreeProps,
  TreeSlots
} from './src/types'

XTree.install = (app: App) => {
  app.component(XTree.name!, XTree)
}

export default XTree
