import type { App } from 'vue'
import FloatButtonGroup from './src/FloatButtonGroup.vue'

export const XFloatButtonGroup = FloatButtonGroup

export type {
  FloatButtonGroupDirection,
  FloatButtonGroupItem,
  FloatButtonGroupItemKey,
  FloatButtonGroupMode,
  FloatButtonGroupPlacement,
  FloatButtonGroupPosition,
  FloatButtonGroupProps
} from './src/types'

XFloatButtonGroup.install = (app: App) => {
  app.component(XFloatButtonGroup.name!, XFloatButtonGroup)
}

export default XFloatButtonGroup
