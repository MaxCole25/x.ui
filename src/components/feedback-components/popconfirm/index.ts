import type { App } from 'vue'
import Popconfirm from './src/Popconfirm.vue'

export const XPopconfirm = Popconfirm

export type { PopconfirmProps } from './src/types'

XPopconfirm.install = (app: App) => {
  app.component(XPopconfirm.name!, XPopconfirm)
}

export default XPopconfirm
