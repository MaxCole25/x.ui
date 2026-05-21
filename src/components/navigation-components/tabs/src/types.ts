import type { Component } from 'vue'
import type { XSize } from '../../../_utils/size'

export type TabName = string | number
export type TabPosition = 'top' | 'right' | 'bottom' | 'left'
export type TabsLabelDirection = 'horizontal' | 'vertical'
export type TabsSize = XSize
export type TabsType = '' | 'line' | 'card' | 'border-card'
export type TabsEditAction = 'remove' | 'add'
export type TabsReorderPosition = 'before' | 'after'

export interface TabItem {
  name: TabName
  label: string
  icon?: string | Component
  avatarUrl?: string
  avatarText?: string
  disabled?: boolean
  locked?: boolean
  closable?: boolean
  refreshable?: boolean
  draggable?: boolean
  lazy?: boolean
}

export interface TabsPaneContext {
  paneName: TabName
  item: TabItem
}

export interface TabsReorderPayload {
  source: TabName
  target: TabName
  position: TabsReorderPosition
}

export interface TabsCloseAllPayload {
  names: TabName[]
}

export interface TabsCloseOthersPayload {
  targetName: TabName
  names: TabName[]
}

export interface TabsProps {
  modelValue?: TabName
  items?: TabItem[]
  type?: TabsType
  size?: TabsSize
  tabPosition?: TabPosition
  labelDirection?: TabsLabelDirection
  stretch?: boolean
  closable?: boolean
  addable?: boolean
  editable?: boolean
  lazy?: boolean
  showAvatar?: boolean
  showCloseIcon?: boolean
  showRefreshIcon?: boolean
  showContextMenu?: boolean
  draggable?: boolean
  activeTabTextColor?: string
  tabBgColor?: string
  tabTextColor?: string
  tabFontSize?: number | string
  tabMinWidth?: number | string
  tabGap?: number | string
  verticalWidth?: number | string
  verticalLabelMinHeight?: number | string
  borderRadius?: number | string
  border?: string
  contentBackgroundColor?: string
  contextMenuBackgroundColor?: string
  contextMenuTextColor?: string
  fillHeight?: boolean
  beforeLeave?: (activeName: TabName, oldActiveName: TabName) => boolean | Promise<boolean>
}
