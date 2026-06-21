export interface DescriptionItem {
  label: string
  value?: string | number
  span?: number
}

export interface DescriptionsProps {
  title?: string
  items?: DescriptionItem[]
  column?: number
  bordered?: boolean
  labelWidth?: number | string
  labelColor?: string
  textColor?: string
}
