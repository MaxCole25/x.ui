/** 文字大小，单位 px。不会改变控件高度、内边距或圆角。 */
import type { ComputedRef, InjectionKey } from 'vue'

export type FontSize = number

export const fontSizeKey: InjectionKey<ComputedRef<number | undefined>> = Symbol('xFontSize')

export const createFontStyle = (fontSize?: FontSize) => ({
  fontSize: fontSize == null ? undefined : `${fontSize}px`,
  '--x-component-font-size': fontSize == null ? undefined : `${fontSize}px`
})

export const defaultControlMetrics = {
  height: 32,
  padding: '0 8px',
  radius: '6px'
} as const

/** 固定布局默认值与独立字号；容器按各自的布局属性决定高度。 */
export const getComponentMetrics = (size: FontSize = 14) => ({
  ...defaultControlMetrics,
  fontSize: size
})
