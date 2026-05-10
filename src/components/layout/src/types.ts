export type LayoutMode = 'top-sidebar' | 'sidebar-top' | 'top-only'

export interface LayoutProps {
  mode?: LayoutMode
  sidebarWidth?: number | string
  sidebarCollapsed?: boolean
  sidebarCollapsedWidth?: number | string
  gap?: number | string
  topbarHeight?: number | string
  footerHeight?: number | string
  topbarBackgroundColor?: string
  topbarColor?: string
  topbarBorderRadius?: number | string
  topbarBorder?: string
  sidebarBackgroundColor?: string
  sidebarColor?: string
  sidebarBorderRadius?: number | string
  sidebarBorder?: string
  contentBackgroundColor?: string
  contentColor?: string
  contentBorderRadius?: number | string
  footerBackgroundColor?: string
  footerColor?: string
  footerBorderRadius?: number | string
  footerBorder?: string
}
