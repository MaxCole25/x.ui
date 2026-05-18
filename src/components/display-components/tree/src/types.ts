import type { XSize } from '../../../_utils/size'
export type TreeContextAction =
  | 'open'
  | 'new-root'
  | 'new-child'
  | 'delete-node'
  | 'manage-members'
  | 'migrate-node'
export type TreeNodeType = 'group' | 'user' | 'document'
export type TreeNodeIcon = string | false | null | undefined

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
  hoverBgColor?: string
  activeBgColor?: string
  activeTextColor?: string
  activeIconColor?: string
  nodeIcon?: (node: TreeNodeData) => TreeNodeIcon
  allowDrag?: (node: TreeNodeData) => boolean
  allowDrop?: (draggingNode: TreeNodeData, dropNode: TreeNodeData, type: 'before' | 'after' | 'inner') => boolean
  canCreateChildByNode?: (node: TreeNodeData) => boolean
  canDeleteNodeById?: (nodeId?: number | null) => boolean
  canManageMembersByNode?: (node: TreeNodeData) => boolean
  canMigrateNode?: (node: TreeNodeData) => boolean
}
