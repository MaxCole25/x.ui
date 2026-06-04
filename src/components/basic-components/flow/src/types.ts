export type FlowSize = number | string
export type FlowAlign = 'start' | 'center' | 'end' | 'stretch'
export type FlowItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
export type FlowItemKey = string | number | ((item: unknown, index: number) => string | number)

export interface FlowProps {
  items?: unknown[]
  itemKey?: FlowItemKey
  itemWidth?: FlowSize
  gap?: FlowSize
  rowGap?: FlowSize
  columnGap?: FlowSize
  width?: FlowSize
  height?: FlowSize
  minWidth?: FlowSize
  minHeight?: FlowSize
  padding?: FlowSize
  justifyItems?: FlowAlign
  alignItems?: FlowAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: FlowSize
  borderStyle?: string
  radius?: FlowSize
  itemBackgroundColor?: string
  itemTextColor?: string
  itemBorderColor?: string
  itemBorderWidth?: FlowSize
  itemBorderStyle?: string
  itemRadius?: FlowSize
  itemPadding?: FlowSize
  itemOverflow?: FlowItemOverflow
  lazy?: boolean
  initialCount?: number
  loadCount?: number
}

export interface FlowItemProps {
  width?: FlowSize
  height?: FlowSize
  minWidth?: FlowSize
  minHeight?: FlowSize
  padding?: FlowSize
  justifySelf?: FlowAlign
  alignSelf?: FlowAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: FlowSize
  borderStyle?: string
  radius?: FlowSize
  overflow?: FlowItemOverflow
}
