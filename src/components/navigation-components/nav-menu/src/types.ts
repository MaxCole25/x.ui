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
  appendToBody?: boolean
  scrollable?: boolean
  maxHeight?: string | number
  accordion?: boolean
  openKeys?: string[]
  defaultOpenKeys?: string[]
  textColor?: string
  activeTextColor?: string
  submenuActiveTextColor?: string
  activeBgColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  activeFontWeight?: number | string
  fontFamily?: string
  itemGap?: number | string
  itemRadius?: number | string
  submenuItemRadius?: number | string
  showSubmenuArrow?: boolean
  submenuArrowIcon?: string | Component
}
