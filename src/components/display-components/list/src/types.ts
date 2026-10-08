export type ListItemValue = string | number
export type ListFontSize = number
export type ListSizeValue = string | number
export type ListReorderPosition = 'before' | 'after'

export interface ListItem {
  value: ListItemValue
  title?: string
  description?: string
  icon?: string
  avatar?: string
  extra?: string | number
  disabled?: boolean
  draggable?: boolean
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

export interface ListItemReorderPayload {
  item: ListItem
  targetItem: ListItem
  fromIndex: number
  toIndex: number
  sourceValue: ListItemValue
  targetValue: ListItemValue
  position: ListReorderPosition
  items: ListItem[]
}

export interface ListProps {
  modelValue?: ListItemValue
  items?: ListItem[]
  disabled?: boolean
  draggable?: boolean
  fontSize?: number
  height?: ListSizeValue
  maxHeight?: ListSizeValue
  bordered?: boolean
  hoverable?: boolean
  enableEqualItemHeight?: boolean
  itemGap?: ListSizeValue
  itemRadius?: ListSizeValue
  padding?: ListSizeValue
  titleFontSize?: ListSizeValue
  titleTextColor?: string
  descriptionFontSize?: ListSizeValue
  descriptionTextColor?: string
  iconFontSize?: ListSizeValue
  iconTextColor?: string
  extraFontSize?: ListSizeValue
  extraTextColor?: string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  loading?: boolean
  loadingText?: string
  finished?: boolean
  finishedText?: string
  loadOffset?: number
}
