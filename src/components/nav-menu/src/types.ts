export type NavMenuMode = 'vertical' | 'horizontal'

export interface NavMenuItem {
  key: string
  label: string
  icon?: string
  routeName?: string
  permissionCode?: string
  children?: NavMenuItem[]
}

export interface NavMenuProps {
  items: NavMenuItem[]
  activeKey?: string
  mode?: NavMenuMode
  collapsed?: boolean
  allowCollapse?: boolean
  textColor?: string
  activeTextColor?: string
  activeBgColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  activeFontWeight?: number | string
  fontFamily?: string
}
