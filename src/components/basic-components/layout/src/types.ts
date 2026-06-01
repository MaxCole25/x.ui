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
  topbarColor?: string
  topbarRadius?: number | string
  topbarBorder?: string
  sidebarBackgroundColor?: string
  sidebarColor?: string
  sidebarRadius?: number | string
  sidebarBorder?: string
  sidebarPadding?: number | string
  contentBackgroundColor?: string
  contentColor?: string
  contentRadius?: number | string
  footerBackgroundColor?: string
  footerColor?: string
  footerRadius?: number | string
  footerBorder?: string
}
