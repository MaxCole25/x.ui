export type GridSize = number | string
export type GridAlign = 'start' | 'center' | 'end' | 'stretch'
export type GridItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'

export interface GridResponsiveColumns {
  sm?: number | string
  md?: number | string
  lg?: number | string
}

export interface GridProps {
  columns?: number | string
  responsiveColumns?: GridResponsiveColumns
  rows?: number | string
  gap?: GridSize
  rowGap?: GridSize
  columnGap?: GridSize
  width?: GridSize
  height?: GridSize
  minWidth?: GridSize
  minHeight?: GridSize
  padding?: GridSize
  autoRows?: GridSize
  autoColumns?: GridSize
  justifyItems?: GridAlign
  alignItems?: GridAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: GridSize
  borderStyle?: string
  radius?: GridSize
  count?: number
}

export interface GridItemProps {
  span?: number
  colSpan?: number
  rowSpan?: number
  column?: string
  row?: string
  width?: GridSize
  height?: GridSize
  minWidth?: GridSize
  minHeight?: GridSize
  padding?: GridSize
  justifySelf?: GridAlign
  alignSelf?: GridAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: GridSize
  borderStyle?: string
  radius?: GridSize
  overflow?: GridItemOverflow
}
