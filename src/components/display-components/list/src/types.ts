export type ListItemValue = string | number
export type ListSize = 'sm' | 'md' | 'lg'
export type ListSizeValue = string | number
export type ListItemAlign = 'start' | 'end' | 'stretch'
export type ListItemContentWidthMode = 'auto' | 'equal'

export interface ListItem {
  value: ListItemValue
  title?: string
  description?: string
  icon?: string
  avatar?: string
  extra?: string | number
  disabled?: boolean
  align?: ListItemAlign
}

export interface ListItemSlotProps {
  item: ListItem
  index: number
  active: boolean
  disabled: boolean
}

export interface ListItemClickPayload extends ListItemSlotProps {
  event: MouseEvent
}

export interface ListProps {
  modelValue?: ListItemValue
  items?: ListItem[]
  disabled?: boolean
  size?: ListSize
  height?: ListSizeValue
  maxHeight?: ListSizeValue
  bordered?: boolean
  hoverable?: boolean
  enableEqualItemHeight?: boolean
  itemAlign?: ListItemAlign
  itemContentWidthMode?: ListItemContentWidthMode
  itemContentWidth?: ListSizeValue
  itemContentMaxWidth?: ListSizeValue
  itemRadius?: ListSizeValue
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  loading?: boolean
  loadingText?: string
  finished?: boolean
  finishedText?: string
  loadOffset?: number
}
