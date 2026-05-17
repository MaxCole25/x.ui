export type XSize = 'sm' | 'md' | 'lg'

export interface ComponentSizePreset {
  fontSize: number
  height: number
  padding: string
  radius: string
}

export const componentSizePreset: Record<XSize, ComponentSizePreset> = {
  sm: {
    fontSize: 10,
    height: 22,
    padding: '0 4px',
    radius: '4px'
  },
  md: {
    fontSize: 12,
    height: 30,
    padding: '0 8px',
    radius: '6px'
  },
  lg: {
    fontSize: 14,
    height: 38,
    padding: '0 10px',
    radius: '8px'
  }
}

export const componentSizeOptions: XSize[] = ['sm', 'md', 'lg']

