import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Cascader from './src/Cascader.vue'

export const XCascader = Cascader as ComponentWithInstall<typeof Cascader>

export type {
  CascaderDisplayField,
  CascaderOption,
  CascaderProps,
  CascaderFontSize,
  CascaderStatus,
  CascaderTextAlign
} from './src/types'

XCascader.install = (app: App) => {
  app.component(XCascader.name!, XCascader)
}

export default XCascader
