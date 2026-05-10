import type { Component } from 'vue'

export type TabName = string | number
export type TabPosition = 'top' | 'right' | 'bottom' | 'left'
export type TabsSize = 'large' | 'default' | 'small'
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
  stretch?: boolean
  closable?: boolean
  addable?: boolean
  editable?: boolean
  lazy?: boolean
  showAvatar?: boolean
  showCloseIcon?: boolean
  showRefreshIcon?: boolean
  draggable?: boolean
  activeTabBgColor?: string
  activeTabTextColor?: string
  tabBgColor?: string
  tabTextColor?: string
  tabFontSize?: number | string
  tabGap?: number | string
  borderRadius?: number | string
  tabBorder?: string
  contentBorder?: string
  beforeLeave?: (activeName: TabName, oldActiveName: TabName) => boolean | Promise<boolean>
}
