import type { XSize } from '../../../_utils/size'
export type TreeContextAction =
  | 'new-root'
  | 'new-node'
  | 'new-child'
  | 'delete-node'
  | 'manage-members'
  | 'migrate-node'
  | (string & {})
export type TreeNodeType = 'group' | 'user' | 'document'
export type TreeNodeIcon = string | false | null | undefined
export type TreeContextMenuItemTone = 'default' | 'danger'

export interface TreeContextMenuItem {
  action: TreeContextAction
  label: string
  disabled?: boolean
  visible?: boolean
  tone?: TreeContextMenuItemTone
}

export interface TreeContextMenuContext {
  node: TreeNodeData | null
  treeData: TreeNodeData[]
}

export type TreeContextMenuItems =
  | TreeContextMenuItem[]
  | ((context: TreeContextMenuContext) => TreeContextMenuItem[])

export type TreeCreateRootNode = (treeData: TreeNodeData[]) => TreeNodeData | void
export type TreeCreateNode = (node: TreeNodeData) => TreeNodeData | void
export type TreeDeleteNode = (node: TreeNodeData, treeData: TreeNodeData[]) => void

export interface TreeNodeData {
  id: string | number
  rawId?: number
  label: string
  icon?: TreeNodeIcon
  isEditing?: boolean
  type?: TreeNodeType
  authorId?: number | null
  authorUserName?: string
  authorDisplayName?: string
  hasMembers?: boolean
  isCurrentUserRootMember?: boolean
  permissionCode?: string
  hasChildren?: boolean
  children?: TreeNodeData[]
  [key: string]: unknown
}

export interface TreeProps {
  size?: XSize
  treeData: TreeNodeData[]
  currentTreeKey?: string
  currentUserId?: number | null
  activeColor?: string
  textColor?: string
  mutedColor?: string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
  activeIconColor?: string
  nodeIcon?: (node: TreeNodeData) => TreeNodeIcon
  allowDrag?: (node: TreeNodeData) => boolean
  allowDrop?: (draggingNode: TreeNodeData, dropNode: TreeNodeData, type: 'before' | 'after' | 'inner') => boolean
  contextMenuItems?: TreeContextMenuItems
  createRootNode?: TreeCreateRootNode
  createNode?: TreeCreateNode
  deleteNode?: TreeDeleteNode
  canCreateChildByNode?: (node: TreeNodeData) => boolean
  canDeleteNodeById?: (nodeId?: number | null) => boolean
  canManageMembersByNode?: (node: TreeNodeData) => boolean
  canMigrateNode?: (node: TreeNodeData) => boolean
}

export interface TreeSlots {
  nodeExtra?: (props: { node: TreeNodeData }) => unknown
}
