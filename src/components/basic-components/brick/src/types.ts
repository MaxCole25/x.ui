import type { ComputedRef, InjectionKey } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type BrickDirection = 'horizontal' | 'vertical'
export type BrickSize = number | string
export type BrickItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'

export interface BrickProps extends ElementStyleProps {
  direction?: BrickDirection
  count?: number
  gap?: BrickSize
  width?: BrickSize
  height?: BrickSize
  wrap?: boolean
  backgroundColor?: string
  verticalCenter?: boolean
  horizontalCenter?: boolean
  bottomAlign?: boolean
  rightAlign?: boolean
  padding?: BrickSize
}

export interface BrickItemProps extends ElementStyleProps {
  size?: BrickSize
  width?: BrickSize
  height?: BrickSize
  minSize?: BrickSize
  maxSize?: BrickSize
  backgroundColor?: string
  overflow?: BrickItemOverflow
  verticalCenter?: boolean
  horizontalCenter?: boolean
  bottomAlign?: boolean
  rightAlign?: boolean
  padding?: BrickSize
}

export const brickDirectionKey: InjectionKey<ComputedRef<BrickDirection>> = Symbol('xBrickDirection')
export const brickGroupLayoutKey: InjectionKey<ComputedRef<Pick<BrickProps, 'rightAlign'>>> =
  Symbol('xBrickGroupLayout')
export const brickContentLayoutKey: InjectionKey<
  ComputedRef<Pick<BrickProps, 'verticalCenter' | 'horizontalCenter' | 'bottomAlign' | 'rightAlign' | 'padding'>>
> =
  Symbol('xBrickContentLayout')
