export interface ElementStyleProps {
  borderWidth?: number | string
  borderColor?: string
  radius?: number | string
  backgroundColor?: string
  textColor?: string
  showActiveBorder?: boolean
}

export const toCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value)

export const createElementStyleVars = (props: ElementStyleProps) => ({
  '--x-element-border-width': toCssSize(props.borderWidth),
  '--x-element-border-color': props.borderColor,
  '--x-element-bg': props.backgroundColor,
  '--x-element-text': props.textColor
})
