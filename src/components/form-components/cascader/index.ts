import type { App } from 'vue'
import Cascader from './src/Cascader.vue'

export const XCascader = Cascader

export type {
  CascaderDisplayField,
  CascaderOption,
  CascaderProps,
  CascaderSize,
  CascaderStatus,
  CascaderTextAlign
} from './src/types'

XCascader.install = (app: App) => {
  app.component(XCascader.name!, XCascader)
}

export default XCascader
