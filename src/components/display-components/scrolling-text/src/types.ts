export type ScrollingTextDisplayDirection = 'horizontal' | 'vertical'
export type ScrollingTextFlowDirection = 'left' | 'right' | 'up' | 'down'

export interface ScrollingTextProps {
  displayDirection?: ScrollingTextDisplayDirection
  flowDirection?: ScrollingTextFlowDirection
  width?: number | string
  height?: number | string
  gap?: number | string
  speed?: number
  fontFamily?: string
  fontSize?: number
  textColor?: string
  backgroundColor?: string
}
