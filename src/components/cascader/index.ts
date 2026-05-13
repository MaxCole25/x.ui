import type { App } from 'vue'
import Cascader from './src/Cascader.vue'

export const XCascader = Cascader

export type { CascaderOption, CascaderProps } from './src/types'

XCascader.install = (app: App) => {
  app.component(XCascader.name!, XCascader)
}

export default XCascader
