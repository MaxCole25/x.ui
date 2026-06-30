import type { Component } from 'vue'
import type { XSize } from '../../../_utils/size'
export type NavMenuMode = 'vertical' | 'horizontal'

export interface NavMenuItem {
  key: string
  label: string
  icon?: string | Component
  routeName?: string
  permissionCode?: string
  children?: NavMenuItem[]
}

export interface NavMenuProps {
  size?: XSize
  items: NavMenuItem[]
  activeKey?: string
  mode?: NavMenuMode
  collapsed?: boolean
  allowCollapse?: boolean
  hidden?: boolean
  teleported?: boolean
  teleportTo?: string
  scrollable?: boolean
  maxHeight?: string | number
  accordion?: boolean
  openKeys?: string[]
  defaultOpenKeys?: string[]
  textColor?: string
  activeTextColor?: string
  submenuActiveTextColor?: string
  activeBackgroundColor?: string
  activeAncestorTextColor?: string
  activeAncestorBackgroundColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  activeFontWeight?: number | string
  fontFamily?: string
  itemGap?: number | string
  itemRadius?: number | string
  submenuItemRadius?: number | string
  submenuPopupGap?: number | string
  showSubmenuArrow?: boolean
  submenuArrowIcon?: string | Component
}
