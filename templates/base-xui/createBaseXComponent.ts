import { defineComponent, h, type Component } from 'vue'
import { normalizeBaseXSize } from './xSize'

type BaseXDefaults = Record<string, unknown> | (() => Record<string, unknown>)

export function createBaseXComponent(name: string, component: Component, defaults?: BaseXDefaults) {
  return defineComponent({
    name,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        const { size, ...restAttrs } = attrs
        const resolvedDefaults = typeof defaults === 'function' ? defaults() : (defaults ?? {})

        return h(
          component as never,
          {
            size: normalizeBaseXSize(size),
            ...resolvedDefaults,
            ...restAttrs,
          },
          slots,
        )
      }
    },
  })
}
