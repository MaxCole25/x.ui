export interface BreadcrumbItem {
  label: string
  to?: string
  disabled?: boolean
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  separator?: string
}
