import { getBaseXCurrentSize } from './baseXConfig'
import type { BaseXSize, BaseXSizeName } from './types'

const sizeMap: Record<BaseXSize, BaseXSizeName> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  small: 'sm',
  default: 'md',
  large: 'lg',
}

export function normalizeBaseXSize(size?: unknown): BaseXSizeName {
  if (typeof size === 'string' && size in sizeMap) {
    return sizeMap[size as BaseXSize]
  }

  return getBaseXCurrentSize()
}

export type { BaseXSize, BaseXSizeName }
