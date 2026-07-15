import type { XSize } from '../../../_utils/size'
export type LayoutMode = 'top-sidebar' | 'sidebar-top' | 'top-only'

export interface LayoutProps {
  size?: XSize
  mode?: LayoutMode
  fullHeight?: boolean
  sidebarWidth?: number | string
  sidebarCollapsed?: boolean
  sidebarCollapsedWidth?: number | string
  gap?: number | string
  topbarHeight?: number | string
  footerHeight?: number | string
  topbarBackgroundColor?: string
  topbarTextColor?: string
  topbarRadius?: number | string
  topbarBorderColor?: string
  sidebarBackgroundColor?: string
  sidebarTextColor?: string
  sidebarRadius?: number | string
  sidebarBorderColor?: string
  sidebarPadding?: number | string
  contentBackgroundColor?: string
  contentTextColor?: string
  contentPadding?: number | string
  contentRadius?: number | string
  footerBackgroundColor?: string
  footerTextColor?: string
  footerRadius?: number | string
  footerBorderColor?: string
}
