export type GroupContainerTitlePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type GroupContainerBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double'

export interface GroupContainerProps {
  title?: string
  titlePosition?: GroupContainerTitlePosition
  width?: number | string
  height?: number | string
  padding?: number | string
  radius?: number | string
  borderWidth?: number | string
  borderColor?: string
  borderStyle?: GroupContainerBorderStyle
  backgroundColor?: string
  textColor?: string
  titleTextColor?: string
  titleBackgroundColor?: string
  titlePadding?: number | string
  titleFontSize?: number | string
}
