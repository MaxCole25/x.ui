import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type SplitterDirection = 'horizontal' | 'vertical'
export type SplitterSize = number | string
export type SplitPaneOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'

export interface SplitterProps extends ElementStyleProps {
  modelValue?: number[]
  direction?: SplitterDirection
  width?: SplitterSize
  height?: SplitterSize
  splitterSize?: number
  splitterColor?: string
  activeSplitterColor?: string
}

export interface SplitPaneProps {
  size?: SplitterSize
  minSize?: number
  maxSize?: number
  padding?: SplitterSize
  locked?: boolean
  overflow?: SplitPaneOverflow
}

export interface SplitterResizePayload {
  index: number
  sizes: number[]
}

export interface SplitPaneRegistration {
  element: Ref<HTMLElement | undefined>
  props: SplitPaneProps
}

export interface SplitterContext {
  direction: ComputedRef<SplitterDirection>
  registerPane: (pane: SplitPaneRegistration) => () => void
}

export const splitterContextKey: InjectionKey<SplitterContext> = Symbol('xSplitter')
